import { Stream } from 'xstream'
import { HTTPSource } from '@cycle/http'
import { DOMSource, VNode } from '@cycle/dom'
import sampleCombine from 'xstream/extra/sampleCombine'
import Collection from "../../collections"

import { log, sample, bind } from '../../../utils'
import peopleItem from './item/_item'

import { model } from "./model"
import { intent } from "./intent"
import { view } from "./view"

import { ListSources, ListSinks, ListIntent, State } from '../interfaces'

export default function List({ DOM, HTTP, newPeople, editPeople }:ListSources):ListSinks {

  const { actions, requests, addPeople, peopleEditSuccess }:ListIntent = intent({ DOM, HTTP, newPeople, editPeople })
  const { states }:{ states:Stream<{}> } = model(actions)

  const listPeople:Stream<Array<{}>> = Collection(peopleItem, { DOM }, addPeople.map(people => ({ people: Stream.of(people) })), item => item.remove)
  const listPeopleVtrees:Stream<Array<VNode>> = Collection.pluck(listPeople, item => item.DOM)
  const edits:Stream<Array<State>> = Collection.merge(listPeople, item => item.edits)

  const edit:Stream<State | String> = peopleEditSuccess.compose(sampleCombine(editPeople)).map(([_, edit]) => edit)

  return {
    DOM: Stream.combine(listPeopleVtrees, states, edit.startWith('')).map(view),
    HTTP: requests,
    history: Stream.empty(),
    edits
  }
}
