export interface User {
  id: string;
  name: string | null;
  username: string;
  host: string | null;
  avatarUrl: string | null;
  bannerUrl: string | null;
  createdAt: string;
  updatedAt: string | null;
  isSuspended: boolean;
  isSilenced: boolean;
  isAdmin: boolean;
  isModerator: boolean;
  followersCount: number;
  followingCount: number;
  notesCount: number;
  inbox: string | null;
  sharedInbox: string | null;
  uri: string | null;
}
