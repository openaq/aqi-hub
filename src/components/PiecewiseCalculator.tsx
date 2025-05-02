import { createSignal, Show } from "solid-js";
import type { IndexDefinition } from "src/types/types";
import { piecewiseFunction } from "src/utils/piecewiseFunction";
import { piecewiseFunctionWithNumbers } from "src/utils/piecewiseNumberFunction";
import { normalizePollutantLabel } from "src/utils/utils";

interface PiecewiseCalculatorDefinition {
  pollutant: string;
  data: IndexDefinition[];
  acronym: string;
  calculatedResult: (result: number) => void;
}

const PiecewiseCalculator = (props: PiecewiseCalculatorDefinition) => {
  const [value, setValue] = createSignal(0);
  const [result, setResult] = createSignal(0);

  const [hexCode, setHexCode] = createSignal("");
  const [numberCalculation, setNumberCalculation] = createSignal("");
  const [latexFormula, setLatexFormula] = createSignal("");
  const [timePeriod, setTimePeriod] = createSignal(0);
  const [outOfRange, setOutOfRange] = createSignal(false);
  const [highestValue, setHighestValue] = createSignal(0);

  const highestCategoryUpper = Math.max(
    ...props.data.map((d) => d.categoryUpper)
  );
  setHighestValue(highestCategoryUpper);

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

    setNumberCalculation(piecewiseFunctionWithNumbers(parameters));
    setLatexFormula(piecewiseFunction());
    setHexCode(indexValue.hex);
    setResult(Math.round(result));
    props.calculatedResult(result);
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
          <input
            class="number-input"
            type="number"
            min="0"
            max={highestValue()}
            value={value()}
            onInput={handleInput}
          />
        </div>
        <div class="pollutant-wrapper">
          <p> {normalizePollutantLabel(props.pollutant)}</p>
        </div>
        <div class="time-period-wrapper">
          <p>{timePeriod()} hr.</p>
        </div>
        <div class="formula-wrapper">
          <Show
            when={!numberCalculation() || value() <= 0 || result() === 0}
            fallback={<div innerHTML={numberCalculation()}></div>}
          >
            <div innerHTML={latexFormula()}></div>
          </Show>
        </div>
        <div class="result-wrapper">
          <Show when={!outOfRange || result() > 0}>
            <p class="result-text">
              {props.acronym} {result()}
            </p>
            <div class="color-box-wrapper">
              <div
                class="color-box"
                style={{ "background-color": hexCode() }}
              ></div>
            </div>
          </Show>
        </div>
        <Show when={value() === highestValue()}>
          <p class="out-of-range-text">You've reached the maximum breakpoint</p>
        </Show>
        <Show when={outOfRange()}>
          <p class="out-of-range-text">
            Value exceeds maximum breakpoint definition
          </p>
        </Show>
      </section>
    </>
  );
};

export default PiecewiseCalculator;
