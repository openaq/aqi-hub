import { createSignal, Show } from "solid-js";
import type { IndexDefinition } from "src/types/types";
import { piecewiseFunction } from "src/utils/piecewiseFunction";
import { piecewiseFunctionWithNumbers } from "src/utils/piecewiseNumberFunction";

interface PiecewiseCalculatorDefinition {
  pollutant: string;
  data: IndexDefinition[];
}

const latexForumula = piecewiseFunction("AQI");

const PiecewiseCalculator = (props: PiecewiseCalculatorDefinition) => {
  const [value, setValue] = createSignal(0);
  const [result, setResult] = createSignal(0);

  const [hexCode, setHexCode] = createSignal("");
  const [numberCalculation, setNumberCalculation] = createSignal("");

  const calculate = (value: number) => {
    const indexValue = props.data.find((o: IndexDefinition) => {
      const concentrationUpper = o.concentrationUpper ?? 500;
      return value >= o.concentrationLower && value <= concentrationUpper;
    });
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

    const parameters = {
      IHI: indexHigh,
      ILO: indexLow,
      BPHI: breakpointHigh,
      BPLO: breakpointLow,
      CP: value,
    };

    setNumberCalculation(piecewiseFunctionWithNumbers("AQI", parameters));

    setHexCode(indexValue.hex);
    setResult(Math.round(result));
  };

  const handleInput = (e: Event) => {
    const newValue = Number((e.currentTarget as HTMLInputElement).value);
    setValue(newValue);
    calculate(newValue);
  };

  return (
    <>
      <div class="calculation-wrapper">
        <label>{props.pollutant}</label>
        <input type="number" value={value()} onInput={handleInput} />
        <Show
          when={!numberCalculation() || value() <= 0}
          fallback={<div innerHTML={numberCalculation()}></div>}
        >
          <div innerHTML={latexForumula}></div>
        </Show>
        <p>= {result()}</p>
        <div class="result-wrapper">
          <div
            class="color-box"
            style={{ "background-color": hexCode() }}
          ></div>
        </div>
      </div>
    </>
  );
};

export default PiecewiseCalculator;
