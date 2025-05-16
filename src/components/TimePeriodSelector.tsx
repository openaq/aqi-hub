import { For, Show } from "solid-js";

interface TimePeriodSelectorProps {
  hasMultiplePeriods: boolean;
  uniquePeriods: number[];
  selectedPeriod: number;
  setSelectedPeriod: (val: number) => void;
}

const TimePeriodSelector = (props: TimePeriodSelectorProps) => {
  return (
    <div class="time-period-wrapper">
      <Show when={props.hasMultiplePeriods}>
        <select
          class="period-select"
          onInput={(e) =>
            props.setSelectedPeriod(Number(e.currentTarget.value))
          }
        >
          <For each={props.uniquePeriods}>
            {(period) => <option value={period}>{period} hr</option>}
          </For>
        </select>
      </Show>
      <Show when={!props.hasMultiplePeriods}>
        <p>{props.uniquePeriods[0]} hr.</p>
      </Show>
    </div>
  );
};

export default TimePeriodSelector;
