import { create } from 'zustand';
import './styles/App.css';
import '@arcgis/core/assets/esri/themes/dark/main.css';

interface Store {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
}

const useStore = create<Store>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),
}));

function App() {
  const count = useStore((state) => state.count);
  const increment = useStore((state) => state.increment);
  const decrement = useStore((state) => state.decrement);
  const reset = useStore((state) => state.reset);

  return (
    // <AuthGuard> // commend this out if you want to run the application in http://localhost mode without the ArcGIS features
    <calcite-shell className="calcite-mode-auto">
      <calcite-button>Add layer</calcite-button>

      <p>Count: {count}</p>
      <div>
        <calcite-button onClick={increment}>Increment</calcite-button>
        <calcite-button onClick={decrement}>Decrement</calcite-button>
        <calcite-button onClick={reset}>Reset</calcite-button>
      </div>
    </calcite-shell>
    // </AuthGuard>
  );
}

export default App;
