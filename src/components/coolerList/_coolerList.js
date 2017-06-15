import xs from 'xstream'
import sampleCombine from 'xstream/extra/sampleCombine'
import Collection from "../collections"

import { log, sample, bind } from '../../utils'
import petsItem from './item/_item'

import { model } from "./model"
import { intent } from "./intent"
import { view } from "./view"

export default function coolerList({ DOM, HTTP }) {

  const removeProxy = xs.create()

  const { actions, requests, addPets, petsRemoveSuccess } = intent({ DOM, HTTP }, removeProxy)
  const { states } = model(actions)

  const listPets = Collection(petsItem, { DOM }, addPets.map(pets => ({ pets: xs.of(pets) })), item => item.remove)
  const listPetsVtrees = Collection.pluck(listPets, item => item.DOM)
  const remove = Collection.merge(listPets, item => item.removePets).map(log)

  removeProxy.imitate(remove)

  return {
    DOM: xs.combine(listPetsVtrees, states).map(view),
    HTTP: requests,
    history: xs.empty(),
  }
}
