import { AppRouter } from "./router";
import "./App.sass";
import { Navigation } from "./components";

function App() {
  return (
    <div className="App">
      <Navigation />
      <AppRouter />
    </div>
  );
}

export default App;
