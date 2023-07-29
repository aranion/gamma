import { useLocation } from 'react-router-dom'
import { getDesktopId } from '../../components'
import { DesktopState } from '../../constants/types'
import { Window } from '../Window'
import classes from './desktop.module.sass'

export function Desktop(props: {
  desktop: DesktopState
  dragElement: Function
  desktopList: DesktopState[]
  setDesktopList: Function
  refDesktops: React.MutableRefObject<HTMLDivElement>
}) {
  const { desktop, dragElement, desktopList, setDesktopList, refDesktops } = props

  const { pathname } = useLocation()

  return (
    <div className={`${classes.desktop} ${desktop.desktopId === getDesktopId(pathname) ? '' : classes.invisible}`}>
      {desktop.windows.map((item) => {
        return (
          <Window
            key={item.windowId}
            windowItem={item}
            dragElement={dragElement}
            desktopList={desktopList}
            desktopId={desktop.desktopId}
            setDesktopList={setDesktopList}
            refDesktops={refDesktops}
          />
        )
      })}
    </div>
  )
}
