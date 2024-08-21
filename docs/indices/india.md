
# India

## Air Quality Index (AQI)

## Background

The India Air Quality Index (AQI) covers eight major pollutants: PM<sub>2.5</sub>, PM<sub>10</sub>, NO<sub>2</sub>, SO<sub>2</sub>, CO, O<sub>3</sub>, ammonia (NH<sub>3</sub>), and lead (Pb). Introduced in 2014 by the Central Pollution Control Board (CPCB) under the Ministry of Environment, Forest and Climate Change (MoEFCC), the system was developed to standardize air quality reporting across the country.

## Color scale

The India AQI has a six-color scale with category names (good to severe) and numerical ranges, ranging from 0 to 500, for each category.

```js

import {breakpointsTable} from "../components/table.js";
import { parseBreakpointsCsv, tableReshape, colorScaleReshape } from '../utils/utils.js';
import { colorScale } from '../components/color-scale.js';

```

```js
const breakpoints = await FileAttachment('../data/india/breakpoints.csv').text();

const data = parseBreakpointsCsv(breakpoints);
```

```js
colorScale(colorScaleReshape(data))
```

Note: Adapted from “National Air Quality Index” (2014), [http://app.cpcbccr.com/ccr_docs/FINAL-REPORT_AQI_.pdf](http://app.cpcbccr.com/ccr_docs/FINAL-REPORT_AQI_.pdf) [^1]. Accessed 16 Aug. 2024.

## Methods

India uses a sub-index method where the index value for each pollutant is calculated according to the following breakpoints:

```js
breakpointsTable(data)
```

Note: Adapted from “About National Air Quality Index” (n.d.), [https://cpcb.nic.in/displaypdf.php?id=bmF0aW9uYWwtYWlyLXF1YWxpdHktaW5kZXgvQWJvdXRfQVFJLnBkZg==](https://cpcb.nic.in/displaypdf.php?id=bmF0aW9uYWwtYWlyLXF1YWxpdHktaW5kZXgvQWJvdXRfQVFJLnBkZg==) [^4]. Accessed 16 Aug. 2024.

Particulate matter, SO<sub>2</sub>, NO<sub>2</sub>, Ammonia and lead are all calculated from 24-hour averages: this can be a natural day 24-hour period or a running 24 hour period [^2]. O<sub>3</sub> and CO are calculated from 8-hour averages: this can be an 8-hour daytime period, roughly 09:00-17:00. When the 8-hour average of O<sub>3</sub> exceeds 208 µg/m<sup>3</sup>, the 1 hour average value is used instead.  For 24-hour averaging periods 16 hours of valid data must be present or else the 24-hour is not considered valid and representative.

The India AQI uses a piecewise linear function to convert concentration values to sub-index values based on the breakpoints defined above. The piecewise linear function is defined as:

```js  
import {piecewiseLatexDoc} from '../components/piecewise.js';  
```

```js  
piecewiseLatexDoc('AQI')  
```

After calculating the sub-index for each measured pollutant all measured pollutants are compared and the maximum sub-index value is chosen to indicate the composite AQI value. The composite AQI value must be calculated against at minimum 3 pollutants, one of which must be particulate matter (PM<sub>2.5</sub> or PM<sub>10</sub>)[^3].

```tex
{AQI} = {Max}({I}_{PM_{10}},{I}_{PM_{2.5}},I_{SO_{2}},{I}_{SO_{2}},{I}_{O_{3}},{I}_{CO},{I}_{NH_3},{I}_{Pb})  
```

The CPCB also provides guidance on calculating city-wide AQIs based on the station level measurements. A city AQI requires a minimum of 3 stations and is advised in cities of 1 million residents or higher. Pollutant sub-index values are then averaged instead of choosing the maximum value as in the station-level AQI:

```tex
Average AQI= \frac{\sum{AQI_i}}{n}
```

where  

* ${tex`AQI_i`} - AQI of respective pollutants
* ${tex`n`} - Number of pollutants (minimum of 3)
* ${tex`m`} - Number of sites in the city (minimum of 3)

Monitoring sites are then averaged, weighted by the population of the 2km by 2km gridded area around the station, using a simplified calculation method[^1]:

```tex  
AQI_R = \frac{(\sum{\frac{AQI_i}{n}})_1 + (\sum{\frac{AQI_i}{n}})_2 + \dots + (\sum{\frac{AQI_i}{n}})_m}{m}
```

where  

* ${tex`AQI_R`} - City-wide AQI
* ${tex`AQI_i`} - AQI of respective pollutants
* ${tex`n`} - Number of pollutants (minimum of 3)
* ${tex`m`} - Number of sites in the city (minimum of 3)

See the CPCB documentation for other specifics around the computation of the city AQI.

## References

“About National Air Quality Index.” Central Pollution Control Board, [cpcb.nic.in/displaypdf.php?id=bmF0aW9uYWwtYWlyLXF1YWxpdHktaW5kZXgvQWJvdXRfQVFJLnBkZg==](https://cpcb.nic.in/displaypdf.php?id=bmF0aW9uYWwtYWlyLXF1YWxpdHktaW5kZXgvQWJvdXRfQVFJLnBkZg==).

Guttikunda, Sarath. “10 Frequently Asked Questions on Air Quality Index.” UrbanEmissions, [https://urbanemissions.info/wp-content/uploads/docs/SIM-46-2021.pdf](https://urbanemissions.info/wp-content/uploads/docs/SIM-46-2021.pdf).

“How is AQI calculated?” Central Pollution Control Board, [cpcb.nic.in/displaypdf.php?id=bmF0aW9uYWwtYWlyLXF1YWxpdHktaW5kZXgvSG93X0FRSV9DYWxjdWxhdGVkLnBkZg==](https://cpcb.nic.in/displaypdf.php?id=bmF0aW9uYWwtYWlyLXF1YWxpdHktaW5kZXgvSG93X0FRSV9DYWxjdWxhdGVkLnBkZg==).

“National Air Quality Index.” Central Pollution Control Board Ministry of Environment, Forests and Climate Change, 2014, [app.cpcbccr.com/ccr_docs/FINAL-REPORT_AQI_.pdf](http://app.cpcbccr.com/ccr_docs/FINAL-REPORT_AQI_.pdf).

[^1]: [http://app.cpcbccr.com/ccr_docs/FINAL-REPORT_AQI_.pdf](http://app.cpcbccr.com/ccr_docs/FINAL-REPORT_AQI_.pdf)

[^2]: [https://urbanemissions.info/wp-content/uploads/docs/SIM-46-2021.pdf](https://urbanemissions.info/wp-content/uploads/docs/SIM-46-2021.pdf)

[^3]: [https://cpcb.nic.in/displaypdf.php?id=bmF0aW9uYWwtYWlyLXF1YWxpdHktaW5kZXgvSG93X0FRSV9DYWxjdWxhdGVkLnBkZg==](https://cpcb.nic.in/displaypdf.php?id=bmF0aW9uYWwtYWlyLXF1YWxpdHktaW5kZXgvSG93X0FRSV9DYWxjdWxhdGVkLnBkZg==)

[^4]: [cpcb.nic.in/displaypdf.php?id=bmF0aW9uYWwtYWlyLXF1YWxpdHktaW5kZXgvQWJvdXRfQVFJLnBkZg==](https://cpcb.nic.in/displaypdf.php?id=bmF0aW9uYWwtYWlyLXF1YWxpdHktaW5kZXgvQWJvdXRfQVFJLnBkZg==)
