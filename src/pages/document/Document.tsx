import { FC, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useAppDispatch } from '../../redux/store'
import { open } from '../../redux/slices/opened'
import 'draft-js/dist/Draft.css'
import TextEditor from './TextEditor'
import { useGetDocumentQuery } from '../../api/documentApiSlice'
import Box from '@mui/material/Box'

const Document: FC = () => {
  const dispatch = useAppDispatch()

  const { id } = useParams()

  const { data } = useGetDocumentQuery(id || '')

  useEffect(() => {
    if (id) {
      dispatch(open(id))
    }
  }, [id])

  return <Box component="main">{data && <TextEditor {...data} />}</Box>
}

export default Document
