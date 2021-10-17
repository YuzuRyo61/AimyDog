export interface ServerInfo {
  machine: string;
  cpu: {
    model: string;
    cores: number;
  };
  mem: {
    total: number;
  }
  fs: {
    total: number;
    used: number;
  }
}
