# Contributing to Air Quality Index Hub (AQI Hub)

Thank you for your interest in contributing to AQI Hub! This project is centered around delivering high-quality content, and we greatly appreciate contributions that help us achieve that goal. Whether you're adding new AQI documentation, correcting errors, or improving the clarity and accuracy of our existing content, your efforts are invaluable. This guide will help you understand the contribution process and the best practices for maintaining the quality and consistency of our site. Please review these guidelines before making your first contribution.

## Code of Conduct

Contributors must adhere to the OpenAQ [Code of Conduct](https://github.com/openaq/openaq-info/blob/main/CODE-OF-CONDUCT.md).

## Licensing

All contributions to this project will be licensed under the Creative Commons Attribution-ShareAlike (CC BY-SA 4.0) license. By submitting your work, you agree that your contributions will be freely available for others to use, modify, and share, as long as they attribute you and share any derivative works under the same license. This ensures that the project and any adaptations remain open and accessible to the community.

## Style guide

To ensure that all content on AQI Hub is consistent, clear, and aligns with our voice, we've put together a style guide. This guide provides key rules and recommendations for writing and formatting content. Following these guidelines will help maintain the quality and coherence of our site, making it easier for readers to engage with our material. Please take the time to review and adhere to these standards when contributing.

### Markdown

All content is written in Markdown following the [CommonMark](https://commonmark.org/) specification with additional standards set by [Observable Framework](https://observablehq.com/framework/markdown).

AQI Hub uses [Markdown lint](https://github.com/markdownlint/markdownlint) for flagging style issues with some custom rules sets in the [.markdownlint.json](./.markdownlint.json). All markdown content musts be formatted per these rules before approval into the codebase.

### Citations for References

References are based off of MLA 8th edition formatting with adjustments to better suit our documentation. These adjustments stemmed from the fact that all of our references were found online, a majority from government websites and digital PDFs.

This platform uses [Markdown it footnotes](https://github.com/markdown-it/markdown-it-footnote). All citations used within the text should be indicated using brackets and a carrot, as such: [^X]. In the Reference section, ensure that the citation uses the following format:

```md
[^X] : Author. "Title." Publisher, Publication Date, Location, url.
```

No space should be used between the closing bracket and the colon.

In cases such as government websites and digital PDFs, the government department or organization name was used in place of the Publisher. In cases such as webpages, the date last modified was used in place of the publication date. All dates should be in the form Day Month Year using standard abbreviations for the months:
Jan., Feb., Mar., Apr., May, June, July, Aug., Sept., Oct., Nov., Dec.

The http:// should be omitted before all links. The Reference section is ordered alphabetically, with foreign languages and numbers at the bottom.

The titles and publishers in their native language should be listed rather than manually translating it to English.

Example 1: Specific author is listed on a digital PDF.

Duarte, Filiberto Perez. “Normas Oficiales Mexicanas (NOM) - Salud Ambiental.” 18 Aug. 1994, Mexico City, [sinaica.inecc.gob.mx/pags/noms.php](http://sinaica.inecc.gob.mx/pags/noms.php).

Example 2: Government website where no author or date modified is listed.

“Air Quality Index.” Finnish Meteorological Institute, [en.ilmatieteenlaitos.fi/air-quality-index](http://en.ilmatieteenlaitos.fi/air-quality-index).

### Citations for Notes

Note sections are added under all breakpoint concentration tables and color scales. These sections include a reference to the source where the information was adapted from.

The general Note citation format is:

```md
_Note_: Adapted from "Title" (Publication Date), url. Access Date.
```

The "Note:" text is italicized and followed by "Adapted from."

Similar to the Reference citation, the date last modified is used for relevant webpages. All dates should follow the form Day Month Year and use the standard abbreviations for the month, as listed above. If there is no date listed, then n.d. is used in place of the date in parenthesis, standing for 'no date.'

Unlike the Reference citation, there is only a period used after both the url and access date. The publication date or date last modified is in paranthesis. A superscripted bracket should be included after the url link so that it is connected to its respective source listed in the Reference citations.

The titles in their native language should be used rather than manually translating it to English.

Example:

_Note_: Adapted from "PENGIRAAN INDEKS PENCEMAR UDARA(IPU). AIR POLLUTANT INDEX (API)CALCULATION" (n.d.), [https://apims.doe.gov.my/pdf/API_Calculation.pdf](https://apims.doe.gov.my/pdf/API_Calculation.pdf) [^1]. Accessed 27 July 2024.
