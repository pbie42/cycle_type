import { Stream } from 'xstream';
import { Sources, Sinks } from '../../interfaces'
import { DOMSource, VNode } from '@cycle/dom'
import { div, label, h2, h1, input, hr, button } from '@cycle/dom'
import debounce from 'xstream/extra/debounce'
import isolate from '@cycle/isolate'

interface sliderAndBtn {
   slider: Stream<number>
   btn: Stream<string>
}

interface sliderBtnState {
   slider: number
   btn: string
}

export interface SliderSinks {
  DOM: Stream<VNode>
  remove: Stream<null>
}

function intent(DOM:DOMSource): sliderAndBtn {

   const sliderEv: Stream<Event> = DOM.select('.slider-input').events('input')
   const btnEv: Stream<Event> = DOM.select('.colBtn').events('click')

   const slider: Stream<number> = sliderEv.map(ev => parseInt((ev.target as HTMLInputElement).value))
   const btn: Stream<string> = btnEv.map(ev => hexRandom())

   return { slider, btn }
}

function model({ slider, btn }: sliderAndBtn): Stream<sliderBtnState> {
   return Stream.combine(slider.startWith(0), btn.startWith('black')).map(([slider, btn]) => ({ slider, btn }))
}

function view(state: Stream<sliderBtnState>): Stream<VNode> {
   return state.map(state =>
      div(newDivs(state))
   )
}

function Slider({ DOM }: Sources): SliderSinks {

  const removeEv: Stream<Event> = DOM.select('.remove').events('click')
  const remove: Stream<null> = removeEv.mapTo(null)

   const { slider, btn }: sliderAndBtn = intent(DOM)
   const state: Stream<sliderBtnState> = model({ slider, btn })
   const vtree: Stream<VNode> = view(state)

   return {
      DOM: vtree,
      remove
   }
}

function newDivs({ slider, btn }: sliderBtnState) {
   const divs: Array<VNode> = []
   for (var i = 0; i < 1; i++) {
      divs.push(hr())
      divs.push(div('#block', { style: { height: '100px', width: `100px`, marginLeft: `${slider}px`, backgroundColor: btn } }))
      divs.push(label('#pushed', "Pushed: " + slider + "px"))
      divs.push(input('.slider-input', { attrs: { type: "range", min: 0, max: 1000, value: 0 } }))
      divs.push(button('.colBtn',"Change Color"))
      divs.push(button('.remove', "Remove Box"))
   }
  return divs
}

function hexRandom():string {
   return '#' + Math.floor(Math.random()*16777215).toString(16)
}

export default Slider