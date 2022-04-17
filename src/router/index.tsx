import { Route, Routes } from "react-router-dom";
import { IRoute, routeList } from "./routeList";

export const AppRouter = () => {
  return (
    <Routes>
      {routeList.map((route: IRoute, idx: number) => {
        return <Route key={idx} path={route.path} element={route.component} />;
      })}
    </Routes>
  );
};
