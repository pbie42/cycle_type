import xs from 'xstream';
import {div, button, p, makeDOMDriver} from '@cycle/dom';

export default function main(sources) {
   const action$ = xs.merge(
      sources.DOM.select('.decrement').events('click').map(ev => -1),
      sources.DOM.select('.increment').events('click').map(ev => +1)
   );

   const state$ = sources.onion.state$;

   const vdom$ = state$.map(state =>
      div([
         button('.decrement', 'Decrement'),
         button('.increment', 'Increment'),
         p('Counter: ' + state.count)
      ])
   );

   const initReducer$ = xs.of(function initReducer() {
      return {count: 0};
   });
   const updateReducer$ = action$.map(num => function updateReducer(prevState) {
      return {count: prevState.count + num};
   });
   const reducer$ = xs.merge(initReducer$, updateReducer$);

   return {
      DOM: vdom$,
      onion: reducer$,
      HTTP: xs.empty(),
      history: xs.empty()
   };
}