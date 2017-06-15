import { div, h1, h4, VNode } from '@cycle/dom'

import { Status } from "../repo"
import { State, Data, ViewState } from './interfaces'

export const view = ([petslist, state]:[ Array<VNode>, ViewState ]):VNode => {
  console.log(`getPhone`, state.requests.getPets)
  return div([
    h1('Pets'),
    ...showPets(petslist, state.requests.getPets),
  ])
}

function showPets(petslist:Array<VNode>, status:{ status:string }):Array<VNode> {
  if (status === undefined) return [ h4('loading...') ]
  if (status === Status.pending) { return [ h4('loading...') ]}
  return  petslist
}
