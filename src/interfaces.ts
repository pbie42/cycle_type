import { HTTPSource } from '@cycle/http'
import { Stream } from "xstream"
import { StateSource } from 'cycle-onionify'
import { DOMSource, VNode } from '@cycle/dom'

export interface Sources {
	DOM: DOMSource
}

export interface Sinks {
  DOM: Stream<VNode>
}

export interface BleshAction {
  type: 'BLESH'
  payload: number
}

export interface BloshAction {
  type: 'BLOSH'
  payload: string
}

export type Action = BleshAction | BloshAction

export interface State {
  count: number
  age: number
  title: string
}

export type Reducer = (prev?: State) => State | undefined

export interface OnionSources {
  DOM: DOMSource
  HTTP: HTTPSource
  onion: StateSource<State>
}

export interface OnionSinks {
  DOM: Stream<VNode>
  HTTP: Stream<any>
  onion: Stream<Reducer>
}