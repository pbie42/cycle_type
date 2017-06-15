import xs from 'xstream'
import delay from 'xstream/extra/delay'

import { log, sample, assign, bind, mergeState } from '../../../utils'


export default function model(actions, submitter, editor, edits) {

  const updater = actions.map(action => bind(mergeState, action))

  const editorReducer = edits.map(data => bind(editReducer, data))

  const clearerReducer = xs.merge(submitter, editor).map(data => function clearReducer(prevState) {
    return { name: '', type: '', color: '' }
  }).compose(delay(60))

  const edit = xs.merge(xs.empty().startWith(true),
                        edits.mapTo(false), editor.mapTo(true))

  const reducer = xs.merge(updater, editorReducer, clearerReducer)

  return { updater, reducer, edit }
}

export function editReducer(data, prevState) { return data }

function updateReducer(actions, prevState) {
  if (actions.name) return { name: actions.name, type: prevState.type, color: prevState.color }
  if (actions.type) return { name: prevState.name, type: actions.type, color: prevState.color }
  if (actions.color) return { name: prevState.name, type: prevState.type, color: actions.color }
}
