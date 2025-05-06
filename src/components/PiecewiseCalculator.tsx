import { useStore } from "@store/index";
import { createSignal, Show } from "solid-js";
import type { IndexDefinition } from "src/types/types";
import { piecewiseFunction } from "src/utils/piecewiseFunction";
import { piecewiseFunctionWithNumbers } from "src/utils/piecewiseNumberFunction";
import { normalizePollutantLabel } from "src/utils/utils";

interface PiecewiseCalculatorDefinition {
  pollutant: string;
  data: IndexDefinition[];
  acronym: string;
}

const PiecewiseCalculator = (props: PiecewiseCalculatorDefinition) => {
  const [value, setValue] = createSignal(0);
  const [hexCode, setHexCode] = createSignal("");
  const [numberCalculation, setNumberCalculation] = createSignal("");
  const [latexFormula, setLatexFormula] = createSignal("");
  const [timePeriod, setTimePeriod] = createSignal(0);
  const [outOfRange, setOutOfRange] = createSignal(false);
  const [highestValue, setHighestValue] = createSignal(0);
  const [state, { setFinalResult }] = useStore();

  const highestCategoryUpper = Math.max(
    ...props.data.map((d) => d.categoryUpper)
  );
  setHighestValue(highestCategoryUpper);

  const calculateResult = () => {
    const userInput = value();
    const indexValue = props.data.find((o: IndexDefinition) => {
      const concentrationUpper = o.concentrationUpper
        ? Number(o.concentrationUpper)
        : 500;
      return (
        userInput >= o.concentrationLower && userInput <= concentrationUpper
      );
    });

    if (!indexValue) {
      setOutOfRange(true);
      return;
    }

    setOutOfRange(false);

    const {
      categoryUpper: indexHigh,
      categoryLower: indexLow,
      concentrationLower: breakpointLow,
      concentrationUpper: breakpointHigh,
    } = indexValue;

    const result =
      ((indexHigh - indexLow) / (breakpointHigh - breakpointLow)) *
        (userInput - breakpointLow) +
      indexLow;

    const parameters = {
      IHI: indexHigh,
      ILO: indexLow,
      BPHI: breakpointHigh,
      BPLO: breakpointLow,
      CP: userInput,
    };
    setTimePeriod(indexValue.averagingPeriod);
    setNumberCalculation(piecewiseFunctionWithNumbers(parameters));
    setLatexFormula(piecewiseFunction());
    setHexCode(indexValue.hex);

    setFinalResult(
      props.pollutant,
      indexValue.averagingPeriod,
      indexValue.hex,
      result
    );

    return Math.round(result);
  };

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
            onInput={(e) => {
              setValue(Number(e.target.value));
            }}
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
            when={
              !numberCalculation() || value() <= 0 || calculateResult() === 0
            }
            fallback={<div innerHTML={numberCalculation()}></div>}
          >
            <div innerHTML={latexFormula()}></div>
          </Show>
        </div>
        <div class="result-wrapper">
          <Show when={!outOfRange || calculateResult()! > 0}>
            <p class="result-text">{calculateResult()}</p>
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
