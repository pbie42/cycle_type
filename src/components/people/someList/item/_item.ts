import { Stream } from "xstream"
import { div, p, button } from '@cycle/dom'

import { State, ItemSources, ItemSinks } from '../../interfaces'

export default function peopleItem({ DOM, people, _idx}:ItemSources ):ItemSinks {

  const removeEv:Stream<Event> = DOM.select('.remove').events('click')
  const remove:Stream<null> = removeEv.mapTo(null)
  const editEv:Stream<Event> = DOM.select('.edit').events('click')

  const edits:Stream<State> = Stream.combine(people, _idx, editEv).map(function([ data, idx, _ ]) {
      return { name: data.name, email: data.email, location: data.location, id: idx }
    })

  const items:Stream<[State, number]> = Stream.combine(people, _idx)

  return {
    DOM: items.map(([{ name, email, location,  }, _idx]) =>
      div({ attrs: { 'data-id': _idx } }, [
        
        p(name),
        
        p(email),
        
        p(location),
        
        button('.edit', 'Edit'),
        button('.remove', 'Remove')
      ])
    ),
    remove,
    edits
  }
}
