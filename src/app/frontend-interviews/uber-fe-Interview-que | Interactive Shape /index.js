import Shapes from "./Shapes";

// Use this data to create the shape
const data = [
  [1, 1, 1],
  [1, 0, 0],
  [1, 1, 1],
];

const App = () => {
  return (
    <div className="App">
      <h1>Interactive Shape</h1>
      <Shapes boxes={data} />
    </div>
  );
};
export default App;
