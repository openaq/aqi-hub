import type { IndexDefinition } from "src/types/types";
import PiecewiseCalculator from "./PiecewiseCalculator";

interface PiecewiseResultDefinition {
  pollutant: string;
}

const baseURL = "http://localhost:4321";
const res = await fetch(new URL(`api/data/us.json`, baseURL));
const parsedData = await res.json();

const PiecewiseResult = (props: PiecewiseResultDefinition) => {
  let filteredData = parsedData.filter(
    (o: IndexDefinition) => o.pollutant == props.pollutant
  );

  return (
    <>
      <PiecewiseCalculator pollutant="PM2.5" data={filteredData} />
    </>
  );
};

export default PiecewiseResult;
