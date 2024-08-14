
# Thailand

## Air Quality Index (AQI)

```js
import {breakpointsTable} from "../components/table.js";
import { parseBreakpointsCsv, tableReshape, colorScaleReshape } from '../utils/utils.js';
import { colorScale } from '../components/color-scale.js';
const breakpoints = await FileAttachment('../data/thailand/breakpoints.csv').text();
const data = parseBreakpointsCsv(breakpoints);
```

## Background

The Thailand air quality index (AQI) was developed by the Thailand Pollution Control Department (PCB). Six criteria pollutants, PM<sub>10</sub>, PM<sub>2.5</sub>, CO, O<sub>3</sub>, SO<sub>2</sub>, and NO<sub>2</sub> are covered in the methodology. The Thailand AQI reports a daily AQI value based on the reported pollutants.

## Color scale

The Thailand AQI scale is composed of 6 value bands ranging from 0 to 201, with a distinct color for each band.

```js
colorScale(colorScaleReshape(data))
```

## Methods

The Thailand AQI uses a sub-index method where each pollutant is calculated against pollutant specific breakpoints into a pollutant sub-index value. All pollutants are then compared and the largest sub-index value determines the full composite AQI value. There is no specific guidance provided on the minimum number of pollutants required to compute a full composite index.

Pollutant breakpoints are defined in the table below:

```js
breakpointsTable(data)
```

<div class="note">  
pollutant concentration levels that exceed the minimum value of the highest index range, i.e. “Impact on health”, are automatically given an AQI of 201. This is not directly documented in the source material but is demonstrated in the interactive calculator. This solves an issue wherein the highest index range does not have ceiling values i.e. ${tex`I_j`} and ${tex`X_j`}. There is conflicting information in the source material.  
</div>

Using the breakpoint values in the table above a piecewise linear function is used to convert the concentration values to AQI values. There is no specific guidance in the source material about rounding or truncating concentration values, but based on the table above values are either whole numbers or up to one decimal place of precision. The piecewise linear function is defined as:

```js
import {piecewiseLatexDoc} from '../components/piecewise.js';
```

```js
piecewiseLatexDoc('AQI')

```

### Example

## References

“ข้อมูลดัชนีคุณภาพอากาศ.” Air4Thai, [air4thai.pcd.go.th/webV3/\#/AQIInfo](http://air4thai.pcd.go.th/webV3/\#/AQIInfo)

“ประกาศกรมควบคุมมลพิษ. เรื่อง ดัชนีคุณภาพอากาศของประเทศไทย. พ.ศ. ๒๕๖๖.” ราชกิจจานุเบกษา, เลม ๑๔๐ ตอนพิเศษ ๑๕๗, 3 July 2023, [www.pcd.go.th/wp-content/uploads/2023/07/pcdnew-2023-07-05\_08-52-06\_006507.pdf](https://www.pcd.go.th/wp-content/uploads/2023/07/pcdnew-2023-07-05\_08-52-06\_006507.pdf)
