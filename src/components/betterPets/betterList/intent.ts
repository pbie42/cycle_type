import { Stream } from 'xstream'
import sampleCombine from 'xstream/extra/sampleCombine'

import { Repo } from "../../repo"
import { ListIntent, Sources, Query, Queries, NewState, State } from '../interfaces'


export function intent({ DOM, HTTP}:Sources, newPets:Stream<NewState>, editPets:Stream<NewState>):ListIntent {

  const queries:Queries = Repo.setup(
    Repo.get("/getPets", "getPets").now(),
    Repo.post("/savePets", "savePets").on(newPets),
    Repo.post('/editPets', 'editPets').on(editPets),
  )(HTTP)

  const loadedPets:Stream<State> = queries.responses.getPets.map(pets => Stream.of(...pets)).flatten()
  const petsEditSuccess:Stream<State> = queries.responses.editPets.map(pets => Stream.of(...pets)).flatten()
  const petsSaveSuccess:Stream<Array<State>> = queries.responses.savePets

  const actions:Stream<Function> = queries.actions
  const addPets:Stream<State | {}> = Stream.merge(sampleOnion(newPets, petsSaveSuccess), loadedPets, petsEditSuccess)

  return { actions, requests: queries.requests, addPets }
}

export const sampleOnion = (source, trigger) => {
  return trigger.compose(sampleCombine(source)).map(([_, value]) => {
    return Object.assign({}, value.pets)
  })
}