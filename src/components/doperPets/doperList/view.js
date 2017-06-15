import { div, h1, h4 } from '@cycle/dom'

import { Status } from "../../repo"

export const view = ([petslist, state, edit]) => {
  return div([
    h1('Pets'),
    ...showPets(petslist, state.requests.getPets),
    showSaving(state.requests.savePets)
  ])
}

function showPets(petslist, status) {
  if (status === undefined) return [ h4('loading...') ]
  if (status === Status.pending) { return [ h4('loading...') ]}
  return  petslist
}

function showSaving(status) {
  if (status === undefined) return div( )
  if (status === Status.pending) { return h4('adding pets...')}
  return  div()
}
