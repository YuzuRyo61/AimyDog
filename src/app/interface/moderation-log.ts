import { User } from "./user";

export interface ModerationLog {
  id: string;
  createdAt: string;
  type: 'updateMeta' | 'addEmoji' | 'removeEmoji' | 'suspend' | 'unsuspend' | 'silence' | 'unsilence' | 'clearQueue';
  info: unknown;
  userId: string;
  user: User;
}

export interface MLAddEmoji extends ModerationLog {
  info: {
    emojiId: string;
  };
}

export interface MLRemoveEmoji extends ModerationLog {
  info: {
    emoji: {
      id: string;
      uri: string | null;
      url: string;
      host: string | null;
      name: string;
      type: string;
      aliases: string[];
      category: string;
      updatedAt: string;
    };
  };
}

export interface MLUserTarget extends ModerationLog {
  info: {
    targetId: string;
  };
}
