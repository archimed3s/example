# Brand App
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Requirements
- node.js >=16
- yarn
- Pritunl (VPN for API access)

## Getting Started
1. Copy env file
```bash
cp .env.example .env.local
```

2. Install dependencies
```bash
yarn install
```

3. First, run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## API documentation
We use next.js and swagger for document our API.
Url: `/api-doc`

## Commands
```bash
yarn test # run tests
yarn test:coverage # run tests with coverage
yarn test:ci # run tests with coverage for ci
yarn docs # run handbook locally
yarn translation:extract # extract translation from lang/raw
yarn translation:compile # compile translation into lang/compiled
yarn storybook # run storybook in dev mode
yarn build-storybook # build static storybook
```

## Translation
We use format.js and react-intl for translations. We extract translations on pre commit hook

If you want to extract translations locally just run `yarn translation:sync`.

For updating translations you should update `defaultMessage` and then run `yarn translation:sync`

We extract translations only from folder `modules`, `pages` and `components`.

## Folders
- `.github` - github setup
- `__mocks__` - test mocks
- `__tests__` - folder for the page tests (that stores in `pages` folder)
- `docs` - folder for the handbook
- `models` - folder for the "big" components. (we need it because we cannot store components inside page folder)
- `pages` - folder only for next.js pages/apis. Avoid any additional files in this folder because next.js will create route for this files
- `pages/api` - api routes for BFF
- `public` - static assets
- `api` - folder for abstract api url and params preparation
- `lib` - auto generated types from services
- `types` - custom types
- `types/api` - declaration of global API annotation
- `utils` - reusable high-level functions/helpers.
- `styles` - folder for styles configuration

## Documentation
Documentation is supported by https://docsify.js.org/.

For run documentation
```shell
yarn docs
```

and access documentation in http://localhost:3000.

If you want to add more documentation you can use *.md markdown for this.

## API client auto generator

BrandApp uses OpenAPI Generator to generate API clients

To install, run `brew install openapi-generator`

To reinstall with the latest main, run `brew uninstall openapi-generator && brew install --HEAD openapi-generator`

To install OpenJDK (pre-requisites), please run
```sh
brew tap AdoptOpenJDK/openjdk
brew install --cask adoptopenjdk12
export JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk-12.0.2.jdk/Contents/Home/
```

To generate API clients, use
```sh
yarn run gen:client
```

To generate specific API client, use
```sh
yarn run gen:client:core
```

## Environment variables
About next.js environment variables you can read here https://nextjs.org/docs/basic-features/environment-variables

For local development just add you env to `.env.local`

If variable is required for local development pls add it to `.env.example`

### Build time
Sometimes we need variables only for the build (like Sentry or static variables for the build). In this case you should add them into `github secretes` and pass in 2 places in `ci.yml`:
- in `build` action inside `env` section if required for the build
- in `push-image` action inside `docker build sextion` as `--build-args`. Here you need to pass all `NEXT_PUBLIC_` variable.

## Storybook
Storybook support stories from `components` folder. 

Commands `yarn storybook` run storybook in dev mode

## Translations
For using translations service you need `.env.local` file with `LOKALISE_API_TOKEN` and `LOKALISE_PROJECT_ID`.
You can push translations to vendor service with command `yarn translation:push`. This command execute Lokalise API and upload new translations into service.

More info can be found in `docs`.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
