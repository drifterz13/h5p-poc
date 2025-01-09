import H5pPlayer from "./components/H5pPlayer";
import "./index.css";

export default function App() {
  return (
    <div className="App">
      {/* <H5pPlayer h5pJsonPath="/assets/h5p/ex-1" /> */}

      <h1>Video example: 1</h1>
      <H5pPlayer
        h5pJsonPath="http://localhost:3000/videos/ex-1"
        contentJsonPath="http://localhost:3000/videos/ex-1/content"
      />

      {/* <h1>Video example: 2</h1>
      <H5pPlayer
        h5pJsonPath="http://localhost:3000/videos/ex-2"
        contentJsonPath="http://localhost:3000/videos/ex-2/content"
      /> */}
    </div>
  );
}
