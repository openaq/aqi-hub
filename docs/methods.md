---
title: Methods
---

## Averaging methods

When computing concentration values, various averaging methods are employed to reflect air quality over different time periods by pollutant. Standard means, such as arithmetic averages, are commonly used to calculate average concentrations of pollutants over specified intervals, typically 24 hours. This method is straightforward and ensures consistency in reporting air quality levels. Weighted averaging methods, on the other hand, assign different weights to pollutant concentrations based on their health impacts and their temporal distribution. For example, higher weights may be given to peak pollution periods to better capture potential health risks during those times. These weighted averages are relevant because they provide a more nuanced understanding of air quality, considering the varying significance of pollution levels throughout the day.

The NowCast algorithm, used for calculating real-time AQI values, exemplifies the practical application of weighted mean methods to provide timely and accurate air quality assessments. This algorithm is particularly beneficial in rapidly changing air quality conditions, such as during wildfires, industrial accidents, or high-traffic periods.

Unlike fixed average methods, the NowCast algorithm dynamically adjusts the weights of pollutant concentrations based on the rate of change. For instance, if pollution levels are rising rapidly, the algorithm will give higher weights to the most recent data points. This approach captures sudden spikes in pollution that could pose immediate health risks, providing a more relevant AQI.


## Piecewise linear function

A piecewise linear function is a type of function that is defined by multiple linear segments, each applying to a specific interval of the input variable. Essentially, it means the function is made up of straight-line sections that connect to form a continuous graph. An example of how a piecewise linear function appears when graphed based on the US EPA PM<sub>2.5</sub> concentration breakpoints:

```js
import {piecewiseChart} from './components/piecewise-chart.js';
```

```js
piecewiseChart()
```

_Note:_ Adapted from https://observablehq.com/@mbostock/pm25-to-aqi

This can be expressed as:

```tex
{f}(x) = \begin{cases} 
5.55x & \text{if } x \leq 9.0 \\
1.86x + 34.05 & \text{if } 9.0 < x \leq 35.4 \\
2.46x + 13.59 & \text{if } 35.4 < x \leq 55.4 \\
0.52x + 122.34 & \text{if } 55.4 < x \leq 150.4 \\
0.99x + 51.86 & \text{if } 150.4 < x \leq 250.4 \\
0.99x + 52.76 & \text{if } 250.4 < x \leq 350.4 \\
0.66x + 169.52 & \text{if } 350.4 < x \leq 500.4 \\
\end{cases}
```

Many AQIs use a piecewise linear function to translate from pollutant concentration averages into the final indicator value based on a pollutant-specific breakpoint. A continuous piecewise linear function adjusts the AQI smoothly as concentration values change, ensuring that each segment's linear slope reflects different rates of change in air quality based on specific concentration ranges. The most commonly used formula for AQIs across different countries is defined as:

```js
import {piecewiseLatexDoc} from './components/piecewise.js';
```

```js

piecewiseLatexDoc('AQI')

```

The variable slope of a piecewise linear function can be demonstrated with different country AQI sub-index values for PM<sub>2.5</sub> and their varying breakpoints. For the same PM<sub>2.5</sub> concentration value, different AQIs change and interpolate across their respective range at different rates due to the different slopes in the piecewise linear function. The chart below shows how the different slopes within a piecewise function change the rate of increase across different AQIs given the same input concentration. Drag the concentration slider to see the output sub-index values change. This dynamic chart shows large differences in how countries assess danger levels.

```js
const concentration = view(Inputs.range([0, 500], {value: 42, step: 1, label: html`PM<sub>2.5</sub> 24 hr. mean concentration`}));

```

```js
import {piecewise} from './components/calculators.js';
import {getContrast} from './utils/colors.js';
const breakpoints = await FileAttachment('./data/breakpoints.csv').csv({typed: true});
const countriesMap = await FileAttachment('./data/countries.json').json();
let pm2524hr = breakpoints.filter(o => o.pollutant == 'PM2.5' && o.averaging_period == '24');
pm2524hr = pm2524hr.map(o => { o.concentration_upper ? o.concentration_upper : o.concentration_upper = 500; return o})
pm2524hr = pm2524hr.filter(o => ['PE', 'MX', 'GB', 'IL', 'EU'].indexOf(o.ISO) < 0) // Peru, UK and Mexico have a 24 hr average but do not use the piecewise
```

```js
function filterData(data, value) {
    function findBestMatch(objects, value) {
        let matches = objects.filter(obj => {
            return value >= obj.concentration_lower && (obj.concentration_upper === null || value <= obj.concentration_upper);
        });

        if (matches.length > 0) {
            return matches[0];
        }

        return objects.reduce((max, obj) => {
            if (obj.concentration_upper === null) {
                return obj; 
            }
            return (!max.concentration_upper || obj.concentration_upper > max.concentration_upper) ? obj : max;
        });
    }

    let groupedData = data.reduce((acc, obj) => {
        if (!acc[obj.ISO]) {
            acc[obj.ISO] = [];
        }
        acc[obj.ISO].push(obj);
        return acc;
    }, {});

    let results = [];

    for (let iso in groupedData) {
        if (groupedData.hasOwnProperty(iso)) {
            let bestMatch = findBestMatch(groupedData[iso], value);
            if (bestMatch) {
                results.push(bestMatch);
            }
        }
    }

    return results;
}

const d = filterData(pm2524hr, concentration)
const b = d.map(o => { o.value = o['concentration_upper'] && o['category_upper'] ?  piecewise(concentration, o['category_upper'], o['category_lower'], o['concentration_upper'], o['concentration_lower']) : o['category_lower']; o.name = countriesMap[o.ISO]; return o})
```

```js

Plot.plot({
  height: 350,
  width: width,
  marginLeft: 150,
  y: {label: 'Country/territory', tickPadding: 12, tickSize: 0},
  x: {label: 'Index value', domain: [0,500]},
  marks: [
    Plot.ruleY(b, {y: "name", x: "value", stroke: "black",strokeWidth: 6}),
    Plot.dot(b, {y: "name", x: "value", fill: "black", r: 12}),
    Plot.ruleY(b, {y: "name", x: "value", stroke:'hex',strokeWidth: 4}),
    Plot.dot(b, {y: "name", x: "value", fill: "hex", r: 11}),
    Plot.text(b, {y: "name", x: "value", fill:d => getContrast(d.hex), text: "value"})
  ]
})
```