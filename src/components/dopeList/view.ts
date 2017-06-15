import { div, h1, h4, VNode } from '@cycle/dom'

import { Status } from "../repo"
import { State, Data, ViewState } from './interfaces'

export const view = ([phoneslist, state]:[ Array<VNode>, ViewState ]):VNode => {
  console.log(`getPhone`, state.requests.getPhones)
  return div([
    h1('Phones'),
    ...showPhones(phoneslist, state.requests.getPhones),
  ])
}

function showPhones(phoneslist:Array<VNode>, status:{ status:string }):Array<VNode> {
  if (status === undefined) return [ h4('loading...') ]
  if (status === Status.pending) { return [ h4('loading...') ]}
  return  phoneslist
}
