import { createSignal, type Component } from 'solid-js';

const App: Component = () => {
    const [count, setCount] = createSignal(0);
    const increment = () => setCount(count() + 1);
      return (
        <div>
            <button onClick={increment}>Increment</button>
            <p>{count()}</p>
        </div>
      );
};

export default App;
