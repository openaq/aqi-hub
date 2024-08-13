# Singapore

## Pollution Standards Index (PSI)

## Background

The PSI was originally established by the National Environment Agency (NEA) in 2010, with the addition of PM<sub>2.5</sub> in 2014. Six criteria pollutants, PM<sub>2.5</sub>, PM<sub>10</sub>, CO, O<sub>3</sub> , SO<sub>2</sub>, and NO<sub>2</sub> are covered in the methodology. The PSI is evaluated hourly with an option for short term rapid evaluation as well. The PSI as an air quality warning metric is largely centered around the Southeast Asia haze season.

## Color scale

The Singapore PSI scale ranges from 0-500 and uses five colors to represent different bands.

```js

import {breakpointsTable} from "../components/table.js";
import { parseBreakpointsCsv, tableReshape, colorScaleReshape } from '../utils/utils.js';

```

```js
import { colorScale } from '../components/color-scale.js';
```

```js
const breakpoints = await FileAttachment('../data/singapore/breakpoints.csv').text();

const data = parseBreakpointsCsv(breakpoints);
```

```js
colorScale(colorScaleReshape(data))
```

## Methods

The Singapore PSI differentiates between two different methods for evaluating health impact from air pollution. The primary differentiator is “haze season”, a period of high levels of particulate matter pollution from burning of biomass. During haze season a 1 hour average of PM<sub>2.5</sub> concentrations is recommended to assess rapidly changing levels of particulate pollution. For planning and assessing health impact for the following day, a 24 hour PSI score is recommended. The 24 hour PSI measures and evaluates PM<sub>2.5</sub>, PM<sub>10</sub>, CO, O<sub>3</sub> , SO<sub>2</sub>, and NO<sub>2</sub>. Pollutants are evaluated on different averaging periods depending on pollutant. When 8 hour average O<sub>3</sub> levels exceed 785 ug/m3 a one hour average is used instead. NO<sub>2</sub> is only reported when 1 hour average concentration exceeds 1130 ug/m3. The source material does not have any specific guidance on coverage requirements for multi-hour averages and/or how to deal with missing values.

```js
breakpointsTable(data)
```

Using the breakpoint values in the table above a piecewise linear function is used to convert the concentration values to PSI values. No specific guidance on rounding or truncating values before applying the concentrations to the linear function are in the source material. The function is defined as:

```js
import {piecewiseLatexDoc} from '../components/piecewise.js';
```

```js
piecewiseLatexDoc('PSI')
```


After computing all pollutant sub-index values the maximum sub-index is chosen and determines the final PSI value. There is no specific guidance on the minimum number of pollutants required to compute a composite PSI value.

## Example

## References

[https://www.haze.gov.sg/docs/default-source/faq/computation-of-the-pollutant-standards-index-%28psi%29.pdf\](https://www.haze.gov.sg/docs/default-source/faq/computation-of-the-pollutant-standards-index-%28psi%29.pdf)


[https://www.haze.gov.sg/docs/default-source/faq/computation-of-the-pollutant-standards-index-(psi).pdf](https://www.haze.gov.sg/docs/default-source/faq/computation-of-the-pollutant-standards-index-(psi).pdf)

[https://en.wikipedia.org/wiki/Southeast\_Asian\_haze](https://en.wikipedia.org/wiki/Southeast\_Asian\_haze)

https://www.nea.gov.sg/our-services/pollution-control/air-pollution/faqs