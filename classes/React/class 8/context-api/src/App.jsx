import "./App.css";
import A from "./Components/A";
import B from "./Components/B";
import C from "./Components/C";
import D from "./Components/D";
import ProviderComponent from "./ProviderComponent";

function App() {
  return (
    <>
      <ProviderComponent>
        <A />
        <B />
        <C />
        <D />
      </ProviderComponent>
    </>
  );
}

export default App;
