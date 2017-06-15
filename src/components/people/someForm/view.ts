import { Stream } from 'xstream'
import { div, label, button, form, VNode } from '@cycle/dom'

import { textInput } from '../../coolForm/views'
import { State } from '../interfaces'

const view = ([{ name, email, location,  }, edit]:[ State, Boolean ]):VNode => {
  console.log({ name, email, location,  })
    return form({attrs: { onsubmit: "return false" }}, [
      div([
        label({ attrs: { for: '#name' } }, 'name'),
        textInput('#name', name)
      ]),
      div([
        label({ attrs: { for: '#email' } }, 'email'),
        textInput('#email', email)
      ]),
      div([
        label({ attrs: { for: '#location' } }, 'location'),
        textInput('#location', location)
      ]),
      edit ? button('#submit', 'Submit') : button('#editSubmit', 'Edit')
    ])}

export default view
