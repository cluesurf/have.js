/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { haveText, testText } from './index.js'

let text = JSON.parse('"hello"')

if (testText(text)) {
  console.log(text)
}

let nonText = JSON.parse('false')

if (testText(nonText)) {
  console.log(nonText)
}

haveText(true, 'true')
