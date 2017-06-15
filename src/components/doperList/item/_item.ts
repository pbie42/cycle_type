import { Stream } from "xstream"
import sampleCombine from 'xstream/extra/sampleCombine'
import delay from 'xstream/extra/delay'
import { div, p, button, VNode, DOMSource } from '@cycle/dom'
import { log } from '../../../utils'

import { ItemSources, ItemSinks, Data } from '../interfaces'

export default function petsItem({ DOM, pets, _idx}:ItemSources):ItemSinks {

  const removeEv:Stream<Event> = DOM.select('.remove').events('click')

  const remove:Stream<Event> = removeEv.compose(delay(50))

  const removePets:Stream<{ Data }> = Stream.combine(pets, _idx, removeEv).map(function([ data, idx, _ ]) {
      return { name: data.name, type: data.type, color: data.color, id: idx }
  }).map(log)

  const items:Stream<[ Data, Number ]> = Stream.combine(pets, _idx)

  var sinks:ItemSinks = {
    DOM: items.map(([{ name, type, color,  }, _idx]) =>
      div({ attrs: { 'data-id': _idx } }, [
        p(`name: ${name}`),
        p(`type: ${type}`),
        p(`color: ${color}`),
        button('.remove', 'Remove')
      ])
    ),
    remove,
    removePets
  }

  return sinks
}
