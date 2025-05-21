import { createContext, useContext } from 'solid-js';
import { createStore, produce } from 'solid-js/store';

const CalculatorContext = createContext();

interface CalculatorIndexDefinition {
  parameter: string;
  value: number;
  hex?: string;
}

export function CalculatorProvider(props) {
  const [indices, setIndices] = createStore<CalculatorIndexDefinition[]>([]);
  const calculator = [
    indices,
    {
      addIndex(index: CalculatorIndexDefinition) {
        setIndices([...indices, index]);
      },
      updateIndex(index: CalculatorIndexDefinition) {
        setIndices(
          (idx) => idx.parameter === index.parameter,
          produce((idx) => {
            idx.value = index.value;
            idx.hex = index.hex;
          })
        );
      },
      max(): CalculatorIndexDefinition | null {
        if (!indices || indices.length === 0) {
          return null;
        }
        return indices.reduce((acc, current) => {
          return current.value > acc.value ? current : acc;
        });
      },
    },
  ];

  return (
    <CalculatorContext.Provider value={calculator}>
      {props.children}
    </CalculatorContext.Provider>
  );
}

export function useCalculator() {
  return useContext(CalculatorContext);
}
