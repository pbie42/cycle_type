import { Stream } from 'xstream'
import { div, VNode } from '@cycle/dom'
import { assign } from '../../utils'

import petForm from './petForm/_petForm'
import petList from './petList/_petList'

import { Sources, Sinks, FormSinks, ListSinks } from './interfaces'

export default function app({DOM, HTTP}:Sources):Sinks {

  const editsProxy:Stream<{}> = Stream.create().startWith('')

  const form:FormSinks = petForm({ DOM, HTTP }, editsProxy)
  const list:ListSinks = petList(assign({ DOM, HTTP }, { newPets: form.newPets,
                                             editPets: form.editPets}))

  editsProxy.imitate(list.edits)

  const view = ([form, list]:Array<VNode>):VNode =>
    div([
      form,
      list
    ])


  return {
    DOM: Stream.combine(form.DOM, list.DOM).map(view),
    HTTP: list.HTTP,
    history: Stream.empty()
  }
}
