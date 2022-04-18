import { AppRouter } from "./router";
import classes from "./App.module.sass";
import { Navigation } from "./components";

function App() {
  return (
    <div className={classes.App}>
      <Navigation />
      <AppRouter />
    </div>
  );
}

export default App;
