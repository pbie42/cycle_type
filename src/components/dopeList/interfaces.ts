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
  requests: Stream<{ getPhones: { status:string } }>
  addPhones: Stream<{ Data }>
  phonesRemoveSuccess: Stream<Array<Data>>
}

export interface Data {
  brand:string
  model:string
  year:string
}

export interface Model {
   states:Stream<ViewState>
}

export interface ViewState {
  requests: {
      getPhones: { status:string }
      removePhones: { status:string }
  }
}

export interface State {
    getPhones:Stream<Array<{ Data }>>
    removePhones:Stream<Array<Data>>
}

export interface Queries {
  responses: State
  actions: Stream<Function>
  requests:Stream<{ getPhones: { status:string } }>
}

export interface ItemSources {
  DOM:DOMSource
  phones:Stream<Data>
  _idx: Stream<number>
}

export interface ItemSinks {
  DOM?: Stream<VNode>
  remove?: Stream<Event>
  removePhones?: Stream<{ Data }>
}