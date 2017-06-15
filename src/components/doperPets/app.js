import xs from 'xstream'
import isolate from '@cycle/isolate'
import { div, h1 } from '@cycle/dom'

import doperForm from './doperForm/_doperForm'
import doperList from './doperList/_doperList'

import { assign } from '../../utils'

export default function app(sources) {

  const editsProxy = xs.create().startWith('')

  const initReducer = xs.of(function initReducer(prevState) {
    return { pets: { name: '', type: '', color: '' },
             newPets: { name: '', type: '', color: '' },
             editPets: { name: '', type: '', color: '' } } // this is the initial state
  })

  const formListLens = {
    get: state => ({ pets: state.pets }),
    set: (state, childState) => (assign({}, state, { pets: childState.pets }))
  }

  const form = isolate(doperForm, { onion: formListLens })(sources, editsProxy)
  const list = isolate(doperList, { onion: formListLens })(sources, form.newPets, form.editPets)

  const view = ([form, list]) => div([ form, list ])
  const reducer = xs.merge(initReducer, form.onion, list.onion)

  editsProxy.imitate(list.edits)

  return {
    DOM: xs.combine(form.DOM, list.DOM).map(view),
    HTTP: list.HTTP,
    history: xs.empty(),
    onion: reducer,
  }
}
