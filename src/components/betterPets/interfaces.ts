import { Stream } from 'xstream'
import { StateSource } from 'cycle-onionify'
import { HTTPSource } from '@cycle/http'
import { DOMSource, VNode } from '@cycle/dom'

export interface NewState {
    pets: {
      name:string
      type:string
      color:string
      id?:number
    }
  }

export interface StatePiece { pets: { [x:string]:string } }


export type Reducer = (prev?: NewState) => NewState | undefined

export interface Sources {
  DOM: DOMSource
  onion: StateSource<NewState>
  HTTP:HTTPSource
}

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

// export interface Sources {
//   DOM:DOMSource
//   HTTP:HTTPSource
// }

export interface Sinks {
  DOM: Stream<VNode>
  HTTP: Stream<Query>
  history: Stream<String>
  onion: Stream<{} | Reducer>
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

//------------------FORM--------------------------------------------------------

export interface FormSinks {
  DOM:Stream<VNode>
  HTTP:Stream<Query>
  history:Stream<String>
  onion:Stream<Reducer>
  newPets:Stream<NewState>
  editPets:Stream<NewState>
}

export interface FormModel {
  updater:Stream<Reducer>
  reducer:Stream<Reducer>
  edit:Stream<Boolean>
}

export interface FormIntent {
   actions:Stream<StatePiece>
   submitter:Stream<null>
   editor:Stream<null>
}

//------------------LIST--------------------------------------------------------

export interface ListSinks {
  DOM: Stream<VNode>
  HTTP: Stream<Query>
  onion: Stream<Reducer>
  history:Stream<String>
  edits:Stream<Data[]>
}

export interface ListIntent {
  actions:Stream<Function>
  requests: Stream<Query>
  addPets:Stream<State | {}>
}

//------------------ITEM--------------------------------------------------------

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