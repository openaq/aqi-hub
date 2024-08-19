# China

## Air Quality Index (AQI)

## Background

China’s Air Quality Index accounts for six primary pollutants: PM2.5, PM10, CO, O3, NO2 and SO2. A daily and real-time AQI is reported, along with a forecasting AQI.

The current AQI was formulated by the Department of Science, Technology and Standards of the Ministry of Environment [^1]. It was approved as a national environmental protection standard as of February 29, 2012 outlined in the “Technical Provisions of Ambient Air Quality Index (AQI) (Trial)” [^1]. It was implemented simultaneously with the updated air quality standard, “Ambient Air Quality Standard.”

Previous to this AQI implementation, China used the Air Pollution Index (API) to report air quality data [^2]. According to external sources, the API seems to have originally omitted PM2.5 levels [^5].  

## Color scale

```js

import {breakpointsTable} from "../components/table.js";
import { parseBreakpointsCsv, tableReshape, colorScaleReshape } from '../utils/utils.js';
import { colorScale } from '../components/color-scale.js';

```

```js
const breakpoints = await FileAttachment('../data/china/breakpoints.csv').text();

const data = parseBreakpointsCsv(breakpoints);
```

The China Air Quality Index consists of six categories:

```js
colorScale(colorScaleReshape(data))
```

_Note_: Adapted from “What is the Air Quality Health Index?” (n.d.), [https://www.mee.gov.cn/ywgz/fgbz/bz/bzwb/jcffbz/201203/W020120410332725219541.pdf](https://www.mee.gov.cn/ywgz/fgbz/bz/bzwb/jcffbz/201203/W020120410332725219541.pdf) [^1]. Accessed August 8, 2024.

## Methods

The pollutant breakpoint concentrations for the AQI are as follows:

```js
breakpointsTable(data)
```

_Note_: Adapted from “What is the Air Quality Health Index?” (n.d.), [https://www.mee.gov.cn/ywgz/fgbz/bz/bzwb/jcffbz/201203/W020120410332725219541.pdf](https://www.mee.gov.cn/ywgz/fgbz/bz/bzwb/jcffbz/201203/W020120410332725219541.pdf) [^1]. Accessed August 8, 2024.

Note that no rounding or truncation conventions are stated for individual pollutant breakpoint concentrations and sub-index calculations. We have assumed that all pollutant values are rounded to the nearest integer except CO, which is rounded to one decimal place. This is assumed as numerous reported pollutant concentrations [^3] seem to follow this convention. Lower breakpoint limits were also assumed according to this rounding convention to avoid overlapping limit values. 

If the 1 hour average concentration value for SO2 is greater than 800 μm/m3, the sub-index calculation is not performed. The sub-index for SO2 for the 24-hour average concentration is used instead [^1]. 

If the 8-hour average concentration of O3 is greater than 800 μm/m3, the sub-index calculation is not performed. The sub-index for O3 for the 24-hour average concentration is used instead [^1]. 

The sub-index for individual pollutants is calculated using the following piecewise linear function: 

```js  
import {piecewiseLatexDoc} from '../components/piecewise.js';  
```

```js  
piecewiseLatexDoc('AQI')  
```

The reported AQI is the maximum sub-index value. When the AQI is greater than 50, the pollutant with the largest sub-index value is the primary pollutant [^1]. If there are two or more pollutants with sub-indices greater than 50, both are listed as the primary pollutants [^1]. Pollutants with a sub-index greater than 100 are considered excessive pollutants [^1].

```tex
{AQI} = {Max}({I}_{PM_{2.5}},{I}_{PM_{10}},{I}_{CO},{I}_{O_{3}},{I}_{SO_{2}},{I}_{NO_{2}})
```

The final AQI is rounded to the nearest integer [^1]. 

The daily AQI uses a daily 24-hour average, with the time period being 24 hours before midnight of the day [^1]. The real-time AQI is 1-hour and can be released after every hour. The lag time should not exceed 1 hour in reporting [^1]. 

There are different averaging periods for daily and real-time AQIs [^1]:

|  | PM2.5 | PM10 | CO | O3 | SO2 | NO2 |
| :---- | :---- | :---- | :---- | :---- | :---- | :---- |
| Daily | 24 hr. | 24 hr. | 24 hr. | Max. 1hr. &  rolling 8 hr. | 24 hr. | 24 hr. |
| Real-time | 1 hr. & rolling 24 hr.  | 1 hr. & 24 hr. rolling | 1 hr. | 1 hr.  | 1 hr. | 1 hr. |

The forecasting AQI evaluates PM2.5, PM10, CO, O3, NO2, and SO2 concentrations, AQI and levels, and primary pollutant [^4]. The forecast models 24 hours, 48 hours, and 72 hours in advance. There are three evaluation categories: single pollutant concentration forecast evaluation, air quality index forecast evaluation, and heavy pollution day forecast evaluation [^4]. 

The statistical evaluation of a single pollutant concentration forecast mainly includes the standardized mean deviation, root mean square error and correlation coefficient. 

```tex  
NMB = \frac{\frac{1}{N}\sum_{i=1}^{N}(F_i-O_i)}{\frac{1}{N}\sum_{i=1}^{N} O_i}  
```  

where

* ${tex`NMB`} - Normalized mean bias, or the standardized mean deviation
* ${tex`N`} - Number of sample pairs involved in the calculation (a sample pair consists of a forecasted and predicted sample)  
* ${tex`F_i`} - Numerical prediction concentration value of the pollutant in the i-th sample pair
* ${tex`O_i`} - Actual concentration value of the pollutants in the i-th sample pair

```tex  
RSME = \sqrt{\frac{1}{N}\sum_{i=1}^{N} (F_i-O_i)^2}  
```  

where   

* ${tex`RSME`} - Root mean square error  
* ${tex`N`} - Number of sample pairs involved in the calculation (a sample pair consists of a forecasted and predicted sample)  
* ${tex`F_i`} - Numerical prediction concentration value of the pollutant in the i-th sample pair   
* ${tex`O_i`} - Actual concentration value of the pollutants in the i-th sample pair

```tex  
r = \frac{\sum_{i=1}^{N}(F_i-F)\sum_{i=1}^{N}(O_i -\bar{O})}{\sqrt{\sum_{i=1}^{N}(F_i-\bar{F})^2}\sqrt{\sum_{i=1}^{N}(O_i-\bar{O})^2}}  
```  

where  

* ${tex`r`} - Correlation coefficient  
* ${tex`N`} - Number of sample pairs involved in the calculation (a sample pair consists of a forecasted and predicted sample)  
* ${tex`F_i`} - Numerical prediction concentration value of the pollutant in the i-th sample pair   
* ${tex`bar{F}`} - Average value of the numerical forecast concentration of pollutants involved in the calculation  
* ${tex`O_i`} - Actual concentration value of the pollutants in the i-th sample pair   
* ${tex`bar{O}`} - Average actual concentration value of pollutants involved in the calculation

Forecasted AQI values undergo an evaluation process to ensure that it is accurate. Based on the AQI forecast value of the numerical model, the AQI forecast range is set to be plus of minus 25% [^4]. The true AQI value is within the forecast level, it is considered accurate. The percentage of the number of days with accurate AQI level forecasts annually should not be less than 60%, including both the accuracy of the sub-index and AQI values. 

The evaluation of the accuracy for forecasts for primary pollutants depends on the AQI level. When the AQI level is 1, there is no primary pollutant and it does not undergo the primary pollutant forecast assessment [^4]. When the AQI level is 2 or greater, if the predicted primary pollutant is equal to the true primary pollutant reported, the forecast is deemed accurate [^4]. Further details of the procedure for evaluating the accuracy of the forecast is beyond the scope of this guide.

## References

[^1]:[https://www.mee.gov.cn/ywgz/fgbz/bz/bzwb/jcffbz/201203/t20120302_224166.shtml](https://www.mee.gov.cn/ywgz/fgbz/bz/bzwb/jcffbz/201203/t20120302_224166.shtml)   
[^2]: [https://web.archive.org/web/20041025222827/http://www.sepa.gov.cn/quality/air.php3?offset=60](https://web.archive.org/web/20041025222827/http://www.sepa.gov.cn/quality/air.php3?offset=60)  
[^3]: [https://air.cnemc.cn:18007/](https://air.cnemc.cn:18007/)  
[^4]: [https://www.mee.gov.cn/ywgz/fgbz/bz/bzwb/jcffbz/202005/W020200518771113314010.pdf](https://www.mee.gov.cn/ywgz/fgbz/bz/bzwb/jcffbz/202005/W020200518771113314010.pdf)  
[^5]: [https://datadrivenlab.org/air-quality-2/chinas-new-air-quality-index-how-does-it-measure-up/](https://datadrivenlab.org/air-quality-2/chinas-new-air-quality-index-how-does-it-measure-up/)

“环境空气质量指数（AQI）技术规定（试行）. Technical Regulation on Ambient Air Quality Index (on trial).” 中华人民共和国国家环境保护标准, HJ 633-2012, 1 Jan. 2016, [[www.mee.gov.cn/ywgz/fgbz/bz/bzwb/jcffbz/201203/t20120302_224166.shtml](https://www.mee.gov.cn/ywgz/fgbz/bz/bzwb/jcffbz/201203/t20120302_224166.shtml)]([https://www.mee.gov.cn/ywgz/fgbz/bz/bzwb/jcffbz/201203/t20120302_224166.shtml](https://www.mee.gov.cn/ywgz/fgbz/bz/bzwb/jcffbz/201203/t20120302_224166.shtml)). 

“重点城市空气质量日报.” 国家环境保护总局 State Environmental Protection Administration of China, 25 Oct. 2004, [[web.archive.org/web/20041025222827/http://www.sepa.gov.cn/quality/air.php3?offset=60](https://web.archive.org/web/20041025222827/http://www.sepa.gov.cn/quality/air.php3?offset=60)]([https://web.archive.org/web/20041025222827/http://www.sepa.gov.cn/quality/air.php3?offset=60](https://web.archive.org/web/20041025222827/http://www.sepa.gov.cn/quality/air.php3?offset=60)).

“城市空气质量.” 全国城市空气质量实时发布平台, [[air.cnemc.cn:18007/](https://air.cnemc.cn:18007/)]([https://air.cnemc.cn:18007](https://air.cnemc.cn:18007/)). 

“环境空气质量数值预报技术规范 Technical guideline for numerical forecasting of ambient air quality（发布稿）.” 中华人民共和国国家环境保护标准, HJ 1130-2020, 15 Aug. 2020, [[www.mee.gov.cn/ywgz/fgbz/bz/bzwb/jcffbz/202005/W020200518771113314010.pdf](https://www.mee.gov.cn/ywgz/fgbz/bz/bzwb/jcffbz/202005/W020200518771113314010.pdf)](https://www.mee.gov.cn/ywgz/fgbz/bz/bzwb/jcffbz/202005/W020200518771113314010.pdf). 

Qinghua Sun, Huanhuan Zhu, Wanying Shi, Yu Zhong, Yingjian Zhang; Tiantian Li. “Preplanned Studies: Development of the National Air Quality Health Index — China, 2013−2018.” CCDC weekly, 22 Jan. 2021, [[weekly.chinacdc.cn/en/article/doi/10.46234/ccdcw2021.011](https://weekly.chinacdc.cn/en/article/doi/10.46234/ccdcw2021.011)](https://weekly.chinacdc.cn/en/article/doi/10.46234/ccdcw2021.011). 

Hsu, Angel. “China's new Air Quality Index: How does it measure up?” Data Driven Envirolab, 28 Mar. 2012, [datadrivenlab.org/air-quality/chinas-new-air-quality-index-how-does-it-measure-up/](https://datadrivenlab.org/air-quality/chinas-new-air-quality-index-how-does-it-measure-up/)

“城市空气质量形势.” 全国空气质量预报信息发布系统, [[air.cnemc.cn:18014/](https://air.cnemc.cn:18014/)](https://air.cnemc.cn:18014/](https://air.cnemc.cn:18014/)).   