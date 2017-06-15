import xs from 'xstream'
import { div, label, button, form } from '@cycle/dom'

import { textInput } from '../views'


const view = ([{ name, type, color, id }, edit, state]) => {
  console.log(`stateView`, state)
  console.log({ name, type, color, id })
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
