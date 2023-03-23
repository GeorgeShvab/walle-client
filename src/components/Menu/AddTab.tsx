import { FC } from 'react'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import useTheme from '@mui/material/styles/useTheme'
import AddIcon from '@mui/icons-material/Add'
import { useNavigate } from 'react-router-dom'

const AddTab: FC = () => {
  const { palette } = useTheme()

  const navigate = useNavigate()

  const handleClick = () => {
    navigate('/documents/new')
  }

  return (
    <Box padding="5px 15px 5px 0">
      <Box
        display="flex"
        alignItems="center"
        height="50px"
        padding="0 15px 0 12px"
        position="relative"
        onClick={handleClick}
        borderRadius="0 5px 5px 0"
        sx={{
          width: '100%',
          cursor: 'pointer',
          backgroundColor:
            palette.mode === 'light'
              ? palette.grey[100]
              : palette.background.light,
        }}
      >
        <IconButton>
          <AddIcon />
        </IconButton>
        <Typography
          variant="h6"
          fontSize="medium"
          mr="12px"
          whiteSpace="nowrap"
          overflow="hidden"
          textOverflow="hidden"
          position="relative"
        >
          Новий документ
        </Typography>
      </Box>
    </Box>
  )
}

export default AddTab
