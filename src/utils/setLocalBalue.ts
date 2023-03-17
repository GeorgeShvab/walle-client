const setLocalValue = (name: string, value: string | Object | Array<any>) => {
  if (typeof value === 'object' || Array.isArray(value)) {
    window.localStorage.setItem(name, JSON.stringify(value))
  } else {
    window.localStorage.setItem(name, value)
  }
}

export default setLocalValue
