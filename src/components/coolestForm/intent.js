import xs from 'xstream'
import { usernameChange, passwordChange, submitFn, clear } from './model'
import { Repo } from "../repo"
import { log, bind } from '../../utils'

export default function intent(sources, submits, reset) {

  const queries = Repo.setup(
    Repo.post("/submit", "submitForm").on(submits),
  )(sources.HTTP)

  const submitSuccess = queries.responses.submitForm

  const username = sources.DOM.select('#username').events('input')
                            .map(ev => ev.target.value)
                            .map(username => bind(usernameChange, username))

  const password = sources.DOM.select('#password').events('input')
                            .map(ev => ev.target.value)
                            .map(password => bind(passwordChange, password))

  const submit = sources.DOM.select('#submit').events('click')
                             .mapTo(submitFn)

  const actions = xs.merge( username, password, submit, reset.mapTo(clear))

  return { actions, requests: queries.requests, submitSuccess }
}
