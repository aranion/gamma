import { useEffect, useRef, useState } from "react";
import { Desktop } from "../../components";
import { DesktopState, Direction, WindowItem } from "../../constants/types";
import classes from "./desktop.module.sass";

export function Desktops() {
  const initialState: DesktopState[] = [
    {
      desktopId: 1,
      windows: [
        {
          windowId: "window1",
          ref: useRef({} as HTMLDivElement),
          zIndex: 1,
          height: 175,
          width: 150,
          top: 0,
          left: 0,
          refMoveElem: useRef({} as HTMLDivElement),
          position: { pos1: 0, pos2: 0, pos3: 0, pos4: 0 },
        },
        {
          windowId: "window3",
          ref: useRef({} as HTMLDivElement),
          zIndex: 1,
          height: 175,
          width: 150,
          top: 0,
          left: 0,
          refMoveElem: useRef({} as HTMLDivElement),
          position: { pos1: 0, pos2: 0, pos3: 0, pos4: 0 },
        },
      ],
    },
    {
      desktopId: 2,
      windows: [
        {
          windowId: "window2",
          ref: useRef({} as HTMLDivElement),
          zIndex: 1,
          height: 175,
          width: 150,
          top: 0,
          left: 0,
          refMoveElem: useRef({} as HTMLDivElement),
          position: { pos1: 0, pos2: 0, pos3: 0, pos4: 0 },
        },
      ],
    },
  ];

  const [desktopList, setDesktopList] = useState(initialState);
  // const desktopList = useSelector<{ desktopList: DesktopState[] }>(
  //   (state) => state.desktopList
  // ) as DesktopState[];

  const refDesktops = useRef({} as HTMLDivElement);

  useEffect(() => {
    desktopList.forEach((el) =>
      el.windows.forEach((item) => {
        dragElement(item.ref.current, item.refMoveElem, item);
        initialBlock(item);
      })
    );
  }, [desktopList]);

  function initialBlock(item: WindowItem) {
    const elmStyle = item.ref.current.style;
    elmStyle.width = item.width + "px";
    elmStyle.height = item.height + "px";
    elmStyle.top = item.top + "px";
    elmStyle.left = item.left + "px";
    elmStyle.zIndex = String(item.zIndex);
  }

  function dragElement(
    elmnt: HTMLDivElement,
    refMoveElem: React.MutableRefObject<HTMLDivElement>,
    windowItem: WindowItem
  ) {
    if (refMoveElem.current) {
      (refMoveElem.current as HTMLElement).onmousedown = dragMouseDown;
    } else {
      elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e: MouseEvent) {
      e = e || window.event;
      e.preventDefault();
      windowItem.position.pos3 = e.clientX;
      windowItem.position.pos4 = e.clientY;
      document.onmousemove = elementDrag;
    }

    function checkMaxBorder(value: number, direction: Direction): number {
      const maxWidth = refDesktops.current.clientWidth - windowItem.width;
      const masHeight = refDesktops.current.clientHeight - windowItem.height;

      if (value < 0) {
        return 0;
      } else if (direction === Direction.horizontally && value > maxWidth) {
        return maxWidth;
      } else if (direction === Direction.vertically && value > masHeight) {
        return masHeight;
      }

      return value;
    }

    function elementDrag(e: MouseEvent) {
      e = e || window.event;
      e.preventDefault();
      windowItem.position.pos1 = windowItem.position.pos3 - e.clientX;
      windowItem.position.pos2 = windowItem.position.pos4 - e.clientY;
      windowItem.position.pos3 = e.clientX;
      windowItem.position.pos4 = e.clientY;
      windowItem.top = checkMaxBorder(
        elmnt.offsetTop - windowItem.position.pos2,
        Direction.vertically
      );
      windowItem.left = checkMaxBorder(
        elmnt.offsetLeft - windowItem.position.pos1,
        Direction.horizontally
      );
      elmnt.style.top = windowItem.top + "px";
      elmnt.style.left = windowItem.left + "px";

      selectWindow(windowItem.windowId);
    }

    function selectWindow(windowId: string): void {
      desktopList.forEach((el) => {
        el.windows.forEach((item) => {
          if (item.windowId === windowId) item.zIndex = 1;
          else item.zIndex = 0;
        });
      });
      setDesktopList([...desktopList]);
    }
  }

  return (
    <div
      className={`${classes.desktops} ${classes["no-select"]}`}
      ref={refDesktops}
    >
      {desktopList.map((el) => (
        <Desktop
          key={el.desktopId}
          desktopList={desktopList}
          desktop={el}
          dragElement={dragElement}
          setDesktopList={setDesktopList}
          refDesktops={refDesktops}
        />
      ))}
    </div>
  );
}
