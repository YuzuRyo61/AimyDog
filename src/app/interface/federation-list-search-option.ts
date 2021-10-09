export interface FederationListSearchOption {
  host?: string | null;
  blocked?: boolean | null;
  notResponding?: boolean | null;
  suspended?: boolean | null;
  federating?: boolean | null;
  subscribing?: boolean | null;
  publishing?: boolean | null;
  sort?: '+pubSub' | '-pubSub' |
    '+notes' | '-notes' | '+users' | '-users' |
    '+following' | '-following' | '+followers' | '-followers' |
    '+caughtAt' | '-caughtAt' | '+lastCommunicatedAt' | '-lastCommunicatedAt' |
    '+driveUsage' | '-driveUsage' | '+driveFiles' | '-driveFiles';
}
