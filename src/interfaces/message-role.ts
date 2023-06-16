import { registerEnumType } from '@nestjs/graphql';

export enum MessageRole {
  USER = 'user',
  ASSISTANT = 'assistant',
}

registerEnumType(MessageRole, {
  name: 'MessageRole',
  description: 'Role for messages in dialog',
  valuesMap: {
    USER: { description: 'User role' },
    ASSISTANT: { description: 'GPT role' },
  },
});
