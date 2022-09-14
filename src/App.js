import "./App.css";
import CountriesCapitals from "./components/CountriesCapitals";

function App() {
  return (
    <div className="App">
      <CountriesCapitals
        data={{
          Germany: "Berlin",
          India: "New Delhi",
          Turkey: "Ankara",
          France: "Paris",
          Netherlands: "Amsterdam",
        }}
      />
    </div>
  );
}

export default App;
