<h1 align="center">Welcome to `appwrite-types-generator` 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-0.0.3-blue.svg?cacheSeconds=2592000" />
  <a href="#" target="_blank">
    <img alt="License: ISC" src="https://img.shields.io/badge/License-ISC-yellow.svg" />
  </a>
  <a href="https://twitter.com/DittmannTorsten" target="_blank">
    <img alt="Twitter: DittmannTorsten" src="https://img.shields.io/twitter/follow/DittmannTorsten.svg?style=social" />
  </a>
</p>

> CLI tool to generate Typescript, Kotlin or PHP Definitions from your Appwrite Collections.

*This is work in progress*

## Install

```sh
npm i appwrite-types-generator
```

## CLI Usage

```sh
aw-types generate -l typescript -c config.json -o types/ 
```

## package.json

```json
{
    "scripts": {
        "types": "aw-types generate -l typescript -c config.json -o types/"
    }
}
```

## config.json

```json
{
    "endpoint": "http://appwrite.io/v1",
    "project": "607dd16494ca6",
    "key": "159b16ec27dcd686ca0927fb4a7e....."
}
```

## Languages
- typescript
- kotlin
- php

## Author

👤 **Torsten Dittmann**

* Website: https://dittmann.dev
* Twitter: [@DittmannTorsten](https://twitter.com/DittmannTorsten)
* Github: [@TorstenDittmann](https://github.com/TorstenDittmann)
