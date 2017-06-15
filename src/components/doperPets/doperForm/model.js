import xs from 'xstream'
import delay from 'xstream/extra/delay'

import { log, sample, assign, bind, mergeState } from '../../../utils'


export default function model(actions, submitter, editor, edits) {

  const updater = actions.map(action => bind(mergeState, action))
  const editorReducer = edits.map(data => bind(editReducer, data))
  const clearerReducer = xs.merge(submitter, editor).map(data => function clearReducer(prevState) {
    return { pets: { name: '', type: '', color: '' }}
  }).compose(delay(60))

  const edit = xs.merge(xs.empty().startWith(true), edits.mapTo(false), editor.mapTo(true))
  const reducer = xs.merge(updater, clearerReducer).map(log)

  return { updater, reducer, edit }
}

export function editReducer(data, prevState) { return data }

function updateReducer(actions, prevState) {
  if (actions.name) return { pets: { name: actions.name, type: prevState.pets.type, color: prevState.pets.color } }
  if (actions.type) return { pets: { name: prevState.pets.name, type: actions.type, color: prevState.pets.color } }
  if (actions.color) return { pets: { name: prevState.pets.name, type: prevState.pets.type, color: actions.color } }
}
