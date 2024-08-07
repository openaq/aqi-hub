# United Arab Emirates (UAE)

## Air Quality Index (AQI)

## Background

The UAE has an established Emirati Air Quality Index as _established_ by the United Arab Emirates Ministry of Climate Change and Environment as of 2023 [3]. The Emirati Air Quality Index incorporates the pollutants PM<sub>10</sub>, O<sub>3</sub>, SO<sub>2</sub>, and NO<sub>2</sub> as controlled by the National Ambient Air Quality Standards (_as established by the UAE Cabinet Decree 12 of 2006  Regarding Regulation Concerning Protection of Air from Pollution, Annex 8_), as well as PM<sub>2.5</sub>.

The Emirati Air Quality Index holds data validation procedures regarding the averaging period for sub-index calculations. For 8 and 24 rolling averaging periods, there must be a minimum 75% coverage rate, equal to at least 6 and 18 valid hourly averages respectively. If there is a lack of sufficient valid data for calculations and all available hourly values are “below the standards'', the sub-index for the respective pollutant is reported as null [3]. If there is a lack of sufficient valid data and at least one of the values is “above the standards,” the maximum hourly value is used to estimate the sub-index [3].

Additionally, when the hourly concentration of pollutant exceeds the following values, the respective sub-index is reported as null [3]. _The reason behind this invalidation of exceeding concentration is not clarified, nor the reasoning behind the threshold exact values._

<table>
  <tr>
   <td>Pollutant
   </td>
   <td>Maximum recorded hourly concentration
   </td>
  </tr>
  <tr>
   <td>CO mg/m<sup>3</sup>
   </td>
   <td>150.4
   </td>
  </tr>
  <tr>
   <td>PM<sub>10</sub> µg/m<sup>3</sup>
   </td>
   <td>2500.0
   </td>
  </tr>
  <tr>
   <td>PM<sub>2.5</sub> µg/m<sup>3</sup>
   </td>
   <td>2500.0
   </td>
  </tr>
  <tr>
   <td>O<sub>3</sub> µg/m<sup>3</sup>
   </td>
   <td>1000.4
   </td>
  </tr>
  <tr>
   <td>SO<sub>2</sub> µg/m<sup>3</sup>
   </td>
   <td>1750.4
   </td>
  </tr>
  <tr>
   <td>NO<sub>2</sub> µg/m<sup>3</sup>
   </td>
   <td>2000.4
   </td>
  </tr>
</table>

The Emirati Air Quality index uses conversion factors for ppb to µg/m<sup>3</sup> at standard pressure and temperature: 1 atmosphere of pressure and 25 degrees Celsius. The unit notation of µg/Nm<sup>3</sup> is frequently used when referring to pollutant concentration, with the capital “N” indicating values assuming standard pressure and temperature.

The UAE has established a National Air Quality Platform to provide real-time information of air quality as received by 31 air pollution monitoring stations across the UAE[1]. This platform uses an Air Quality Index platform that is able to forecast the air quality status for up to three days in advance. It is said to predict the concentration of dust and particulate matters within a diameter less than 2.5 microns[1].

## Color scale

```js
import { colorScale } from '../components/color-scale.js';
```

UAE uses a color scale comprised of six levels:

```js
colorScale([
  { label: 'Good', color: '#92ce50', range: '0-50' },
  { label: 'Acceptable', color: '#ffff00', range: '51-100' },
  { label: 'Unhealthy for sensitive groups', color: '#ffc000', range: '101-1500' },
  { label: 'Unhealthy', color: '#FF0000', range: '151-200' },
  { label: 'Very unhealthy', color: '#7030a0', range: '201-300' },
    { label: 'Hazardous', color: '#660033', range: '301-500' },

])
```


## Methods

<table>
  <tr>
   <td>Pollutant
   </td>
   <td>Avg. Period
   </td>
   <td>Good
   </td>
   <td>Moderate
   </td>
   <td>Unhealthy for Sensitive groups
   </td>
   <td>Unhealthy
   </td>
   <td>Very unhealthy
   </td>
   <td>Hazardous
   </td>
  </tr>
  <tr>
   <td>PM<sub>2.5</sub>
<p>
µg/Nm<sup>3</sup>
   </td>
   <td>24hr.
   </td>
   <td>0-50
   </td>
   <td>50.1-60
   </td>
   <td>60.1-75
   </td>
   <td>75.1-150
   </td>
   <td>150.1-250
   </td>
   <td>250.1-500
   </td>
  </tr>
  <tr>
   <td>PM<sub>10</sub>
<p>
µg/Nm<sup>3</sup>
   </td>
   <td>24hr.
   </td>
   <td>0-75
   </td>
   <td>76-150
   </td>
   <td>151-250
   </td>
   <td>251-350
   </td>
   <td>351-420
   </td>
   <td>421-600
   </td>
  </tr>
  <tr>
   <td>CO
<p>
mg/Nm<sup>3</sup>
   </td>
   <td>8hr.
   </td>
   <td>0-5
   </td>
   <td>5.1-10
   </td>
   <td>10.1-14.3
   </td>
   <td>14.34-17.8
   </td>
   <td>17.9-35
   </td>
   <td>35.1-58
   </td>
  </tr>
  <tr>
   <td>O<sub>3</sub>
<p>
µg/Nm<sup>3</sup>
   </td>
   <td>1hr.
   </td>
   <td>
   </td>
   <td>
   </td>
   <td>200-322
   </td>
   <td>323-400
   </td>
   <td>401-792
   </td>
   <td>793-1184
   </td>
  </tr>
  <tr>
   <td>O<sub>3</sub>
<p>
µg/Nm<sup>3</sup>
   </td>
   <td>8hr.
   </td>
   <td>0-100
   </td>
   <td>101-120
   </td>
   <td>121-167
   </td>
   <td>168-206
   </td>
   <td>207-392
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>SO<sub>2</sub>
<p>
µg/Nm<sup>3</sup>
   </td>
   <td>1hr.
   </td>
   <td>0-92
   </td>
   <td>93-350
   </td>
   <td>351-485
   </td>
   <td>486-797
   </td>
   <td>
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>SO<sub>2</sub>
<p>
µg/Nm<sup>3</sup>
   </td>
   <td>24hr.
   </td>
   <td>
   </td>
   <td>
   </td>
   <td>
   </td>
   <td>
   </td>
   <td>798-1583
   </td>
   <td>1584-2631
   </td>
  </tr>
  <tr>
   <td>NO<sub>2</sub>
<p>
µg/Nm<sup>3</sup>
   </td>
   <td>1hr.
   </td>
   <td>0-100
   </td>
   <td>101-400
   </td>
   <td>401-677
   </td>
   <td>678-1221
   </td>
   <td>1222-2349
   </td>
   <td>2350-3853
   </td>
  </tr>
</table>

The Emirati Air Quality Index is a composite index value calculated using the EPA AQI 2018 methodology [3] with slightly altered breakpoints.

The following piecewise linear function is used to perform all sub-index calculations:

```tex

SI_p = \frac{I_{Hi} - I_{LO}}{BP_{Ho} - BP_{Lo}} \times (C_- BP_{Lo}) + I_{Lo}

```

* ${tex`SI_P`} - Sub-index for pollutant p

* ${tex`SI_P`} - Index for pollutant P

* ${tex`I_{HI}`} - AQI value corresponding to ${tex`BP_{HI}`}

* ${tex`I_{LO}`} - AQI value corresponding to ${tex`BP_{LO}`}

* ${tex`BP_{HI}`} - Concentration breakpoint that is greater than or equal to ${tex`C_P`}

* ${tex`BP_{LO}`} - Concentration breakpoint that is less than or equal to ${tex`C_P`}

* ${tex`C_P`} - Truncated concentration of pollutant P

The Emirati Air Quality Index only reports a composite AQI corresponding to the highest sub-index value calculated for the pollutants of PM<sub>10</sub>, PM<sub>2.5</sub>, O<sub>3</sub>, NO<sub>2</sub>, and SO<sub>2</sub>. The average concentration of each pollutant is calculated using the corresponding averaging period. If the averaging period exceeds 1 hour, the moving average is used (_terminology: end-of-period / end-of-hour calculation?_) with the last hour range corresponding to the hour for reporting the index.

The UAE’s Air Quality Index has multiple sub-indexes, with both different averaging periods and breakpoint values for O<sub>3</sub> and SO<sub>2</sub>. This indicates that different average periods should be used according to varying pollutant levels. For O<sub>3</sub>, a 1 hour averaging period should be used if the pollutant concentration is above 200 µg/Nm<sup>3</sup>, while any concentration less than should be measured using an 8 hour rolling averaging period. For SO<sub>2</sub>, a 1 hour averaging period should be used for pollutant concentrations up to 797 µg/Nm<sup>3</sup>, while for exceeding concentrations a 24 hour rolling averaging period should be used. For PM<sub>2.5</sub> and PM<sub>10</sub>, a 24 hour rolling averaging period is used. For CO, an 8 hour rolling averaging period is used, while for NO<sub>2</sub>, a one hour averaging period is used. It is unclear what level the pollutant concentrations above the upper bound are classified as.

For PM<sub>10</sub>, O<sub>3</sub>, SO<sub>2</sub>, and NO<sub>2</sub> sub-index calculations, the concentrations are truncated to the nearest µg/Nm<sup>3</sup>. For CO and PM<sub>2.5</sub>, the concentrations are truncated to the nearest 0.1 mg/Nm3 and 0.1 µg/Nm<sup>3</sup>, respectively. For the composite Emirati Air Quality Index calculation, the final index value obtained is rounded to the nearest whole number.

Breakpoints for each pollutant are based on the EPA guidance for the Air Quality Index of September 2018 (link to reference 5 on page 11 of [3] ) along with the National Ambient Air Quality Standards (link to reference as stated above, also in [3]).

For all pollutants, the upper breakpoints in the “Moderate” category correspond to the National Ambient Air Quality Standards[3].

For O<sub>3</sub>, the “good” category is set in accordance with the WHO Air Quality Guideline level[4 in doc] while the breakpoints in all other categories are set in accordance with the US-EPA guideline for Air Quality Index [5 from doc]. An 8 hour running averaging period is used as effects from Ozone exposure occur over several hours.

For CO, all breakpoints are in accordance with the US-EPA guidance for the Air Quality Index. An 8 hour averaging period is used as it “provides the most suitable control to keep blood carboxyhemoglobin levels below 2.5% where health effects (including a safety margin) can be observed.”[3]

For SO<sub>2</sub>, breakpoints are set in accordance with the US-EPA guidance for the Air Quality Index for all categories except “Very unhealthy” and “Hazardous” categories, where the 24 hour averaging period breakpoints are used. This is due to the fact that the US-EPA does not define breakpoints for one hour rolling averages in these categories. A one hour averaging period is ideal for SO<sub>2</sub> measurements as “the effects of sulfur dioxide exposure occur very rapidly[3].”

For NO<sub>2</sub>, all breakpoints are set in accordance with US EPA guidance for the Air Quality Index. A 1 hour averaging period is used as “the effects on health in experimental studies on people with asthma were detectable within an hour of exposure.”

For PM<sub>10</sub>, all breakpoints are set in accordance with US EPA guidance for the Air Quality Index. A 24 rolling averaging period is used as “evidence indicates that acute health effects occur after pollution episodes lasting at least 24 hours.[3]”

For PM<sub>2.5</sub>, the upper breakpoint in the ‘Moderate’ category corresponds to the proposed ambient standard by the UAE. The upper breakpoint in the ‘Good’ category corresponds to the WHO Interim Target 2 and the upper breakpoint in the ‘Unhealthy for sensitive groups’ category corresponds to the WHO Interim target 1. All other breakpoints were established according to the US-EPA guidance for the Air Quality Index.

### Example

<table>
  <tr>
   <td>Pollutant
   </td>
   <td>Average Concentration per Period
   </td>
   <td>Sub-Index
   </td>
   <td>Sub-Index Level
   </td>
  </tr>
  <tr>
   <td>PM<sub>2.5</sub>
   </td>
   <td>24.4 µg/Nm<sup>3</sup>
   </td>
   <td>24
   </td>
   <td>Good
   </td>
  </tr>
  <tr>
   <td>PM<sub>10</sub>
   </td>
   <td>143.5 µg/Nm<sup>3</sup>
   </td>
   <td>96
   </td>
   <td>Moderate
   </td>
  </tr>
  <tr>
   <td>CO
   </td>
   <td>3.87 mg/Nm<sup>3</sup>
   </td>
   <td>37
   </td>
   <td>Good
   </td>
  </tr>
  <tr>
   <td>O<sub>3</sub>
   </td>
   <td>140.56 µg/Nm<sup>3</sup>
   </td>
   <td>122
   </td>
   <td>Unhealthy for Sensitive Groups
   </td>
  </tr>
  <tr>
   <td>SO<sub>2</sub>
   </td>
   <td>105.82 µg/Nm<sup>3</sup>
   </td>
   <td>53
   </td>
   <td>Good
   </td>
  </tr>
  <tr>
   <td>NO<sub>2</sub>
   </td>
   <td>73.49 µg/Nm<sup>3</sup>
   </td>
   <td>37
   </td>
   <td>Good
   </td>
  </tr>
</table>

The Emirati Air Quality Index is 122 and category ‘Unhealthy for sensitive groups,’ with Ozone being the primary pollutant.

References

[1] [Overview](https://u.ae/en/information-and-services/environment-and-energy/improving-air-quality)

[2] [AQI Manual PDF](https://www.moccae.gov.ae/assets/91c95f18/uae-air-quality-index-manual.aspx)

[3] [AQI Guideline PDF](https://airquality.ncm.gov.ae/resources/pdf/aqi-quickguide-en-2023.pdf)

Other Helpful Links:

[https://www.moccae.gov.ae/en/knowledge-and-statistics/air-quality.aspx](https://www.moccae.gov.ae/en/knowledge-and-statistics/air-quality.aspx)

[https://airquality.ncm.gov.ae/resources/pdf/aqi-quickguide-en-2023.pdf](https://airquality.ncm.gov.ae/resources/pdf/aqi-quickguide-en-2023.pdf)

[https://airquality.ncm.gov.ae/?lang=en](https://airquality.ncm.gov.ae/?lang=en)

_[https://www.moccae.gov.ae/assets/91c95f18/uae-air-quality-index-manual.aspx](https://www.moccae.gov.ae/assets/91c95f18/uae-air-quality-index-manual.aspx)_

_[https://u.ae/en/information-and-services/environment-and-energy/improving-air-quality](https://u.ae/en/information-and-services/environment-and-energy/improving-air-quality)_
