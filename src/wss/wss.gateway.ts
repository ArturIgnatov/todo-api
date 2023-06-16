import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket as SocketIO } from 'socket.io';
import { DialogService } from '../modules/dialog/dialog.service';
import { MessageService } from '../modules/message/message.service';
import { Logger } from '@nestjs/common';
import { EventData, IEmitEventsMap, IListenEventsMap } from './events-map';
import { OpenaiService } from '../openai/openai.service';
import { MessageRole } from '../interfaces/message-role';
import { TodoService } from '../modules/todo/todo.service';

type Socket = SocketIO<IListenEventsMap, IEmitEventsMap> & {
  handshake: { auth: { user: { id: string } } };
};

@WebSocketGateway({
  path: '/chat',
  cors: { origin: '*' },
})
export class WssGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
  public logger = new Logger(WssGateway.name);

  @WebSocketServer()
  public readonly server: Server<IListenEventsMap, IEmitEventsMap>;
  constructor(
    private readonly todoService: TodoService,
    private readonly openaiService: OpenaiService,
    private readonly dialogService: DialogService,
    private readonly messageService: MessageService,
  ) {}
  public afterInit(server: Server): any {
    this.logger.debug('AFTER INIT', server);
  }

  public async handleConnection(client: Socket) {
    const dialogs = await this.dialogService.getMany({
      user_id: client.handshake.auth.user.id,
    });

    client.emit('clientConnected', { dialogs });
  }

  public handleDisconnect(client: Socket) {
    this.logger.debug('CLIENT DISCONNECTED', client.id);
  }

  private async createOpenAIAnswer(client: Socket, dialog_id: string) {
    client.emit('setTyping', true);

    const messages = await this.messageService.messageRepository
      .createQueryBuilder('m')
      .select(['m.content', 'm.role'])
      .where('m.dialog_id = :dialog_id', { dialog_id })
      .getMany();

    const res = await this.openaiService.textToAI(messages);

    client.emit('setTyping', false);

    const message = await this.messageService.create({
      content: res.content,
      role: MessageRole.ASSISTANT,
      dialog_id,
    });

    client.emit('newMessage', message);
  }

  @SubscribeMessage('newDialog')
  public async newDialogHandler(
    @MessageBody() data: EventData<IListenEventsMap['newDialog']>,
    @ConnectedSocket() client: Socket,
  ) {
    const dialog = await this.dialogService.create({
      name: data.name,
      user_id: client.handshake.auth.user.id,
    });

    client.emit('newDialog', dialog);
  }

  @SubscribeMessage('removeDialog')
  public async removeDialogHandler(
    @MessageBody() data: EventData<IListenEventsMap['removeDialog']>,
    @ConnectedSocket() client: Socket,
  ) {
    await this.dialogService.remove(data.id);

    client.emit('removeDialog', data);
  }

  @SubscribeMessage('enterDialog')
  public async handleEnterDialog(
    @MessageBody() data: EventData<IListenEventsMap['enterDialog']>,
    @ConnectedSocket() client: Socket,
  ) {
    const messages = await this.messageService.getMany(data);

    client.emit('enterDialog', { messages: messages });
  }

  @SubscribeMessage('newMessage')
  public async newMessageHandler(
    @MessageBody() data: EventData<IListenEventsMap['newMessage']>,
    @ConnectedSocket() client: Socket,
  ) {
    const message = await this.messageService.create({
      ...data,
      role: MessageRole.USER,
    });

    this.createOpenAIAnswer(client, message.dialog_id);

    client.emit('newMessage', message);
  }

  @SubscribeMessage('removeMessage')
  public async removeMessageHandler(
    @MessageBody() data: EventData<IListenEventsMap['removeMessage']>,
    @ConnectedSocket() client: Socket,
  ) {
    await this.messageService.remove(data.id);

    client.emit('removeMessage', data);
  }

  @SubscribeMessage('createTodo')
  public async handleCreateTodo(
    @MessageBody() data: EventData<IListenEventsMap['createTodo']>,
    @ConnectedSocket() client: Socket,
  ) {
    const message: { content: string } =
      await this.messageService.messageRepository
        .createQueryBuilder('m')
        .select('m.content')
        .where('m.id = :id', { id: data.message_id })
        .getOne();

    const todo = await this.todoService.create({
      category_id: data.category_id,
      title: message.content,
    });

    client.emit('createTodo', todo);
  }
}
