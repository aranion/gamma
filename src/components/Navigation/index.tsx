import { Link, useLocation } from "react-router-dom";
import { RouteNames } from "../../constants/types";
import "./navigation.sass";

export function getDesktopId(value: string): number {
  return +value.split("/")[value.split("/").length - 1];
}

export function Navigation() {
  const { pathname } = useLocation();

  const btnList: { name: string }[] = [
    { name: "Рабочий стол 1" },
    { name: "Рабочий стол 2" },
  ];

  return (
    <nav className="nav">
      {btnList.map((el, i) => {
        return (
          <Link
            to={RouteNames.DESKTOPS + ++i}
            key={i}
            className={`nav__button ${
              i === getDesktopId(pathname) && "nav__button_active"
            }`}
          >
            {el.name}
          </Link>
        );
      })}
    </nav>
  );
}
