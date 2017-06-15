import xs from 'xstream'
import sampleCombine from 'xstream/extra/sampleCombine'
import Collection from "../../collections"

import { log, sample, bind } from '../../../utils'
import petsItem from './item/_item'

import { model, Status } from "./model"
import { intent } from "./intent"
import { view } from "./view"

export default function List({ DOM, HTTP, onion }, newPets, editPets) {

  const state = onion.state$

  const { actions, requests, addPets, petsEditSuccess } = intent({ DOM, HTTP }, newPets, editPets)
  const { states } = model(actions)

  const listPets = Collection(petsItem, { DOM }, addPets.map(pets => ({ pets: xs.of(pets) })), item => item.remove)
  const listPetsVtrees = Collection.pluck(listPets, item => item.DOM)
  const edits = Collection.merge(listPets, item => item.edits)

  edits.addListener({
    next: i => console.log(`edits`, i)
  })

  const reducer = edits.map(data => bind(mergeState, { pets: data }))

  const edit = petsEditSuccess.compose(sampleCombine(editPets)).map(([_, edit]) => edit)

  const reducers = xs.merge(reducer)

  return {
    DOM: xs.combine(listPetsVtrees, states, edit.startWith('')).map(view),
    HTTP: requests,
    history: xs.empty(),
    onion: reducers,
    edits
  }
}

function mergeState(obj1, obj2) {
    const obj3 = { pets: {} }
    console.log(`obj1`, obj1)
    console.log(`obj2`, obj2)
    for (let attrname in obj2) { obj3[attrname] = obj2[attrname] }
    for (let attrname in obj2.pets) { obj3.pets[attrname] = obj2.pets[attrname] }
    for (let attrname in obj1.pets) { obj3.pets[attrname] = obj1.pets[attrname] }
    console.log(`obj3`, obj3)
    return obj3
}