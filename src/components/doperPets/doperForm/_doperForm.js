import xs from 'xstream'

import { log, bind, sample } from "../../../utils"

import model from "./model"
import view from "./view"
import intent from "./intent"

import { editReducer } from './model.js'

export default function doperForm(sources, edits) {

  const state = sources.onion.state$

  const { actions, submitter, editor } = intent(sources)
  const { updater, reducer, edit } = model(actions, submitter, editor, edits)

  const newerPets = sample(state, submitter)
  const newerEdit = sample(state, editor)

  return {
    DOM: xs.combine(state, edit).map(view),
    HTTP: xs.empty(),
    history: xs.empty(),
    onion: reducer,
    newPets: newerPets,
    editPets: newerEdit
  }

}
