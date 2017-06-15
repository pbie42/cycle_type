import xs from "xstream"
import sampleCombine from 'xstream/extra/sampleCombine'
import delay from 'xstream/extra/delay'
import { div, p, button } from '@cycle/dom'
import { log } from '../../../utils'

export default function petsItem({ DOM, pets, _idx}) {

  const removeEv = DOM.select('.remove').events('click')

  const remove = removeEv.compose(delay(50))

  const removePets = xs.combine(pets, _idx, removeEv).map(function([ data, idx, _ ]) {
      return { name: data.name, type: data.type, color: data.color, id: idx }
  }).map(log)

  const items = xs.combine(pets, _idx)

  var sinks = {
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
