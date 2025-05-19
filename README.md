# OpenAQ AQI Hub

![AQI_Hub](https://github.com/user-attachments/assets/401cb4e6-1a48-402e-8106-ddd977116bb5)

A comprehensive reference documentation site for different country/administration air quality index scales.

## Development

This site built using the [Astro](https://astro.build/).

### Contributing

Contributions are welcome! See the [CONTRIBUTING.md](./CONTRIBUTING.md) guide for more information.

## License

The source code for the repository is licensed under an MIT license, found at [LICENSE](./LICENSE).

All content (markdown files) in the docs directory is licensed CC BY-SA 4.0, found at [LICENSE-content](./LICENSE-content).

### Local development

The application requires Node 20 for building and development.

Install dependencies with:

```sh
npm install
```

To run a local development version run:

```sh
npm run dev
```

To generate a static production build, run:

```sh
npm run build
```

### Linting and style

[ESLint](https://eslint.org/) is used for code linting, see
[eslint.config.js](eslint.config.js) for specifcs.
[Prettier](https://prettier.io/) is used for code style and formatting, see the
[.prettierrc](.prettierrc) file for specifics.
