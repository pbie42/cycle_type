import { Stream } from 'xstream'
import { log, sample, assign } from '../../../utils'

import { State, FormStates } from '../interfaces'

export default function model(actions):FormStates {
  const states:Stream<State> = actions.fold((state, action) => action(state), init())

  const submit:Stream<Function> = actions.filter(action => action.name === 'submitFn')
  const newPeople:Stream<State> = sample(states, submit)

  const editSubmit:Stream<Function> = actions.filter(action => action.name === 'editFn')
  const editPeople:Stream<State> = sample(states, editSubmit)

  return { states, newPeople, editPeople }
}

export const init = () => ({ name: '', email: '', location: '',  })

export const clear = () => init()

export const edit = (data, state) =>
      assign(state, { name: data.name, email: data.email, location: data.location, id: data.id })

export const submitFn = (state) => state

export const editFn = (state) => state

export const nameChange = (name, state) => assign(state, { name })

export const emailChange = (email, state) => assign(state, { email })

export const locationChange = (location, state) => assign(state, { location })

