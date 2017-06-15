import { Stream } from 'xstream'

import model from "./model"
import view from "./view"
import intent from "./intent"

import { log } from "../../../utils"
import { FormSinks, State, FormStates, FormIntent, Sources } from '../interfaces'

export default function betterForm({ DOM, HTTP }:Sources, edits:Stream<{}>):FormSinks {

  const resets: Stream<{}> = Stream.create()

  const { actions }:FormIntent = intent({ DOM, HTTP }, resets, edits)
  const { states, newPets, editPets }:FormStates = model(actions)

  const newReset:Stream<State> = Stream.merge(newPets, editPets)
  const edit:Stream<Boolean> = Stream.merge(Stream.empty().startWith(true),
                        edits.mapTo(false), editPets.mapTo(true))

  resets.imitate(newReset)

  return {
    DOM: Stream.combine(states, edit).map(view),
    HTTP: Stream.empty(),
    history: Stream.empty(),
    newPets,
    editPets
  }

}
