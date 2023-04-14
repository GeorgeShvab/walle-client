import { persistor } from '../redux/store'

const clearStorage = async () => {
  persistor.pause()

  await persistor.flush()

  await persistor.purge()

  localStorage.clear()

  persistor.persist()
}

export default clearStorage
