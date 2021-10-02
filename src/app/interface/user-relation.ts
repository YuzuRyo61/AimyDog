import { User } from "./user";

export interface UserRelation {
  id: string;
  createAt: string;
  followeeId?: string;
  followee?: User;
  followerId?: string;
  follower?: User;
}
