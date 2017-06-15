import { Stream } from 'xstream'

import { nameChange, typeChange, colorChange, submitFn, clear, edit, editFn } from './model'

import { log, bind } from '../../../utils'
import { FormIntent, Sources } from '../interfaces';

export default function intent({ DOM, HTTP }:Sources, reset:Stream<{}>, edits:Stream<{}>):FormIntent {

  
  const nameEv:Stream<Event> = DOM.select('#name').events('input')
  const typeEv:Stream<Event> = DOM.select('#type').events('input')
  const colorEv:Stream<Event> = DOM.select('#color').events('input')
  const submitEv:Stream<Event> = DOM.select('#submit').events('click')
  const editEv:Stream<Event> = DOM.select('#editSubmit').events('click')

  
  
  const name:Stream<Function> = nameEv.map(ev => (ev.target as HTMLInputElement).value)
                             .map(name => bind(nameChange, name))
  const type:Stream<Function> = typeEv.map(ev => (ev.target as HTMLInputElement).value)
                             .map(type => bind(typeChange, type))
  const color:Stream<Function> = colorEv.map(ev => (ev.target as HTMLInputElement).value)
                             .map(color => bind(colorChange, color))

  const submit:Stream<Function> = submitEv.mapTo(submitFn)

  const editSubmit:Stream<Function> = editEv.mapTo(editFn)

  const actions:Stream<Function | {}> = Stream.merge(name, type, color, submit, reset.mapTo(clear), edits.map(data => bind(edit, data)), editSubmit)

  return { actions }
}
