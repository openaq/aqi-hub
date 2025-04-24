import { createEffect, createResource, createSignal, Show } from 'solid-js';
import {
  line as d3Line,
  scaleLinear,
  axisBottom,
  axisLeft,
  scaleOrdinal
} from 'd3';
import countriesMap from '../data/countries.json';


// function filterData(data, value) {
//   function findBestMatch(objects, value) {
//     let matches = objects.filter((obj) => {
//       return (
//         value >= obj.concentrationLower &&
//         (obj.concentrationUpper === null || value <= obj.concentrationUpper)
//       );
//     });

//     if (matches.length > 0) {
//       return matches[0];
//     }

//     return objects.reduce((max, obj) => {
//       if (obj.concentration_upper === null) {
//         return obj;
//       }
//       return !max.concentration_upper ||
//         obj.concentrationUpper > max.concentrationUpper
//         ? obj
//         : max;
//     });
//   }

  let groupedData = data.reduce((acc, obj) => {
    if (!acc[obj.iso]) {
      acc[obj.iso] = [];
    }
    acc[obj.iso].push(obj);
    return acc;
  }, {});

//   let results = [];

//   for (let iso in groupedData) {
//     if (groupedData.hasOwnProperty(iso)) {
//       let bestMatch = findBestMatch(groupedData[iso], value);
//       if (bestMatch) {
//         results.push(bestMatch);
//       }
//     }
//   }

//   return results;
// }



interface DataDefinition {
  iso: string
  variant: string
  category: string
  hex: string
  categoryLower: string
  categoryUpper: string
  pollutant: string
  units: string
  averagingPeriod: string
  concentrationLower: string
  concentrationUpper: string
}


interface LollipopChartDefinition {
  data: DataDefinition[];
  width: number;
  height: number;
  margin: number;
}

const fetchBreakpoints = async (): Promise<any> => {
  const response = await fetch(`/api/data/indices.json`);
  return response.json();
}


export function LollipopChart(props: LollipopChartDefinition) {
  const [concentration, setConcentration] = createSignal(42);
  const [breakpoints] = createResource(fetchBreakpoints);


  let sliderRef;
  let yAxisRef;
  let xAxisRef;


  //   const x = scaleLinear()
  //   x.domain([]);
  //   x.range();


  //   const y = scaleOrdinal()
  //   y.domain(data.map(o => ));
  //   y.range([0, props.height]);
  


  // const yAxis = (y) => axisLeft(y);

  // const xAxis = (x) =>
  //   axisBottom(x)
  //   .ticks(5)

  // select(xAxisRef).call(xAxis(x));
  // select(yAxisRef).call(yAxis(y));

  createEffect(() => {
  });

  return (
    <>
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
        name="concentration-input"
        id="concentration-input"
        value={concentration()}
        min="0"
        max="500"
        onInput={(e) => setConcentration(Number(e.target.value))}
      />
      <Show when={breakpoints.state === 'ready'}>
      <div>{JSON.stringify(breakpoints())}</div>

      </Show>
      <div>{concentration()}</div>
      {/* <svg>
      <g
            class="y-axis"
            transform={`translate(${props.margin / 2} ${props.margin / 2})`}
            ref={yAxisRef}
          />
          <g
            class="x-axis"
            transform={`translate(${props.margin / 2} ${
              props.height + props.margin / 2
            })`}
            ref={xAxisRef}
          />

      </svg> */}
    </>
  );
}
