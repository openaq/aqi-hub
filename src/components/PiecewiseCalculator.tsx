import { createEffect, createSignal } from "solid-js";
import type { IndexDefinition } from "src/types/types";
import { piecewiseFunction } from "src/utils/piecewiseFunction";

interface PiecewiseCalculatorDefinition {
  pollutant: string;
  data: IndexDefinition;
}

const baseURL = "http://localhost:4321";
const res = await fetch(new URL(`api/data/us.json`, baseURL));
const parsed = await res.json();

const latexForumula = piecewiseFunction("AQI");

const [value, setValue] = createSignal(42);
const [indexLow, setIndexLow] = createSignal(0);
const [indexHigh, setIndexHigh] = createSignal(0);
const [breakpointLow, setBreakpointLow] = createSignal(0);
const [breakpointHigh, setBreakpointHigh] = createSignal(0);
const [result, setResult] = createSignal(0);
const [hexCode, setHexCode] = createSignal("");
const [pollutant, setPollutant] = createSignal("");

const filterData = (value: number, pollutant: string) => {
  let filteredData = parsed.filter(
    (o: IndexDefinition) => o.pollutant == pollutant
  );

  const indexValue = filteredData.find(
    (o: IndexDefinition) =>
      value >= o.concentrationLower && value <= o.concentrationUpper
  );

  setIndexLow(indexValue.categoryLower);
  setIndexHigh(indexValue.categoryUpper);
  setBreakpointLow(indexValue.concentrationLower);
  setBreakpointHigh(indexValue.concentrationUpper);
  setHexCode(indexValue.hex);

  const calculation =
    ((indexHigh() - indexLow()) / (breakpointHigh() - breakpointLow())) *
      (value - breakpointLow()) +
    indexLow();

  //   console.log("RESULTATET", calculation);
  //   console.log("HEJ BREAKPOINTLOW", breakpointLow());

  //   console.log("HEJ INDEXLOW", indexLow());
  //   console.log("HEJ INDEXHIGH", indexHigh());
  //   console.log("HEJ BREAKPOINTHIGH", breakpointHigh());

  return {
    calculation,
  };
};

createEffect(() => {
  if (!pollutant()) return;
  console.log("VALUE CHANGED", value());
  const myResult = filterData(value(), pollutant());
  setResult(Number(myResult.calculation));
});

const PiecewiseCalculator = (props: PiecewiseCalculatorDefinition) => {
  setPollutant(props.pollutant);
  return (
    <>
      <input
        type="number"
        value={value()}
        onInput={(e) => {
          const newValue = Number(e.currentTarget.value);
          console.log("Input changed to:", newValue);
          setValue(newValue);
        }}
      />
      <div class="result-wrapper">
        <p>Result: {result()}</p>
        <div class="color-box" style={{ "background-color": hexCode() }}></div>
      </div>
      <div innerHTML={latexForumula}></div>
    </>
  );
};

export default PiecewiseCalculator;
