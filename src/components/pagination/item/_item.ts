import Stream from "xstream"
import sampleCombine from 'xstream/extra/sampleCombine'
import { Sinks } from '../../../interfaces'
import { DOMSource, VNode } from '@cycle/dom'
import { div, p, button, img, ul, li, h4, span } from '@cycle/dom'

export default function dogItem({ DOM, users, _idx}):Sinks {

  const remove = DOM.select('.remove').events('click').mapTo(null)

  const dog:Stream<Array<any>> = Stream.combine(users, _idx)

  const sinks = {
    DOM: dog.map(([{ url }, _idx]) => {
      return img({ attrs: { src: `images/cooldogs${url}.jpg` },
                   style: { height: '400px', width: '400px' } }
                )
    }),
    remove
  }

  return sinks
}
