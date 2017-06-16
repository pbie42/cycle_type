import "./styles/main.styl"
import onionify from 'cycle-onionify';

import { Stream } from "xstream"

import { run } from '@cycle/run'
import { makeDOMDriver} from '@cycle/dom'
import { makeHTTPDriver } from '@cycle/http'

import { Hello, Counter, Bmi, Slider, Grow, Paginate, coolForm, app, pet, phone2, dope, doper, cooler, coolerForm, coolest, petApp, doperPets, example } from "./pages/home"

function main(sources) {
	return petApp(sources)
}

const wrappedMain = onionify(main)

run(wrappedMain, {
	DOM: makeDOMDriver('#app'),
	HTTP: makeHTTPDriver()
})
