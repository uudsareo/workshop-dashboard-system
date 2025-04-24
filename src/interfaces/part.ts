export interface Location {
  name: string;
  value: string;
  isHold?: boolean;
}

export interface Hold {
  name: string;
  value: string | number;
}

export interface TagLine {
  name: string;
  value: string | number;
}
export interface DashBoard {
  type: string;
  data: PartData[];
}
export interface PartData {
  _id?: string;
  __v?: number;
  name: string;
  projectId: string;
  imagePath?: string;
  locations: Location[];
  onHold: Hold;
  tagLines: TagLine[];
}
