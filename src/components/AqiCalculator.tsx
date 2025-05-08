import type { IndexDefinition } from "src/types/types";
import PiecewiseCalculator from "./PiecewiseCalculator";
import { For, createResource } from "solid-js";
import {
  CalculatorProvider,
  useCalculator,
} from "src/stores/AqiCalculatorStore";

interface PollutantData {
  pollutant: string;
  data: IndexDefinition[];
}

const MaxSubIndexCalculator = () => {
  const [_, { max }] = useCalculator();

  return (
    <div class="final-result-wrapper">
      <h4 class="final-result-text">
        Final result (Maximum of sub-index values): {Math.round(max()?.value)}{" "}
      </h4>
      <div class="color-box-wrapper">
        <div class="color-box" style={{ "background-color": max()?.hex }}></div>
      </div>
    </div>
  );
};

interface AqiCalculatorDefinition {
  index: string;
  acronym: string;
}

async function fetchIndex(country: string) {
  const res = await fetch(`../../api/data/${country}.json`);
  const data: IndexDefinition[] = await res.json();
  return data;
}

export const AqiCalculator = (props: AqiCalculatorDefinition) => {
  const [data] = createResource(() => props.index, fetchIndex);

  const pollutants = () => {
    const groupedPollutants = new Map<string, PollutantData>();
    if (data()) {
      data()!.map((o) => {});
      for (const item of data()!) {
        const key = item.pollutant;
        if (!groupedPollutants.has(key)) {
          groupedPollutants.set(key, {
            pollutant: item.pollutant,
            data: [],
          });
        }
        groupedPollutants.get(key)!.data.push(item);
      }
    }

    return Array.from(groupedPollutants.values());
  };

  return (
    <>
      <div class="headers">
        <h3 class="header">Value</h3>
        <h3 class="header">Pollutant</h3>
        <h3 class="header">Averaging Period</h3>
        <h3 class="header">Formula</h3>
        <h3 class="header">{props.acronym}</h3>
      </div>
      <CalculatorProvider calculator={[]}>
        <For each={pollutants()}>
          {(pollutantCategory) => (
            <PiecewiseCalculator
              pollutant={pollutantCategory.pollutant}
              data={pollutantCategory.data}
              acronym={props.acronym}
            />
          )}
        </For>
        <MaxSubIndexCalculator />
      </CalculatorProvider>
    </>
  );
};
