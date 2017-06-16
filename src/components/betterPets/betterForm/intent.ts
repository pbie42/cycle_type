import { Stream } from 'xstream'

import { log, bind } from '../../../utils'
import { FormIntent, Sources, StatePiece } from '../interfaces';

export default function intent({ DOM, HTTP }:Sources):FormIntent {

  const nameEv:Stream<Event> = DOM.select('#name').events('input')
  const typeEv:Stream<Event> = DOM.select('#type').events('input')
  const colorEv:Stream<Event> = DOM.select('#color').events('input')
  const submitEv:Stream<Event> = DOM.select('#submit').events('click')
  const editEv:Stream<Event> = DOM.select('#editSubmit').events('click')

  const name:Stream<StatePiece> = nameEv.map(ev => ({ pets: { name: (ev.target as HTMLInputElement).value } }))
  const type:Stream<StatePiece> = typeEv.map(ev => ({ pets: { type: (ev.target as HTMLInputElement).value } }))
  const color:Stream<StatePiece> = colorEv.map(ev => ({ pets: { color: (ev.target as HTMLInputElement).value } }))
  const submitter:Stream<null> = submitEv.mapTo(null)
  const editor:Stream<null> = editEv.mapTo(null)

  const actions:Stream<StatePiece> = Stream.merge(name, type, color)

  return { actions, submitter, editor }
}
