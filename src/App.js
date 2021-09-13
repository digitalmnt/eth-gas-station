import { useEffect, useState } from "react";
import { fetchGas } from "./services/gas-service";
import { Speed } from "./components/Speed.jsx";

import "./App.css";

const speeds = ["fastest", "fast", "average", "safeLow"];

function calcTotalGas(gas) {
  let total = 0;
  speeds.forEach((speed) => (total += gas[speed]));
  return total;
}

function App() {
  const [error, setError] = useState(false);
  const [gas, setGas] = useState(undefined);
  const [totalGas, setTotalGas] = useState(0);

  useEffect(() => {
    async function fetchGasData() {
      try {
        const currentGas = await fetchGas();
        const total = calcTotalGas(currentGas);
        setTotalGas(total);
        setGas(currentGas);
      } catch (e) {
        setError(true);
      }
    }
    fetchGasData();
  }, []);

  return (
    <div className="App">
      <div className="App-Row">
        {gas && !error ? (
          speeds.map((speed) => (
            <Speed key={speed} gas={gas} speed={speed} total={totalGas} />
          ))
        ) : (
          <div style={{ color: "white" }}>
            There was a problem fetching data please refresh.
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
