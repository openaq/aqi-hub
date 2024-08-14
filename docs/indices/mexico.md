# Mexico

## Air Quality Index (AQI)

## Background

```js

import {breakpointsTable} from "../components/table.js";
import { parseBreakpointsCsv, tableReshape, colorScaleReshape } from '../utils/utils.js';
import { colorScale } from '../components/color-scale.js';
```

```js
const breakpoints = await FileAttachment('../data/mexico/breakpoints.csv').text();
const data = parseBreakpointsCsv(breakpoints);
```

Mexico’s Air Quality and Health Risk index, Índice de Calidad del Aire y Riesgos a la Salud, accounts for pollutant concentrations of PM<sub>2.5</sub>, PM<sub>10</sub>, CO, O<sub>3</sub>, SO<sub>2</sub>, and NO<sub>2</sub>. It utilizes hourly average concentrations, 8-hour moving average concentrations, and 12-hour moving average concentrations.

The Norma Oficial Mexicana, Official Mexican Standard, establishes the guidelines for obtaining Air Quality and Health Risk Index. This Official Mexican Standard not only unifies the air quality index among all cities and territories with pre-existing air quality indices, but also promotes the dissemination of those who did not yet provide such information. A single method of calculation and dissemination guidelines are established and expected to be applied by the state or municipal governments responsible for air quality monitoring.

The guidelines for calculating and communicating the Air Quality and Health Risks Index was approved by the National Consultative Committee for the Standardization of the Environment and Natural Resources on December 8, 2017 for publication. Previous to this, local regulations and index standards were developed, however they lacked official documentation. The Official Mexican Standard was confirmed as definitive by the National Consultative Committee for the Standardization of the Environment of Natural Resources on October 10, 2019.

## Color scale

Mexico’s Air Quality and Health Risk index uses a color scale comprised of five levels:

```js
colorScale(colorScaleReshape(data))
```

In cases of stations under maintenance and/or without viable information, the associated color is reported as white.

## Methods[1]

Mexico’s Air Quality and Health Risk index establishes the following breakpoint concentrations:

<table>
  <tr>
   <td>Pollutant
   </td>
   <td>Avg. Period
   </td>
   <td>Good
   </td>
   <td>Acceptable
   </td>
   <td>Bad
   </td>
   <td>Very bad
   </td>
   <td>Extremely Bad
   </td>
  </tr>
  <tr>
   <td>PM<sub>2.5</sub>
<p>
µg/m<sup>3</sup>
   </td>
   <td>24 hr.
   </td>
   <td>0-25
   </td>
   <td>26-45
   </td>
   <td>46-79
   </td>
   <td>80-147
   </td>
   <td>147+
   </td>
  </tr>
  <tr>
   <td>PM<sub>10</sub>
<p>
µg/m<sup>3</sup>
   </td>
   <td>12 hr.
   </td>
   <td>0-50
   </td>
   <td>51-75
   </td>
   <td>76-155
   </td>
   <td>156-235
   </td>
   <td>236+
   </td>
  </tr>
  <tr>
   <td>CO
<p>
ppm
   </td>
   <td>8 hr.
   </td>
   <td>0-8.75
   </td>
   <td>8.76-11.00
   </td>
   <td>11.01-13.30
   </td>
   <td>13.31-15.50
   </td>
   <td>15.51+
   </td>
  </tr>
  <tr>
   <td>O<sub>3</sub>
<p>
ppm
   </td>
   <td>1 hr.
   </td>
   <td>0-0.051
   </td>
   <td>0.052-0.095
   </td>
   <td>0.096-0.135
   </td>
   <td>0.136-0.175
   </td>
   <td>0.176+
   </td>
  </tr>
  <tr>
   <td>O<sub>3</sub>
<p>
ppm
   </td>
   <td>8 hr.
   </td>
   <td>0-0.051
   </td>
   <td>0.052-0.070
   </td>
   <td>0.071-0.092
   </td>
   <td>0.093-0.114
   </td>
   <td>0.115+
   </td>
  </tr>
  <tr>
   <td>SO<sub>2</sub>
<p>
ppm
   </td>
   <td>24 hr.
   </td>
   <td>0-0.008
   </td>
   <td>0.009-0.110
   </td>
   <td>0.111-0.165
   </td>
   <td>0.166-0.220
   </td>
   <td>0.221+
   </td>
  </tr>
  <tr>
   <td>NO<sub>2</sub>
<p>
ppm
   </td>
   <td>Hourly
   </td>
   <td>0-0.107
   </td>
   <td>0.108-0.210
   </td>
   <td>0.211-0.230
   </td>
   <td>0.231-0.250
   </td>
   <td>0.250+
   </td>
  </tr>
</table>

PM<sub>2.5</sub> and PM<sub>10</sub> concentrations are reported under local conditions of pressure and air temperature as long as there remains no regulation in Mexico defining such methods of measurements in ambient air. For O<sub>3</sub>, CO, NO<sub>2</sub>, and SO<sub>2</sub> concentrations, the following measurement method and Norma Oficial Mexicana (NOM) procedures are used.

NOM standards for each pollutant provide measurement methods for determining their concentrations in ambient air along with the procedures for calibration of measuring equipment.

<table>
  <tr>
   <td>Pollutant
   </td>
   <td>NOM Procedures
   </td>
  </tr>
  <tr>
   <td>O<sub>3</sub>
   </td>
   <td><a href="https%3a%2f%2fbiblioteca.semarnat.gob.mx%2fjanium%2fDocumentos%2fCiga%2fagenda%2fDOFsr%2fNOM_036.pdf">NOM-036-SEMARNAT-1933</a>
   </td>
  </tr>
  <tr>
   <td>NO<sub>2</sub>
   </td>
   <td><a href="https://biblioteca.semarnat.gob.mx/janium/Documentos/Ciga/agenda/DOFsr/NOM_037.pdf">NOM-037-SEMARNAT-1933</a>
   </td>
  </tr>
  <tr>
   <td>SO<sub>2</sub>
   </td>
   <td><a href="https://biblioteca.semarnat.gob.mx/janium/Documentos/Ciga/agenda/DOFsr/NOM_038.pdf">NOM-038-SEMARNAT-1933</a>
   </td>
  </tr>
  <tr>
   <td>CO
   </td>
   <td><a href="https://biblioteca.semarnat.gob.mx/janium/Documentos/Ciga/agenda/DOFsr/NOM034.pdf">NOM-034-SEMARNAT-1933</a>
   </td>
  </tr>
</table>

PM<sub>2.5</sub> and PM<sub>10</sub> use a 12-hour weighted moving average concentration, using the NowCast calculation method established by the US-EPA. This is used as the established average 24-hour concentration prevents “timely information to the population about risks of exposure to high levels of contamination by this pollutant” [2].  CO uses an 8-hour moving average concentration, NO<sub>2</sub> uses an average hourly concentration, and SO<sub>2</sub> uses a 24-hour moving average concentration as an approximation of the 24-average. O<sub>3</sub> is measured using both an 8-hour moving average concentration and average hourly concentration.

Concentrations of PM<sub>2.5</sub> and PM<sub>10</sub> are rounded to the nearest integer using standard rounding conventions. Concentrations of O<sub>3</sub>, NO<sub>2</sub>, and SO<sub>2</sub> are rounded to three significant digits, while CO is rounded to two significant digits.

The hourly average concentration is defined as the “arithmetic mean of the concentrations recorded in the 60-minute time interval delimited by minutes of 0 and 59 of the hour.” It is considered valid when calculated with at least ¾ of the concentrations recorded within the hour.

For calculating the 8-hour moving average concentration, at least ¾  of the average hourly concentrations are required. Therefore for calculating O<sub>3</sub> and CO, a minimum of 6 hourly average concentration information is required. The 8-hour moving average is calculated by taking the average of the selected hour with the previous seven concentrations recorded in the prior. “For example, to estimate the eight-hour moving average of 1:00 p.m., the average of the hourly concentrations recorded for a minimum of six hours between 6:00 a.m. and 1:00 p.m. is calculated.”[1]

For calculating the 12-hour weighted moving average of PM<sub>2.5</sub> and PM<sub>10</sub> concentrations, the following equation is used:

```tex

\overline{C}=\frac{\sum_{i=1}^{N}C_iW^{i-1}}{\sum_{i=1}^{N}W^{i-1}}

```

```tex

W = \begin{cases}

  w,  \text{if } w > 0.5, \\

  0.5, \text{if } w \leq 0.5 .

\end{cases}

w = 1 - \frac{C_{max}-C_{min}}{C_{max}}

```

In order for the 12-hour moving concentration to be valid, at least ⅔ of the most recent 12 prior hours of measurement are required for the calculation. If this condition is not met, then the calculation should not be carried out. Additionally, the value of i, representing the consecutive hour of measurement, should be maintained even when there are hours that lack measured concentrations. For example, if within the most recent three hours of measurement there is only data for hours 1 and 3, the weighting of the concentration of hour 1 should remain as C<sub>1</sub>W<sup>0</sup> and the weighing of hour 3 should remain C<sub>2</sub>W<sup>3</sup>, as opposed to C<sub>2</sub>W<sup>1</sup>. The consecutive hour of measurement term remains i=3 as opposed to i=2 [1].

For calculating the 8-hour moving average concentration, at least ¾ of the average hourly concentrations are required. Therefore for calculating SO<sub>2</sub>, a minimum of 18 hourly average concentration data is required. The 24-hour moving average is calculated by taking the average of the selected hour with the 23 concentrations recorded prior. “For example, to estimate the

24-hour moving average of 10:00 a.m., the average of the hourly concentrations recorded for a minimum of 18 hours between 10:00 a.m. and 9:00 a.m. of the previous day is calculated” [1].

## Example

12-hour weighted moving average calculation:

Suppose the following PM<sub>2.5</sub> monitoring data is reported in µg/m<sup>3</sup>:

<table>
  <tr>
   <td>1 a.m.
   </td>
   <td>2 a.m.
   </td>
   <td>3 a.m.
   </td>
   <td>4 a.m.
   </td>
   <td>5 a.m.
   </td>
   <td>6 a.m.
   </td>
   <td>7 a.m.
   </td>
   <td>8 a.m.
   </td>
   <td>9 a.m.
   </td>
   <td>10 a.m.
   </td>
   <td>11 a.m.
   </td>
   <td>12 p.m.
   </td>
  </tr>
  <tr>
   <td>51
   </td>
   <td>82
   </td>
   <td>75
   </td>
   <td>90
   </td>
   <td>88
   </td>
   <td>53
   </td>
   <td>60
   </td>
   <td>74
   </td>
   <td>22
   </td>
   <td>13
   </td>
   <td>10
   </td>
   <td>12
   </td>
  </tr>
</table>

1. The weighted value is calculated:

    w = 1- (c max - c min) / c max = 1- (90-10)/90 = 0.11 &lt; 0.5, thus W = 0.5

2. [12(.5)^0 + 10(.5)^1 + 13(.5)^2 + 22(.5)^3 + 74(.5)^4 + 60(.5)^5 + 53(.5)^6 + 88(.5)^7 + 90(.5)^8 + 75(.5)^9 + 82(.5)^10 + 51(.5)^11] / [(.5)^0 + (.5)^1 + (.5)^2 + (.5)^3 + (.5)^4 + (.5)^5 + (.5)^6 + (.5)^7 + (.5)^8 + (.5)^9 + (.5)^10 + (.5)^11] = 31.618/15.813= 15.813 µg/m<sup>3</sup>
3. Applying rounding, the weighted 12-hour moving average concentration for 12 p.m. is 16 µg/m<sup>3</sup>.

## References

[1] [https://sinaica.inecc.gob.mx/archivo/noms/NOM-172-SEMARNAT-2019-Indice-AIRE-y-SALUD.pdf](https://sinaica.inecc.gob.mx/archivo/noms/NOM-172-SEMARNAT-2019-Indice-AIRE-y-SALUD.pdf)

[2] [https://www.gob.mx/cms/uploads/attachment/file/554425/comunicado_indice_calidad_aire_05_2020_FINAL_v3.pdf](https://www.gob.mx/cms/uploads/attachment/file/554425/comunicado_indice_calidad_aire_05_2020_FINAL_v3.pdf)

Other useful links:

[http://www.aire.cdmx.gob.mx/default.php?opc=%27ZaBhnmI=&dc=%27Zw==](http://www.aire.cdmx.gob.mx/default.php?opc=%27ZaBhnmI=&dc=%27Zw==)

[https://sinaica.inecc.gob.mx/pags/noms.php](https://sinaica.inecc.gob.mx/pags/noms.php)
