import { ActionDesktop, DesktopState } from '../../constants/types'

export const initialState: DesktopState[] = [
  {
    desktopId: 1,
    windows: [
      {
        windowId: 'window1',
        ref: {} as React.MutableRefObject<HTMLDivElement>,
        zIndex: 0,
        height: 175,
        width: 150,
        top: 0,
        left: 0,
        refMoveElem: {} as React.MutableRefObject<HTMLDivElement>,
        position: { pos1: 0, pos2: 0, pos3: 0, pos4: 0 },
      },
      {
        windowId: 'window3',
        ref: {} as React.MutableRefObject<HTMLDivElement>,
        zIndex: 0,
        height: 175,
        width: 150,
        top: 0,
        left: 0,
        refMoveElem: {} as React.MutableRefObject<HTMLDivElement>,
        position: { pos1: 0, pos2: 0, pos3: 0, pos4: 0 },
      },
    ],
  },
  {
    desktopId: 2,
    windows: [
      {
        windowId: 'window2',
        ref: {} as React.MutableRefObject<HTMLDivElement>,
        zIndex: 0,
        height: 175,
        width: 150,
        top: 0,
        left: 0,
        refMoveElem: {} as React.MutableRefObject<HTMLDivElement>,
        position: { pos1: 0, pos2: 0, pos3: 0, pos4: 0 },
      },
    ],
  },
]

export default function desktopsReducer(state = initialState, action: ActionDesktop) {
  switch (action.type) {
    // case SET_:
    //   return {
    //     ...state,
    //     data: action.payload
    //   }
    default:
      return {
        ...state,
      }
  }
}
