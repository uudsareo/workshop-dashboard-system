export interface IConfig {
  gridCount: number;
  duration: number;
}

export interface ISetting {
  _id: string;
  setting: IConfig;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
