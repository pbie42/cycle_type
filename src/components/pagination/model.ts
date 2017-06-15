import { log } from '../../utils'

function model(actions) {
  const reqStates = actions.fold((state, action) => action(state), { requests: {} })
  return { reqStates }
}

export default model