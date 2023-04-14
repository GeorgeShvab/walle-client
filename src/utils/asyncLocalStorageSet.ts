// tried to add storage event, but it works only if I dispatch event. So I decided to do this implementation
const asyncLocalStorageSet = (
  name: string,
  value: string,
  ms: number = 25
): Promise<null> => {
  return new Promise((resolve, reject) => {
    let interval = setInterval(() => {
      if (window.localStorage.getItem(name) === value) {
        clearInterval(interval)
        resolve(null)
      }
    }, ms)

    window.localStorage.setItem(name, value)

    setTimeout(() => {
      clearInterval(interval)
      reject(null)
    }, 5000)
  })
}

export default asyncLocalStorageSet
