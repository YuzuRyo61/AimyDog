import { User } from "./user";

export interface DriveFile {
  id: string;
  createdAt: string;
  name: string;
  type: string;
  md5: string;
  size: number;
  isSensitive: boolean;
  url: string | null;
  thumbnailUrl: string | null;
  userId: string | null;
  user?: User;
}
