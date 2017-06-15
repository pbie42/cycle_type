import { Stream } from 'xstream'

import model from "./model"
import view from "./view"
import intent from "./intent"

import { log } from "../../../utils"
import { FormSinks, State, FormStates, FormIntent, Sources } from './../interfaces'

export default function someForm({ DOM, HTTP }:Sources, edits:any):FormSinks {

  const resets: Stream<{}> = Stream.create()

  const { actions }:FormIntent = intent({ DOM, HTTP }, resets, edits)
  const { states, newPeople, editPeople }:FormStates = model(actions)

  const newReset:Stream<State> = Stream.merge(newPeople, editPeople)
  const edit:Stream<Boolean> = Stream.merge(Stream.empty().startWith(true),
                        edits.mapTo(false), editPeople.mapTo(true))

  resets.imitate(newReset)

  return {
    DOM: Stream.combine(states, edit).map(view),
    HTTP: Stream.empty(),
    history: Stream.empty(),
    newPeople,
    editPeople
  }

}
