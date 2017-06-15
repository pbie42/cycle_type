import { Stream } from 'xstream'
import delay from 'xstream/extra/delay'

import { log, sample, bind } from '../../utils'

import { Repo } from "../repo"
import { ListSources, ListIntent, Queries, Data } from './interfaces'

export function intent({ DOM, HTTP }:ListSources, removeProxy:Stream<any>):ListIntent {

  const queries:Queries = Repo.setup(
    Repo.get("/getPhones", "getPhones").now(),
    Repo.post("/removePhones", "removePhones").on(removeProxy)
  )(HTTP)

  const loadedPhones: Stream<{ Data }> = queries.responses.getPhones.map(phones => Stream.of(...phones)).flatten()
  const phonesRemoveSuccess: Stream<Array<Data>> = queries.responses.removePhones

  const actions:Stream<Function> = queries.actions
  const addPhones:Stream<{ Data }> = loadedPhones

  return { actions, requests: queries.requests, addPhones, phonesRemoveSuccess }
}
