import { Stream } from "xstream"

import { div, label, input, hr, h1, DOMSource, VNode } from '@cycle/dom'

interface Sources {
	DOM: DOMSource
}

interface Sinks {
  DOM: Stream<VNode>
}

function Hello({ DOM }: Sources): Sinks {
	
	const inputs: Stream<Event> = DOM.select('.field').events('input')

	const names: Stream<String> = inputs.map(ev => (ev.target as HTMLInputElement).value).startWith('')

	const view: Stream<VNode> = names.map(name =>
		div([
			label('Name:'),
			input('.field', { attrs: { type: 'text' } }),
			hr(),
			h1('Hello ' + name),
		])
	)

	return { DOM: view }
}

export default Hello
