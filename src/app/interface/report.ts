import { User } from "./user";

export interface Report {
  id: string;
  createdAt: string;
  comment: string;
  resolved: boolean;
  reporter: User;
  targetUser: User;
  assignee: User | null;
}
