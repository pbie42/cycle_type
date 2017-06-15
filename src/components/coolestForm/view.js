import xs from 'xstream'
import { div, label, button, form } from '@cycle/dom'

import { textInput } from '../views'

const view = ({ username, password,  }) => {
  console.log({ username, password,  })
    return form({attrs: { onsubmit: "return false" }}, [ 
      div([
        label({ attrs: { for: '#username' } }, 'username'),
        textInput('#username', username)
      ]),
      div([
        label({ attrs: { for: '#password' } }, 'password'),
        textInput('#password', password)
      ]),
      button('#submit', 'Submit')
    ])}

export default view
