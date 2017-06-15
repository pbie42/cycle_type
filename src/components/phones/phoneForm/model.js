import { log, sample, assign } from '../../../utils'


export default function model(actions) {
  const states = actions.fold((state, action) => action(state), init())

  const submit = actions.filter(action => action.name === 'submitFn')
  const newPhones = sample(states, submit)

  const editSubmit = actions.filter(action => action.name === 'editFn')
  const editPhones = sample(states, editSubmit)

  return { states, newPhones, editPhones }
}

export const init = () => ({ brand: '', model: '', year: '',  })

export const clear = () => init()

export const edit = (data, state) =>
      assign(state, { brand: data.brand, model: data.model, year: data.year, id: data.id })

export const submitFn = (state) => state

export const editFn = (state) => state

export const brandChange = (brand, state) => assign(state, { brand })

export const modelChange = (model, state) => assign(state, { model })

export const yearChange = (year, state) => assign(state, { year })

