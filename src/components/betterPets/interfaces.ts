import { Stream } from 'xstream'
import { HTTPSource } from '@cycle/http';
import { DOMSource, VNode } from '@cycle/dom';

export interface Query {
  method:string
  url:string
  category:string
}

export interface Queries {
  responses: {
    getPets: Stream<State[]>
    savePets: Stream<State[]>
    editPets: Stream<State[]>
  }
  actions: Stream<Function>
  requests: Stream<Query>
}

export interface Sources {
  DOM:DOMSource
  HTTP:HTTPSource
}

export interface Sinks {
  DOM: Stream<VNode>
  HTTP: Stream<Query>
  history: Stream<String>
}

export interface State {
  name: string, 
  type: string, 
  color: string, 
}

export interface ListState {
  requests: {
    editPets?: { status:string }
    getPets?: { status:string }
    savePets?: { status:string }
  }
}

export interface Data {
  name: string, 
  type: string, 
  color: string, 
  id:number
}

export interface FormStates {
  states:Stream<State>,
  newPets:Stream<State>,
  editPets:Stream<State>
}

export interface FormSinks {
  DOM:Stream<VNode>,
  HTTP:Stream<Query>,
  history:Stream<String>,
  newPets:Stream<State>,
  editPets:Stream<State>
}

export interface FormIntent {
   actions:Stream<Function | {}>
}

export interface ListSources {
  DOM:DOMSource,
  HTTP:HTTPSource,
  newPets:Stream<State>,
  editPets:Stream<State>
}

export interface ListSinks {
  DOM: Stream<VNode>
  HTTP: Stream<Query>
  history:Stream<String>
  edits:Stream<Data[]>
}

export interface ListIntent {
  actions:Stream<Function>
  requests: Stream<Query>
  addPets:Stream<State | {}>
}

export interface ItemSources {
  DOM:DOMSource
  pets: Stream<State>
  _idx:Stream<number>
}

export interface ItemSinks {
  DOM:Stream<VNode>
  remove:Stream<null>
  edits:Stream<Data>
}