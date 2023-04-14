import { FC, useEffect } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { useAppDispatch } from '../../redux/store'
import 'draft-js/dist/Draft.css'
import TextEditor from './TextEditor'
import { useGetDocumentQuery } from '../../api/documentApiSlice'
import Box from '@mui/material/Box'
import useMediaQuery from '@mui/material/useMediaQuery'
import generateId from '../../utils/generateId'
import useTheme from '@mui/material/styles/useTheme'
import Error from '../../components/Error'
import CircularProgress from '@mui/material/CircularProgress'
import { mergeTab, openTab } from '../../redux/slices/tabs'
import { useGetMeQuery } from '../../api/userApiSlice'
import Button from '@mui/material/Button'

const Document: FC = () => {
  const dispatch = useAppDispatch()

  const { data: user } = useGetMeQuery()

  const { breakpoints } = useTheme()

  const isLesserThanMd = useMediaQuery(breakpoints.down('md'))

  const { id } = useParams()

  const { search } = useLocation()

  const { data, isLoading, error, refetch } = useGetDocumentQuery(id || '')

  useEffect(() => {
    const tabId = new URLSearchParams(search).get('tabId')

    if (data && data?.id === id) {
      if (id && tabId) {
        dispatch(mergeTab({ ...data, tabId }))
      } else if (id) {
        dispatch(
          openTab({
            title: data.title,
            type: data.type,
            tabId: generateId(),
            id,
          })
        )
      }
    }
  }, [id, data, search])

  useEffect(() => {
    refetch()
  }, [id])

  // used key here because of some bug when setting new state with useEffect. Linkify plugin stops working when I use useEffect

  if (error) {
    return (
      <Box component="main">
        <Box height="var(--screenHeight)" position="relative">
          <Error
            sx={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
            }}
            title={(error as any)?.status || '500'}
            subtitle={(error as any)?.data?.msg || "Помилка з'єднання"}
            subElement={
              (error as any)?.status === 401 ? (
                <Box padding="30px">
                  <Link
                    to="/login"
                    state={{ referrer: window.location.pathname }}
                  >
                    <Button variant="contained">Вхід</Button>
                  </Link>
                </Box>
              ) : undefined
            }
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
          height={`calc(var(--screenHeight) - ${
            isLesserThanMd ? '30px' : '50px'
          })`}
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
            currentUser={user?.id}
          />
        )
      )}
    </Box>
  )
}

export default Document
