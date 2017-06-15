import { Stream } from 'xstream'
import { HTTPSource } from '@cycle/http';
import { DOMSource, VNode } from '@cycle/dom';

export type Query = Stream<{}>

export interface Sources {
  DOM:DOMSource,
  HTTP:HTTPSource
}

export interface Sinks {
  DOM: Stream<VNode>,
  HTTP: Stream<any>,
  history: Stream<any>,
}

export interface State {
  name:string,
  email:string,
  location:string
}

export interface FormStates {
  states:Stream<State>,
  newPeople:Stream<State>,
  editPeople:Stream<State>
}

export interface FormSinks {
  DOM:Stream<VNode>,
  HTTP:Stream<any>,
  history:Stream<any>,
  newPeople:Stream<State>,
  editPeople:Stream<State>
}

export interface FormIntent {
   actions:Stream<Function | {}>
}

export interface ListSources {
  DOM:DOMSource,
  HTTP:HTTPSource,
  newPeople:Stream<State>,
  editPeople:Stream<State>
}

export interface ListSinks {
  DOM: Stream<VNode>,
  HTTP: Stream<any>,
  history:Stream<any>,
  edits:Stream<any>
}

export interface ListIntent {
  actions: Query,
  requests: Query,
  addPeople: Stream<Array<{}> | {}>,
  peopleEditSuccess: Query
}

export interface ItemSources {
  DOM:DOMSource,
  people: Stream<State>,
  _idx:Stream<number>
}

export interface ItemSinks {
  DOM:Stream<VNode>,
  remove:Stream<null>,
  edits:Stream<State>
}