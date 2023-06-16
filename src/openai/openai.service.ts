import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Configuration, OpenAIApi } from 'openai';
import { ChatCompletionRequestMessage } from 'openai/api';

@Injectable()
export class OpenaiService {
  private openAI: OpenAIApi;

  constructor(private readonly configService: ConfigService) {
    this.openAI = new OpenAIApi(
      new Configuration({
        apiKey: configService.get('OPEN_AI_KEY'),
      }),
    );
  }

  public async textToAI(messages: ChatCompletionRequestMessage[]) {
    const response = await this.openAI.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages,
    });

    return response.data.choices[0].message;
  }
}
