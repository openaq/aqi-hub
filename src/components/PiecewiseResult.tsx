import type { IndexDefinition } from "src/types/types";
import PiecewiseCalculator from "./PiecewiseCalculator";
import { createSignal, For, Show } from "solid-js";
import { StoreProvider, useStore } from "@store/index";

interface PiecewiseResultDefinition {
  index: string;
  acronym: string;
}

interface PollutantData {
  pollutant: string;
  averagingPeriod: number;
  data: IndexDefinition[];
}

const PiecewiseResult = (props: PiecewiseResultDefinition) => {
  const [state] = useStore();
  const [pollutants, setPollutants] = createSignal<PollutantData[]>([]);

  const filterPollutantData = async (index: string) => {
    const baseURL = "http://localhost:4321";
    const res = await fetch(new URL(`api/data/${index}.json`, baseURL));
    const parsedData: IndexDefinition[] = await res.json();
    return parsedData;
  };

  filterPollutantData(props.index).then((data) => {
    const groupedPollutants = new Map<string, PollutantData>();

    for (const item of data) {
      const key = `${item.pollutant}-${item.averagingPeriod}`;
      if (!groupedPollutants.has(key)) {
        groupedPollutants.set(key, {
          pollutant: item.pollutant,
          averagingPeriod: item.averagingPeriod,
          data: [],
        });
      }
      groupedPollutants.get(key)!.data.push(item);
    }

    setPollutants(Array.from(groupedPollutants.values()));
  });

  return (
    <StoreProvider>
      <div class="headers">
        <h3 class="header">Value</h3>
        <h3 class="header">Pollutant</h3>
        <h3 class="header">Averaging Period</h3>
        <h3 class="header">Formula</h3>
        <h3 class="header">{props.acronym}</h3>
      </div>
      <For each={pollutants()}>
        {(pollutantCategory) => (
          <PiecewiseCalculator
            pollutant={pollutantCategory.pollutant}
            data={pollutantCategory.data}
            acronym={props.acronym}
          />
        )}
      </For>
      <div class="final-result-wrapper">
        <h4 class="final-result-text">
          Final result (Maximum of sub-index values): {Math.round(state.result)}
        </h4>
        <Show when={state.result}>
          <div class="color-box-wrapper">
            <div
              class="color-box"
              style={{ "background-color": state.hexCode }}
            ></div>
          </div>
        </Show>
      </div>
    </StoreProvider>
  );
};

export default PiecewiseResult;
