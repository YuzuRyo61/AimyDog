export interface FileSearchOption {
  type: string | null;
  origin: 'local' | 'combined' | 'remote';
  hostname: string | null;
}
