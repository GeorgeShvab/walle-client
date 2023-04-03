import { useEffect } from 'react'
import { useAppSelector } from '../redux/store'
import { selectSettings } from '../redux/slices/settings'

const useMode = () => {
  const settings = useAppSelector(selectSettings)

  useEffect(() => {
    const tag = document.querySelector('meta[name="theme-color"]')

    const body = document.querySelector('body')

    ///body.style.scroll = ''

    /**
     * 
     * body::-webkit-scrollbar {
  width: 10px;
}

body::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
}

body::-webkit-scrollbar-thumb {
  background-color: darkgrey;
  outline: 1px solid slategrey;
}
     */

    tag?.setAttribute(
      'content',
      settings.mode === 'light' ? '#ffffff' : '#121212'
    )
  }, [settings])
}

export default useMode
