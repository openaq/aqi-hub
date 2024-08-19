# Hong Kong

## Air Quality Health Index (AQHI)

## Background

The Air Quality Health Index (AQHI) accounts for 4 criteria pollutants: Particulate Matter (PM), O3, NO2 and SO2. For PM, both PM2.5 and PM10 are considered, however only the PM that poses the higher health risk is used in the AQHI calculation. Hong Kong reports hourly and forecast AQHIs.

AQHIs are reported in two categories, ‘General AQHI’ and ‘Roadside AQHI,’ based on where the monitoring station is located. The ‘Roadside AQHI’ is more relevant for those who conduct most of their daily activities along roadsides or in high-traffic areas, while the ‘General AQHI’ is suitable for all others [^1].

Previous to establishing the AQHI in December 2013 [^2], Hong Kong used an Air Pollution Index (API) from 1995 to 2013 [^1]. The Environmental Protection Department is responsible for calculating and reporting both hourly and forecast AQHIs.

## Color scale

```js
import {colorScale} from "../components/color-scale.js";
```

```js
colorScale([
    {label: 'Low ', color: '#00e400', range: '1-3'}
    ,{label: 'Moderate ', color: '#ff9f00', range: '4-6'}
    ,{label: 'High ', color: '#f70000', range: '7'}
    ,{label: 'Very high', color: '#7f3710', range: '8-10'}
    ,{label: 'Serious', color: '#000000', range: '10+'}
    ])
```

```js
import {FileAttachment} from "npm:@observablehq/stdlib";
```

The system also provides a set of pictograms for representing each level in the scale:


<div style="display: flex;">

```js
FileAttachment('../imgs/hk_icon_low.svg').image({height: 90})
```

```js
FileAttachment('../imgs/hk_icon_moderate.svg').image({height: 90})
```


```js
FileAttachment('../imgs/hk_icon_high.svg').image({height: 90})
```

```js
FileAttachment('../imgs/hk_icon_very_high.svg').image({height: 90})
```


```js
FileAttachment('../imgs/hk_icon_serious.svg').image({height: 90})
```

</div>

Note: Adapted from “What is the Air Quality Health Index?” (January 2016), [https://www.aqhi.gov.hk/en/what-is-aqhi/about-aqhi.html](https://www.aqhi.gov.hk/en/what-is-aqhi/about-aqhi.html) [^1]. Accessed August 8, 2024

## Methods

The AQHI utilizes the following pollutant breakpoint concentration levels based on the World Health Organization Air Quality Guidelines (WHO AQG). This index is identified as the WHO AQG-F, with adjustments made to improve accuracy of the threshold values. The breakpoint concentrations for the different bands take into account the Air Quality Guidelines developed by the World Health Organization along with local hospital admissions risk [^1]:

| Health Risk Category | AQHI | Added Health Risk (%AR) |
| :---- | :---- | :---- |
| Low | 1 | 0-1.88 |
| Low | 2 | 1.89-3.76 |
| Low | 3 | 3.77-5.64 |
| Moderate | 4 | 5.65-7.52 |
| Moderate | 5 | 7.53-9.41 |
| Moderate | 6 | 9.42-11.29 |
| High | 7 | 11.30-12.91 |
| Very high | 8 | 12.92-15.07 |
| Very high | 9 | 15.08-17.22 |
| Very high | 10 | 17.23-19.37 |
| Serious | 10+ | 19.38+ |

Note: Adapted from “The AQHI System . FAQs” (n.d.), [https://www.aqhi.gov.hk/en/what-is-aqhi/faqs.html](https://www.aqhi.gov.hk/en/what-is-aqhi/faqs.html) [^1]. Accessed August 8, 2024

Note rounded

The AQHI of the current hour also accounts for the added health risk (%AR), also referred to as the ‘percentage excess risk’ (%ER), based on the percentage of excess daily hospital admissions [^1]. This factor was calculated using the regression coefficient β of the four pollutants and their respective concentrations on each day over a five-year period, assuming equal weight for each pollutant [^1].


```tex
\sum_{i=1,\dots,p}{}(e^{\beta ixij} - 1) \times 100%
```

The hourly AQHI is calculated from the sum of the %AR of daily hospital admissions attributable to the 3-hour moving average concentrations of PM (either PM2.5 or PM10 depending on the posed health risks), O3, NO2 and SO2. The %AR is then compared to a scale to obtain the appropriate banding of the AQHI using the following equation [^1]:


```tex

```

```tex
\%AR = \%AR_{NO_2} + \%AR_{SO_2} + \%AR_{O_3} + \%AR_{PM}  
```

where

```tex
\%AR_{PM} = {Max}(\%AR_{PM_{10}}, \%AR_{PM_{2.5}})    
```

The added health risks, %AR, are calculated for NO<sub>2</sub>, SO<sub>2</sub>, O<sub>3</sub>, PM<sub>10</sub>, and PM<sub>2.5</sub>, respectively:

```tex
\%AR_{NO_2} = [e^{\beta(NO_2) \times C(NO_2)} .1]  
```  

```tex
\%AR_{SO_2} = [e^{\beta(SO_2) \times C(SO_2)} .1]  
```  

```tex
\%AR_{O_3} = [e^{\beta(O_3) \times C(O_3)} .1]  
```  

```tex
\%AR_{PM_{10}} = [e^{\beta(PM_{10}) \times C(PM_{10})} .1]  
```  

```tex
\%AR_{PM_{2.5}} = [e^{\beta(PM_{2.5}) \times C(PM_{2.5})} .1]  
```

where  

* ${tex`C(NO_2), C(SO_2), C(O_3), C(PM_{10}), C(PM_{2.5})`} . 3-hour moving average concentration values for their respective pollutants in ${tex`\mu g/m^3`}

* ${tex`\beta(NO_2), \beta(SO_2), \beta(O_3), \beta(PM_{10}), \beta(PM_{2.5})` }. Regression coefficients of added health risk for their respective pollutants

```tex
\beta(NO_2) = 0.0004462559  
```  

```tex
\beta(SO_2) = 0.0001393235  
```  

```tex
\beta(O_3) = 0.0005116328  
```  

```tex
\beta(PM_{10}) = 0.0002821751  
```  

```tex
\beta(PM_{2.5}) = 0.0002180567  
```

Forecast AQHIs are additionally reported as the predicted health risk category for both ‘General’ and ‘Roadside’ types for the next 12 to 24 hours in two sessions, a.m. and p.m. [^1].

## References

Hsu, Angel. “China's new Air Quality Index: How does it measure up?” Data Driven Envirolab, 28 Mar. 2012, [datadrivenlab.org/air-quality/chinas-new-air-quality-index-how-does-it-measure-up/](https://datadrivenlab.org/air-quality/chinas-new-air-quality-index-how-does-it-measure-up/)

“The AQHI System-FAQ.” 空氣質素健康指數 Air Quality Health Index, [[www.aqhi.gov.hk/en/what-is-aqhi/faqs.html](https://www.aqhi.gov.hk/en/what-is-aqhi/faqs.html)]([https://www.aqhi.gov.hk/en/what-is-aqhi/faqs.html](https://www.aqhi.gov.hk/en/what-is-aqhi/faqs.html))

“What's AQHI.” 空氣質素健康指數 Air Quality Health Index, [[www.aqhi.gov.hk/en/what-is-aqhi/about-aqhi.html](https://www.aqhi.gov.hk/en/what-is-aqhi/about-aqhi.html)](<http://www.aqhi.gov.hk/en/what-is-aqhi/about-aqhi.html>](<https://www.aqhi.gov.hk/en/what-is-aqhi/about-aqhi.html>))

Wong TW, Tam WWS, Lau AKH, Ng SKW, Yu ITS, Wong AHS, Yeung D. “A Study of the Air Pollution Index Reporting System. Final Report.” 27 June 2012, [/www.aqhi.gov.hk/common/pdf/related_websites/APIreview_report.pdf](https://www.aqhi.gov.hk/common/pdf/related_websites/APIreview_report.pdf)

[^1]: [https://www.aqhi.gov.hk/en/what-is-aqhi/faqs.html](https://www.aqhi.gov.hk/en/what-is-aqhi/faqs.html)  
[^2]: [https://datadrivenlab.org/air-quality-2/chinas-new-air-quality-index-how-does-it-measure-up/](https://datadrivenlab.org/air-quality-2/chinas-new-air-quality-index-how-does-it-measure-up/)  