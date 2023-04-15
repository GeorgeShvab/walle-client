import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import useTheme from '@mui/material/styles/useTheme'
import useMediaQuery from '@mui/material/useMediaQuery'
import { FC } from 'react'
import { Link } from 'react-router-dom'
import AddIcon from '@mui/icons-material/Add'

const AddDocument: FC = () => {
  const { palette, breakpoints } = useTheme()

  const isLesserThanMd = useMediaQuery(breakpoints.down('md'))

  return (
    <Box>
      <Link to={`/documents/new`}>
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
              fontSize: isLesserThanMd ? '40px' : '60px',
            }}
          />
        </Paper>
      </Link>
    </Box>
  )
}

export default AddDocument
