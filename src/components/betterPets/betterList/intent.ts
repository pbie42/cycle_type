import { Stream } from 'xstream'

import { Repo } from "../../repo"
import { log, sample } from '../../../utils'
import { ListIntent, ListSources, Query, Queries, State } from '../interfaces'


export function intent({ DOM, HTTP, newPets, editPets }:ListSources):ListIntent {

  const queries:Queries = Repo.setup(
    Repo.get("/getPets", "getPets").now(),
    Repo.post("/savePets", "savePets").on(newPets),
    Repo.post('/editPets', 'editPets').on(editPets),
  )(HTTP)

  const loadedPets:Stream<State> = queries.responses.getPets.map(pets => Stream.of(...pets)).flatten()
  const petsEditSuccess:Stream<State> = queries.responses.editPets.map(pets => Stream.of(...pets)).flatten()
  const petsSaveSuccess:Stream<Array<State>> = queries.responses.savePets

  const actions:Stream<Function> = queries.actions
  const addPets:Stream<State | {}> = Stream.merge(sample(newPets, petsSaveSuccess), loadedPets, petsEditSuccess)

  return { actions, requests: queries.requests, addPets }
}
