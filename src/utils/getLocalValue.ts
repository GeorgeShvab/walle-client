const getLocalValue = (name: string) => {
  const value = window.localStorage.getItem(name)

  if (!value) return undefined

  if (/({)(})/.test(value)) {
    return JSON.parse(value)
  } else {
    return value
  }
}

export default getLocalValue
