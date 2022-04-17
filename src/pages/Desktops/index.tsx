import { useEffect, useRef, useState } from "react";
import { Desktop } from "../../components";
import { DesktopState, Direction, WindowItem } from "../../constants/types";
import "./desktop.sass";

export function Desktops() {
  const initialState: DesktopState[] = [
    {
      desktopId: 1,
      windows: [
        {
          windowId: "window1",
          ref: useRef(null),
          zIndex: 1,
          height: 175,
          width: 150,
          top: 0,
          left: 0,
          refMoveElem: useRef(null),
          position: { pos1: 0, pos2: 0, pos3: 0, pos4: 0 },
        },
        {
          windowId: "window3",
          ref: useRef(null),
          zIndex: 1,
          height: 175,
          width: 150,
          top: 0,
          left: 0,
          refMoveElem: useRef(null),
          position: { pos1: 0, pos2: 0, pos3: 0, pos4: 0 },
        },
      ],
    },
    {
      desktopId: 2,
      windows: [
        {
          windowId: "window2",
          ref: useRef(null),
          zIndex: 1,
          height: 175,
          width: 150,
          top: 0,
          left: 0,
          refMoveElem: useRef(null),
          position: { pos1: 0, pos2: 0, pos3: 0, pos4: 0 },
        },
      ],
    },
  ];

  const [desktopList, setDesktopList] = useState(initialState);
  // const desktopList = useSelector<{ desktopList: DesktopState[] }>(
  //   (state) => state.desktopList
  // ) as DesktopState[];

  const refDesktops = useRef(null);

  useEffect(() => {
    desktopList.forEach((el) =>
      el.windows.forEach((item) => {
        dragElement(item.ref.current, item.refMoveElem, item);
        setSizeBlock(item);
      })
    );
  }, [desktopList]);

  function setSizeBlock(item: WindowItem) {
    const elmStyle = (item.ref.current as any).style;
    elmStyle.width = item.width + "px";
    elmStyle.height = item.height + "px";
    elmStyle.top = item.top + "px";
    elmStyle.left = item.left + "px";
  }

  function dragElement(
    elmnt: any,
    refMoveElem: React.MutableRefObject<null>,
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
      if (value < 0) {
        return 0;
      } else if (
        direction === "horizontally" &&
        value > (refDesktops.current as any).clientWidth - windowItem.width
      ) {
        return (refDesktops.current as any).clientWidth - windowItem.width;
      } else if (
        direction === "vertically" &&
        value > (refDesktops.current as any).clientHeight - windowItem.height
      ) {
        return (refDesktops.current as any).clientHeight - windowItem.height;
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
    }
  }

  return (
    <div className="desktops no-select" ref={refDesktops}>
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
