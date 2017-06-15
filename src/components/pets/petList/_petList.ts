import { Stream } from 'xstream'
import { HTTPSource } from '@cycle/http'
import { DOMSource, VNode } from '@cycle/dom'
import sampleCombine from 'xstream/extra/sampleCombine'
import Collection from "../../collections"

import { log, sample, bind } from '../../../utils'
import petsItem from './item/_item'

import { model } from "./model"
import { intent } from "./intent"
import { view } from "./view"

import { ListSources, ListSinks, ListState, ListIntent, State, ItemSinks, Data } from '../interfaces'

export default function List({ DOM, HTTP, newPets, editPets }:ListSources):ListSinks {

  const { actions, requests, addPets, petsEditSuccess }:ListIntent = intent({ DOM, HTTP, newPets, editPets })
  const { states }:{ states:Stream<ListState>} = model(actions)

  const listPets:Stream<Array<ItemSinks>> = Collection(petsItem, { DOM }, addPets.map(pets => ({ pets: Stream.of(pets) })), item => item.remove)
  const listPetsVtrees:Stream<Array<VNode>> = Collection.pluck(listPets, item => item.DOM)
  const edits:Stream<Array<Data>> = Collection.merge(listPets, item => item.edits)

  const edit:Stream<State | String> = petsEditSuccess.compose(sampleCombine(editPets)).map(([_, edit]) => edit)

  return {
    DOM: Stream.combine(listPetsVtrees, states, edit.startWith('')).map(view),
    HTTP: requests,
    history: Stream.empty(),
    edits
  }
}
