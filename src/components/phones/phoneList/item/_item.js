import xs from "xstream"
import sampleCombine from 'xstream/extra/sampleCombine'
import { div, p, button } from '@cycle/dom'

export default function phonesItem({ DOM, phones, _idx}) {

  const remove = DOM.select('.remove').events('click').mapTo(null)
  const edit = DOM.select('.edit').events('click')

  const edits = xs.combine(phones, _idx, edit).map(function([ data, idx, _ ]) {
      return { brand: data.brand, model: data.model, year: data.year, id: idx }
    })

  const items = xs.combine(phones, _idx)

  var sinks = {
    DOM: items.map(([{ brand, model, year,  }, _idx]) =>
      div({ attrs: { 'data-id': _idx } }, [
        
        p(brand),
        
        p(model),
        
        p(year),
        
        button('.edit', 'Edit'),
        button('.remove', 'Remove')
      ])
    ),
    remove,
    edits
  }

  return sinks
}
