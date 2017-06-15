import xs from "xstream"
import sampleCombine from 'xstream/extra/sampleCombine'
import { div, p, button } from '@cycle/dom'

export default function petsItem({ DOM, pets, _idx}) {

  const remove = DOM.select('.remove').events('click').mapTo(null)
  const edit = DOM.select('.edit').events('click')

  const edits = xs.combine(pets, _idx, edit).map(function([ data, idx, _ ]) {
      console.log(`edits clicked`, { name: data.name, type: data.type, color: data.color, id: idx })
      return { name: data.name, type: data.type, color: data.color, id: idx }
    })

  const items = xs.combine(pets, _idx)

  var sinks = {
    DOM: items.map(([{ name, type, color,  }, _idx]) =>
      div({ attrs: { 'data-id': _idx } }, [
        p(`name: ${name}`),
        p(`type: ${type}`),
        p(`color: ${color}`),
        button('.edit', 'Edit'),
        button('.remove', 'Remove')
      ])
    ),
    remove,
    edits
  }

  return sinks
}
