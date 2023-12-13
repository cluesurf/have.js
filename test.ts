/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { makeBaseKinkText, makeKinkText } from '@termsurf/kink-text'
import { haveText, testText } from './index.js'
import Kink from '@termsurf/kink'

// https://nodejs.org/api/errors.html
process.on('uncaughtException', err => {
  if (err instanceof Kink) {
    // Kink.saveFill(err, err.link)
    console.log(makeKinkText(err))
  } else {
    console.log(makeBaseKinkText(err))
  }
})

let text = JSON.parse('"hello"')

if (testText(text)) {
  console.log(text)
}

let nonText = JSON.parse('false')

if (testText(nonText)) {
  console.log(nonText)
}

haveText(true, 'true')
