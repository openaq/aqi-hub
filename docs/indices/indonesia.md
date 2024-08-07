# Indonesia

## Indeks Standar Pencemar Udar (ISPU)

## Background

The Indeks Standar Pencemar Udara (ISPU), translated as Air Pollution Standard Index, is an air quality index developed and standardized by the Indonesia Ministry of Environment and Forestry. The ISPU covers 7 criteria pollutants, PM<sub>2.5</sub>,PM<sub>10</sub>, NO<sub>2</sub>, SO<sub>2</sub>, CO, O<sub>3</sub> and Hydrocarbon. Its current form was codified in the Regulation of the Minister of Environment and Forestry Number 14 in 2020 as a replacement for a previous version from 1997. This change added Hydrocarbon and PM<sub>2.5</sub> as new criteria pollutants. 

## Color scale

```js

import {breakpointsTable} from "../components/table.js";
import { parseBreakpointsCsv, tableReshape, colorScaleReshape } from '../utils/utils.js';

```

```js
import { colorScale } from '../components/color-scale.js';
```

```js
const breakpoints = await FileAttachment('../data/indonesia/breakpoints.csv').text();

const data = parseBreakpointsCsv(breakpoints);
```

```js
colorScale(colorScaleReshape(data))
```

## Methods

All pollutant breakpoints are reported in µg/m3 and determined off 24 hour averaging periods. Each measured pollutant is converted to a ISPU value and then shared. Values appear to be rounded to either one decimal place depending on the pollutant and units, the source material does not provide specific guidance on whether this is rounding or truncation. Source documentation does not provide specific guidance on a sub-index to composite index method, but it appears from the reporting systems that when multiple pollutants are measured the ISPU value for each is reported and the maximum ISPU value is shown as the site ISPU value. 

Pollutants use the following breakpoints for calculating ISPU:


```js
breakpointsTable(data)
```

Note: lower bounds of breakpoints have been inferred from source material. Explicit lower bound values are not listed; we have assumed in the case where whole numbers are used the lower bound is +1 from the previous bound and when a decimal point is used the next bound is +0.1.

Using the breakpoint values in the table above a piecewise linear function is used to convert the concentration values to ISPU values. The function is defined as:


```js
import {piecewiseLatexDoc} from '../components/piecewise.js';
```

```js
piecewiseLatexDoc('ISPU')

```

### Example

Given measurement values for all pollutant such as: 

| Pollutant  | Value |  | ISPU |
| :---- | :---- | :---- | :---- |
| PM<sub>2.5</sub>  | 152 µg/m3  | ${tex`\frac{300 - 201}{350 - 151} (152 - 151) + 201 `} | 201 |
| PM<sub>10</sub>  | 32 µg/m3  | ${tex` \frac{50 - 0}{50 - 0} (32 - 0) + 0 `} | 32 |
| CO  | 3200 µg/m3  | ${tex` \frac{50 - 0}{4000 - 0} (3200 - 0) + 0 `} | 40 |
| O<sub>3</sub>   | 145 µg/m3  | ${tex` \frac{100 - 50}{235 - 121} (145 - 121) + 50 `} | 60 |
| SO<sub>2</sub>  | 51 µg/m3  | ${tex` \frac{50 - 0}{52 - 0} (51 - 0) + 0 `} | 49 |
| NO<sub>2</sub>  | 78 µg/m3  | ${tex`\frac{50 - 0}{80 - 0} (78 - 0) + 0 `} | 49 |
| HC  | 12 µg/m3  | ${tex`\frac{50 - 0}{45 - 0} (12 - 0) + 0 `} | 13 |

The overall site ISPU will be 201 or very unhealthy due to the prevailing level of PM<sub>2.5</sub>.

## References

[https://ditppu.menlhk.go.id/portal/read/indeks-standar-pencemar-udara-ispu-sebagai-informasi-mutu-udara-ambien-di-indonesia](https://ditppu.menlhk.go.id/portal/read/indeks-standar-pencemar-udara-ispu-sebagai-informasi-mutu-udara-ambien-di-indonesia)

[https://ppkl.menlhk.go.id/website/filebox/770/190930181350KEPMENH-45%20TAHUN%201997.pdf](https://ppkl.menlhk.go.id/website/filebox/770/190930181350KEPMENH-45%20TAHUN%201997.pdf)

[https://peraturan.bpk.go.id/Details/163466/permen-lhk-no-14-tahun-2020](https://peraturan.bpk.go.id/Details/163466/permen-lhk-no-14-tahun-2020) 


