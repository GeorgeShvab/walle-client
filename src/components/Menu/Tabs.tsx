import Box from '@mui/material/Box'
import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGetDocumentsQuery } from '../../api/documentApiSlice'
import usePage from '../../hooks/usePage'
import { selectOpened } from '../../redux/slices/opened'
import { useAppDispatch, useAppSelector } from '../../redux/store'
import * as types from '../../../types'
import { close } from '../../redux/slices/opened'
import Tab from '../Tab/VerticalTab'
import AddTab from './AddTab'

const Tabs: FC = () => {
  const dispatch = useAppDispatch()

  const navigate = useNavigate()

  const opened = useAppSelector(selectOpened)

  const { data } = useGetDocumentsQuery('documents=' + opened.join('+'))

  const { id } = usePage()

  const selectDocument = (doc: types.Document) => {
    navigate(`/documents/${doc.id}`)
  }

  const closeDocument = (doc: types.Document) => {
    dispatch(close(doc.id))
  }

  return (
    <Box>
      <AddTab />
      {data?.map((item) => (
        <Tab
          key={item.id}
          onClick={selectDocument}
          onClose={closeDocument}
          selected={Boolean(id === item.id)}
          {...item}
        />
      ))}
    </Box>
  )
}

export default Tabs
