import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { useAppDispatch } from '../../redux/store'
import { Document } from '../../../types'
import { mergeTab, openTab } from '../../redux/slices/tabs'
import generateId from '../../utils/generateId'

const useAddTab = (data?: Document) => {
  const dispatch = useAppDispatch()

  const { search } = useLocation()

  useEffect(() => {
    if (!data) return

    const tabId = new URLSearchParams(search).get('tabId')

    if (data && data?.id === data.id) {
      if (data.id && tabId) {
        dispatch(mergeTab({ ...data, tabId }))
      } else if (data.id) {
        dispatch(
          openTab({
            title: data.title,
            type: data.type,
            tabId: generateId(),
            id: data.id,
          })
        )
      }
    }
  }, [data, search])
}

export default useAddTab
