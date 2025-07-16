import { Hold, TagLine } from "@/interfaces/part";
import { TagLineProps } from "../TagLine";

export interface DashboardTileProps {
  partName: string;
  imageSrc: string | any;
  locations: any[];
  tagLines: TagLine[];
  onHold: Hold;
  progress: number;
}
