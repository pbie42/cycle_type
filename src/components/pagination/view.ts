import { div, label, h2, h1, input, hr, p, a, b, button, VNode } from '@cycle/dom'
import { Status } from '../repo'

interface pInfo {
   page:number
   last:number
}

export function dogView([dogs, state]): VNode {
   return div('#wrap', [
      ...showDogs(dogs, state.requests.getPage ? state.requests.getPage : state.requests.getContent)
   ])
}

function showDogs(dogslist, status) {
  if (status === undefined) return [ p('loading...') ]
  if (status === Status.pending) { return [ p('loading...') ]}
  return dogslist
}

export function controls({ page, last }: pInfo):VNode {
      let prev:boolean = false
      let next:boolean = false
      const previous:Array<string | VNode> = []
      const future:Array<string | VNode> = []

      if (last !== 1 && last !== undefined) {
         if (page > 1) {
            prev = true
            for (let i = page - 3; i < page; i++) {
               if ( i > 0 ) previous.push(a('.number', { attrs: { name: `${i}` } }, i))
            }
         }
         for (let i = page + 1; i <= last; i++) {
            future.push(a('.number', { attrs: { name: `${i}` } }, i))
            if (i >= page + 3) break
         }
         if (page != last) next = true
      }

      const current = b('.number', page)
      return div('#pagination_controls', [
         last !== 1 && last !== undefined ? h2(`Page ${page} of ${last}`) : '',
         prev ? button('#prev', { attrs: { value: page - 1 }, hook: {
            update: (vnode) => { vnode.elm.value = page - 1 }
         }}, '<<') : '',
         ...previous,
         current,
         ...future,
         next ? button('#next', { attrs: { value: page + 1 }, hook: {
            update: (vnode) => { vnode.elm.value = page + 1 }
         }}, '>>') : ''
      ])
   }