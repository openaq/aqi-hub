# Vietnam

## Vietnam Air Quality Index (VN AQI)

## Background

The Vietnam Air Quality Index (VN AQI) accounts for pollutant concentrations of PM<sub>2.5</sub>, PM<sub>10</sub>, CO, O<sub>3</sub>, SO<sub>2</sub>, and NO<sub>2</sub>. It reports a daily and hourly AQI, as well as a NowCast value exclusive to particulate matter concentrations.

The VVN AQI is calculated using data from continuous automatic air quality stations across the country. The Daily AQI is the AQI value representing one day, while the Hourly AQI is the AQI value representing one hour.

The VN AQI guidelines were most recently updated in November 2019, replacing the decision of July 2011 on calculating air quality index [^1]. The General Department for Environment in the Ministry of Natural Resources and Environment created and implemented these decisions, in coordination with heads of departments in relevant organizations [^1].

## Color scale

```js
import {breakpointsTable} from "../components/table.js";
import { parseBreakpointsCsv, tableReshape, colorScaleReshape } from '../utils/utils.js';
import { colorScale } from '../components/color-scale.js';
const breakpoints = await FileAttachment('../data/vietnam/breakpoints.csv').text();
const data = parseBreakpointsCsv(breakpoints);
```

The Vietnam Air Quality Index consists of six categories:

```js
colorScale(colorScaleReshape(data))
```

_Note_: Adapted from "Các màu sắc nào biểu thị cho chất lượng môi trường không khí ô nhiễm? Mức độ ô nhiễm không khí nghiêm trọng nhất được quy định bằng màu gì?" (n.d.), <https://thuvienphapluat.vn/hoi-dap-phap-luat/83A155E-hd-cac-mau-sac-nao-bieu-thi-cho-chat-luong-moi-truong-khong-khi-o-nhiem-muc-do-o-nhiem-khong-khi-nghie.html?rel=hoidap\_chitietvb> [^2]. Accessed 5 Aug. 2024.

## Methods

```js
breakpointsTable(data)
```

_Note_: Adapted from "Quyết định 1459/QĐ-TCMT 2019 kỹ thuật tính toán và công bố chỉ số chất lượng không khí Việt Nam" (12 Nov. 2019), [thuvienphapluat.vn/van-ban/Tai-nguyen-Moi-truong/Quyet-dinh-1459-QD-TCMT-2019-ky-thuat-tinh-toan-va-cong-bo-chi-so-chat-luong-khong-khi-Viet-Nam-428215.aspx](https://thuvienphapluat.vn/van-ban/Tai-nguyen-Moi-truong/Quyet-dinh-1459-QD-TCMT-2019-ky-thuat-tinh-toan-va-cong-bo-chi-so-chat-luong-khong-khi-Viet-Nam-428215.aspx)[^1]. Accessed 28 June 2024.

<div class="note">
It is not specified in Vietnam’s documentation whether sub-index values are rounded or truncated, however the final AQI value is truncated. For the breakpoint concentrations and for AQI calculations, we assume that all data values are rounded to the nearest integer.
</div>

```tex  
% above referenced [^1] after "final AQI value is truncated"
```

The NowCast value is a weighted average of the 12 most recent 1-hour average values relative to the calculation time, and is reported for PM<sub>10</sub> and PM<sub>2.5</sub> pollutants only. The AQI value is calculated for the data of each monitoring station, and the final AQI value reported is the largest of the values for each parameter. The AQI calculation requires at least one of PM<sub>10</sub> and PM<sub>2.5</sub> parameters within the formula.

### Hourly AQI Calculation
In calculating the hourly index, the weight value of each PM<sub>2.5</sub> and PM<sub>10</sub> is first calculated for reporting the NowCast values. The weight value is equal to the minimum concentration over the maximum concentrations among the 12 hourly average values. The NowCast value can only be calculated if at least 3 valid 1-hour average values are collected, otherwise it is reported as “no data.”

First, the pollutant concentrations are averaged:

${tex`c_1 , c_2 , \dots, c_{12} `}= Averages of 1-hour monitoring values (with ${tex`c_1`} being the current 1-hour averaging monitoring value and ${tex`c_{12}`} being the 1-hour monitoring value 12 hours ago)  

The weight value, ${tex`w^*`}, is determined using the following equation:

```tex  
% step 1: define weighting factor w^\*  
w^* = \frac{c_{min}}{c_{max}}  
```

where  

* ${tex`c_{min}`} - Minimum value among the 12 hourly average values  
* ${tex`c_{max}`} - Maximum value among the 12 hourly average values

The weighting factor, ${tex`w`}, is then determined in terms of ${tex`w^*`}:  

```tex
% step 2: define w in terms of weighting factor  
w = \begin{cases}  
  w^*,  \text{if } w > \frac{1}{2}, \  
  0.5, \text{if } w \leq \frac{1}{2} .  
\end{cases}  
```

The NowCast value is determined using the following equation, dependent on the value of ${tex`w`}:

When ${tex`w>\frac{1}{2}`}:  

```tex  
NowCast = \frac{\sum_{n=1}^{12} w^{i-1} c_i}{\sum_{n=1}^{12} w^{i-1}}  
```

When ${tex`w=\frac{1}{2}`}:

```tex  
NowCast = \frac{1}{2} c_1 + (\frac{1}{2})^2 c_2 + \dots + (\frac{1}{2})^{12} c_{12}  
```

<div class="note">
At least 2 of the 3 values ${tex`c_1`}, ${tex`c_2`}, and ${tex`c_3`} must have data in order for the NowCast calculation to be valid. If this requirement is not fulfilled, then the NowCast value cannot be calculated and it is considered ‘no data.’ If ${tex`c_i`} has no data, then ${tex`c^{i-1} = 0`}.
</div>

The hourly AQI for PM<sub>10</sub> and PM<sub>2.5</sub> is calculated using the following formula:

```tex
{AQI}_x = \frac{I_{i+1}-I_{i}}{BP_{i+1}-BP_{i}}(NowCast_x - BP_i) + I_i  
```

where 
* ${tex`AQI_{x}`} - AQI value of the respective pollutant, x
* ${tex`BP_{i}`} - Lower limit concentration of the respective pollutant corresponding to level i
* ${tex`BP_{i+1}`} - Upper limit concentration of the respective pollutant corresponding to level i+1
* ${tex`I_{i}`} - AQI value at level i (as listed in the breakpoint concentration table)
* ${tex`I_{i+1}`} - AQI value at level i+1 (as listed in the breakpoint concentration table)
* ${tex`NowCast_{x}`} - NowCast value previously calculated above for the respective pollutant, x

The hourly AQI for CO, O<sub>3</sub>, SO<sub>2</sub>, and NO<sub>2</sub> is calculated using the following formula:

```tex
{AQI}_x = \frac{I_{i+1}-I_{i}}{BP_{i+1}-BP_{i}}(C_x - BP_i) + I_i  
```
where 
* ${tex`AQI_{x}`} - AQI value of the respective pollutant, x
* ${tex`BP_{i}`} - Lower limit concentration of the respective pollutant corresponding to level i
* ${tex`BP_{i+1}`} - Upper limit concentration of the respective pollutant corresponding to level i+1
* ${tex`I_{i}`} - AQI value at level i (as listed in the breakpoint concentration table)
* ${tex`I_{i+1}`} - AQI value at level i+1 (as listed in the breakpoint concentration table)
* ${tex`C_{x}`} - Average hourly observed value of the respective pollutant, x


The maximum hourly AQI value is reported as the aggregate hourly AQI value, with the values being rounded to integers.

For O<sub>3</sub>, only the one 1-hour averaging period breakpoints are used during calculations. The maximum value of all the parameters is selected as the aggregate hourly AQI value, reported as an integer.

### Daily AQI Calculation 
The daily AQI value for PM<sub>10</sub> and PM<sub>2.5</sub> uses a 24-hour averaging period, while for SO<sub>2</sub>, NO<sub>2</sub>, and CO the maximum 1-hour average value of the day is used. Although not specifically stated, it is assumed that this 24-hour averaging period is daily, recorded from hour 1 to 24, as opposed to an ongoing rolling period. For the daily AQI value for O<sub>3</sub>, both the maximum 1-hour average value of the day and maximum 8-hour average value of the day are used. The 8-hour average value is calculated by taking the average of the 1-hour average values over 8 consecutive hours.

The daily AQI for each parameter is calculated by the formula:

```js
import {piecewiseLatexDoc} from '../components/piecewise.js';
```

```js

piecewiseLatexDoc('VNAQI')

```

When the 8-hour average value of the day exceeds 400 µg/m<sup>3</sup> for O<sub>3</sub>, the 8-hour averaging period AQI is not used; instead the AQI is calculated using the maximum 1-hour average of the day.

## References

[^1]: [https://thuvienphapluat.vn/van-ban/Tai-nguyen-Moi-truong/Quyet-dinh-1459-QD-TCMT-2019-ky-thuat-tinh-toan-va-cong-bo-chi-so-chat-luong-khong-khi-Viet-Nam-428215.aspx](https://thuvienphapluat.vn/van-ban/Tai-nguyen-Moi-truong/Quyet-dinh-1459-QD-TCMT-2019-ky-thuat-tinh-toan-va-cong-bo-chi-so-chat-luong-khong-khi-Viet-Nam-428215.aspx)  
[^2]:[https://thuvienphapluat.vn/hoi-dap-phap-luat/83A155E-hd-cac-mau-sac-nao-bieu-thi-cho-chat-luong-moi-truong-khong-khi-o-nhiem-muc-do-o-nhiem-khong-khi-nghie.html?rel=hoidap\_chitietvb](https://thuvienphapluat.vn/hoi-dap-phap-luat/83A155E-hd-cac-mau-sac-nao-bieu-thi-cho-chat-luong-moi-truong-khong-khi-o-nhiem-muc-do-o-nhiem-khong-khi-nghie.html?rel=hoidap\_chitietvb)  

"Quyết định 1459/QĐ-TCMT 2019 kỹ thuật tính toán và công bố chỉ số chất lượng không khí Việt Nam." CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM, 12 Nov. 2019, Hanoi, [thuvienphapluat.vn/van-ban/Tai-nguyen-Moi-truong/Quyet-dinh-1459-QD-TCMT-2019-ky-thuat-tinh-toan-va-cong-bo-chi-so-chat-luong-khong-khi-Viet-Nam-428215.aspx](https://thuvienphapluat.vn/van-ban/Tai-nguyen-Moi-truong/Quyet-dinh-1459-QD-TCMT-2019-ky-thuat-tinh-toan-va-cong-bo-chi-so-chat-luong-khong-khi-Viet-Nam-428215.aspx).

"Các màu sắc nào biểu thị cho chất lượng môi trường không khí ô nhiễm? Mức độ ô nhiễm không khí nghiêm trọng nhất được quy định bằng màu gì?" Công ty THƯ VIỆN PHÁP LUẬT, [thuvienphapluat.vn/hoi-dap-phap-luat/83A155E-hd-cac-mau-sac-nao-bieu-thi-cho-chat-luong-moi-truong-khong-khi-o-nhiem-muc-do-o-nhiem-khong-khi-nghie.html?rel=hoidap\_chitietvb](https://thuvienphapluat.vn/hoi-dap-phap-luat/83A155E-hd-cac-mau-sac-nao-bieu-thi-cho-chat-luong-moi-truong-khong-khi-o-nhiem-muc-do-o-nhiem-khong-khi-nghie.html?rel=hoidap\_chitietvb).
