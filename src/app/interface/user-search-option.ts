export interface UserSearchOption {
  state?: 'all' | 'available' | 'admin' | 'moderator' | 'adminOrModerator' | 'silenced' | 'suspended';
  sort?: '+follower' | '-follower' | '+createdAt' | '-createdAt' | '+updatedAt' | '-updatedAt';
  origin?: 'combined' | 'local' | 'remote';
  username?: string;
  hostname?: string;
}
