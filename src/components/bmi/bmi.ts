import { Stream } from "xstream"
import concat from 'xstream/extra/concat'
import debounce from 'xstream/extra/debounce'
import isolate from '@cycle/isolate'
import { div, label, input, hr, h1, h2, p, button, DOMSource, VNode } from '@cycle/dom'
import { Sinks, Sources } from '../../interfaces'

interface SliderSink {
   DOM: Stream<VNode>,
   value: Stream<number>
}

interface Props {
   label:string
    unit:string
    min:number
    max:number
    init:number
}

interface Value {
   label:string
   unit:string
   min:number
   max:number
   value:number
}


function intent(DOM:DOMSource): Stream<number> {

   const slideEv: Stream<Event> = DOM.select('.slider').events('input')
   const slider: Stream<number> = slideEv.map(ev => parseInt((ev.target as HTMLInputElement).value))
   return slider
}

function model(change: Stream<number>, props: Stream<Props>): Stream<Value> {

   const initVal: Stream<number> = props.map(props => props.init).take(1)
   const val: Stream<number> = concat(initVal, change)

   return Stream.combine(val, props)
      .map(([ val, props ]) => {
         return {
         label: props.label,
         unit: props.unit,
         min: props.min,
         max: props.max,
         value: val
         }
      })
   }

   function view(state: Stream<Value>): Stream<VNode> {
   return state.map(state =>
      div('.labeled-slider', [
         label('.label', `${state.label}: ${state.value}${state.unit}`),
         input('.slider', { attrs: { type: 'range', min: state.min, max: state.max, value: state.value } })
      ])
   )
   }

   function labeledSlider({ DOM, props}: { DOM:DOMSource, props:Stream<Props> }): SliderSink {
   const change: Stream<number> = intent(DOM)
   const state: Stream<Value> = model(change, props)
   const vtree: Stream<VNode> = view(state)

   return {
      DOM: vtree,
      value: state.map(state => state.value)
   }
   }

   function Bmi({ DOM }:Sources): Sinks {

   const heightProps: Stream<Props> = Stream.of({
      label: 'Height',
      unit: 'cm',
      min: 140,
      max: 220,
      init: 170
   })

   const weightProps: Stream<Props> = Stream.of({
      label: 'Weight',
      unit: 'kg',
      min: 40,
      max: 150,
      init: 70
   })

   const labeledSlider1: any = isolate(labeledSlider)
   const heightSinks: SliderSink = labeledSlider1({ DOM: DOM, props: heightProps })
   const heightVTree: Stream<VNode> = heightSinks.DOM
   const heightValue: Stream<number> = heightSinks.value

   const labeledSlider2: any = isolate(labeledSlider)
   const weightSinks: SliderSink = labeledSlider2({ DOM: DOM, props: weightProps })
   const weightVTree: Stream<VNode> = weightSinks.DOM
   const weightValue: Stream<number> = weightSinks.value

   const bmi: Stream<number> = Stream.combine(weightValue, heightValue)
    .map(([weight, height]) => {
      console.log(`weight`, weight)
      console.log(`height`, height)
      const heightMeters: number = 0.01 * height
      const bmi: number = Math.round(weight / (heightMeters * heightMeters))
      console.log(`BMI`, bmi)
      return bmi
    })

    bmi.addListener({
       next: (i) => console.log(`bmiListener: `, i)
    })

  const vtree: Stream<VNode> = Stream.combine(weightVTree, heightVTree)
   .map(([weightVTree, heightVTree]) => {
       console.log(`gettin here bruh`)
      return div([
            weightVTree,
            heightVTree,
            // p(`Bmi is ${bmi}`)
         ])
      }
   )


  // Sinks from the main are write effects
   return {
      DOM: vtree
   }
}

export default Bmi