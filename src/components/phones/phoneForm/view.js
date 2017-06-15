import xs from 'xstream'
import { div, label, button, form } from '@cycle/dom'

import { textInput } from '../../coolForm/views'


const view = ([{ brand, model, year,  }, edit]) => {
  console.log({ brand, model, year,  })
    return form({attrs: { onsubmit: "return false" }}, [
      div([
        label({ attrs: { for: '#brand' } }, 'brand'),
        textInput('#brand', brand)
      ]),
      div([
        label({ attrs: { for: '#model' } }, 'model'),
        textInput('#model', model)
      ]),
      div([
        label({ attrs: { for: '#year' } }, 'year'),
        textInput('#year', year)
      ]),
      edit ? button('#submit', 'Submit') : button('#editSubmit', 'Edit')
    ])}

export default view
