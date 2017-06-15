import xs from 'xstream'
import sampleCombine from 'xstream/extra/sampleCombine'
import Collection from "../../collections"

import { log, sample, bind } from '../../../utils'
import phonesItem from './item/_item'

import { model, Status } from "./model"
import { intent } from "./intent"
import { view } from "./view"

export default function List({ DOM, HTTP, newPhones, editPhones }) {

  const { actions, requests, addPhones, phonesEditSuccess } = intent({ DOM, HTTP, newPhones, editPhones })
  const { states } = model(actions)

  const listPhones = Collection(phonesItem, { DOM }, addPhones.map(phones => ({ phones: xs.of(phones) })), item => item.remove)
  const listPhonesVtrees = Collection.pluck(listPhones, item => item.DOM)
  const edits = Collection.merge(listPhones, item => item.edits)

  const edit = phonesEditSuccess.compose(sampleCombine(editPhones)).map(([_, edit]) => edit)

  return {
    DOM: xs.combine(listPhonesVtrees, states, edit.startWith('')).map(view),
    HTTP: requests,
    history: xs.empty(),
    edits
  }
}
