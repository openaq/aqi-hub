import type { IndexDefinition } from "src/types/types";
import PiecewiseCalculator from "./PiecewiseCalculator";
import { createSignal, For } from "solid-js";

interface PiecewiseResultDefinition {
  index: string;
}

interface PollutantData {
  pollutant: string;
  data: IndexDefinition[];
}

const filterPollutantData = async (index: string) => {
  const baseURL = "http://localhost:4321";
  const res = await fetch(new URL(`api/data/${index}.json`, baseURL));
  const parsedData: IndexDefinition[] = await res.json();
  return parsedData;
};

const PiecewiseResult = (props: PiecewiseResultDefinition) => {
  const [pollutants, setPollutants] = createSignal<PollutantData[]>([]);

  filterPollutantData(props.index).then((data) => {
    const uniquePollutants = [...new Set(data.map((o) => o.pollutant))];

    const groupedPollutants = uniquePollutants.map((pollutant) => ({
      pollutant,
      data: data.filter((o) => o.pollutant === pollutant),
    }));

    setPollutants(groupedPollutants);
  });

  return (
    <>
      <For each={pollutants()}>
        {(pollutantCategory) => (
          <PiecewiseCalculator
            pollutant={pollutantCategory.pollutant}
            data={pollutantCategory.data}
          />
        )}
      </For>
    </>
  );
};

export default PiecewiseResult;
