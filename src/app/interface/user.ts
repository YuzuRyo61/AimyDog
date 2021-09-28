export interface User {
  id: string,
  createdAt: string,
  updatedAt: string,
  username: string,
  isSuspended: boolean,
  isSilenced: boolean,
  isAdmin: boolean,
  isModerator: boolean,
}
