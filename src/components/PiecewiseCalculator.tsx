import { createEffect, createSignal, Show } from "solid-js";
import type { IndexDefinition } from "src/types/types";
import {
  normalizePollutantLabelJSX,
  normalizeUnitsLabel,
} from "src/utils/utils.jsx";
import { useCalculator } from "src/stores/AqiCalculatorStore";
import {
  generateLatexFunction,
  getResult,
  getUpperConcentration,
  indexValue,
  minValue,
  stepValue,
} from "src/utils/piecewiseCalculatorHelpers";
import TimePeriodSelector from "./TimePeriodSelector";

interface PiecewiseCalculatorDefinition {
  pollutant: string;
  data: IndexDefinition[];
  acronym: string;
}

const PiecewiseCalculator = (props: PiecewiseCalculatorDefinition) => {
  const [_, { addIndex, updateIndex }] = useCalculator();
  const [maxValue, setMaxValue] = createSignal(0);
  const validData = props.data.filter((d) => {
    const lower = d.concentrationLower;
    const upper = d.concentrationUpper;

    return (
      lower !== undefined &&
      upper !== undefined &&
      !(lower === 0 && upper === 0)
    );
  });

  const uniquePeriods = Array.from(
    new Set(
      validData
        .sort((a, b) => a.concentrationLower - b.concentrationLower)
        .map((d) => d.averagingPeriod)
    )
  );

  const hasMultiplePeriods = uniquePeriods.length > 1;
  const [selectedPeriod, setSelectedPeriod] = createSignal(uniquePeriods[0]);
  const [prevPeriod, setPrevPeriod] = createSignal(selectedPeriod());

  const activePeriod = () =>
    hasMultiplePeriods ? selectedPeriod() : uniquePeriods[0];

  const filteredData = () =>
    validData.filter((d) => d.averagingPeriod === activePeriod());

  const [concentration, setConcentration] = createSignal(
    minValue(filteredData())
  );

  addIndex({ parameter: props.pollutant, index: 0 });

  const hexCode = () => {
    return indexValue(filteredData(), concentration())?.hex;
  };

  createEffect(() => {
    const currentPeriod = selectedPeriod();

    if (prevPeriod() !== currentPeriod) {
      setConcentration(minValue(filteredData()));
      setPrevPeriod(currentPeriod);
    }
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

  const latexFunction = () =>
    generateLatexFunction(filteredData(), concentration());

  const result = () => getResult(filteredData(), concentration());

  return (
    <>
      <section class="calculation-wrapper">
        <div class="input-wrapper">
          <input
            class="number-input input"
            type="number"
            step={stepValue(filteredData())}
            min={minValue(filteredData())}
            max={maxValue()}
            value={concentration()}
            onInput={(e) => setConcentration(Number(e.target.value))}
          />
          <span class="input-label">
            {normalizeUnitsLabel(
              indexValue(filteredData(), concentration())?.units
            )}
          </span>
        </div>
        <div class="pollutant-wrapper">
          <p innerHTML={normalizePollutantLabelJSX(props.pollutant)}></p>
        </div>
        <TimePeriodSelector
          hasMultiplePeriods={hasMultiplePeriods}
          uniquePeriods={uniquePeriods}
          selectedPeriod={selectedPeriod()}
          setSelectedPeriod={setSelectedPeriod}
        />
        <div class="formula-wrapper">
          <div innerHTML={latexFunction()}></div>
        </div>
        <div class="result-wrapper">
          <Show when={result() > 0}>
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
        <Show when={concentration() > maxValue()}>
          <p class="out-of-range-text">
            Concentration exceeds maximum breakpoint definition:{" "}
            <span>
              {maxValue()} {normalizeUnitsLabel(filteredData()[0]?.units)}
            </span>
          </p>
        </Show>
      </section>
    </>
  );
};

export default PiecewiseCalculator;
