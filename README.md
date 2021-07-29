# syshik

_[(from сыщик, pronounced Sih-sheek; IPA: [ˈsɨɕːɪk])](https://en.wiktionary.org/wiki/%D1%81%D1%8B%D1%89%D0%B8%D0%BA)_

Search utility for text obscured using homoglyphs or other text trickery

> **Note:** Requires [ES module](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) and [`String.prototype.normalize`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/normalize) support.

## Installation

```js
yarn add syshik
```

## Usage

```js
import syshik from 'syshik'
// or
import { find } from 'syshik'

const text = 'No one knows that I live in |\\/|𝚘𝝄𝕟 𐒴ⅰ𝕧ҽʀ'

const matches = syshik.find(text, 'moon river')
// matches => ['|\\/|𝚘𝝄𝕟 𐒴ⅰ𝕧ҽʀ']
```

## Contributing

Found patterns or homoglyphs that are not supported? Found a bug?

- [Create an issue](https://github.com/adalinesimonian/syshik/issues/new)
- [Contribute a PR](https://github.com/adalinesimonian/syshik/compare)

## Licence

ISC (see [LICENCE](LICENCE))
