
# Israel

## Air Quality Index (AQI)

```js
import {breakpointsTable} from "../components/table.js";
import { parseBreakpointsCsv, tableReshape, colorScaleReshape } from '../utils/utils.js';
import { colorScale } from '../components/color-scale.js';
const breakpoints = await FileAttachment('../data/israel/breakpoints.csv').text();
const data = parseBreakpointsCsv(breakpoints);
```

## Background

The Israel Air Quality Index (AQI) was developed by the Ministry of Environmental Protection. Seven criteria pollutants, PM<sub>2.5</sub>, PM<sub>10</sub>, CO, O<sub>3</sub>, SO<sub>2</sub>, NO<sub>2</sub>, and NO<sub>x</sub>, are covered in the methodology.

## Color scale

The Israel AQI is represented with a diverging scale composed of 4 value bands ranging from -400 to 100, with a distinct color for each band.

```js
colorScale([{color: '#984806', label: 'Very low', range: '−201–−400'},{color: '#ff0000', label: 'Low', range: '−1–−200'},{color: '#ffff00', label: 'Medium', range: '0–50'}, {color: '#04ff00', label: 'Good', range: '51–100'}])
```

_Note_: Adapted from  "חישוב מדד איכות האוויר" [https://air.sviva.gov.il/Pagesfiles/החישוב שלמדדזיהוםהאוויר AQIלאתרהחדש.pdf](https://air.sviva.gov.il/Pagesfiles/%D7%94%D7%97%D7%99%D7%A9%D7%95%D7%91%20%D7%A9%D7%9C%20%D7%9E%D7%93%D7%93%20%D7%96%D7%99%D7%94%D7%95%D7%9D%20%D7%94%D7%90%D7%95%D7%95%D7%99%D7%A8%20AQI%20%D7%9C%D7%90%D7%AA%D7%A8%20%D7%94%D7%97%D7%93%D7%A9.pdf). Accessed November 12, 2024.

## Methods

The Israel AQI uses a sub-index method where each pollutant is calculated against pollutant-specific breakpoints into a pollutant sub-index value. All pollutants are then compared and the largest sub-index value determines the full composite AQI value. The Ministry of Environmental Protection provides no specific guidance provided on the minimum number of pollutants required to compute a full composite index.

Pollutant breakpoints are defined in the table below:

```js
breakpointsTable(data, true, false)
```

_Note_: Adapted from  "חישוב מדד איכות האוויר" [https://air.sviva.gov.il/Pagesfiles/החישוב שלמדדזיהוםהאוויר AQIלאתרהחדש.pdf](https://air.sviva.gov.il/Pagesfiles/%D7%94%D7%97%D7%99%D7%A9%D7%95%D7%91%20%D7%A9%D7%9C%20%D7%9E%D7%93%D7%93%20%D7%96%D7%99%D7%94%D7%95%D7%9D%20%D7%94%D7%90%D7%95%D7%95%D7%99%D7%A8%20AQI%20%D7%9C%D7%90%D7%AA%D7%A8%20%D7%94%D7%97%D7%93%D7%A9.pdf). Accessed November 12, 2024.

Using the breakpoint values in the table above, a [piecewise linear function](/methods#piecewise-linear-function) is used to convert the concentration values to AQI values.  The piecewise linear function is defined as:

```js
import {piecewiseLatexDoc} from '../components/piecewise.js';
```

```js
piecewiseLatexDoc('AQI')
```

After computing the AQI value for each measuremed pollutant, the maximum pollutant value it taken as the prevailing value.

```tex
{AQI{^\prime}} = {Max}({I}_{PM_{2.5}},{I}_{PM_{10}},{I}_{CO},{I}_{O_{3}},{I}_{SO_{2}},{I}_{NO_{2}},{I}_{NO_{x}})
```

The final Israel AQI value is then derived by substracting the previous AQI value from 100.

```tex
AQI = 100 - AQI{^\prime}
```

## References

ניטור אוויר בישראל המשרד להגנת הסביבה (n.d) [https://air.sviva.gov.il/](https://air.sviva.gov.il/). Accessed November 12 2024.
