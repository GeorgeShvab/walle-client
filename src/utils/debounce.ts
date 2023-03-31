function debounce(fn: (arg: any) => void, ms: number): (arg?: any) => void {
  let time: number

  return function (...args: [arg: any]): void {
    clearTimeout(time)

    time = setTimeout(() => {
      fn.apply(null, args)
    }, ms)
  }
}

export default debounce
