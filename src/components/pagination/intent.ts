import { Stream } from 'xstream'
import { HTTPSource } from '@cycle/http';
import { DOMSource, VNode } from '@cycle/dom'
import delay from 'xstream/extra/delay'
import sampleCombine from 'xstream/extra/sampleCombine'

import { intValBtn, intValAnchor, log } from '../../utils'
import { Repo } from '../repo'

interface pInfo {
   page:number
   last:number
}

function intent(DOM:DOMSource, HTTP:HTTPSource) {

   const pageProxy: Stream<any> = Stream.create()

//-------HTTP-------------------------------------------------------------------

   const queries = Repo.setup(
      Repo.get("/getPages", "getPages").now(),
      Repo.get("/getContent", "getContent").now(),
      Repo.post("/getPage", "getPage").on(pageProxy),
      // Repo.post("/addSocial", "addSocial").on(add)
   )(HTTP)


   const loadedInfo: Stream<pInfo> = queries.responses.getPages.map(users => Stream.of(...users)).flatten()
   const loadedContent: Stream<{ url:string }> = queries.responses.getContent.map(users => Stream.of(...users)).flatten()
   const newContent: Stream<{ url:string }> = queries.responses.getPage.map(users => Stream.of(...users)).flatten()

   const actions: Stream<any> = queries.actions

//-------UserInteractions-------------------------------------------------------

   const prevEv:Stream<Event> = DOM.select('#prev').events('click')
   const nextEv:Stream<Event> = DOM.select('#next').events('click')
   const selectedEv:Stream<Event> = DOM.select('.number').events('click')

   const prev:Stream<{ page:Number }> = prevEv.map(intValBtn).map(log)
   const next:Stream<{ page:Number }> = nextEv.map(intValBtn).map(log)
   const selected:Stream<{ page:Number }> = selectedEv.map(intValAnchor).map(log)


   const newInfo:Stream<pInfo> = pageProxy.compose(sampleCombine(loadedInfo))
                                  .map(([{page}, {last}]) => ({ page, last }))

   const pageInfo:Stream<pInfo> = Stream.merge(loadedInfo, newInfo)

   const content = Stream.merge(loadedContent, newContent).compose(delay(60))
   const clearContent = newContent

   pageProxy.imitate(Stream.merge(prev, next, selected))

   return { actions, requests: queries.requests, pageInfo, content, clearContent }
}

export default intent


// For infinite scroll

// const scrollEv: Stream<Event> = DOM.select('document').events('scroll')
//    const heightEv = DOM.select('#items').elements()

//    const onScroll: Stream<number> = scrollEv.map(ev => ev.srcElement.scrollTop )
//                                             .compose(debounce(1000))
//    const onHeight: Stream<number> = heightEv.map(ev => ev[0].scrollHeight)

//    const scroll: Stream<number> = onScroll.startWith(0)
//    const height: Stream<number> = onHeight.startWith(0)

//    const getItems: Stream<boolean> = Stream.combine(scroll, height).map(([scroll, height]) => {
//       if (scroll > (height - window.innerHeight - 1)) return true
//       else return false
//    })