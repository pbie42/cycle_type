import { Stream } from 'xstream'
import { div } from '@cycle/dom'
import { assign } from '../../utils'

import someForm from './someForm/_someForm'
import someList from './someList/_someList'

import { Sources, Sinks, FormSinks, ListSinks } from './interfaces'

export default function app({DOM, HTTP}:Sources):Sinks {

  const editsProxy:Stream<{}> = Stream.create().startWith('')

  const form:FormSinks = someForm({ DOM, HTTP }, editsProxy)
  const list:ListSinks = someList(assign({ DOM, HTTP }, { newPeople: form.newPeople,
                                             editPeople: form.editPeople}))

  editsProxy.imitate(list.edits)

  const view = ([form, list]) =>
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
