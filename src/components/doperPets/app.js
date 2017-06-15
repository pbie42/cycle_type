import xs from 'xstream'
import isolate from '@cycle/isolate'
import { div, h1 } from '@cycle/dom'
import { assign } from '../../utils'

import doperForm from './doperForm/_doperForm'
import doperList from './doperList/_doperList'

export default function app(sources) {
  
  const initReducer = xs.of(function initReducer(prevState) {
    return { pets: { name: '', type: '', color: '' },
             newPets: { name: '', type: '', color: '' },
             editPets: { name: '', type: '', color: '' } } // this is the initial state
  })

  const editsProxy = xs.create().startWith('')

  const formLens = {
    get: state => ({ pets: state.pets, newPets: state.newPets, editPets: state.editPets }),
    set: (state, childState) => ({ ...state, pets: childState.pets, newPets: childState.newPets, editPets: childState.editPets })
  }

  const listLens = {
    get: state => ({ newPets: state.newPets, editPets: state.editPets }),
    set: (state, childState) => ({ ...state, newPets: childState.newPets, editPets: childState.editPets })
  }

  const form = isolate(doperForm, 'pets')(sources, editsProxy)
  const list = doperList(assign(sources, { newPets: form.newPets, editPets: form.editPets}))

  editsProxy.imitate(list.edits)

  const view = ([form, list]) =>
    div([
      form,
      list
    ])


  const reducer = xs.merge(initReducer, form.onion)

  return {
    DOM: xs.combine(form.DOM, list.DOM).map(view),
    HTTP: list.HTTP,
    history: xs.empty(),
    onion: reducer,
  }
}
