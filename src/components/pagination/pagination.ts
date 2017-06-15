import { State } from './../../interfaces';
import Stream from 'xstream'
import isolate from '@cycle/isolate'
import debounce from 'xstream/extra/debounce'
import { OnionSources, OnionSinks, Reducer } from '../../interfaces'
import { div, label, h2, h1, input, hr, button, VNode } from '@cycle/dom'
import Collection from '../collections'
import { log } from '../../utils'

import dogItem from './item/_item'
import intent from './intent'
import model from './model'
import { controls, dogView } from './view'

function Paginate({ DOM, HTTP, onion }: OnionSources): OnionSinks {

   const state = onion.state$

   const { actions, requests, pageInfo, content, clearContent } = intent(DOM, HTTP)
   const { reqStates } = model(actions)

   const listDogs:Stream<any> = Collection(isolate(dogItem), { DOM }, content.map(user => ({ users: Stream.of(user) })), item => item.remove, clearContent)
   const listDogsVtrees:Stream<any> = Collection.pluck(listDogs, item => item.DOM)

   const initReducer: Stream<Reducer> = Stream.of(function initReducer(prevState:any) {
      return { count: 0 }
   })

   const reducer: Stream<Reducer> = Stream.periodic(1000)
      .mapTo(function reducer(prevState) {
         // console.log(`prevState`, prevState.count++)
         return prevState
      })

   const reducers:Stream<Reducer> = Stream.merge(initReducer, reducer)

   function view([state, ctrl, dogs]:Array<State | VNode>):VNode {
      // console.log(`state`, state)
      return div([
         ctrl,
         dogs,
         div('#results_box', "dude")
      ])
   }

   const pageCtrl = pageInfo.map(controls)

   const dogs = Stream.combine(listDogsVtrees, reqStates).map(dogView)

   return {
      DOM: Stream.combine(state, pageCtrl, dogs).map(view),
      HTTP: requests,
      onion: reducers
   }
}

export default Paginate