# POKE-TEST

This application was created to be used with [PokeApi](https://pokeapi.co/)

## Table of Contents

- [POKE-TEST](#poke-test)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Project Structure](#project-structure)
  - [Folders Descriptions](#folders-descriptions)
  - [Demo](#demo)
  - [Stack](#stack)

## Introduction

This application allows the creation of a profile for a Pokémon trainer including personal information and photography and the selection of their team made up of 3 Pokémon

## Prerequisites

To run this application you should have

- Node: 23.6.1
- npm: 10.9.2

## Installation

In order to install the application you need to do the following steps:

1. Clone the repository:

   ```bash
   git clone git@github.com:marv007/poke-test.git
   cd poke-test
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

## Usage

1. Open `src/environment/environment.ts` and make sure the API URL  `<apiUrl>` is correct 

2. Run project:

   ```bash
   npm start
   ```

3. Open your browser at `http://localhost:4200`

## Project Structure

```
poketest
├─ README.md
├─ angular.json
├─ package.json
├─ public
├─ src
│  ├─ app
│  │  ├─ components
│  │  ├─ constants
│  │  ├─ guards
│  │  ├─ interceptors
│  │  ├─ mocks
│  │  ├─ models
│  │  ├─ pages
│  │  ├─ services
│  │  └─ utils
│  ├─ environments
│  ├─ index.html
│  ├─ main.ts
│  ├─ styles
│  └─ styles.scss
├─ tsconfig.app.json
├─ tsconfig.json
└─ tsconfig.spec.json
```

## Folders Descriptions

- **`src/`**: It contains all the app source code
- **`app/components/`**: Reusable UI components
- **`app/constants/`**: Project global constants
- **`app/guards/`**: Configuration for route guards
- **`app/interceptors/`**: Http interceptor to be used on app
- **`app/mocks/`**: Util mock data
- **`app/models/`**: Project models
- **`app/pages/`**: Components that are visible pages on the app
- **`app/services/`**: API connections and logical methods
- **`app/utils/`**: Project global functions and pipes
- **`styles/`**: Global styles variables
- **`environments/`**: Contains environment config for production and development
- **`package.json`**: Project Dependencies

## Demo

You can see a live demo of the application [here](https://poke-test-five.vercel.app/).

## Stack

- [Angular](https://angular.dev/)
- [Typescript](https://www.typescriptlang.org/)
- [Angular Material](https://material.angular.io/)
- [Swiper](https://swiperjs.com/element)
- [NGX toaster](https://ngx-toastr.vercel.app/)

9. ## Docker

This projet uses a basic docker implementation

In order to generate a docker image and run it yo may follow:

1. Remember to add the right API URL to the `<apiUrl>` variable within `src/environment/environment.prod.ts`

2. Build the docker image:

   ```bash
   docker build -t poke-test .
   ```

3. Run the docker container mapping the container's port 80 to your local 8080 port

   ```bash
   docker run -d -p 8080:80 poke-test
   ```

4. Open your browser at `localhost:8080` to see the running application
