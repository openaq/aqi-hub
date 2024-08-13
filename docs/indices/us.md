# United States of America

## Air Quality Index (AQI)

## Overview

The United States of America (US) uses an Air Quality Index that accounts for PM<sub>2.5</sub>, PM<sub>10</sub>, CO, O<sub>3</sub>, NO<sub>2</sub> and SO<sub>2</sub>. The US reports a daily AQI as well as a NowCast and Forecast AQI.

The US requires that Metropolitan Statistical Areas with a population of over 350,000 are required to report a daily AQI to the public, while forecasting and NowCast AQIs are voluntary \[1\]. AQI values may be reported at the individual’s discretion if AQI values for all pollutants remain below 50 for a year. However the AQI must be reported if a pollutant level rises to be above 50 during subsequent years. If the AQI for a specific pollutant remains below 50 for an extended period of time, such as a season or a year, that pollutant may be excluded from the AQI calculation \[1\].

The US AQI methodology was most recently updated May 6th, 2024 to implement stricter annual standards for PM<sub>2.5</sub> by altering breakpoint concentrations.

## Color scale\[1\]

```js

import {breakpointsTable} from "../components/table.js";
import { parseBreakpointsCsv, tableReshape, colorScaleReshape } from '../utils/utils.js';
import { colorScale } from '../components/color-scale.js';
const breakpoints = await FileAttachment('../data/us/breakpoints.csv').text();

const data = parseBreakpointsCsv(breakpoints);
```

The US EPA uses a six color scale:

```js
colorScale(colorScaleReshape(data))
```

Previous to the most recent update of the AQI Technical Assistance Document for Reporting of Air Quality Data issued in May 2024, the ‘Hazardous’ category had an upper limit of 500\. AQI values greater than 500 were considered “Beyond the AQI,” and the same warnings and cautions as the ‘Hazardous’ category were to be reported.

## Methods

```js
breakpointsTable(data)
```

### Forecast AQI

Forecast AQI predicts the next day’s AQI, usually issued in the afternoon for the next day by state and local air quality forecasters \[6\]. These utilize numerous sources such as weather forecast models, satellite images, air monitoring data, and computer models that estimate the travel of pollution through the air \[6\]. Forecast AQIs are mainly issued for O<sub>3</sub> and PM, however some areas also issue NO<sub>2</sub> and CO.

### Daily AQI

The daily AQI accounts for PM<sub>2.5</sub>, PM<sub>10</sub>, CO, O<sub>3</sub>, NO<sub>2</sub> and SO<sub>2</sub> concentrations.

First, the highest pollutant concentrations over their allotted averaging periods are identified and truncated. O<sub>3</sub> is truncated to 3 decimal places, while PM<sub>2.5</sub> and CO are both truncated to 1 decimal place. PM<sub>10</sub>, NO<sub>2</sub>, and SO<sub>2</sub> are truncated to an integer value.

The following piecewise linear function is used to calculate the sub-index AQI values using each pollutant’s breakpoint concentration:  

```js
import {piecewiseLatexDoc} from '../components/piecewise.js';
```

```js
piecewiseLatexDoc('AQI')
```


The resulting value is rounded to the nearest integer. The maximum AQI for all the pollutants is reported as the daily AQI.

For O<sub>3</sub>, the AQI corresponding to the 8-hour averaging period is required to be calculated. The AQI corresponding to the 1-hour averaging period may be calculated; if so, the higher AQI value must be reported \[1\]. 8-hour O<sub>3</sub> values do not define AQi values greater or equal to 301, therefore 1-hour concentrations are used to calculate these higher AQI values \[1\].

The EPA strengthened the primary annual standard for SO<sub>2</sub> in 2010\. Due to a lack of health information regarding upper breakpoint concentrations for SO<sub>2</sub>, the upper breakpoint continues to use a 24-hour averaging period for determining concentrations. The lower breakpoint concentrations were updated to use the daily maximum 1-hour SO<sub>2</sub> concentration \[1\]. 1-hour SO<sub>2</sub> concentrations do not define AQI values greater or equal to 200, therefore 24-hour concentrations are used to calculate these higher AQI values \[1\].

If the daily maximum 1-hour concentration for SO<sub>2</sub> is less than 305 ppb or if the 24-hour average is at least 205 ppb, the breakpoint concentrations can be used in the AQI calculation as normal. On the rare occasion where the daily maximum 1-hour concentration is greater or equal to 305, the value of the lower and upper breakpoints should be set to 200 to ensure the resulting AQI value to be the highest possible associated with the 1-hour concentration \[1\].

For AQI values within the Hazardous category greater than 500, calculation should be performed using the standard piecewise linear function and the concentration specified should be that of the AQI value of 500\. The pollutant concentration values at an AQI of 500 are as followed \[1\]:

| PM<sub>2.5</sub>  24 hr/ | PM<sub>10</sub> 24 hr. | CO 8 hr.  | O<sub>3</sub> 1 hr. | SO<sub>2</sub> 1 hr. | NO<sub>2</sub> 1 hr. |
| :---- | :---- | :---- | :---- | :---- | :---- |
| 325.4 µg/m3 | 604 µg/m3 | 50.4 ppm | 0.604 ppm | 1004 ppb | 2049 ppb |

### NowCast AQI

Given that the AQI represents a full day and is dependent on a relatively long term of data, the US EPA developed the NowCast algorithm to better represent short term air quality changes. The NowCast calculation methods use longer averaging periods when there is stable air quality and shorter averaging periods when the air quality is rapidly changing, such as during a fire or extreme winds \[3\].

NowCast values are only calculated for two pollutants, PM and O<sub>3</sub>, each with a distinct algorithm \[4\]. Both calculations require that 2 of the past 3 hourly data points must be valid \[4\]. It utilizes raw hourly concentrations without rounding or truncating as input.

Particulate Matter:
For calculating the NowCast for PM, the past 12 hours of PM measurements are used in units of µg/m3. First, calculate the range of concentration by subtracting the minimum value of the series (${tex\`M\_{min}\`}) from the maximum value of the series (${tex\`M\_{max}\`}). Then divide the resulting range by the maximum value of the series (${tex\`M\_{max}\`}). This yields what is called the scaled rate of change (${tex\`SRoC\`}).

```tex  
{SRoC} = \frac{M_{max} - M_{min}}{M_{max}}  
```

Next, the weight factor (WF) is determined from the scaled rate of change (SRoC) using the following equation:

```tex  
{WF} = \max\{1 - SRoC, 0.5\}  
```

If the WF is less than 0.5, it is set equal to 0.5 as it approximates a 3-hour average \[3\].

The NowCast is calculated using the following equation using the appropriate WF:

```tex
\frac{\sum_{i=1}^{n} \left( \text{C}_i \times \text{WF}^i \right)}{\sum_{i=1}^{n} \text{WF}^i}  
```

The final concentration value is then truncated to the nearest integer for PM<sub>10</sub> and 1 decimal place for PM<sub>2.5</sub>. It is then converted to an AQI to be reported using the aforementioned piecewise linear function.

Ozone:
The EPA implemented the latest calculation method of the O<sub>3</sub> NowCast designed to take into account the variability of the 1 hour concentrations while still remaining representative of the 8 hour average concentration \[1\]. The original method was established in 2012\. The method uses a Partial Least Squares (PLS) method based on the relationship of the 1 hour and 8 hour concentration data over the most recent 2 week rolling period \[1\].

There are two different methods used to calculate the O<sub>3</sub> NowCast value depending if the criteria for PLS calculation is met \[5\].

If the criterion is met and there is at least 1 hour of valid O<sub>3</sub> data within the past 3 hours, the PLS method is used \[5\]. The previous 2 weeks of hourly O<sub>3</sub> data, consisting of 336 data points, are considered in this calculation \[5\]. This method is used to better represent the 8-hour average value of O<sub>3</sub> concentrations and output an AQI value that more closely aligns with the daily AQI.

If the criterion is not met and there is at least 1 hour of valid O<sub>3</sub> data within the past 3 hours, the Surrogate method is used as a secondary method to produce an O<sub>3</sub> NowCast value \[5\]. This method uses the following simple linear equation:

```tex  
y = 0.85x + 4.5 ppb   
````

* ${tex`x`} = Hourly O<sub>3</sub> Value  
* ${tex`y`} = Resulting O<sub>3</sub> NowCast Value

The Surrogate method is used as a secondary method used to produce an O<sub>3</sub> NowCast value. It has been derived from linear regression between concurrent 8- hour average and 1-hour O<sub>3</sub> concentrations using historical data from approximately 40 monitoring sites across major continental US cities \[5\].

If there is no hourly O<sub>3</sub> data within the previous 3 hours, the NowCast will be N/A \[5\].

## References

\[2\] [https://www.airnow.gov/aqi/aqi-basics/](https://www.airnow.gov/aqi/aqi-basics/)

\[3\] [https://forum.airnowtech.org/t/the-nowcast-for-pm2-5-and-PM<sub>10</sub>/172](https://forum.airnowtech.org/t/the-nowcast-for-pm2-5-and-PM<sub>10</sub>/172)

\[4\] [https://www.airnow.gov/aqi/aqi-basics/using-air-quality-index](https://www.airnow.gov/aqi/aqi-basics/using-air-quality-index)

\[5\][https://forum.airnowtech.org/t/the-nowcast-for-ozone-2019-update-partial-least-squares-method/356](https://forum.airnowtech.org/t/the-nowcast-for-ozone-2019-update-partial-least-squares-method/356)

*Other Useful Links:*  
[https://www.epa.gov/sites/default/files/2018-01/documents/nowcastfactsheet.pdf](https://www.epa.gov/sites/default/files/2018-01/documents/nowcastfactsheet.pdf)

[https://www.epa.gov/system/files/documents/2024-02/pm-naaqs-air-quality-index-fact-sheet.pdf](https://www.epa.gov/system/files/documents/2024-02/pm-naaqs-air-quality-index-fact-sheet.pdf)

\[^1\]: Adapted from [https://www.airnow.gov/sites/default/files/2020-05/aqi-technical-assistance-document-sept2018.pdf](https://www.airnow.gov/sites/default/files/2020-05/aqi-technical-assistance-document-sept2018.pdf)

[https://forum.airnowtech.org/t/the-aqi-equation-2024-valid-beginning-may-6th-2024/453](https://forum.airnowtech.org/t/the-aqi-equation-2024-valid-beginning-may-6th-2024/453)

[https://usepa.servicenowservices.com/airnow/en/how-is-the-nowcast-algorithm-used-to-report-current-air-quality?id=kb\_article\_view\&sys\_id=bb8b65ef1b06bc10028420eae54bcb98\&spa=1](https://usepa.servicenowservices.com/airnow/en/how-is-the-nowcast-algorithm-used-to-report-current-air-quality?id=kb\_article\_view\&sys\_id=bb8b65ef1b06bc10028420eae54bcb98\&spa=1)

[https://www3.epa.gov/airnow/aqicalctest/nowcast.htm](https://www3.epa.gov/airnow/aqicalctest/nowcast.htm)  