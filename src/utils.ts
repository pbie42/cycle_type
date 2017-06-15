import sampleCombine from 'xstream/extra/sampleCombine'

export function log(...args: any[]) {
	console.log.apply(console, args)
	return args.length === 1 ? args[0] : args
}

export function intValBtn(event:Event) {
	return { page: parseInt((event.target as HTMLButtonElement).value) }
}

export function intValInput(event:Event):number {
	return parseInt((event.target as HTMLInputElement).value)
}

export function intValAnchor(event:Event) {
	return { page: parseInt((event.target as HTMLAnchorElement).name) }
}

export const sample = (source, trigger) => {
  return trigger.compose(sampleCombine(source)).map(([_, value]) => {
    return Object.assign({}, value)
  })
}

export function mergeState(obj1:Object, obj2:Object):Object {
    const obj3:Object = {}
    for (let attrname in obj2) { obj3[attrname] = obj2[attrname] }
    for (let attrname in obj1) { obj3[attrname] = obj1[attrname] }
    return obj3
}

export const bind = (fn: Function, ...args: any[]) => fn.bind(this, ...args)
export const { values, keys, assign } = Object