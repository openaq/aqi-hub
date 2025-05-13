import { createEffect, createSignal, For, Show } from "solid-js";
import type { IndexDefinition } from "src/types/types";
import {
  piecewiseFunctionLatex,
  piecewiseFunctionWithNumbers,
} from "../utils/piecewiseFunction";
import { normalizePollutantLabel } from "src/utils/utils.jsx";
import { useCalculator } from "src/stores/AqiCalculatorStore";

interface PiecewiseCalculatorDefinition {
  pollutant: string;
  data: IndexDefinition[];
  acronym: string;
}

const PiecewiseCalculator = (props: PiecewiseCalculatorDefinition) => {
  const [_, { addIndex, updateIndex }] = useCalculator();

  const [outOfRange, setOutOfRange] = createSignal(false);
  const [maxValue, setMaxValue] = createSignal(0);

  const uniquePeriods = [...new Set(props.data.map((d) => d.averagingPeriod))];
  const hasMultiplePeriods = uniquePeriods.length > 1;

  const [selectedPeriod, setSelectedPeriod] = createSignal(uniquePeriods[0]);

  const activePeriod = () =>
    hasMultiplePeriods ? selectedPeriod() : uniquePeriods[0];

  const filteredData = () =>
    props.data.filter((d) => d.averagingPeriod === activePeriod());

  const minValue = () => {
    const values = filteredData()
      .filter((d) => {
        const lower = d.concentrationLower;
        const upper = d.concentrationUpper;
        return (
          lower !== undefined &&
          upper !== undefined &&
          !(lower === 0 && upper === 0)
        );
      })
      .map((d) => d.concentrationLower);

    return values.length > 0 ? Math.min(...values) : 0;
  };

  const [concentration, setConcentration] = createSignal(minValue());

  addIndex({ parameter: props.pollutant, index: 0 });

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
    const highestConcentrationUpper = Math.max(
      ...filteredData().map((d) => d.concentrationUpper)
    );
    setMaxValue(highestConcentrationUpper);

    updateIndex({
      parameter: props.pollutant,
      value: result(),
      hex: hexCode(),
    });
  });

  const stepValue = () => {
    const values = filteredData()
      .map((d) => d.concentrationUpper - d.concentrationLower)
      .filter((diff) => diff > 0);

    const diffs = values.slice(1).map((current, i) => current - values[i]);
    const minDiff = Math.min(...diffs);

    if (minDiff < 0.01) return 0.001;
    if (minDiff < 0.1) return 0.01;
    if (minDiff < 1) return 0.1;
    return 1;
  };

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
            class="number-input input"
            type="number"
            step={stepValue()}
            min={minValue()}
            max={maxValue()}
            value={concentration()}
            onInput={(e) => setConcentration(Number(e.target.value))}
          />
          <span class="input-label">
            {normalizePollutantLabel(indexValue()?.units)}
          </span>
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
        <Show when={concentration() === maxValue()}>
          <p class="out-of-range-text">You've reached the maximum breakpoint</p>
        </Show>
        <Show when={outOfRange()}>
          <p class="out-of-range-text">
            Concentration exceeds maximum breakpoint definition
          </p>
        </Show>
      </section>
    </>
  );
};

export default PiecewiseCalculator;
