# Kuwait

## Kuwait Air Quality Index (KAQI)

```js

import {breakpointsTable} from "../components/table.js";
import { parseBreakpointsCsv, tableReshape, colorScaleReshape } from '../utils/utils.js';
import { colorScale } from '../components/color-scale.js';
const breakpoints = await FileAttachment('../data/kuwait/breakpoints.csv').text();

const data = parseBreakpointsCsv(breakpoints);
```

## Background

The Kuwait Air Quality Index (KAQI) is developed and managed by the Environment Public Authority in Kuwait (KEPA). Six criteria pollutants, PM<sub>2.5</sub>, PM<sub>10</sub>, CO, O<sub>3</sub> , SO<sub>2</sub>, and NO<sub>2</sub> are covered in the methodology. The air quality standards used to establish the values of the KAQI were established in law in 2014 with the Law No. 42 of 2014 [^1].

## Color scale

The Kuwait Air Quality Index scale ranges from 0-500 and uses six colors to represent different bands.

```js

colorScale(colorScaleReshape(data))

```

Note: Adapted from "Air Quality Status" (n.d.), <https://enterprise.emisk.org/eMISKAirQuality/#/KAQI> [^2]. Accessed August 5, 2024.

## Methods

The KAQI uses a sub-index method, wherein an index value is calculated for each of the measured pollutants, then the final KAQI value is chosen from the highest sub-index value of all pollutants evaluated. There is no guidance on the requirements on the minimum number of pollutants to be included in the calculation. Specific guidance on rounding/truncation is also not included in the source material.

```js
breakpointsTable(data)
```

Note: Adapted from "Air Quality Status" (n.d.), <https://enterprise.emisk.org/eMISKAirQuality/#/KAQI> [^2]. Accessed August 5, 2024.

KAQI values are reported hourly from a rolling average of the pollutant defined period.

The Environment Public Authority in Kuwait site does not provide any specific requirements for temporal coverage, the minimum number of valid data points required within the averaging period, for 8 hour and 24 hour measurement periods.

Using the breakpoint values in the table above a piecewise linear function is used to convert the concentration values to KAQI values. The function is defined as:

```js

import {piecewiseLatexDoc} from '../components/piecewise.js';

```

```js

piecewiseLatexDoc('KAQI')

```

After all sub-indices for a station are computed the maximum sub-index value is taken as the final KAQI value for a given station.

```tex  
KAQI = {Max}(SI_{PM_{2.5}}, SI_{PM_{10}}, SI_{NO_{2}}, SI_{SO{2}}, SI_{O_{3}}, SI_{CO})
```

## Example

## References

[^1]: [https://epa.gov.kw/Portals/0/PDF/EPALAWEN.pdf](https://epa.gov.kw/Portals/0/PDF/EPALAWEN.pdf)

[^2]: [https://enterprise.emisk.org/eMISKAirQuality/\#/KAQI](https://enterprise.emisk.org/eMISKAirQuality/\#/KAQI)