export interface ReportSearchOption {
  state: 'resolved' | 'unresolved' | '' | null;
  reporterOrigin: 'combined' | 'local' | 'remote';
  targetUserOrigin: 'combined' | 'local' | 'remote';
}
