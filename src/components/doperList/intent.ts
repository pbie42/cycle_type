import { Stream } from 'xstream'
import delay from 'xstream/extra/delay'

import { log, sample, bind } from '../../utils'

import { Repo } from "../repo"
import { ListSources, ListIntent, Queries, Data } from './interfaces'

export function intent({ DOM, HTTP }:ListSources, removeProxy:Stream<any>):ListIntent {

  const queries:Queries = Repo.setup(
    Repo.get("/getPets", "getPets").now(),
    Repo.post("/removePets", "removePets").on(removeProxy)
  )(HTTP)

  const loadedPets: Stream<{ Data }> = queries.responses.getPets.map(pets => Stream.of(...pets)).flatten()
  const petsRemoveSuccess: Stream<Array<Data>> = queries.responses.removePets

  const actions:Stream<Function> = queries.actions
  const addPets:Stream<{ Data }> = loadedPets

  return { actions, requests: queries.requests, addPets, petsRemoveSuccess }
}
