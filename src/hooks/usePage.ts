import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Page } from '../../types'

interface PageState {
  page: Page | undefined
  id: string | undefined
}

const usePage = () => {
  const { pathname } = useLocation()

  const [page, setPage] = useState<PageState>({
    page: (pathname.split('/')[0] as Page) || undefined,
    id: pathname.split('/')[1] || undefined,
  })

  useEffect(() => {
    setPage({
      page: (pathname.split('/')[1] as Page) || undefined,
      id: pathname.split('/')[2] || undefined,
    })
  }, [pathname])

  return page
}

export default usePage
