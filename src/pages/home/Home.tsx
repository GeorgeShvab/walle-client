import Box from '@mui/material/Box'
import { FC } from 'react'
import { useGetDocumentsQuery } from '../../api/documentApiSlice'
import Document from './Document'
import useTheme from '@mui/material/styles/useTheme'
import useMediaQuery from '@mui/material/useMediaQuery'
import CircularProgress from '@mui/material/CircularProgress'
import Error from '../../components/Error'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import AddDocument from './AddDocument'
import useTitle from '../../hooks/useTitle'

const Home: FC = () => {
  const { data, isLoading, error } = useGetDocumentsQuery('order=createdAt')

  const { breakpoints } = useTheme()

  const isBiggerThanXs = useMediaQuery(breakpoints.up('xs'))
  const isBiggerThanSm = useMediaQuery(breakpoints.up('sm'))
  const isBiggerThanMd = useMediaQuery(breakpoints.up('md'))
  const isBiggerThanLg = useMediaQuery(breakpoints.up('lg'))
  const isBiggerThanXl = useMediaQuery(breakpoints.up('xl'))

  const isLesserThanMd = useMediaQuery(breakpoints.down('md'))

  useTitle('WallE')

  let gridTemplateColumns: string = '1fr 1fr 1fr'

  if (isBiggerThanXl) {
    gridTemplateColumns = '1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr'
  } else if (isBiggerThanLg) {
    gridTemplateColumns = '1fr 1fr 1fr 1fr 1fr 1fr 1fr'
  } else if (isBiggerThanMd) {
    gridTemplateColumns = '1fr 1fr 1fr 1fr 1fr 1fr'
  } else if (isBiggerThanSm) {
    gridTemplateColumns = '1fr 1fr 1fr 1fr 1fr'
  } else if (isBiggerThanXs) {
    gridTemplateColumns = '1fr 1fr 1fr'
  }

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
          />
        </Box>
      </Box>
    )
  }

  return (
    <Box component="main" overflow="hidden">
      {isLoading && !data ? (
        <Box
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
        <Box>
          <TransitionGroup
            style={{
              display: 'grid',
              gridGap: isBiggerThanMd ? '15px' : '10px',
              padding: isBiggerThanMd ? '25px' : '15px',
              gridTemplateColumns,
            }}
          >
            <AddDocument />
            {data?.map((item) => (
              <CSSTransition key={item.id} timeout={150} classNames="doc">
                <Document {...item} />
              </CSSTransition>
            ))}
          </TransitionGroup>
        </Box>
      )}
    </Box>
  )
}

export default Home
