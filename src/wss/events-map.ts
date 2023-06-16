import { DialogEntity } from '../modules/dialog/dialog.entity';
import { MessageEntity } from '../modules/message/message.entity';
import { TodoEntity } from '../modules/todo/todo.entity';

export interface IListenEventsMap {
  newDialog: (data: { name: string }) => void;
  removeDialog: (data: { id: string }) => void;
  newMessage: (data: { content: string; dialog_id: string }) => void;
  removeMessage: (data: { id: string }) => void;
  enterDialog: (data: { dialog_id: string }) => void;
  createTodo: (data: { category_id: string; message_id: string }) => void;
}

export interface IEmitEventsMap {
  newDialog: (data: DialogEntity) => void;
  removeDialog: (data: { id: string }) => void;
  newMessage: (data: MessageEntity) => void;
  removeMessage: (data: { id: string }) => void;
  clientConnected: (data: { dialogs: DialogEntity[] }) => void;
  enterDialog: (data: { messages: MessageEntity[] }) => void;
  setTyping: (data: boolean) => void;
  createTodo: (data: TodoEntity) => void;
}

export type EventData<T extends (...args: any[]) => void> = Parameters<T>[0];
