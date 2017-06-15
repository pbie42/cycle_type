import { div, h1, h4, VNode } from '@cycle/dom'

import { Status } from "../../repo"
import { State } from '../interfaces';


export const view = ([peoplelist, state, edit]:[Array<VNode>, { requests }, State | String]) => {
  return div([
    h1('Users'),
    ...showPeople(peoplelist, state.requests.getPeople),
    showSaving(state.requests.savePeople)
  ])
}

function showPeople(peoplelist:Array<VNode>, status:{}):Array<VNode> {
  if (status === undefined) return [ h4('loading...') ]
  if (status === Status.pending) { return [ h4('loading...') ]}
  return peoplelist
}

function showSaving(status:{}):VNode {
  if (status === undefined) return div( )
  if (status === Status.pending) { return h4('adding people...')}
  return div()
}
