import xs from 'xstream'
import { div, label, button, form } from '@cycle/dom'

import { textInput } from '../views'


const view = ([{ pets }, edit]) => {
  console.log(`stateView`, pets)
    const { name, type, color } = pets
    return form({attrs: { onsubmit: "return false" }}, [
      div([
        label({ attrs: { for: '#name' } }, 'name'),
        textInput('#name', name)
      ]),
      div([
        label({ attrs: { for: '#type' } }, 'type'),
        textInput('#type', type)
      ]),
      div([
        label({ attrs: { for: '#color' } }, 'color'),
        textInput('#color', color)
      ]),
      edit ? button('#submit', 'Submit') : button('#editSubmit', 'Edit')
    ])}

export default view
