import xs from 'xstream'

import { nameChange, typeChange, colorChange, submitFn, clear, edit, editFn, editReducer } from './model'

import { log, bind } from '../../../utils'

export default function intent(sources) {

  const name = sources.DOM.select('#name').events('input')
                             .map(ev => ({ pets: { name: ev.target.value } }) )
  const type = sources.DOM.select('#type').events('input')
                             .map(ev => ({ pets: { type: ev.target.value } }))
  const color = sources.DOM.select('#color').events('input')
                             .map(ev => ({ pets: { color: ev.target.value } }))

  const submitter = sources.DOM.select('#submit').events('click').mapTo(null)
  const editor = sources.DOM.select('#editSubmit').events('click').mapTo(null)

  const actions = xs.merge(name, type, color)

  return { actions, submitter, editor }
}
