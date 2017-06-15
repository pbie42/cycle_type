import { Stream } from 'xstream'
import { log, sample, bind, assign } from '../../utils'
import { State, Data, Model } from './interfaces'

export function model(actions: Stream<Function>):Model {
  const states:Stream<{requests}> = actions.fold((state, action) => {
    console.log(`action`, action)
    return action(state)}, { requests: {} }).map(log)
  states.addListener({
    next: i => console.log(`i`, i)
  })
  return { states }
}
