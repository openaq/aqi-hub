# South Africa

## National Air Quality Indicator (NAQI)

```js

import {breakpointsTable} from "../components/table.js";
import { parseBreakpointsCsv, tableReshape, colorScaleReshape } from '../utils/utils.js';

```

```js
import { colorScale } from '../components/color-scale.js';
```

```js
const breakpoints = await FileAttachment('../data/south-africa/breakpoints.csv').text();

const data = parseBreakpointsCsv(breakpoints);
```

## Background

The South Africa National Air Quality Indicator (NAQI) was developed by the South Africa Department of Environmental Affairs (DEA). Six criteria pollutants, PM<sub>10</sub>, PM<sub>2.5</sub>, CO, O<sub>3</sub> , SO<sub>2</sub>, and NO<sub>2</sub> are covered in the methodology. The NAQI is evaluated hourly with all pollutant measurement periods taken as hourly averages.

## Color scale

The NAQI scale ranges from 1-10 and uses five colors to represent different bands.

```js
colorScale(colorScaleReshape(data))
```

## Methods

The NAQI uses a sub-index method, wherein an index value is calculated for each of the measured pollutants, then the highest value from a single station determines the composite AQI for that site. There is no specific guidance provided on a minimum number of pollutants measured to produce a valid composite index value. All pollutants use a 1 hour measurement period, meaning the NAQI provides an hourly assessment of air quality. Because the NAQI provides hourly evaluation of air quality, no forecasting methods are defined within the methodology. No specific guidance is provided on rounding or truncation standards, but it appears 1 hour averages are rounded to whole numbers for comparison to breakpoints. The pollutant thresholds between “good” (3) and “moderate” (4) are based on the National Ambient Air Quality Standard from the Air Quality Act of 2004.

Pollutant values use the following break points to calculate the NAQI:

```js
breakpointsTable(data)
```

## Example

Tempbisa Station in Thembisa Township Gauteng Province  
PM<sub>2.5</sub> \- 68 \-\> 2  
PM<sub>10</sub> \- 117 \-\> 2  
SO<sub>2</sub> \-1  \-\> 1  
CO \-4 \-\> 1  
NO<sub>2</sub> \- 182 \-\> 6

The NAQI value for this station would be 6 or high/unhealthy, with NO<sub>2</sub> being the highest pollutant.

## References

[https://www.ncbi.nlm.nih.gov/pmc/articles/PMC10625908](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC10625908)

[https://www.ssph-journal.org/journals/international-journal-of-public-health/articles/10.3389/ijph.2023.1606349/full\#supplementary-material](https://www.ssph-journal.org/journals/international-journal-of-public-health/articles/10.3389/ijph.2023.1606349/full\#supplementary-material)

[https://saaqis.environment.gov.za/Pagesfiles/SAAQIS%20Air%20Quality%20Index%20for%20General%20Public-Summary.pdf](https://saaqis.environment.gov.za/Pagesfiles/SAAQIS%20Air%20Quality%20Index%20for%20General%20Public-Summary.pdf)

[https://doi.org/10.17159/2410-972X/2018/v28n1a1](https://doi.org/10.17159/2410-972X/2018/v28n1a1)

[https://www.gov.za/sites/default/files/gcis\_document/201409/328161210.pdf](https://www.gov.za/sites/default/files/gcis\_document/201409/328161210.pdf)
