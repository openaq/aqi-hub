import { createSignal, Show } from "solid-js";
import type { IndexDefinition } from "src/types/types";
import { piecewiseFunction } from "src/utils/piecewiseFunction";

interface PiecewiseCalculatorDefinition {
  pollutant: string;
  data: IndexDefinition[];
}

const latexForumula = piecewiseFunction("AQI");

const PiecewiseCalculator = (props: PiecewiseCalculatorDefinition) => {
  const [valuePm25, setValuePm25] = createSignal(0);
  const [valuePm10, setValuePm10] = createSignal(0);
  const [pm25Result, setPm25Result] = createSignal(0);
  const [pm10Result, setPm10Result] = createSignal(0);
  const [hexCode, setHexCode] = createSignal("");

  const calculate = (pollutant: "PM2.5" | "PM10", value: number) => {
    const indexValue = props.data.find(
      (o: IndexDefinition) =>
        value >= o.concentrationLower && value <= o.concentrationUpper
    );
    if (!indexValue) {
      return;
    }

    const {
      categoryUpper: indexHigh,
      categoryLower: indexLow,
      concentrationLower: breakpointLow,
      concentrationUpper: breakpointHigh,
    } = indexValue;

    const result =
      ((indexHigh - indexLow) / (breakpointHigh - breakpointLow)) *
        (value - breakpointLow) +
      indexLow;

    setHexCode(indexValue.hex);

    if (pollutant === "PM2.5") {
      setPm25Result(Math.round(result));
    } else if (pollutant === "PM10") {
      setPm10Result(Math.round(result));
    }
  };

  const handlePm25Input = (e: Event) => {
    const newValue = Number((e.currentTarget as HTMLInputElement).value);
    setValuePm25(newValue);
    calculate("PM2.5", newValue);
  };

  const handlePm10Input = (e: Event) => {
    const newValue = Number((e.currentTarget as HTMLInputElement).value);
    setValuePm10(newValue);
    calculate("PM10", newValue);
  };

  return (
    <>
      <Show when={props.pollutant === "PM2.5"}>
        <input type="number" value={valuePm25()} onInput={handlePm25Input} />
        <p>Result: {pm25Result()}</p>
      </Show>
      <Show when={props.pollutant === "PM10"}>
        <input type="number" value={valuePm10()} onInput={handlePm10Input} />
        <p>Result: {pm10Result()}</p>
      </Show>
      <div class="result-wrapper">
        <div class="color-box" style={{ "background-color": hexCode() }}></div>
      </div>
      <div innerHTML={latexForumula}></div>
    </>
  );
};

export default PiecewiseCalculator;
