import { createSignal, Show } from "solid-js";
import type { IndexDefinition } from "src/types/types";
import { piecewiseFunction } from "src/utils/piecewiseFunction";
import { piecewiseFunctionWithNumbers } from "src/utils/piecewiseNumberFunction";

interface PiecewiseCalculatorDefinition {
  pollutant: string;
  data: IndexDefinition[];
  acronym: string;
}

const PiecewiseCalculator = (props: PiecewiseCalculatorDefinition) => {
  const [value, setValue] = createSignal(0);
  const [result, setResult] = createSignal(0);

  const [hexCode, setHexCode] = createSignal("");
  const [numberCalculation, setNumberCalculation] = createSignal("");
  const [latexFormula, setLatexFormula] = createSignal("");
  const [timePeriod, setTimePeriod] = createSignal(0);
  const [outOfRange, setOutOfRange] = createSignal(false);

  const calculate = (value: number) => {
    const indexValue = props.data.find((o: IndexDefinition) => {
      const concentrationUpper = o.concentrationUpper
        ? Number(o.concentrationUpper)
        : 500;
      return value >= o.concentrationLower && value <= concentrationUpper;
    });

    if (!indexValue) {
      setOutOfRange(true);
      setResult(0);
      return;
    }

    setOutOfRange(false);

    const {
      categoryUpper: indexHigh,
      categoryLower: indexLow,
      concentrationLower: breakpointLow,
      concentrationUpper: breakpointHigh,
    } = indexValue;

    setTimePeriod(indexValue.averagingPeriod);

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

    setNumberCalculation(
      piecewiseFunctionWithNumbers(props.acronym, parameters)
    );
    setLatexFormula(piecewiseFunction(props.acronym));
    setHexCode(indexValue.hex);
    setResult(Math.round(result));
  };

  const handleInput = (e: Event) => {
    const newValue = Number((e.currentTarget as HTMLInputElement).value);
    setValue(newValue);
    calculate(newValue);
  };

  calculate(value());

  return (
    <>
      <section class="calculation-wrapper">
        <div class="input-wrapper">
          <label>
            {props.pollutant}, {timePeriod()} hrs
          </label>
          <input type="number" min="0" value={value()} onInput={handleInput} />
        </div>
        <div class="formula-wrapper">
          <div class="formula-container">
            <Show
              when={!numberCalculation() || value() <= 0 || result() === 0}
              fallback={<div innerHTML={numberCalculation()}></div>}
            >
              <div innerHTML={latexFormula()}></div>
            </Show>
          </div>
          <div class="result-wrapper">
            <p class="result-text">= {result()}</p>
            <Show when={!outOfRange || result() > 0}>
              <div class="color-box-wrapper">
                <div
                  class="color-box"
                  style={{ "background-color": hexCode() }}
                ></div>
              </div>
            </Show>

            <Show when={outOfRange()}>
              <p class="out-of-range-text">Value too high</p>
            </Show>
          </div>
        </div>
      </section>
    </>
  );
};

export default PiecewiseCalculator;
