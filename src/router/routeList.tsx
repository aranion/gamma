import { ReactElement } from 'react'
import { RouteNames } from '../constants/types'
import { Desktops, NotFound } from '../pages'

export interface IRoute {
  title: string
  path: string
  component: ReactElement
}

export const routeList: IRoute[] = [
  {
    title: 'Home',
    path: RouteNames.HOME,
    component: <Desktops />,
  },
  {
    title: 'Desktops',
    path: RouteNames.DESKTOPS + ':id',
    component: <Desktops />,
  },
  {
    title: 'NotFound',
    path: RouteNames.NOT_FOUND,
    component: <NotFound />,
  },
]
