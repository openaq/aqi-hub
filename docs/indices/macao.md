# Macao

## Air Quality Index (AQI)

## Background

Macao’s Air Quality Index (AQI) accounts for pollutant concentrations of PM<sub>2.5</sub>, PM<sub>10</sub>, CO, O<sub>3</sub>, SO<sub>2</sub>, and NO<sub>2</sub>. It uses hourly, 8-hour, and 24-hour averaging periods and reports a real-time and daily AQI.

Macao adopted its current AQI guidelines in January 2021. It seems to have updated concentration values to reflect the guidelines established in the World Health Organization Air Quality Guidelines (WHO AQG) Global Update 2005, following the annual mean PM<sub>2.5</sub> concentrations set by the WHO AQG interim target-2 [1] and matching the guidelines for a “good” level [2].The original values for Macao’s AQI are not yet able to be referenced. Calculations are based on data obtained from an automatic monitoring network using real-time pollutant concentrations.

The Macao AQI is based on definitions documented in the World Health Organization Air Quality Guidelines (WHO AQG) Global Update 2005. This defines the meaning of AQI as “useful communication tools in translating technical air pollution information into information that the public can understand and use.” [3] Standards established by the WHO AQG are considered to be the most stringent guide values for pollutant concentrations.

The Macao AQI classifies “good” air quality levels equal or lower than established levels in the WHO AQG, from index levels 50 to 100. Macao also references the concentration values in “Macau Environmental Quality Standards - Ambient Air Quality Standards (experimental)” which reference established PM<sub>10</sub>, PM<sub>2.5</sub>, and SO<sub>2</sub> interim values and “Air quality guideline” values from the WHO AQS.

The Macao AQI references established concentrations of PM<sub>10</sub>, PM<sub>2.5</sub>, O<sub>3</sub>, NO<sub>2</sub>, and SO<sub>2</sub> as well as interim targets for the levels of PM, O<sub>3</sub> and SO<sub>2</sub> from the WHO AQI 2005 update. The interim target-2 values are used for analyzing PM<sub>10</sub>, PM<sub>2.5</sub>, and SO<sub>2</sub> for sub-index values of 50 and 100, encompassing the “good” classification. For classification of 50 for the sub-index for NO<sub>2</sub>, 50% of the NO<sub>2</sub> “Air quality guideline” in the WHO AQG was used, while for 100, 100% of the concentration value was used. For classification of 50 for the sub-index level of O<sub>3</sub>, 80% of the O<sub>3</sub> “Air quality guideline” in the WHO AQG was used. For a sub-level of 100, the interim-target 1 value for O<sub>3</sub> was referenced, and for 200, the O<sub>3</sub> “High levels” guide value was used in the WHO AQG. For a sub-index level of 100 in CO, the reference concentration is assumed to be pulled from “Macau Environmental Quality Standards - Ambient Air Quality Standards (experimental).”

For selection of “the rest of the concentration breakpoints,” the Macao AQI refers to the National Environmental Protection Standard of the People’s Republic of China “AQI Technical Regulation of Ambient AQI” (HJ633-2012).

## Color scale [4]

```js

import {breakpointsTable} from "../components/table.js";
import { parseBreakpointsCsv, tableReshape, colorScaleReshape } from '../utils/utils.js';

```

```js
import { colorScale } from '../components/color-scale.js';
```

```js
const breakpoints = await FileAttachment('../data/macao/breakpoints.csv').text();

const data = parseBreakpointsCsv(breakpoints);
```


Macao uses a color scale comprised of six levels:

```js
colorScale(colorScaleReshape(data))
```

## Methods [4]

Macau provides methods for both real-time AQI and a daily AQI, using different averaging periods for each.


```js
breakpointsTable(data)
```


The running average of the most recent time period is used for all real-time sub-index calculations. PM<sub>10</sub>, PM<sub>2.5</sub>, and SO<sub>2</sub> use a running average of the most recent 24-hours. Example averaging periods include 01hr-24hr, 02hr-25hr, 03hr-26hr etc. O<sub>3</sub> and CO use a running average of the most recent 8-hours. Example averaging periods include 01hr-8hr, 02hr-09hr, 03hr-10hr, etc. NO<sub>2</sub> uses an hourly average, however it is not specified how many values are recorded per hour for calculations.

For PM<sub>2.5</sub> and PM<sub>10</sub> sub-index calculations, the time period average of the day, from 01h-24h, is used in the daily review calculation. For CO, O<sub>3</sub>, and NO<sub>2</sub> sub-index calculations, the highest time period average of the day is used.

The official reference documentation does not provide any guidance on minimum data coverage requirements or how to handle missing data for averaging periods. It also does not state any rounding or truncating conventions.

A [piecewise linear function](https://en.wikipedia.org/wiki/Piecewise_linear_function) is used to calculate the sub-index of each individual pollutant:

```js
import {piecewiseLatexDoc} from '../components/piecewise.js';
```

```js
piecewiseLatexDoc('AQI')

```


After determining the levels for each pollutant, the highest sub-index is used to determine the composite air quality standard value of the station. There is no specified minimum number of sub-index values required to compute the composite index referenced. If the composite index exceeds 100, indicating an air quality level of bad to harmful, the major pollutant will also be indicated.

```tex

{AQI} = {Max}({I}_{PM_{10}},{I}_{PM_{2.5}},{I}_{SO_{2}},{I}_{O_{3}},{I}_{CO})

```

### Example

<table>
  <tr>
   <td>Pollutant
   </td>
   <td>Average Concentration per Period
   </td>
   <td>Sub-Index
   </td>
   <td>Sub-Index Level
   </td>
  </tr>
  <tr>
   <td>PM<sub>2.5</sub>
   </td>
   <td>24.4 µm/m<sup>3</sup>
   </td>
   <td>48
   </td>
   <td>Good
   </td>
  </tr>
  <tr>
   <td>PM<sub>10</sub>
   </td>
   <td>143.5 µm/m<sup>3</sup>
   </td>
   <td>130
   </td>
   <td>Bad
   </td>
  </tr>
  <tr>
   <td>CO
   </td>
   <td>3.8 mm/m<sup>3</sup>
   </td>
   <td>40
   </td>
   <td>Good
   </td>
  </tr>
  <tr>
   <td>O<sub>3</sub>
   </td>
   <td>96.2 µm/m<sup>3</sup>
   </td>
   <td>60
   </td>
   <td>Moderate
   </td>
  </tr>
  <tr>
   <td>SO<sub>2</sub>
   </td>
   <td>17.8 µm/m<sup>3</sup>
   </td>
   <td>45
   </td>
   <td>Good
   </td>
  </tr>
  <tr>
   <td>NO<sub>2</sub>
   </td>
   <td>73.5 µm/m<sup>3</sup>
   </td>
   <td>87
   </td>
   <td>Good
   </td>
  </tr>
</table>

AQI = Maximum Sub Index = PM<sub>10</sub> Sub Index = 114.8

<div class="caution" label="">The AQI is bad, with an index of 114.8, due to PM<sub>10</sub> concentrations.
</div>

The air quality of this example is considered bad. The composite AQI is determined as the highest sub-index value, in this case the value of PM<sub>10</sub> at 114.8. As specified in the Macao AQI, the major pollutant must be stated as the index exceeds 100.

## References

[1] [https://www.macaubusiness.com/air-quality-guideline-standards-raised/](https://www.macaubusiness.com/air-quality-guideline-standards-raised/)

[2] [https://macaonews.org/news/community/observatory-expects-more-poor-air-quality-days-with-new-aqi/](https://macaonews.org/news/community/observatory-expects-more-poor-air-quality-days-with-new-aqi/)

[3] [https://iris.who.int/bitstream/handle/10665/107823/9789289021920-eng.pdf?sequence=1](https://iris.who.int/bitstream/handle/10665/107823/9789289021920-eng.pdf?sequence=1) (pg185)

[4] [Definition of Air Quality Index(1) (Effective from January 2021)](https://cms.smg.gov.mo/uploads/tinymce//sitecontent/CCAA/IQA/New_Definition_of_Air_Quality_Index.pdf)

Other potentially useful links:

[https://www.smg.gov.mo/en/subpage/784/page/347](https://www.smg.gov.mo/en/subpage/784/page/347)

[https://gdee.gd.gov.cn/attachment/0/478/478309/3739643.pdf](https://gdee.gd.gov.cn/attachment/0/478/478309/3739643.pdf)

[https://www.dspa.gov.mo/law17.aspx](https://www.dspa.gov.mo/law17.aspx)
