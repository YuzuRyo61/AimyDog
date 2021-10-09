export interface Federation {
  id: string;
  caughtAt: string;
  host: string;
  usersCount: number;
  followingCount: number;
  followersCount: number;
  driveUsage: number;
  driveFiles: number;
  latestRequestSentAt: string | null;
  lastCommunicatedAt: string;
  isNotResponding: boolean;
  isSuspended: boolean;
  softwareName: string | null;
  softwareVersion: string | null;
  name: string | null;
  description: string | null;
  maintainerName: string | null;
  maintainerEmail: string | null;
  iconUrl: string | null;
  infoUpdatedAt: string | null;
}
