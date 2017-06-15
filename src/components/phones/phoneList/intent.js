import xs from 'xstream'
import delay from 'xstream/extra/delay'

import { log, sample, bind } from '../../../utils'

import { Repo } from "../../repo"

export function intent({ DOM, HTTP, newPhones, editPhones }) {

  const queries = Repo.setup(
    Repo.get("/getPhones", "getPhones").now(),
    Repo.post("/savePhones", "savePhones").on(newPhones),
    Repo.post('/editPhones', 'editPhones').on(editPhones),
  )(HTTP)

  const loadedPhones = queries.responses.getPhones.map(phones => xs.of(...phones)).flatten()
  const phonesSaveSuccess = queries.responses.savePhones
  const phonesEditSuccess = queries.responses.editPhones

  const actions = queries.actions
  const addPhones = xs.merge(sample(newPhones, phonesSaveSuccess), loadedPhones)

  return { actions, requests: queries.requests, addPhones, phonesEditSuccess }
}
