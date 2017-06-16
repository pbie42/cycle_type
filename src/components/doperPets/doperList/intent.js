import xs from 'xstream'
import delay from 'xstream/extra/delay'
import sampleCombine from 'xstream/extra/sampleCombine'

import { Repo } from "../../repo"

export function intent({ DOM, HTTP }, newPets, editPets) {

  const queries = Repo.setup(
    Repo.get("/getPets", "getPets").now(),
    Repo.post("/savePets", "savePets").on(newPets),
    Repo.post('/editPets', 'editPets').on(editPets),
  )(HTTP)

  const loadedPets = queries.responses.getPets.map(pets => xs.of(...pets)).flatten()
  const petsEditSuccess = queries.responses.editPets.map(pets => xs.of(...pets)).flatten()
  const petsSaveSuccess = queries.responses.savePets

  const actions = queries.actions
  const addPets = xs.merge(sampleOnion(newPets, petsSaveSuccess), loadedPets, petsEditSuccess)

  return { actions, requests: queries.requests, addPets, petsEditSuccess }
}

export const sampleOnion = (source, trigger) => {
  return trigger.compose(sampleCombine(source)).map(([_, value]) => {
    return Object.assign({}, value.pets)
  })
}