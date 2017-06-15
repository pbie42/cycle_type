import xs from 'xstream'

import { nameChange, typeChange, colorChange, submitFn, clear, edit, editFn, editReducer } from './model'

import { log, bind } from '../../../utils'

export default function intent(sources) {

  const nameT = sources.DOM.select('#name').events('input')
                             .map(ev => ({ name: ev.target.value }) )
  const typeT = sources.DOM.select('#type').events('input')
                             .map(ev => ({ type: ev.target.value }))
  const colorT = sources.DOM.select('#color').events('input')
                             .map(ev => ({ color: ev.target.value }))
  const submitter = sources.DOM.select('#submit').events('click')
                             .mapTo(null)
  const editor = sources.DOM.select('#editSubmit').events('click')
                             .mapTo(null)

  const actions = xs.merge(nameT, typeT, colorT)

  return { actions, submitter, editor }
}
