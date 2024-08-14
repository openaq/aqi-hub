# Canada

## Air Quality Health Index (AQHI)

## Background

Canada’s AQHI accounts for three criteria pollutants: PM2.5, O3 and NO2. The AQHI is reported as a daily and forecast value for the next 48 hours.

The AQHI was first developed and applied by the Healthy Environments and Consumer Safety Branch of Canada in 2008 [^1].

Previous to the AQHI, Canada used the Air Quality Index (AQI). The AQI reported air quality based on specific pollutant levels and reported the maximum concentration as the value for that station. The AQHI was established to report on the health risk caused by pollutant mixing.

## Color scale

The AQHI uses a color scale consisting of 11 colors for 4 risk categories:


```js
import {colorScale} from "../components/color-scale.js";
```

```js
colorScale([
    {label: 'Low', color: '#02cbff', range: 1}
    ,{label: 'Low', color: '#0099ca', range: 2}
    ,{label: 'Low', color: '#01649b', range: 3}  
    ,{label: 'Moderate', color: '#fffe02', range: 4}
    ,{label: 'Moderate', color: '#ffcb00', range: 5}
    ,{label: 'Moderate', color: '#fe9933', range: 6}  
    ,{label: 'High', color: '#fd6765', range: 7}  
    ,{label: 'High', color: '#fc0100', range: 8}  
    ,{label: 'High', color: '#cb0003', range: 9}  
    ,{label: 'High', color: '#9a0000', range: 10}  
    ,{label: 'Very High', color: '#650100', range: '10+'}  
    ])
```

Note: Adapted from “About the Air Quality Health Index” (April 2021), [https://www.canada.ca/en/environment-climate-change/services/air-quality-health-index/about.html](https://www.canada.ca/en/environment-climate-change/services/air-quality-health-index/about.html)  [^1]. Accessed August 13, 2024.

## Methods

Canada’s AQHI uses 3-hour averaging periods of PM2.5, O3, and NO2. A 3-hour averaging period was chosen as it provides more stability than a 1-hour averaging period [^1]. It is not specified if this 3-hour average is rolling. Data from at least 2 hours out of the 3-hour period is required for the AQHI calculation; if this requirement is not met, the 3-hour average is set to ‘missing’ [^1]. If more than 6 rolling 3-hour averages are missing, the daily 3-hour maximum was set to missing [^1]. Note that this procedure is described in a report outlining a recommendation for an improved AQHI [^1] and is confirmed by the Alberta government website to be the same procedure for calculating the national AQHI [^5].
The 3-hour averaging periods are plugged into the AQHI formula, a simple linear combination [^1]:

```tex  
AQHI = (\frac{10}{10.4}) \times 100 \times [({e^{(0.000871*NO2)} -1) + (e^{(0.000537*O3)} -1) + (e^{(0.000487*PM2.5)} -1})]  
```  

Note: Adapted from “A New Multipollutant, No-Threshold Air Quality Health IndexBased on Short-Term Associations Observed in Daily Time-Series Analyses” (March 2008), <https://www.tandfonline.com/doi/epdf/10.3155/1047-3289.58.3.435?needAccess=true> [^1]. Accessed August 13, 2024.

The slopes in this formula are estimations of exposure-response coefficients of each pollutant multiplied by a scaling factor [^2]. The final AQHI value is rounded to the nearest integer value and translated to its respective risk category to be reported.

The ‘Low Risk’ category encompasses AQHI values from 1 to 3, ‘Moderate Risk’ from 4 to 6, ‘High Risk’ from 7 to 10, and ‘Very High’ for values greater than 10.

The AQHI accounts for the cumulative effect of pollutant mixing, instead of simply basing the air quality on the greatest pollutant concentration. The AQHI is assumed to be an hourly value, as the observed AQHI in the British Columbia interactive map reports the ‘last hour’ value [^6].

Canada additionally has an Info-Smog program that provides air quality forecasting. Numerical models established by the Environment and Climate Change Canada are used to predict PM2.5 and O3 concentrations for the next several hours [^3]. A calculation method based on the AQHI formula is used to forecast the AQHI, however it only accounts for predicted concentrations of PM2.5 and O3. The air quality forecast is reported in three categories: good, fair, and poor. Two forecasts are issued daily: at 5 a.m. EST the forecast for today, tonight, and tomorrow is issued, and at 4 p.m. EST, the forecast for tonight and tomorrow is issued [^3]. Note that another government website states that the first AQHI forecast is issued at 6 a.m. and second at 5 p.m. local time [^4], however it is unclear which time is correct. Forecast amendments can be issued at any time if necessary to provide the most relevant information.

## References

[^1]:  [https://www.tandfonline.com/doi/epdf/10.3155/1047-3289.58.3.435?needAccess=true](https://www.tandfonline.com/doi/epdf/10.3155/1047-3289.58.3.435?needAccess=true)

[^2]: [https://www.publichealthontario.ca/-/media/documents/A/2013/air-quality-health-index.pdf](https://www.publichealthontario.ca/-/media/documents/A/2013/air-quality-health-index.pdf)

[^3]: [https://www.canada.ca/en/environment-climate-change/services/info-smog/how-it-works.html](https://www.canada.ca/en/environment-climate-change/services/info-smog/how-it-works.html)

[^4]: [https://www.canada.ca/en/environment-climate-change/services/weather-health/publications/guide-air-quality-index-forecasts.html](https://www.canada.ca/en/environment-climate-change/services/weather-health/publications/guide-air-quality-index-forecasts.html)

[^5]: [https://www.alberta.ca/air-quality-health-index-calculation](https://www.alberta.ca/air-quality-health-index-calculation)

[^6]: [https://www.env.gov.bc.ca/epd/bcairquality/readings/find-stations-map.html](https://www.env.gov.bc.ca/epd/bcairquality/readings/find-stations-map.html)

Other references:
[https://weather.gc.ca/airquality/pages/index_e.html](https://weather.gc.ca/airquality/pages/index_e.html)

[https://www.canada.ca/en/environment-climate-change/services/air-quality-health-index/about.html](https://www.canada.ca/en/environment-climate-change/services/air-quality-health-index/about.html)
