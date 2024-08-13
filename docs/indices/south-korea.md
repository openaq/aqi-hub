# South Korea

## Comprehensive air-quality index (CAI)

## Background

South Korea uses a Comprehensive air-quality index (CAI) that accounts for six primary pollutants: PM<sub>2.5</sub>, PM<sub>10</sub>, CO, SO<sub>2</sub> and NO<sub>2</sub>. Although not explicitly stated, the CAI is assumed to be reported as a daily index value from reported data in the AIRKOREA Current Air Quality map [^3].

AIRKOREA provides air pollution information on their website since December 2005 [^4]. However, the Korean Ministry of Environment has released air quality levels of 16 stations nearby the World Cup Stadium on a real-time basis since April 2002 [^4].

## Color scale

```js

import {breakpointsTable} from "../components/table.js";
import { parseBreakpointsCsv, tableReshape, colorScaleReshape } from '../utils/utils.js';
import { colorScale } from '../components/color-scale.js';

const breakpoints = await FileAttachment('../data/south-korea/breakpoints.csv').text();
const data = parseBreakpointsCsv(breakpoints);

```

```js
colorScale(colorScaleReshape(data))
```


The system also provides a set of pictograms for representing each level in the scale [^1]:

```js
import {FileAttachment} from "npm:@observablehq/stdlib";
```

<div style="display:flex;gap: 20px;">

```js
FileAttachment('../imgs/211_character01.webp').image()
```

```js
FileAttachment('../imgs/211_character02.webp').image()
```

```js
FileAttachment('../imgs/211_character03.webp').image()
```

```js
FileAttachment('../imgs/211_character04.webp').image()
```

</div>

## Methods



CAI values are calculated for each of the six pollutants and the maximum is used as the CAI value for that station[^1]. The following piecewise linear function is used to calculate each pollutant sub-index:


```js
breakpointsTable(data)
```


```js
import {piecewiseLatexDoc} from '../components/piecewise.js';
```

```js
piecewiseLatexDoc('CAI')

```

PM<sub>2.5</sub> and PM<sub>10 </sub> use a 24-hour forecast moving average in CAI calculation. The 24-hour forecast is calculated using the following equation [^1] :

```tex

C_{24E} = \frac{(C_{12} \times 12 + C_{4} \times 12 )}{24}

```

Where ${tex`C_{12}`} is the 12 hour mean defined as:

```tex

C_{12} = \frac{(C_i + C_{i-1} + C_{i-2} + C_{i-3}...+ C_{i-11})}{12}

```

and where ${tex`C_{4}`} is the 4 hour mean defined as:

```tex

C_{4} = \frac{( C_{ai} + C_{a(i-1)} + C_{a(i-2)} + C_{a(i-3)})}{4}

```

If the concentration for the interval is less than the defined threshold M then the concentration interval remained unadjusted, if not an adjusted value is used.

```tex

M =
\begin{cases}
70 \, \mu \text{g/m}^3 & \text{for PM}_{10} \\
30 \, \mu \text{g/m}^3 & \text{for PM}_{2.5}
\end{cases}

```

```tex

C_i ＜ M \Rightarrow C_{ai} = C_i

```

If the concentration at interval i is greater than or equal to the defined threshold value M
M, and the ratio of the concentration at interval i to the concentration at interval 12 is either less than 0.9 or greater than 1.7, then the adjusted concentration at interval i is equal to the concentration at interval i.

```tex

Ci \geq M, \frac{C_i}{C_{12}} ＜ 0.9~or~\frac{C_i}{C_{12}} ＞ 1.7 \Rightarrow C_{ai} = C_{i}

```

If the concentration at interval i is greater than or equal to the defined threshold value
M, and the ratio of the concentration at interval i to the concentration at interval 12 is between 0.9 and 1.7 (inclusive), then the adjusted concentration at intervali is 75% of the concentration at interval i.

```tex

Ci \geq M, \frac{0.9 \leq C_{i}}{C_{12} \leq 1.7} \Rightarrow C_{ai} =0.75 \times C_{i}

```

There are no restrictions included for the minimum number of pollutants needed for a valid calculation. There is also no provided information on rounding or truncating conventions.

AIRKOREA does provide information on how the CAI is adjusted if more than two pollutants exceed the ‘bad’ category [^2]. If one pollutant exceeds, its value becomes the CAI. If two or more pollutants are exceeding, the pollutant with the maximum value is described as the responsible pollutant and 50 is added to the maximum value to become the CAI [^1]. If three pollutants are exceeding, the pollutant with the maximum value is described as the responsible pollutant, and 75 is added to the maximum value to become the CAI [^1].

## References

[^1]: [https://www.airkorea.or.kr/eng/khaiInfo?pMENU_NO=166](https://www.airkorea.or.kr/eng/khaiInfo?pMENU_NO=166)

[^2]: [https://airkorea.or.kr/web/khaiInfo?pMENU_NO=129](https://airkorea.or.kr/web/khaiInfo?pMENU_NO=129)

[^3]: [https://www.airkorea.or.kr/eng/currentAirQuality?pMENU_NO=68](https://www.airkorea.or.kr/eng/currentAirQuality?pMENU_NO=68)

[^4]: [https://www.airkorea.or.kr/eng/contents/contentView/?pMENU_NO=169&cntnts_no=21](https://www.airkorea.or.kr/eng/contents/contentView/?pMENU_NO=169&cntnts_no=21)