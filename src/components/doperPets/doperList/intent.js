import xs from 'xstream'
import delay from 'xstream/extra/delay'

import { log, sample, bind } from '../../../utils'

import { Repo } from "../../repo"

export function intent({ DOM, HTTP }, newPets, editPets) {

  const queries = Repo.setup(
    Repo.get("/getPets", "getPets").now(),
    Repo.post("/savePets", "savePets").on(newPets),
    Repo.post('/editPets', 'editPets').on(editPets),
  )(HTTP)

  const loadedPets = queries.responses.getPets.map(pets => xs.of(...pets)).flatten()
  const petsSaveSuccess = queries.responses.savePets
  const petsEditSuccess = queries.responses.editPets

  const actions = queries.actions
  const addPets = xs.merge(sample(newPets, petsSaveSuccess), loadedPets)

  return { actions, requests: queries.requests, addPets, petsEditSuccess }
}
