import H5pPlayer from "./components/H5pPlayer";
import "./index.css";

export default function App() {
  return (
    <div className="App">
      <h1>H5P Standalone in React</h1>
      <h2>For or Since</h2>
      <H5pPlayer h5pJsonPath="/assets/h5p/ex-1" />
    </div>
  );
}
