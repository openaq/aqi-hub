# Peru

## Índice de Calidad del Aire (INCA)

## Background

The Peru Índice de Calidad del Aire (INCA) covers 6 pollutants including PM<sub>2.5</sub>, PM<sub>10</sub>, O<sub>3</sub>, NO<sub>2</sub>, SO<sub>2</sub>, H<sub>2</sub>S and CO. The Ministerio del Ambiente (MINAM), Ministry of the Environment, oversaw the development of the INCA through ministerial resolutions. Codified in a ministerial resolution in 2016[^1], INCA is based on the air quality standards set in Decreto Supremo N.° 003-2017-MINAM.  

## Color scale

The INCA color scale consists of four colors each with a numerical range of the INCA score and a category name.


```js
import {colorScale} from "../components/color-scale.js";
```

```js
colorScale([
    {label: 'Good', color: '#04ff00'}
    ,{label: 'Moderate', color: '#ffff00'}
    ,{label: 'Bad', color: '#f79645'}
    ,{label: 'VUEC', color: '#ff0000'}
    ])
```

Note: Adapted from "Concepto INCA" (n.d.) <https://infoaireperu.minam.gob.pe/indice-de-la-calidad-del-aire/concepto-inca/>. Accessed on August 16, 2024.

The valor umbral del estado de cuidado (VUEC), or threshold of concern, is variable between each pollutant as can be seen below.

## Methods

MINAM determines pollutant specific standards which forms the basis for computing the sub-index for the INCA. There is no specific guidance on rounding or truncating values before computing the index.

To calculate the INCA index for a pollutant we multiply the pollutant by 100 divided the pollutant standard for that pollutant:

```tex

I_{P} = {C} \times \frac{100}{S_{P}} 

```

where  

* ${tex`S_{P}`} = Weighting standard of pollutant ${tex`P`}
* ${tex`C`} = Concentration value of respective pollutant in µg/m<sup>3</sup>

The values of the weighting standard for each pollutant are as followed:  

* ${tex`PM_{2.5}`} = 25  
* ${tex`PM_{10}`} = 150  
* ${tex`O_3`} = 120  
* ${tex`NO_2`} = 200
* ${tex`SO_2`} = 20  
* ${tex`CO`} = 10000  
* ${tex`H_2S`} = 150  

Due to the nature of this function, each pollutant has different upper INCA scores for the “bad” category and varying lower values for the “Threshold of Concern” or VUEC. The 100 value divided by the pollutant standard appears to be to pin the value against the “bad” category for each pollutant, determining the slope of the linear function for the INCA score.

The ministerial resolutions and other sources only provide guidance on computing pollutant specific indices, there is no additional guidance on if a composite or cross pollutant index method exists.

## References

“Concepto INCA.: Bicentenario Perú 2021, [[infoaireperu.minam.gob.pe/indice-de-la-calidad-del-aire/concepto-inca/#:~:text=El%20%C3%8Dndice%20de%20Calidad%20del%20Aire%20(INCA)%20tiene%20un%20valor,de%20Calidad%20Ambiental%20de%20Aire](https://infoaireperu.minam.gob.pe/indice-de-la-calidad-del-aire/concepto-inca/#:~:text=El%20%C3%8Dndice%20de%20Calidad%20del%20Aire%20(INCA)%20tiene%20un%20valor,de%20Calidad%20Ambiental%20de%20Aire)]

“Decreto Supremo N.° 003-2017-MINAM.” 7 June 2017, [www.gob.pe/institucion/minam/normas-legales/3670-003-2017-minam](https://www.gob.pe/institucion/minam/normas-legales/3670-003-2017-minam).

“Resolución Ministerial N.° 181-2016-MINAM.” 14 Jul. 2016, Lima, [www.gob.pe/institucion/minam/normas-legales/318191-181-2016-minam](https://www.gob.pe/institucion/minam/normas-legales/318191-181-2016-minam).

[^1]: “Resolución Ministerial N.° 181-2016-MINAM.” [www.gob.pe/institucion/minam/normas-legales/318191-181-2016-minam](https://www.gob.pe/institucion/minam/normas-legales/318191-181-2016-minam)