# United Kingdom

## Daily Air Quality Index (DAQI)

## Overview

The United Kingdom’s Daily Air Quality Index (DAQI) accounts for five primary pollutants: PM2.5, PM10, O3, NO2 and SO2. The DAQI displays the air quality for the previous day. A forecast AQI also provides information on predicted pollutant levels for the next 5 days.

The United Kingdom Department for Environment Food & Rural Affairs (DEFRA) has developed the Daily Air Quality Index (DAQI). Following a review, Defra and the Devolved Administrations replaced the older UK Air Quality Index with the Daily Air Quality Index (DAQI) in 2012 [^3].

## Color scale

```js

import {breakpointsTable} from "../components/table.js";
import { parseBreakpointsCsv, tableReshape, colorScaleReshape } from '../utils/utils.js';
import { colorScale } from '../components/color-scale.js';

```

```js

const breakpoints = await FileAttachment('../data/uk/breakpoints.csv').text();
const data = parseBreakpointsCsv(breakpoints);

```

The composite index uses a four color color scale:

```js
colorScale(colorScaleReshape(data, false))
```

Note: Adapted from “Daily Air Quality Index” (n.d.), [https://uk-air.defra.gov.uk/air-pollution/daqi](https://uk-air.defra.gov.uk/air-pollution/daqi)  [^4]. Accessed August 12, 2024.

Sub-indexes have a separate, expanded color scale:

```js  
colorScale([  
  { label: 'Low', color: '#9cfe9c' },  
  { label: 'Low', color: '#30fe00'},  
  { label: 'Low', color: '#30ce00' },  
  { label: 'Moderate', color: '#fffe00' },  
  { label: 'Moderate', color: '#fecf02'},  
  { label: 'Moderate', color: '#fe9a01'},  
  { label: 'High', color: '#ff6363' },  
  { label: 'High', color: '#ff0000'},  
  { label: 'High', color: '#990000' },  
  { label: 'Very High', color: '#ce30fe'},  
])  
```  

Note: Adapted from “Guide to UK Air Pollution Information  
Resources” (June 2014), [https://uk-air.defra.gov.uk/assets/documents/reports/cat14/1406191156_060618_Guide_to_UK_Air_Pollution_Information_Resources-issue_2-FINAL.pdf](https://uk-air.defra.gov.uk/assets/documents/reports/cat14/1406191156_060618_Guide_to_UK_Air_Pollution_Information_Resources-issue_2-FINAL.pdf) [^1]. Accessed August 12, 2024.

## Methods

The sub-index DAQI values range from 1 to 10 and each correspond to a different category [^1]. The ‘Low’ category corresponds to index values 1 to 3, ‘Moderate’ from 4 to 6, ‘High’ from 7 to 9, and ‘Very high’ equal to 10. The DAQI is determined by the maximum concentration of the pollutants [^2].

Recorded pollutant data is assigned a sub-index value 1 through 10 according to the respective pollutant concentration banding.

```js
breakpointsTable(data, false)
```

Note: Adapted from “Guide to UK Air Pollution Information  
Resources” (June 2014), [https://uk-air.defra.gov.uk/assets/documents/reports/cat14/1406191156_060618_Guide_to_UK_Air_Pollution_Information_Resources-issue_2-FINAL.pdf](https://uk-air.defra.gov.uk/assets/documents/reports/cat14/1406191156_060618_Guide_to_UK_Air_Pollution_Information_Resources-issue_2-FINAL.pdf) [^1]. Accessed August 12, 2024.

The maximum sub-index is used as the overall DAQI for that station. It is reported as its respective category and corresponding color. All pollutant concentration values should be rounded to the nearest whole number integer value before applying it to the concentration breakpoints [^3]. For the 8-hour and daily mean concentration calculations, un-rounded hourly means should be used [^3].

When calculating the hourly, 8-hour or daily mean concentration, at least a 75% coverage rate is required. For calculating the hourly mean, at least 3 15 minute mean concentrations are required. For calculating an 8-hour mean, at least 6 hourly mean concentration values are required. For calculating a daily mean, 18 hourly mean concentrations are required.

## References

Forecasting: [https://uk-air.defra.gov.uk/forecasting/](https://uk-air.defra.gov.uk/forecasting/)

[^1]: [https://uk-air.defra.gov.uk/assets/documents/reports/cat14/1406191156_060618_Guide_to_UK_Air_Pollution_Information_Resources-issue_2-FINAL.pdf](https://uk-air.defra.gov.uk/assets/documents/reports/cat14/1406191156_060618_Guide_to_UK_Air_Pollution_Information_Resources-issue_2-FINAL.pdf)

[^2]: [https://uk-air.defra.gov.uk/air-pollution/daqi?view=more-info](https://uk-air.defra.gov.uk/air-pollution/daqi?view=more-info)

[^3]: [https://uk-air.defra.gov.uk/assets/documents/reports/cat14/1304251155_Update_on_Implementation_of_the_DAQI_April_2013_Final.pdf](https://uk-air.defra.gov.uk/assets/documents/reports/cat14/1304251155_Update_on_Implementation_of_the_DAQI_April_2013_Final.pdf)  

[^4]: [https://uk-air.defra.gov.uk/air-pollution/daqi](https://uk-air.defra.gov.uk/air-pollution/daqi)
