import { Stream } from 'xstream'
import { log, sample, assign } from '../../../utils'

import { State, FormStates, Data } from '../interfaces'

export default function model(actions:Stream<Function | { name?:string }>):FormStates {
  const states:Stream<State> = actions.fold((state:State, action:Function):State => action(state), init())

  const submit:Stream<Function | {}> = actions.filter(action => action.name === 'submitFn')
  const newPets:Stream<State> = sample(states, submit)

  const editSubmit:Stream<Function | {}> = actions.filter(action => action.name === 'editFn')
  const editPets:Stream<State> = sample(states, editSubmit)

  return { states, newPets, editPets }
}

export const init = ():State => ({ name: '', type: '', color: '',  })

export const clear = ():State => init()

export const edit = (data:Data, state:State):State =>
      assign(state, { name: data.name, type: data.type, color: data.color, id: data.id })

export const submitFn = (state:State):State => state

export const editFn = (state:State):State => state

export const nameChange = (name:String, state:State):State => assign(state, { name })

export const typeChange = (type:String, state:State):State => assign(state, { type })

export const colorChange = (color:String, state:State) => assign(state, { color })


