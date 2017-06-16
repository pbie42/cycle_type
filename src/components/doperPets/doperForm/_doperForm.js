import xs from 'xstream'

import { sample } from "../../../utils"

import model from "./model"
import view from "./view"
import intent from "./intent"

import { editReducer } from './model.js'

export default function doperForm(sources, edits) {

  const state = sources.onion.state$

  const { actions, submitter, editor } = intent(sources)
  const { updater, reducer, edit } = model(actions, submitter, editor, edits)

  const newPets = sample(state, submitter)
  const editPets = sample(state, editor)

  newPets.addListener({
    next: i => console.log(`newPets`, i)
  })

  return {
    DOM: xs.combine(state, edit).map(view),
    HTTP: xs.empty(),
    history: xs.empty(),
    onion: reducer,
    newPets,
    editPets
  }

}
