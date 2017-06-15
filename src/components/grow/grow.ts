import Stream from 'xstream'
import { Sources, Sinks } from '../../interfaces'
import { div, label, h2, h1, input, hr, button, VNode } from '@cycle/dom'
import debounce from 'xstream/extra/debounce'
import isolate from '@cycle/isolate'
import Collection from '../collections'
import Slider from './slider'

function Grow({ DOM }:Sources) {
   const addBoxEv: Stream<Event> = DOM.select('.addBtn').events('click')
   const addBox: Stream<null> = addBoxEv.mapTo(null)
   const boxItems: Stream<any> = Collection(Slider, { DOM }, addBox, item => item.remove)
   const boxItemsVtrees: Stream<VNode> = Collection.pluck(boxItems, item => item.DOM)

   const sinks: Sinks = {
      DOM: boxItemsVtrees.map(vtrees =>
         div([
            button(".addBtn", "Add Another"),
            div('.items', vtrees)
         ])
      )
   }

  return sinks
}

export default Grow