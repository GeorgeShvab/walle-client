function throttle(fn: (arg?: any) => void, ms = 250) {
  let savedArgs: any
  let savedThis: any
  let throttled: boolean = false

  return function (this: any, ...args: any[]) {
    if (throttled) {
      savedThis = this
      savedArgs = args
      return
    }

    fn.apply(this, args as [arg?: any])
    throttled = true

    setTimeout(() => {
      throttled = false

      if (savedArgs) {
        fn.apply(savedThis, savedArgs)

        throttled = true
        savedArgs = undefined
        savedThis = undefined

        setTimeout(() => {
          throttled = false
        }, ms)
      }
    }, ms)
  }
}

export default throttle
