import { FC, useEffect } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../redux/store'
import 'draft-js/dist/Draft.css'
import TextEditor from './TextEditor'
import { useGetDocumentQuery } from '../../api/documentApiSlice'
import Box from '@mui/material/Box'
import useMediaQuery from '@mui/material/useMediaQuery'
import generateId from '../../utils/generateId'
import useTheme from '@mui/material/styles/useTheme'
import { selectUser } from '../../redux/slices/user'
import Error from '../../components/Error'
import CircularProgress from '@mui/material/CircularProgress'
import { openTab } from '../../redux/slices/tabs'

const Document: FC = () => {
  const dispatch = useAppDispatch()

  const user = useAppSelector(selectUser)

  const { breakpoints } = useTheme()

  const isLesserThanMd = useMediaQuery(breakpoints.down('md'))

  const { id } = useParams()

  const { search } = useLocation()

  const { data, isLoading, error } = useGetDocumentQuery(id || '')

  useEffect(() => {
    if (id && data) {
      const tabId = new URLSearchParams(search).get('tabId')

      dispatch(
        openTab({
          ...(tabId ? { tabId: tabId } : { tabId: generateId() }),
          title: data.title,
          type: data.type,
          selected: true,
          id,
        })
      )
    }
  }, [id, data, search])

  // used key here because of some bug when setting new state with useEffect. Linkify plugin stops working when I use useEffect

  if (error) {
    return (
      <Box component="main">
        <Box
          padding={isLesserThanMd ? '15px 15px' : '25px'}
          height={`calc(100vh - ${isLesserThanMd ? '150px' : '50px'})`}
          position="relative"
        >
          <Error
            sx={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
            }}
            title={(error as any)?.status || '500'}
            subtitle={(error as any)?.data?.msg || "Помилка з'єднання"}
          />
        </Box>
      </Box>
    )
  }

  return (
    <Box component="main">
      {isLoading && !data ? (
        <Box
          padding={isLesserThanMd ? '15px 15px' : '25px'}
          height={`calc(100vh - ${isLesserThanMd ? '150px' : '50px'})`}
          position="relative"
        >
          <CircularProgress
            sx={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          />
        </Box>
      ) : (
        data && (
          <TextEditor
            {...data}
            isLoading={isLoading}
            key={data.text}
            currentUser={user.data?.id}
          />
        )
      )}
    </Box>
  )
}

export default Document