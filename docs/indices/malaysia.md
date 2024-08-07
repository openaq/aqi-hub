# Malaysia

## Air Pollution Index (API)

## Background

The Malaysia Index Pencemar Udara (IPU), translated as Air Pollution Index (API), is developed and managed by the Malaysia Department of Environment. Six criteria pollutants, PM<sub>2.5</sub>, PM<sub>10</sub>, CO, O<sub>3</sub> , SO<sub>2</sub>, and NO<sub>2</sub> are covered in the methodology.

## Color scale

The Malaysia API scale ranges from 0-500 and uses five colors to represent different bands.

```js

import {breakpointsTable} from "../components/table.js";
import { parseBreakpointsCsv, tableReshape, colorScaleReshape } from '../utils/utils.js';

```

```js
import { colorScale } from '../components/color-scale.js';
```

```js
const breakpoints = await FileAttachment('../data/malaysia/breakpoints.csv').text();

const data = parseBreakpointsCsv(breakpoints);
```

```js
colorScale(colorScaleReshape(data))
```

## Method

The API uses a sub-index method, wherein an index value is calculated for each of the measured pollutants, then the final API value is chosen from the highest sub-index value of all pollutants evaluated. There is no guidance on the requirements on the minimum number of pollutants to be included in the calculation. Specific guidance on rounding/truncation is also not included in the source material.

API values are reported hourly from a rolling average of the pollutant defined period.

```js
breakpointsTable(data)
```

The Malaysia Department of Environment site does not provide any specific requirements for temporal coverage, the minimum number of valid data points required within the averaging period, for 8 hour and 24 hour measurement periods.

Using the breakpoint values in the table above, a piecewise linear function is used to convert the concentration values to API values. The function is defined as:

```js
import {piecewiseLatexDoc} from '../components/piecewise.js';
```

```js
piecewiseLatexDoc('API')
```

After all sub-indices for a station are computed, the maximum sub-index value is taken as the final API value for a given station.

```tex  
{API} = {Max}({I}_{PM_{10}},{I}_{PM_{2.5}},SI_{SO_{2}},{I}_{SO_{2}},{I}_{O_{3}},{I}_{CO})
```

## Example

## References

[https://apims.doe.gov.my/pdf/API_Calculation.pdf](https://apims.doe.gov.my/pdf/API_Calculation.pdf> 
)  
