import { createResource, createSignal, For, onMount, Show } from 'solid-js';
import {
  scaleLinear,
  axisBottom,
  axisLeft,
  scaleBand,
  select,
  type ScaleBand,
  type ScaleLinear,
} from 'd3';
import countriesMap from '../data/countries.json';
import { getContrast } from '../utils/colors';

interface DataDefinition {
  iso: string;
  variant: string;
  category: string;
  hex: string;
  categoryLower: number;
  categoryUpper: number;
  pollutant: string;
  units: string;
  averagingPeriod: number;
  concentrationLower: number;
  concentrationUpper: number;
}

interface LollipopChartDefinition {
  data: DataDefinition[];
  width: number;
  height: number;
  margin: number;
}

const fetchBreakpoints = async (): Promise<any> => {
  const response = await fetch('../../api/data/indices.json');
  return response.json();
};

export function SlopeChart() {
  const [breakpoints] = createResource(fetchBreakpoints);

  return (
    <>
      <p>
        <i>
          Move the slider to change the 24 hour PM<sub>2.5</sub> concentration
          value and see how the AQI varies across countries.
        </i>
      </p>
      <Show when={breakpoints.state === 'ready'}>
        <LollipopChart
          data={breakpoints()}
          margin={300}
          height={300}
          width={600}
        />
      </Show>
    </>
  );
}

const findBreakpoint = (
  concentration: number,
  d: DataDefinition[]
): DataDefinition => {
  return d.filter(
    (o) =>
      concentration <= o.concentrationUpper &&
      concentration >= o.concentrationLower
  )[0];
};

const piecewise = (c: number, iU: number, iL: number, cU: number, cL: number) =>
  Math.round(((iU - iL) / (cU - cL)) * (c - cL) + iL);

const aqi = (c: number, breakpoints: DataDefinition[]) => {
  const maxConcentration = Math.max(
    ...breakpoints.map((o) => o.concentrationUpper)
  );
  let breakpoint;
  breakpoint = findBreakpoint(c, breakpoints);
  if (c >= maxConcentration) {
    breakpoint = breakpoints.find(
      (o) => o.concentrationUpper === maxConcentration
    );
  }
  const {
    concentrationLower,
    concentrationUpper,
    categoryLower,
    categoryUpper,
    hex,
  } = breakpoint!;
  const aqiValue =
    c >= maxConcentration
      ? categoryUpper
      : piecewise(
          c,
          categoryUpper,
          categoryLower,
          concentrationUpper,
          concentrationLower
        );
  return {
    hex: hex,
    aqi: aqiValue,
  };
};

export function LollipopChart(props: LollipopChartDefinition) {
  const [concentration, setConcentration] = createSignal(42);

  let sliderRef;
  let yAxisRef: SVGGElement | undefined;
  let xAxisRef: SVGGElement | undefined;

  const x = scaleLinear();
  x.domain([0, 500]);
  x.range([0, 500]);

  const pm25 = props.data
    .filter(
      (o: DataDefinition) => o.averagingPeriod === 24 && o.pollutant === 'PM2.5'
    )
    .filter((o) => ['PE', 'MX', 'GB', 'IL', 'EU', 'BE', 'IE'].indexOf(o.iso) < 0)
    .map((o) => {
      if (!o.concentrationUpper) {
        o.concentrationUpper = 2 * o.concentrationLower;
      }
      if (!o.categoryUpper) {
        o.categoryUpper = o.categoryLower + 100;
      }
      return o;
    });

  const data = Object.groupBy(pm25, ({ iso }) => iso);

  const y = scaleBand();
  y.domain(Object.keys(data));
  y.range([0, props.height]);

  const yAxis = (y: ScaleBand<string>) =>
    axisLeft(y)
      .tickFormat((o) => countriesMap[o])
      .ticks(4);

  const xAxis = (x: ScaleLinear<number, number, never>) =>
    axisBottom(x).ticks(5);

  onMount(() => {
    select(xAxisRef!).call(xAxis(x));
    select(yAxisRef!).call(yAxis(y));
  });

  return (
    <>
      <div class="lollipop-contentration">
        <input
          type="range"
          id="concentration"
          name="concentration"
          value={concentration()}
          min="0"
          max="500"
          ref={sliderRef}
          onInput={(e) => setConcentration(Number(e.target.value))}
        />
        <input
          type="number"
          name="concentration-input input"
          id="concentration-input"
          value={concentration()}
          min="0"
          max="500"
          onInput={(e) => setConcentration(Number(e.target.value))}
        />
      </div>
      <div>
        <svg
          width={`${props.width + props.margin}px`}
          height={`${props.height + props.margin}px`}
        >
          {' '}
          <g
            class="y-axis"
            transform={`translate(${props.margin / 2} 0)`}
            ref={yAxisRef}
          />
          <g
            class="x-axis"
            transform={`translate(${props.margin / 2} ${props.height})`}
            ref={xAxisRef}
          />
          <g transform={`translate(${props.margin / 2} ${+12})`}>
            <For each={Object.entries(data)}>
              {([iso, breakpoints]) => {
                const value = () => aqi(concentration(), breakpoints!).aqi;
                const hex = () => aqi(concentration(), breakpoints!).hex;
                return (
                  <>
                    <line
                      x1={0}
                      x2={x(value())}
                      y1={y(iso)}
                      y2={y(iso)}
                      stroke="black"
                      stroke-width={6}
                    ></line>
                    <circle
                      cx={x(value())}
                      cy={y(iso)}
                      r={12}
                      fill="black"
                    ></circle>

                    <line
                      x1={0}
                      x2={x(value())}
                      y1={y(iso)}
                      y2={y(iso)}
                      stroke={hex()}
                      stroke-width={4}
                    ></line>
                    <circle
                      cx={x(value())}
                      cy={y(iso)}
                      r={11}
                      fill={hex()}
                    ></circle>
                    <text
                      style="font-size:12px;"
                      fill={getContrast(hex())}
                      transform={`translate(${value() - 8},${y(iso) + 4})`}
                    >
                      {aqi(concentration(), breakpoints!).aqi}
                    </text>
                  </>
                );
              }}
            </For>
          </g>
        </svg>
      </div>
    </>
  );
}
