import { Stream } from 'xstream'
import { HTTPSource } from '@cycle/http';
import { DOMSource, VNode } from '@cycle/dom';
import sampleCombine from 'xstream/extra/sampleCombine'
import Collection from "../collections"

import { log, sample, bind } from '../../utils'
import petsItem from './item/_item'

import { model } from "./model"
import { intent } from "./intent"
import { view } from "./view"

import { ListSources, ListSinks, ListIntent, ItemSinks, Model } from './interfaces'

export default function doperList({ DOM, HTTP }:ListSources):ListSinks {

  const removeProxy:Stream<{}> = Stream.create()

  const { actions, requests, addPets, petsRemoveSuccess }:ListIntent = intent({ DOM, HTTP }, removeProxy)
  const { states }:Model = model(actions)

  const listPets:ItemSinks = Collection(petsItem, { DOM }, addPets.map(pets => ({ pets: Stream.of(pets) })), item => item.remove)
  const listPetsVtrees:Stream<Array<VNode>> = Collection.pluck(listPets, item => item.DOM)
  const remove:Stream<Array<any>> = Collection.merge(listPets, item => item.removePets).map(log)

  removeProxy.imitate(remove)

  return {
    DOM: Stream.combine(listPetsVtrees, states).map(view),
    HTTP: requests,
    history: Stream.empty(),
  }
}
