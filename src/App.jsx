import { useEffect, useState } from 'react';
import { getTvSeries } from './lib/helpers';

function App() {
  const [count, setCount] = useState(0);

  useEffect(function () {
    async function movies() {
      const data = await getTvSeries();
      console.log(data);
    }
    movies();
  }, []);

  return (
    <>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
