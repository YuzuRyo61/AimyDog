export interface User {
  id: string,
  name: string | null,
  username: string,
  host: string | null,
  avatarUrl: string | null,
  bannerUrl: string | null,
  createdAt: string,
  updatedAt: string | null,
  isSuspended: boolean,
  isSilenced: boolean,
  isAdmin: boolean,
  isModerator: boolean,
}
