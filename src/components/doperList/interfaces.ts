import { Stream } from 'xstream'
import { HTTPSource } from '@cycle/http'
import { DOMSource, VNode } from '@cycle/dom'

export interface ListSources {
  DOM: DOMSource
  HTTP: HTTPSource
}

export interface ListSinks {
  DOM: Stream<VNode>
  HTTP: Stream<any>
  history: Stream<string>
}

export interface ListIntent {
  actions: Stream<Function>
  requests: Stream<{ getPets: { status:string } }>
  addPets: Stream<{ Data }>
  petsRemoveSuccess: Stream<Array<Data>>
}

export interface Data {
        name:string
        type:string
        color:string
}

export interface Model {
   states:Stream<ViewState>
}

export interface ViewState {
  requests: {
      getPets: { status:string }
      removePets: { status:string }
  }
}

export interface State {
    getPets:Stream<Array<{ Data }>>
    removePets:Stream<Array<Data>>
}

export interface Queries {
  responses: State
  actions: Stream<Function>
  requests:Stream<{ getPets: { status:string } }>
}

export interface ItemSources {
  DOM:DOMSource
  pets:Stream<Data>
  _idx: Stream<number>
}

export interface ItemSinks {
  DOM?: Stream<VNode>
  remove?: Stream<Event>
  removePets?: Stream<{ Data }>
}