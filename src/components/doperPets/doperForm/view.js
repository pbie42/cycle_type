import xs from 'xstream'
import { div, label, button, form } from '@cycle/dom'

import { textInput } from '../views'


const view = ([{ pets }, edit]) => {
  console.log(`stateView`, pets)
    return form({attrs: { onsubmit: "return false" }}, [
      div([
        label({ attrs: { for: '#name' } }, 'name'),
        textInput('#name', pets.name)
      ]),
      div([
        label({ attrs: { for: '#type' } }, 'type'),
        textInput('#type', pets.type)
      ]),
      div([
        label({ attrs: { for: '#color' } }, 'color'),
        textInput('#color', pets.color)
      ]),
      edit ? button('#submit', 'Submit') : button('#editSubmit', 'Edit')
    ])}

export default view
