import { createEffect, createSignal, For, Show } from "solid-js";
import type { IndexDefinition } from "src/types/types";
import {
  piecewiseFunctionLatex,
  piecewiseFunctionWithNumbers,
} from "../utils/piecewiseFunction";
import { normalizePollutantLabel } from "src/utils/utils";
import { useCalculator } from "src/stores/AqiCalculatorStore";

interface PiecewiseCalculatorDefinition {
  pollutant: string;
  data: IndexDefinition[];
  acronym: string;
}

const PiecewiseCalculator = (props: PiecewiseCalculatorDefinition) => {
  const [_, { addIndex, updateIndex }] = useCalculator();

  const [concentration, setConcentration] = createSignal(0);
  const [outOfRange, setOutOfRange] = createSignal(false);
  const [highestValue, setHighestValue] = createSignal(0);

  const uniquePeriods = [...new Set(props.data.map((d) => d.averagingPeriod))];
  const hasMultiplePeriods = uniquePeriods.length > 1;

  const [selectedPeriod, setSelectedPeriod] = createSignal(uniquePeriods[0]);

  const activePeriod = () =>
    hasMultiplePeriods ? selectedPeriod() : uniquePeriods[0];

  const filteredData = () =>
    props.data.filter((d) => d.averagingPeriod === activePeriod());

  addIndex({ parameter: props.pollutant, index: 0 });

  const highestCategoryUpper = Math.max(
    ...props.data.map((d) => d.categoryUpper)
  );
  setHighestValue(highestCategoryUpper);

  const indexValue = () =>
    filteredData().find((o: IndexDefinition) => {
      const concentrationUpper = o.concentrationUpper
        ? Number(o.concentrationUpper)
        : 500;
      return (
        concentration() >= o.concentrationLower &&
        concentration() <= concentrationUpper
      );
    });

  const hexCode = () => {
    return indexValue()?.hex;
  };

  createEffect(() => {
    updateIndex({
      parameter: props.pollutant,
      value: result(),
      hex: hexCode(),
    });
  });

  const latexFunction = () => {
    const indexValues = indexValue();
    if (concentration() === 0 || !indexValues) {
      return piecewiseFunctionLatex();
    }
    const {
      categoryUpper,
      categoryLower,
      concentrationUpper,
      concentrationLower,
    } = indexValues;
    return piecewiseFunctionWithNumbers(
      categoryUpper,
      categoryLower,
      concentrationUpper,
      concentrationLower,
      concentration()
    );
  };

  const result = () => {
    const indexValues = indexValue();
    if (indexValues === undefined) {
      setOutOfRange(true);
      return 0;
    }
    const {
      categoryUpper,
      categoryLower,
      concentrationUpper,
      concentrationLower,
    } = indexValues;
    return (
      ((categoryUpper - categoryLower) /
        (concentrationUpper - concentrationLower)) *
        (concentration() - concentrationLower) +
      categoryLower
    );
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
            value={concentration()}
            onInput={(e) => setConcentration(Number(e.target.value))}
          />
        </div>
        <div class="pollutant-wrapper">
          <p> {normalizePollutantLabel(props.pollutant)}</p>
        </div>
        <div class="time-period-wrapper">
          <Show when={hasMultiplePeriods}>
            <select
              class="period-select"
              onInput={(e) => setSelectedPeriod(Number(e.currentTarget.value))}
            >
              <For each={uniquePeriods}>
                {(period) => <option value={period}>{period} hr</option>}
              </For>
            </select>
          </Show>
          <Show when={!hasMultiplePeriods}>
            <p>{uniquePeriods[0]} hr.</p>
          </Show>
        </div>

        <div class="formula-wrapper">
          <div innerHTML={latexFunction()}></div>
        </div>
        <div class="result-wrapper">
          <Show when={!outOfRange() || result() > 0}>
            <p class="result-text">{Math.round(result())}</p>
            <div class="color-box-wrapper">
              <div
                class="color-box"
                style={{ "background-color": hexCode() }}
              ></div>
            </div>
          </Show>
        </div>
        <Show when={concentration() === highestValue()}>
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
