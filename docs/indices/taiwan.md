# Taiwan

## Air Quality Index (AQI)

## Summary

```js

import {breakpointsTable} from "../components/table.js";
import { parseBreakpointsCsv, tableReshape, colorScaleReshape } from '../utils/utils.js';
import { colorScale } from '../components/color-scale.js';

const breakpoints = await FileAttachment('../data/taiwan/breakpoints.csv').text();
const data = parseBreakpointsCsv(breakpoints);

```

Taiwan’s Air Quality Index (AQI) accounts for PM2.5, PM10, CO, O3, SO2, and NO2. Taiwan reports a daily AQI along with a real-time AQI.

The Ministry of Environment (MOENV) is responsible for air quality management and establishing and implementing AQIs. It also provides a map of AQI values across Taiwan for users.

The newest AQI documentation was implemented in December 2016, with the first air pollution control fees levied in 1994 [A].

## Color scale

Taiwan’s Air Quality Index is comprised of six categories:

```js
colorScale(colorScaleReshape(data))
```

Note that the Taiwan Air Quality Monitoring Network includes two categories within ‘Hazardous:’ 301-400 and 401-500. Each category has distinct breakpoints.

## Methods

The following is the pollutant breakpoint concentration values provided by MOENV:

```js
breakpointsTable(data)
```

The source material does not document specific sub-index calculation equations. However, through back-calculation of provided pollutant values on the MOENV Taiwan Air Quality Monitoring Network, it appears to follow the standard sub-index piecewise linear function:

```js
import {piecewiseLatexDoc} from '../components/piecewise.js';
```

```js
piecewiseLatexDoc('AQI')
```

### Daily AQI

The reported daily AQI is the maximum sub-index value calculated for each pollutant of the day. The concentrations of each pollutant in a day are averaged over the specific period to determine sub-index values. The equation used for calculating sub-indices is not provided.

In general, an 8 hour averaging period for O3 is used to report the AQI. However, there are a few areas in which using a 1 hour averaging period for O3 is beneficial for further precaution. In these areas, a sub-index value may be calculated using a 1 hour averaging period in addition to the value calculated using the standard 8 hour averaging period. The maximum sub-index value is reported.

A 1 hour averaging period for O3 is used when AQI values are calculated to be 301 or higher, as opposed to using an 8 hour period. A 24 hour averaging period for SO2 is used to calculate AQI values of 200 or greater, as opposed to a 1 hour period.

### Real-time AQI

MOENV also reports real-time AQI values to issue early warnings to the public and offers data for hourly monitoring. The real-time concentration for each pollutant is calculated based on varying equations and compared to the breakpoint concentration table to determine the sub-index. The maximum sub-index is equal to the real-time AQI value and leading pollutant.

For O3 using an 8 hour averaging period, the real-time concentration is equal to the value of the last 8 hour moving average rounded to the nearest integer. For example, for an 8 hour average concentration published at 9 a.m., data from 1 a.m. to 8 a.m. was averaged.

For O3 using a 1 hour averaging period, the real-time concentration is equal to the monitoring data at the time of reporting. A rounding convention is not specified.

For PM2.5 and PM10, the real-time concentrations are calculated using the following equation:

0.5 *average of the first 12 hours + 0.5* average of the first 4 hours.

```tex
C_{12} = \frac{\sum_{n=1}^{12} C_{n}}{12} 
```

```tex
C_{4} = \frac{\sum_{n=1}^{4} C_{n}}{4}
```

```tex
SI = 0.5 \times C_{12} + 0.5 \times C_{4}
```

6 out of the first 12 hour data entries and 2 out of the first 4 hour data entries are required for this equation to be valid. The moving average of PM2.5 is rounded to one decimal place, while the moving average of PM10 is rounded to the nearest integer. The rounding convention for the real-time concentration is not specified for either pollutant.

For CO, the real-time concentration is calculated using   a moving average of the last 8 hours. A rounding convention is not specified.

For SO2 using a 24 hour averaging period, the real-time concentration is equal to the average concentration values in the last 24 hours. For example, for a 24 hour average concentration published at 9 a.m., data from 9 a.m. yesterday to 8 a.m. today was averaged. A rounding convention is not specified.

For SO2 using a 1 hour averaging period, the real-time concentration is equal to the monitoring data at the time of reporting. A rounding convention is not specified.

For NO2, the real-time concentration is equal to the monitoring data at the time of reporting. A rounding convention is not specified.

## Example

## References

[1]<https://airtw.moenv.gov.tw/ENG/Information/Standard/AirQualityIndicator.aspx>
[2]
