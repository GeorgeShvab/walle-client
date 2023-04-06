import { useEffect } from 'react'
import { useAppSelector } from '../redux/store'
import { selectSettings } from '../redux/slices/settings'

const useMode = () => {
  const settings = useAppSelector(selectSettings)

  useEffect(() => {
    const tag = document.querySelector('meta[name="theme-color"]')

    const body = document.querySelector('body')

    tag?.setAttribute(
      'content',
      settings.mode === 'light' ? '#ffffff' : '#121212'
    )
  }, [settings])
}

export default useMode
