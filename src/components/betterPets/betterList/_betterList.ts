import { Stream } from 'xstream'
import { VNode } from '@cycle/dom'
import Collection from "../../collections"

import { log, sample, bind, mergeState } from '../../../utils'
import petsItem from './item/_item'

import { model } from "./model"
import { intent } from "./intent"
import { view } from "./view"

import { Sources, ListSinks, ListState, ListIntent, NewState, ItemSinks, Data } from '../interfaces'

export default function List({ DOM, HTTP, onion }:Sources, newPets:Stream<NewState>, editPets:Stream<NewState>):ListSinks {

  const state:Stream<NewState> = onion.state$

  const { actions, requests, addPets }:ListIntent = intent({ DOM, HTTP, onion }, newPets, editPets)
  const { states }:{ states:Stream<ListState>} = model(actions)

  const listPets:Stream<Array<ItemSinks>> = Collection(petsItem, { DOM }, addPets.map(pets => ({ pets: Stream.of(pets) })), item => item.remove, editPets)
  const listPetsVtrees:Stream<Array<VNode>> = Collection.pluck(listPets, item => item.DOM)
  const edits:Stream<Array<Data>> = Collection.merge(listPets, item => item.edits)

  return {
    DOM: Stream.combine(listPetsVtrees, states).map(view),
    HTTP: requests,
    onion: edits.map(data => bind(mergeState, { pets: data })),
    history: Stream.empty(),
    edits
  }
}
