import { project } from "./project";

export interface Location {
  name: string;
  value: string;
  isHold?: boolean;
}

export interface Hold {
  name: string;
  value: string | number;
  isComplete?: boolean;
}

export interface TagLine {
  name: string;
  value: string | number;
}

export interface dashboardData {
  data: PartWithProject[];
}

export interface PartWithProject {
  projectId: project;
  parts: PartData[];
}

export interface DashBoard {
  type: string;
  data: PartData[];
}
export interface PartData {
  _id?: string;
  __v?: number;
  name: string;
  projectId: {
    _id: string;
    name: string;
    description?: string;
  };
  imagePath?: string;
  locations: Location[];
  onHold: Hold;
  tagLines: TagLine[];
  isActive?: boolean;
  createdAt?: string; // ISO date string
}
