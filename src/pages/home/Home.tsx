import Box from '@mui/material/Box'
import { FC } from 'react'
import { useGetDocumentsQuery } from '../../api/documentApiSlice'
import Document from './Document'
import useTheme from '@mui/material/styles/useTheme'
import useMediaQuery from '@mui/material/useMediaQuery'
import Paper from '@mui/material/Paper'
import { Link } from 'react-router-dom'
import AddIcon from '@mui/icons-material/Add'

const Home: FC = () => {
  const { data } = useGetDocumentsQuery()

  const { breakpoints, palette } = useTheme()

  const isBiggerThanXs = useMediaQuery(breakpoints.up('xs'))
  const isBiggerThanSm = useMediaQuery(breakpoints.up('sm'))
  const isBiggerThanMd = useMediaQuery(breakpoints.up('md'))
  const isBiggerThanLg = useMediaQuery(breakpoints.up('lg'))
  const isBiggerThanXl = useMediaQuery(breakpoints.up('xl'))

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

  return (
    <Box component="main" overflow="hidden">
      <Box
        display="grid"
        gridTemplateColumns={gridTemplateColumns}
        sx={{ gridGap: isBiggerThanMd ? '15px' : '10px' }}
        padding={isBiggerThanMd ? '25px' : '15px'}
      >
        {data?.map((item) => (
          <Document key={item.id} {...item} />
        ))}
        <Link to={`/new`}>
          <Paper
            sx={{
              transition: '0.15s box-shadow, 0.15s background',
              maxWidth: '200px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              aspectRatio: '1 / 1',
              background:
                palette.mode === 'light' ? undefined : palette.background.light,
              '&:hover': {
                boxShadow: `0px 2px 1px -1px rgba(0,0,0,0.3), 0px 1px 1px 0px rgba(0,0,0,0.24), 0px 1px 3px 0px rgba(0,0,0,0.22)`,
                background:
                  palette.mode === 'light'
                    ? undefined
                    : palette.background.light + 'd9',
              },
            }}
          >
            <AddIcon
              sx={{
                '& path': {
                  fill:
                    palette.mode === 'light'
                      ? palette.primary.main
                      : palette.grey[600],
                },
                fontSize: isBiggerThanMd ? '60px' : '40px',
              }}
            />
          </Paper>
        </Link>
      </Box>
    </Box>
  )
}

export default Home
