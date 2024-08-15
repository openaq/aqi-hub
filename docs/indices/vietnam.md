# Vietnam

## Vietnam Air Quality Index (VN AQI)

## Background

The Vietnam Air Quality Index (VN AQI) accounts for pollutant concentrations of PM<sub>2.5</sub>, PM<sub>10</sub>, CO, O<sub>3</sub>, SO<sub>2</sub>, and NO<sub>2</sub>. It reports a Daily and Hourly AQI, as well as a Nowcast value for exclusively particulate matter concentrations.

The Vietnam Air Quality Index is calculated using data from continuous automatic air quality stations across the country. The Daily AQI is the AQI value representing one day, while the Hourly AQI is the AQI value representing one hour.

The VN AQI guidelines were most recently updated in November 2019, replacing the decision of July 2011 on calculating air quality index [^1]. The General Department for Environment in the Ministry of Natural Resources and Environment create and implement these decisions, in coordination with heads of departments in relevant organizations [^1].

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

Note: Adapted from "Các màu sắc nào biểu thị cho chất lượng môi trường không khí ô nhiễm? Mức độ ô nhiễm không khí nghiêm trọng nhất được quy định bằng màu gì?" (n.d.), <https://thuvienphapluat.vn/hoi-dap-phap-luat/83A155E-hd-cac-mau-sac-nao-bieu-thi-cho-chat-luong-moi-truong-khong-khi-o-nhiem-muc-do-o-nhiem-khong-khi-nghie.html?rel=hoidap\_chitietvb> [^2]. Accessed August 5, 2024.

## Methods[^1]

```js
breakpointsTable(data)
```

It is not specified if sub-index values are rounded or truncated, however the final AQI value is truncated[^1]. For the breakpoint concentrations and for AQI calculations, we assume that all data values are rounded to the nearest integer.

The Nowcast value is a weighted average of the 12 most recent one hour average values relative to the calculation time, and is reported for PM<sub>10</sub> and PM<sub>2.5</sub> pollutants only. The AQI value is calculated for the data of each monitoring station, and the final AQI value reported is the largest of the values for each parameter. The AQI calculation requires at least one of PM<sub>10</sub> and PM<sub>2.5</sub> parameters within the formula.

Hourly AQI Calculation:  
In calculating the hourly index, the weight value of each PM<sub>2.5</sub> and PM<sub>10</sub> is first calculated for reporting the Nowcast values. The weight value is equal to the minimum concentration over the maximum concentrations among the 12 hourly average values. The Nowcast value can only be calculated if at least 3 valid 1-hour average values are collected, otherwise it is reported as “no data.”

${tex`c_1 , c_2 , \dots, c_{12} `}= Averages of 1-hour monitoring values (with ${tex`c_1`} being the current 1-hour averaging monitoring value and ${tex`c_{12}`} being the 1-hour monitoring value 12 hours ago)  

The weight value, ${tex`w^*`}, is first determined using the following equation:

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

Note that at least 2 of the 3 values ${tex`c_1`}, ${tex`c_2`}, and ${tex`c_3`} must have data in order for the NowCast calculation to be valid. If this requirement is not fulfilled, then the NowCast value cannot be calculated and it is considered ‘no data.’ If ${tex`c_i`} has no data, then ${tex`c^{i-1} = 0`}.

<div class="note">
Note that at least 2 of the 3 values ${tex`c_1`}, ${tex`c_2`}, and ${tex`c_3`} must have data in order for the NowCast calculation to be valid. If this requirement is not fulfilled, then the NowCast value cannot be calculated and it is considered ‘no data.’ If ${tex`c_i`} has no data, then ${tex`c^{i-1} = 0`}.
</div>

The Hourly AQI for PM<sub>10</sub> and PM<sub>2.5</sub> is then calculated using the formula:

{custom piecewise where Concentration is the above Nowcast instead}

The maximum Hourly AQI value is reported as the aggregate hourly AQI value, with the values being rounded to integers.

For calculating the hourly AQI for CO, O<sub>3</sub>, SO<sub>2</sub>, and NO<sub>2</sub>, the following formula is used:  

```tex
{AQI}_x = \frac{I_{i+1}-I_{i}}{BP_{i+1}-BP_{i}}(C_x - BP_i) + I_i  
```

For O<sub>3</sub>, only the one hour averaging period breakpoints are used during calculations. The maximum value of all the parameters is selected as the aggregate hourly AQI value, reported as an integer.

Daily AQI Calculation:  
The daily AQI value for PM<sub>10</sub> and PM<sub>2.5</sub> uses a 24 hour averaging period, while for SO<sub>2</sub>, NO<sub>2</sub>, and CO the maximum one hour average value of the day is used. Although not specifically stated, it is assumed that this 24 hour averaging period is daily, recorded from hour 1 to 24, as opposed to an ongoing rolling period. For the daily AQI value for O<sub>3</sub>, both the maximum one hour average value of the day and maximum 8 hour average value of the day are used. The 8 hour average value is calculated by taking the average of the one hour average values over 8 consecutive hours.

The daily AQI for each parameter is calculated by the formula:

```js
import {piecewiseLatexDoc} from '../components/piecewise.js';
```

```js
piecewiseLatexDoc('VNAQI')

```

When the 8 hour average value of the day exceeds 400 µg/m3 for O<sub>3</sub>, the 8 hour averaging period AQI should not be used; instead the AQI should only be calculated using the maximum one hour average of the day.


## References

[^1]: [https://thuvienphapluat.vn/van-ban/Tai-nguyen-Moi-truong/Quyet-dinh-1459-QD-TCMT-2019-ky-thuat-tinh-toan-va-cong-bo-chi-so-chat-luong-khong-khi-Viet-Nam-428215.aspx](https://thuvienphapluat.vn/van-ban/Tai-nguyen-Moi-truong/Quyet-dinh-1459-QD-TCMT-2019-ky-thuat-tinh-toan-va-cong-bo-chi-so-chat-luong-khong-khi-Viet-Nam-428215.aspx)  
[^2]:
[https://thuvienphapluat.vn/hoi-dap-phap-luat/83A155E-hd-cac-mau-sac-nao-bieu-thi-cho-chat-luong-moi-truong-khong-khi-o-nhiem-muc-do-o-nhiem-khong-khi-nghie.html?rel=hoidap\_chitietvb](https://thuvienphapluat.vn/hoi-dap-phap-luat/83A155E-hd-cac-mau-sac-nao-bieu-thi-cho-chat-luong-moi-truong-khong-khi-o-nhiem-muc-do-o-nhiem-khong-khi-nghie.html?rel=hoidap\_chitietvb)  
[https://thuvienphapluat.vn/van-ban/Tai-nguyen-Moi-truong/Quyet-dinh-1459-QD-TCMT-2019-ky-thuat-tinh-toan-va-cong-bo-chi-so-chat-luong-khong-khi-Viet-Nam-428215.aspx](https://thuvienphapluat.vn/van-ban/Tai-nguyen-Moi-truong/Quyet-dinh-1459-QD-TCMT-2019-ky-thuat-tinh-toan-va-cong-bo-chi-so-chat-luong-khong-khi-Viet-Nam-428215.aspx)
