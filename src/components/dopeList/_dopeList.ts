import { Stream } from 'xstream'
import { HTTPSource } from '@cycle/http';
import { DOMSource, VNode } from '@cycle/dom';
import sampleCombine from 'xstream/extra/sampleCombine'
import Collection from "../collections"

import { log, sample, bind } from '../../utils'
import phonesItem from './item/_item'

import { model } from "./model"
import { intent } from "./intent"
import { view } from "./view"

import { ListSources, ListSinks, ListIntent, ItemSinks, Model } from './interfaces'

export default function List({ DOM, HTTP }:ListSources):ListSinks {

  const removeProxy:Stream<{}> = Stream.create()

  const { actions, requests, addPhones, phonesRemoveSuccess }:ListIntent = intent({ DOM, HTTP }, removeProxy)
  const { states }:Model = model(actions)

  const listPhones:ItemSinks = Collection(phonesItem, { DOM }, addPhones.map(phones => ({ phones: Stream.of(phones) })), item => item.remove)
  const listPhonesVtrees:Stream<Array<VNode>> = Collection.pluck(listPhones, item => item.DOM)
  const remove:Stream<Array<any>> = Collection.merge(listPhones, item => item.removePhones).map(log)

  removeProxy.imitate(remove)

  return {
    DOM: Stream.combine(listPhonesVtrees, states).map(view),
    HTTP: requests,
    history: Stream.empty(),
  }
}
