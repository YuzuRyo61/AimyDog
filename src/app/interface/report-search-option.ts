export interface ReportSearchOption {
  state: 'resolved' | 'unresolved';
  reporterOrigin: 'combined' | 'local' | 'remote';
  targetUserOrigin: 'combined' | 'local' | 'remote';
}
