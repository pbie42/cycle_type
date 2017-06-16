import xs from 'xstream'
import Collection from "../../collections"

import { bind, mergeState } from '../../../utils'
import petsItem from './item/_item'

import { model } from "./model"
import { intent } from "./intent"
import { view } from "./view"

export default function List({ DOM, HTTP, onion }, newPets, editPets) {

  const state = onion.state$

  const { actions, requests, addPets } = intent({ DOM, HTTP }, newPets, editPets)
  const { states } = model(actions)

  const listPets = Collection(petsItem, { DOM }, addPets.map(pets => ({ pets: xs.of(pets) })), item => item.remove, editPets)
  const listPetsVtrees = Collection.pluck(listPets, item => item.DOM)
  const edits = Collection.merge(listPets, item => item.edits)

  return {
    DOM: xs.combine(listPetsVtrees, states).map(view),
    onion: edits.map(data => bind(mergeState, { pets: data })),
    HTTP: requests,
    history: xs.empty(),
    edits
  }
}