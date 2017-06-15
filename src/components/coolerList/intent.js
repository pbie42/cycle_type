import xs from 'xstream'
import delay from 'xstream/extra/delay'

import { log, sample, bind } from '../../utils'

import { Repo } from "../repo"

export function intent({ DOM, HTTP }, removeProxy) {

  const queries = Repo.setup(
    Repo.get("/getPets", "getPets").now(),
    Repo.post("/removePets", "removePets").on(removeProxy)
  )(HTTP)

  const loadedPets = queries.responses.getPets.map(pets => xs.of(...pets)).flatten()
  const petsRemoveSuccess = queries.responses.removePets

  const actions = queries.actions
  const addPets = xs.merge(loadedPets)

  return { actions, requests: queries.requests, addPets, petsRemoveSuccess }
}
