import { Stream } from "xstream"

import { div, label, input, hr, h1, p, button, DOMSource, VNode } from '@cycle/dom'

interface Sources {
	DOM: DOMSource
}

interface Sinks {
  DOM: Stream<VNode>
}

function Counter({ DOM }:Sources): Sinks {

   const incEv: Stream<Event> = DOM.select('.increment').events('click')
   const decEv: Stream<Event> = DOM.select('.decrement').events('click')

   const increment: Stream<number> = incEv.map(ev => +1)
   const decrement: Stream<number> = decEv.map(ev => -1)

   const actions: Stream<number> = Stream.merge(increment, decrement)

   const counts = actions.fold((x,y) => x + y, 0)

   const view: Stream<VNode> = counts.map(count => {
      return div([
        button(".increment", "Increment"),
        button(".decrement", "Decrement"),
        hr(),
        p(`Count is currently: ${count}`)
      ])
   })
   
   return {
      DOM: view
   }
}

export default Counter