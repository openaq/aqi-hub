import type { IndexDefinition } from "src/types/types";
import PiecewiseCalculator from "./PiecewiseCalculator";
import { createSignal } from "solid-js";

interface PiecewiseResultDefinition {
  pollutant: string;
  index: string;
}

const filterPollutantData = async (index: string) => {
  const baseURL = "http://localhost:4321";
  const res = await fetch(new URL(`api/data/${index}.json`, baseURL));
  const parsedData: IndexDefinition[] = await res.json();
  return parsedData;
};

const PiecewiseResult = (props: PiecewiseResultDefinition) => {
  const [filteredData, setFilteredData] = createSignal<IndexDefinition[]>([]);

  filterPollutantData(props.index).then((data) => {
    const filtered = data.filter((o) => o.pollutant === props.pollutant);
    setFilteredData(filtered);
  });

  return (
    <>
      <PiecewiseCalculator pollutant={props.pollutant} data={filteredData()} />
    </>
  );
};

export default PiecewiseResult;
