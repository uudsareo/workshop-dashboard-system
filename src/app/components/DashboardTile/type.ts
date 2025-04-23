import { TagLineProps } from "../TagLine";

export interface DashboardTileProps {
  partName: string;
  imageSrc: string | any;
  locations: any[];
  tagLines: TagLineProps[];
  onHold: number;
  progress: number;
}
