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
    <>
      <div class="final-result-wrapper">
        <h4 class="final-result-text">
          Final result (Maximum of sub-index values): <output>{Math.round(max()?.value)}</output> {" "}
        </h4>

        <div class="color-box-wrapper">
          <div
            class="color-box"
            style={{ "background-color": max()?.hex }}
          ></div>
        </div>
      </div>
      <div class="information-wrapper">
        <p>
          Breakpoint information: When the source material does not define a
          maximum breakpoint, we have created one by doubling the lower
          breakpoint for the same category. This approximation is based on the
          pattern observed in other categories where both lower and upper
          breakpoints are provided.
        </p>
      </div>
    </>
  );
};

interface AqiCalculatorDefinition {
  index: string;
  acronym: string;
  variant?: string;
}

async function fetchIndex(country: string) {
  const res = await fetch(`../../api/data/${country}.json`);
  const data: IndexDefinition[] = await res.json();
  return data;
}

export const AqiCalculator = (props: AqiCalculatorDefinition) => {
  let [data] = createResource(() => props.index, fetchIndex);


  const pollutants = () => {
    const groupedPollutants = new Map<string, PollutantData>();
    if (data()) {
      for (const item of data()!) {
        if (props.variant) {
          if (item.variant !== props.variant) {
            continue
          }
        }  
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
     <div class="aqi-calculator">
      <h3>Change the different pollutant concentration values to see how piecewise linear function works for the {props.acronym} definition</h3>
      <div class="headers">
        <h3 class="header">Concentration</h3>
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
      </div>
    </>
  );
};
