export interface Position {
  pos1: number;
  pos2: number;
  pos3: number;
  pos4: number;
}
export interface WindowItem {
  windowId: string;
  ref: React.MutableRefObject<null>;
  refMoveElem: React.MutableRefObject<null>;
  zIndex: number;
  width: number;
  height: number;
  top: number;
  left: number;
  position: Position;
}
export interface DesktopState {
  desktopId: number;
  windows: WindowItem[];
}
export enum Direction {
  horizontally = "horizontally",
  vertically = "vertically",
}
export enum RouteNames {
  HOME = "/",
  DESKTOPS = "/desktops/",
  NOT_FOUND = "/*",
}