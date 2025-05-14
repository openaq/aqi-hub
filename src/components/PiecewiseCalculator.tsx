import { createEffect, createSignal, For, Show } from "solid-js";
import type { IndexDefinition } from "src/types/types";
import {
  piecewiseFunctionLatex,
  piecewiseFunctionWithNumbers,
} from "../utils/piecewiseFunction";
import {
  normalizePollutantLabelJSX,
  normalizeUnitsLabel,
} from "src/utils/utils.jsx";
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

  const getUpperConcentration = (
    o: IndexDefinition,
    indices: IndexDefinition[]
  ) => {
    const sorted = [...indices].sort(
      (a, b) => a.concentrationLower - b.concentrationLower
    );

    const isLast = sorted[sorted.length - 1] === o;

    if (isLast) {
      return o.concentrationLower * 2;
    }

    if (o.concentrationUpper != null) {
      return o.concentrationUpper;
    }

    const index = sorted.findIndex((entry) => entry === o);
    const next = sorted[index + 1];
    return next?.concentrationLower ?? o.concentrationLower * 2;
  };

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
      const concentrationUpper = getUpperConcentration(o, filteredData());

      return (
        concentration() >= o.concentrationLower &&
        concentration() <= concentrationUpper
      );
    });

  const hexCode = () => {
    return indexValue()?.hex;
  };

  createEffect(() => {
    const data = filteredData();
    const highestConcentrationUpper = Math.max(
      ...data.map((d) => getUpperConcentration(d, data))
    );
    setMaxValue(highestConcentrationUpper);

    updateIndex({
      parameter: props.pollutant,
      value: result(),
      hex: hexCode(),
    });
  });

  const stepValue = () => {
    const values = filteredData().map((d) =>
      d.concentrationLower % 1 != 0
        ? d.concentrationLower.toString().split(".")[1].length
        : 0
    );
    const max = Math.max(...values);
    return max === 0 ? 1 : 10 ** (-1 * max);
  };

  const latexFunction = () => {
    const indexValues = indexValue();
    if (concentration() === 0 || !indexValues) {
      return piecewiseFunctionLatex();
    }

    const sorted = [...filteredData()].sort(
      (a, b) => a.concentrationLower - b.concentrationLower
    );
    const isLast = sorted[sorted.length - 1] === indexValues;

    const categoryUpper =
      isLast && (!indexValues.categoryUpper || indexValues.categoryUpper === 0)
        ? 500
        : indexValues.categoryUpper ?? 500;

    const concentrationUpper = getUpperConcentration(
      indexValues,
      filteredData()
    );

    const { categoryLower, concentrationLower } = indexValues;
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
    if (!indexValues) {
      setOutOfRange(true);
      return 0;
    }

    const concentrationLower = indexValues.concentrationLower;
    const concentrationUpper = getUpperConcentration(
      indexValues,
      filteredData()
    );

    const sorted = [...filteredData()].sort(
      (a, b) => a.concentrationLower - b.concentrationLower
    );
    const isLast = sorted[sorted.length - 1] === indexValues;

    const categoryUpper =
      isLast && (!indexValues.categoryUpper || indexValues.categoryUpper === 0)
        ? 500
        : indexValues.categoryUpper ?? 500;

    const categoryLower = indexValues.categoryLower;

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
            {normalizeUnitsLabel(indexValue()?.units)}
          </span>
        </div>
        <div class="pollutant-wrapper">
          <p>{normalizePollutantLabelJSX(props.pollutant)}</p>
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
