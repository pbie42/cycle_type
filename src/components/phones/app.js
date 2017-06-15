import xs from 'xstream'
import { div, h1 } from '@cycle/dom'
import { assign } from '../../utils'

import phoneForm from './phoneForm/_phoneForm'
import phoneList from './phoneList/_phoneList'

export default function app(sources) {

  const editsProxy = xs.create().startWith('')

  const form = phoneForm(sources, editsProxy)
  const list = phoneList(assign(sources, { newPhones: form.newPhones,
                                             editPhones: form.editPhones}))

  editsProxy.imitate(list.edits)

  const view = ([form, list]) =>
    div([
      form,
      list
    ])


  return {
    DOM: xs.combine(form.DOM, list.DOM).map(view),
    HTTP: list.HTTP,
    history: xs.empty()
  }
}
