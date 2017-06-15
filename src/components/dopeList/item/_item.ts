import { Stream } from "xstream"
import sampleCombine from 'xstream/extra/sampleCombine'
import delay from 'xstream/extra/delay'
import { div, p, button, VNode, DOMSource } from '@cycle/dom'
import { log } from '../../../utils'

import { ItemSources, ItemSinks, Data } from '../interfaces'

export default function phonesItem({ DOM, phones, _idx}:ItemSources):ItemSinks {

  const removeEv:Stream<Event> = DOM.select('.remove').events('click')

  const remove:Stream<Event> = removeEv.compose(delay(50))

  const removePhones:Stream<{ Data }> = Stream.combine(phones, _idx, removeEv).map(function([ data, idx, _ ]) {
      return { brand: data.brand, model: data.model, year: data.year, id: idx }
  }).map(log)

  const items:Stream<[ Data, Number ]> = Stream.combine(phones, _idx)

  var sinks:ItemSinks = {
    DOM: items.map(([{ brand, model, year,  }, _idx]) =>
      div({ attrs: { 'data-id': _idx } }, [
        p(`brand: ${brand}`),
        p(`model: ${model}`),
        p(`year: ${year}`),
        button('.remove', 'Remove')
      ])
    ),
    remove,
    removePhones
  }

  return sinks
}
