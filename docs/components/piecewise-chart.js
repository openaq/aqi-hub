import * as d3 from "npm:d3";
import * as Plot from 'npm:@observablehq/plot';
import { piecewise } from './calculators.js';


/* adapted from https://observablehq.com/@mbostock/pm25-to-aqi */
function Aqi(pm25) {
  const c = Math.floor(10 * pm25) / 10;
  const a =
    c < 0
      ? 0
      : c < 9.1
      ? piecewise(c, 50, 0, 9.0, 0.0)
      : c < 35.5
      ? piecewise(c, 100, 51, 35.4, 9.1)
      : c < 55.5
      ? piecewise(c, 150, 101, 55.4, 35.5)
      : c < 150.5
      ? piecewise(c, 200,151, 150.4, 55.5)
      : c < 250.5
      ? piecewise(c, 300, 201, 250.4, 150.5)
      : c < 350.5
      ? piecewise(c,400, 301, 350.4,  250.5)
      : c < 500.5
      ? piecewise(c, 500, 401,  500.4, 350.5)
      : 500;
  return Math.round(a);
}

const breakpoints = [
    {
        "x": 9.0,
        "y": 50,
        "color": "red",
    },
]

export function piecewiseChart() {
  return Plot.plot({
    x: {
      label: 'PM2.5 concentration',
    },
    y: {
      label: 'AQI',
    },
    marks: [
      Plot.line(d3.range(501), {
        x: (d) => d,
        y: Aqi,
      }),
      Plot.dot(breakpoints, {
        x: "x",
        y: "y",
        fill: "color"
      }),
    ],
  });
}
