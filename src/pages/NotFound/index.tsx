import classes from "./notFound.module.sass";

export function NotFound() {
  return (
    <div>
      <h1 className={classes["notFound__head"]}>Страница не найдена 404</h1>
    </div>
  );
}
