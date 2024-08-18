
# India

## Air Quality Index (AQI)

## Background

The India Air Quality Index (AQI) covers eight major pollutants: PM2.5, PM10, NO2, SO2, CO, O3, Ammonia (NH3), and lead (Pb). Introduced in 2014 by the Central Pollution Control Board (CPCB) under the Ministry of Environment, Forest and Climate Change (MoEFCC), the system was developed to standardize air quality reporting across the country.

## Color scale

The India AQI has a six color scale with category names (good to severe) and numerical ranges, ranging from 0 to 500, for each category.

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

Note: Adapted from “National Air Quality Index” (2014) [http://app.cpcbccr.com/ccr_docs/FINAL-REPORT_AQI_.pdf](http://app.cpcbccr.com/ccr_docs/FINAL-REPORT_AQI_.pdf) [^1]. Accessed August 16, 2024. 

## Method

India uses a sub-index method where the index value for each pollutant is calculated according to the following breakpoints:

```js
breakpointsTable(data)
```

Note: Adapted from “About National Air Quality Index” (n.d.), [https://cpcb.nic.in/displaypdf.php?id=bmF0aW9uYWwtYWlyLXF1YWxpdHktaW5kZXgvQWJvdXRfQVFJLnBkZg==](https://cpcb.nic.in/displaypdf.php?id=bmF0aW9uYWwtYWlyLXF1YWxpdHktaW5kZXgvQWJvdXRfQVFJLnBkZg==) [^4]

Particulate matter, SO2, NO2, Ammonia and lead are all calculated from 24 hour averages: this can be a natural day 24 hour period or a running 24 hour period [^2]. Ozone and Carbon Monoxide are calculated from 8 hour averages: this can be an 8 hour daytime period, roughly 09:00-17:00. When the 8 hour average of 03 exceeds 208 ug/m3, the 1 hour average value is used instead.  For 24 hour averaging periods 16 hours of valid data must be present or else the 24 hour is not considered valid and representative. 

The India AQI uses a piecewise linear function to convert concentration values to sub-index values based on the breakpoints defined above.The piecewise linear function is defined as:

```js  
import {piecewiseLatexDoc} from '../components/piecewise.js';  
```

```js  
piecewiseLatexDoc('AQI')  
```

After calculating the sub-index for each measured pollutant all measured pollutants are compared and the maximum sub-index value is chosen to indicate the composite AQI value. The composite AQI value must be calculated against at minimum 3 pollutants, one of which must be particulate matter (PM2.5 or PM10)[^3].

```tex
{AQI} = {Max}({I}_{PM_{10}},{I}_{PM_{2.5}},SI_{SO_{2}},{I}_{SO_{2}},{I}_{O_{3}},{I}*{CO},{I}_{NH*_3},{I}_{Pb})  
```

The CPCB also provides some guidance on calculating city-wide AQI based on the station level measurements. A city AQI requires a minimum of 3 stations and is advised in cities of 1 million residents or higher. Pollutant sub-index values are then averaged, instead of choosing the maximum value as in the station level AQI:

```tex

```

Monitoring sites are then averaged weighted by the population of the 2km x 2km gridded area around the station:

Other specifics around the computation of the city AQI are outlined by the CPCB and are out of scope for this document.

## Reference

“About National Air Quality Index.” Central Pollution Control Board, [[cpcb.nic.in/displaypdf.php?id=bmF0aW9uYWwtYWlyLXF1YWxpdHktaW5kZXgvQWJvdXRfQVFJLnBkZg==](https://cpcb.nic.in/displaypdf.php?id=bmF0aW9uYWwtYWlyLXF1YWxpdHktaW5kZXgvQWJvdXRfQVFJLnBkZg==)](http://cpcb.nic.in/displaypdf.php?id=bmF0aW9uYWwtYWlyLXF1YWxpdHktaW5kZXgvQWJvdXRfQVFJLnBkZg==](https://cpcb.nic.in/displaypdf.php?id=bmF0aW9uYWwtYWlyLXF1YWxpdHktaW5kZXgvQWJvdXRfQVFJLnBkZg==)).

Guttikunda, Sarath. “10 Frequently Asked Questions on Air Quality Index.” UrbanEmissions, [https://urbanemissions.info/wp-content/uploads/docs/SIM-46-2021.pdf](https://urbanemissions.info/wp-content/uploads/docs/SIM-46-2021.pdf).

“How is AQI calculated?” Central Pollution Control Board, [cpcb.nic.in/displaypdf.php?id=bmF0aW9uYWwtYWlyLXF1YWxpdHktaW5kZXgvSG93X0FRSV9DYWxjdWxhdGVkLnBkZg==](https://cpcb.nic.in/displaypdf.php?id=bmF0aW9uYWwtYWlyLXF1YWxpdHktaW5kZXgvSG93X0FRSV9DYWxjdWxhdGVkLnBkZg==).

“National Air Quality Index.” Central Pollution Control Board Ministry of Environment, Forests and Climate Change, 2014, [[app.cpcbccr.com/ccr_docs/FINAL-REPORT_AQI_.pdf](http://app.cpcbccr.com/ccr_docs/FINAL-REPORT_AQI_.pdf)]([http://app.cpcbccr.com/ccr_docs/FINAL-REPORT_AQI_.pdf](http://app.cpcbccr.com/ccr_docs/FINAL-REPORT_AQI_.pdf)]).

[^1]: [[http://app.cpcbccr.com/ccr_docs/FINAL-REPORT_AQI_.pdf](http://app.cpcbccr.com/ccr_docs/FINAL-REPORT_AQI_.pdf)](http://app.cpcbccr.com/ccr_docs/FINAL-REPORT_AQI_.pdf](http://app.cpcbccr.com/ccr_docs/FINAL-REPORT_AQI_.pdf))

[^2]: [[https://urbanemissions.info/wp-content/uploads/docs/SIM-46-2021.pdf](https://urbanemissions.info/wp-content/uploads/docs/SIM-46-2021.pdf)](https://urbanemissions.info/wp-content/uploads/docs/SIM-46-2021.pdf](https://urbanemissions.info/wp-content/uploads/docs/SIM-46-2021.pdf))

[^3]: [https://cpcb.nic.in/displaypdf.php?id=bmF0aW9uYWwtYWlyLXF1YWxpdHktaW5kZXgvSG93X0FRSV9DYWxjdWxhdGVkLnBkZg==](https://cpcb.nic.in/displaypdf.php?id=bmF0aW9uYWwtYWlyLXF1YWxpdHktaW5kZXgvSG93X0FRSV9DYWxjdWxhdGVkLnBkZg==)

[^4]: [[cpcb.nic.in/displaypdf.php?id=bmF0aW9uYWwtYWlyLXF1YWxpdHktaW5kZXgvQWJvdXRfQVFJLnBkZg==](https://cpcb.nic.in/displaypdf.php?id=bmF0aW9uYWwtYWlyLXF1YWxpdHktaW5kZXgvQWJvdXRfQVFJLnBkZg==)](http://cpcb.nic.in/displaypdf.php?id=bmF0aW9uYWwtYWlyLXF1YWxpdHktaW5kZXgvQWJvdXRfQVFJLnBkZg==](https://cpcb.nic.in/displaypdf.php?id=bmF0aW9uYWwtYWlyLXF1YWxpdHktaW5kZXgvQWJvdXRfQVFJLnBkZg==))
