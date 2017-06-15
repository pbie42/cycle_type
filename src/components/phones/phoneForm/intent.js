import xs from 'xstream'

import { brandChange, modelChange, yearChange, submitFn, clear, edit, editFn } from './model'

import { log, bind } from '../../../utils'

export default function intent(sources, reset, edits) {

  
  const brand = sources.DOM.select('#brand').events('input')
                             .map(ev => ev.target.value)
                             .map(brand => bind(brandChange, brand))
  const model = sources.DOM.select('#model').events('input')
                             .map(ev => ev.target.value)
                             .map(model => bind(modelChange, model))
  const year = sources.DOM.select('#year').events('input')
                             .map(ev => ev.target.value)
                             .map(year => bind(yearChange, year))

  const submit = sources.DOM.select('#submit').events('click')
                             .mapTo(submitFn)

  const editSubmit = sources.DOM.select('#editSubmit').events('click')
                             .mapTo(editFn)

  const actions = xs.merge(brand, model, year, submit, reset.mapTo(clear), edits.map(data => bind(edit, data)), editSubmit)

  return { actions }
}
