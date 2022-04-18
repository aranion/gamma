import { useEffect, useRef } from "react";
import { DesktopState, WindowItem } from "../../constants/types";
import classes from "./window.module.sass";

interface Props {
  windowItem: WindowItem;
  dragElement: Function;
  desktopList: DesktopState[];
  desktopId: number;
  setDesktopList: Function;
  refDesktops: React.MutableRefObject<HTMLDivElement>;
}

export function Window(props: Props) {
  const {
    windowItem,
    dragElement,
    desktopList,
    desktopId,
    setDesktopList,
    refDesktops,
  } = props;

  const refBlockResize = useRef({} as HTMLDivElement);

  let ie: number = 0,
    op: number = 0,
    ff: number = 0,
    block: HTMLDivElement,
    block_r: HTMLDivElement,
    delta_w: number = 0,
    delta_h: number = 0,
    browser = navigator.userAgent;

  useEffect(() => {
    if (browser.indexOf("Opera") !== -1) op = 1;
    else if (browser.indexOf("MSIE") !== -1) ie = 1;
    else if (browser.indexOf("Firefox") !== -1) ff = 1;

    block = windowItem.ref.current;
    block_r = refBlockResize.current;
    document.onmouseup = clearXY;
    block_r.onmousedown = saveWH;
  });

  function getXY(obj_event: MouseEvent): number[] {
    let x: number, y: number;

    if (obj_event) {
      x = obj_event.pageX;
      y = obj_event.pageY;
    } else {
      x = (window.event as MouseEvent)?.clientX;
      y = (window.event as MouseEvent)?.clientY;
      if (ie) {
        y -= 2;
        x -= 2;
      }
    }
    return [x, y];
  }
  function saveWH(obj_event: MouseEvent): boolean {
    let point: number[] = getXY(obj_event);
    let w_block: number = windowItem.width;
    let h_block: number = windowItem.height;

    delta_w = w_block - point[0];
    delta_h = h_block - point[1];

    document.onmousemove = resizeBlock;

    if (op || ff) document.addEventListener("onmousemove", resizeBlock, false);

    return false;
  }

  function clientWidth(): number {
    return refDesktops.current.clientWidth === 0
      ? document.body.clientWidth
      : refDesktops.current.clientWidth;
  }

  function clientHeight(): number {
    return refDesktops.current.clientHeight === 0
      ? document.body.clientHeight
      : refDesktops.current.clientHeight;
  }

  function clearXY(): void {
    document.onmousemove = null;
  }

  function resizeBlock(obj_event: any): void {
    let point = getXY(obj_event);

    windowItem.width = delta_w + point[0];
    windowItem.height = delta_h + point[1];
    block.style.width = windowItem.width + "px";
    block.style.height = windowItem.height + "px";

    if (block.offsetLeft + block.clientWidth > clientWidth())
      block.style.width = clientWidth() - block.offsetLeft + "px";
    if (block.offsetTop + block.clientHeight > clientHeight())
      block.style.height = clientHeight() - block.offsetTop + "px";
  }

  function moveWindowDesktop(): void {
    desktopList.map((el) => {
      if (el.desktopId === desktopId) {
        let del = el.windows.findIndex(
          (item) => item.windowId === windowItem.windowId
        );
        el.windows.splice(del, 1);
      } else {
        el.windows.push(windowItem);
      }
      return el;
    });
    setDesktopList([...desktopList]);
  }

  return (
    <div className={classes.window} ref={windowItem.ref}>
      <div
        ref={windowItem.refMoveElem}
        className={classes["window__header"]}
        onChange={(e) => dragElement(e, windowItem.refMoveElem, windowItem)}
      >
        Нажмите здесь, чтобы переместить
      </div>
      <p>{windowItem.windowId}</p>
      <button onClick={moveWindowDesktop}>Переместить</button>
      <div className={classes["block_resize"]} ref={refBlockResize}></div>
    </div>
  );
}
