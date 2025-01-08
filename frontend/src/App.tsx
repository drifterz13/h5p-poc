import H5pPlayer from "./components/H5pPlayer";
import "./index.css";

export default function App() {
  return (
    <div className="App">
      <div>
        <h1>
          Example 1 - External from
          <a href="https://h5p.org/sites/default/files/h5p/iv.webm">source</a>
        </h1>
        <H5pPlayer h5pJsonPath="/assets/h5p/ex-1" />
      </div>
    </div>
  );
}
