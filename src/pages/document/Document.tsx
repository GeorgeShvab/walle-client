import { FC } from 'react'
import { Link, useParams } from 'react-router-dom'
import 'draft-js/dist/Draft.css'
import TextEditor from './TextEditor'
import { useGetDocumentQuery } from '../../api/documentApiSlice'
import Box from '@mui/material/Box'
import useMediaQuery from '@mui/material/useMediaQuery'
import useTheme from '@mui/material/styles/useTheme'
import Error from '../../components/Error'
import CircularProgress from '@mui/material/CircularProgress'
import { useGetMeQuery } from '../../api/userApiSlice'
import Button from '@mui/material/Button'
import useTitle from '../../hooks/useTitle'
import useAddTab from './useAddTab'

const Document: FC = () => {
  const { data: user } = useGetMeQuery()

  const { breakpoints } = useTheme()

  const isLesserThanMd = useMediaQuery(breakpoints.down('md'))

  const { id } = useParams()

  const { data, isLoading, error } = useGetDocumentQuery(id || '')

  useAddTab(data)

  useTitle(data?.title || 'WallE')

  if (error) {
    const title: string =
      typeof (error as any)?.status === 'number' ? String((error as any)?.status) : "Помилка з'єднання"

    const subtitle: string = (error as any)?.data?.msg || "Помилка з'єднання"

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
            title={title}
            subtitle={subtitle}
            subElement={
              (error as any)?.status === 401 ? (
                <Box padding="30px">
                  <Link to="/login" state={{ referrer: window.location.pathname }}>
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

  if ((isLoading && id !== (data as any)?.id) || !data) {
    return (
      <Box component="main">
        <Box
          padding={isLesserThanMd ? '15px 15px' : '25px'}
          height={`calc(var(--screenHeight) - ${isLesserThanMd ? '30px' : '50px'})`}
          position="relative"
        >
          <Box
            sx={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            <CircularProgress />
          </Box>
        </Box>
      </Box>
    )
  }

  return (
    <Box component="main">
      <TextEditor
        {...data}
        isLoading={isLoading}
        key={data.id} // used key here because of some bug when setting new state with useEffect. Linkify plugin stops working when I use useEffect
        currentUser={user?.id}
      />
    </Box>
  )
}

export default Document
