import { createContext, useContext, type Component } from "solid-js";
import { createStore } from "solid-js/store";

interface StoreParameters {
  pollutant: Map<string, number>;
  averagingPeriod: number;
  hexCode: string;
  result: number;
}

type Store = [
  StoreParameters,
  {
    setFinalResult: (
      pollutant: string,
      averagingPeriod: number,
      hexCode: string,
      result: number
    ) => void;
  }
];

const StoreContext = createContext<Store>();

export const StoreProvider: Component<{ children: any }> = (props) => {
  const [state, setState] = createStore<StoreParameters>({
    pollutant: new Map<string, number>(),
    averagingPeriod: 0,
    hexCode: "",
    result: 0,
  });

  const store: Store = [
    state,
    {
      setFinalResult(
        pollutant: string,
        averagingPeriod: number,
        hexCode: string,
        result: number
      ) {
        const updatedPollutant = new Map(state.pollutant);
        updatedPollutant.set(pollutant, result);
        setState({
          pollutant: updatedPollutant,
          averagingPeriod,
          hexCode,
          result,
        });
      },
    },
  ];

  return (
    <StoreContext.Provider value={store}>
      {props.children}
    </StoreContext.Provider>
  );
};

function useStoreContext() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("UseStoreContext: cannot find a StoreContext");
  }
  return context;
}

export function useStore(): Store {
  return useStoreContext();
}
