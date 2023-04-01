import { useEffect } from 'react'
import { useGetDocumentsQuery } from '../api/documentApiSlice'
import { mergeTabs, selectTabs } from '../redux/slices/tabs'
import { useAppDispatch, useAppSelector } from '../redux/store'

const useTabs = () => {
  const dispatch = useAppDispatch()

  const openedTabs = useAppSelector(selectTabs)

  const { data } = useGetDocumentsQuery(
    'documents=' + openedTabs.map((item) => item.id).join('+')
  )

  useEffect(() => {
    if (data) {
      dispatch(mergeTabs(data))
    }
  }, [data])
}

export default useTabs
