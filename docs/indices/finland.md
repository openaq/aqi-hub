# Finland

## Air Quality Index (AQI)

## Background

```js

import {breakpointsTable} from "../components/table.js";
import { parseBreakpointsCsv, tableReshape, colorScaleReshape } from '../utils/utils.js';
import { colorScale } from '../components/color-scale.js';

const breakpoints = await FileAttachment('../data/finland/breakpoints.csv').text();
const data = parseBreakpointsCsv(breakpoints);

```



The Finnish Air Quality Index accounts for pollutant concentrations of PM<sub>2.5</sub>, PM<sub>10</sub>, O<sub>3</sub>, SO<sub>2</sub>, NO<sub>2</sub>, and total reduced sulfur compounds (TRS). The Finnish Air Quality Index reports a Daily AQI using hourly averaging periods [^2].

The air quality index used in Finland was developed by the now Helsinki Region Environmental Services (HSY) and the Finnish Institute for Health and Welfare (THL). HSY first introduced the index in 1988\. The present method has been used for information communication since 1993, with the calculation methods revised in 2002 and 2007 [^3]. The HSY states that the “index differs from the indexes used in other countries in that it works on an hourly basis. Elsewhere, the value is influenced by 24-hour, 8-hour and 1-hour averages.” [^3]

## Color scale

The Finnish Air Quality Index uses a five-level color scale:

```js
colorScale(colorScaleReshape(data))
```

_Note_: Adapted from “Air Quality Index” (n.d.), [https://en.ilmatieteenlaitos.fi/air-quality-index](https://en.ilmatieteenlaitos.fi/air-quality-index)[^2]. Accessed 2 July 2024.

## Methods

The Finnish Air Quality Index uses sub-indices assigned to each of the measured compounds. The highest sub-index determines the overall AQI of the station [^3]. The index is an hourly index based on hourly values and updated every hour [^2].

```tex  
{AQI} = {Max}({I}_{PM_{10}},{I}_{PM_{2.5}},{I}_{SO_{2}},{I}_{O_{3}},{I}_{CO},{I}_{TRS})  
```  

Black carbon (BC) also has established sub-index guidelines, however BC is not taken into account when determining the overall index [^2].

<div class = 'note'>
Both information from the Finnish Meteorological Institute [^2] and HSY [^3] have been referenced, however there are discrepancies that require further information to be resolved. 
</div>

The most current sub-index table [^2] as reported by the Finnish Meteorological Institute lacks a CO measurement, however it has previously reported CO guidelines as displayed in the web archive dated April 3, 2019 [^1]. HSY additionally reports CO guidelines in its sub-index table [^3]. It is unclear why CO is not included on the Finnish Meteorological Institute’s sub-index [^2].

The following breakpoint concentrations are reported by the Finnish Meteorological Institute, without CO guidelines. Breakpoint upper and lower limits, as well as rounding conventions, are not specified.

|  | Good | Satisfactory | Fair | Poor | Very Poor |
| :---- | :---- | :---- | :---- | :---- | :---- |
| PM<sub>2.5</sub> µg/m3 | 0-10 | 10-25 | 25-50 | 50-75 | 75+ |
| PM<sub>10</sub> µg/m3 | 0-20 | 20-50 | 50-100 | 100-200 | 200+ |
| O<sub>3</sub> µg/m3 | 0-60 | 60-100 | 100-140 | 140-180 | 180+ |
| SO<sub>2</sub> µg/m3 | 0-20 | 20-80 | 80-250 | 250-350 | 350+ |
| NO<sub>2</sub> µg/m3 | 0-40 | 40-70 | 70-150 | 150-200 | 200+ |
| BC µg/m3 | 0-1 | 1-3 | 3-7 | 7-12 | 12+ |
| TRS µg/m3 | 0-5 | 5-10 | 10-20 | 20-50 | 50+ |

_Note_: Adapted from “Air Quality Index” (n.d.), [https://en.ilmatieteenlaitos.fi/air-quality-index](https://en.ilmatieteenlaitos.fi/air-quality-index)[^2]. Accessed 2 July 2024.

The following pollutant breakpoint concentrations are reported by HSY and include CO guidelines.

|  | Good | Satisfactory | Fair | Poor | Very Poor |
| :---- | :---- | :---- | :---- | :---- | :---- |
| PM<sub>2.5</sub> µg/m3 | 0-10 | 11-25 | 26-50 | 51-75 | 76+ |
| PM<sub>10</sub> µg/m3 | 0-20 | 21-50 | 51-100 | 101-200 | 201+ |
| CO mg/m3 | 0-4 | 5-8 | 9-20 | 21-30 | 31+ |
| O<sub>3</sub> µg/m3 | 0-60 | 61-100 | 101-140 | 141-180 | 181+ |
| SO<sub>2</sub> µg/m3 | 0-20 | 21-80 | 82-250 | 251-350 | 351+ |
| NO<sub>2</sub> µg/m3 | 0-40 | 41-70 | 71-150 | 151-200 | 201+ |
| TRS µg/m3 | 0-5 | 6-10 | 11-20 | 21-50 | 51+ |

_Note_: Adapted from “What is the air quality index?” (n.d.), [https://www.hsy.fi/en/air-quality-and-climate/air-protection-and-health/what-is-the-air-quality-index/](https://www.hsy.fi/en/air-quality-and-climate/air-protection-and-health/what-is-the-air-quality-index/)[^3]. Accessed 11 July 2024.

HSY additionally includes a separate table for breakpoint concentrations of BC, lung-deposited surface area (LDSA), and particle number concentration (PNC), as those concentrations are not included in the health-based air quality index developed by HSY and THL. Breakpoint upper and lower limits, and rounding conventions, are not specified.

|  | Good | Satisfactory | Fair | Poor | Very Poor |
| :---- | :---- | :---- | :---- | :---- | :---- |
| BC µg/m3 | 0-1 | 1-3 | 3-7 | 7-12 | 12+ |
| LDSA µm2 / cm3 | 0-20 | 20-40 | 40-80 | 80-120 | 120+ |
| PNC 103 / cm3 | 0-15 | 16-30 | 31-60 | 61-100 | 101+ |

_Note_: Adapted from “What is the air quality index?” (n.d.), [https://www.hsy.fi/en/air-quality-and-climate/air-protection-and-health/what-is-the-air-quality-index/](https://www.hsy.fi/en/air-quality-and-climate/air-protection-and-health/what-is-the-air-quality-index/)[^3]. Accessed 11 July 2024. 

## References

“Air Quality.” Finnish Meteorological Institute, [en.ilmatieteenlaitos.fi/air-quality-group](https://en.ilmatieteenlaitos.fi/air-quality-group).  

“Air Quality Index.” 3 April 2019, [web.archive.org/web/20190403173005/https://en.ilmatieteenlaitos.fi/air-quality-index](http://web.archive.org/web/20190403173005/https://en.ilmatieteenlaitos.fi/air-quality-index). 

“Air Quality Index.” Finnish Meteorological Institute, [en.ilmatieteenlaitos.fi/air-quality-index](https://en.ilmatieteenlaitos.fi/air-quality-index). 

Hämekoski, K. “PROFILE: The Use of a Simple Air Quality Index in the Helsinki Area, Finland.” 22 July 1998, [doi.org/10.1007/s002679900124](https://doi.org/10.1007/s002679900124). 

“Ilmanlaatu - Ilmatieteen laitos.” Ilmatieteen laitos, [www.ilmatieteenlaitos.fi/teematietoa-ilmanlaadusta](https://www.ilmatieteenlaitos.fi/teematietoa-ilmanlaadusta). 

“What is the air quality index?” Helsinki Region Environmental Services HSY, [www.hsy.fi/en/air-quality-and-climate/air-protection-and-health/what-is-the-air-quality-index/](https://www.hsy.fi/en/air-quality-and-climate/air-protection-and-health/what-is-the-air-quality-index/). 


[^1]: [https://web.archive.org/web/20190403173005/https://en.ilmatieteenlaitos.fi/air-quality-index](https://web.archive.org/web/20190403173005/https://en.ilmatieteenlaitos.fi/air-quality-index)

[^2]: [https://en.ilmatieteenlaitos.fi/air-quality-index](https://en.ilmatieteenlaitos.fi/air-quality-index)

[^3]: [https://www.hsy.fi/en/air-quality-and-climate/air-protection-and-health/what-is-the-air-quality-index/](https://www.hsy.fi/en/air-quality-and-climate/air-protection-and-health/what-is-the-air-quality-index/)
