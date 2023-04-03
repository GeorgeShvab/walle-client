import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import AddIcon from '@mui/icons-material/Add'
import useTheme from '@mui/material/styles/useTheme'

const AddButton: FC = () => {
  const navigate = useNavigate()

  const { palette } = useTheme()

  const handleClick = () => {
    navigate('/documents/new')
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="42px"
      width="42px"
      paddingLeft="18px"
      position="relative"
      sx={{
        '&:first-of-type': {
          padding: '0',
          '&::after': {
            opacity: '0',
          },
        },
        '&::after': {
          content: `''`,
          position: 'absolute',
          backgroundColor:
            palette.mode === 'light' ? palette.grey[400] : palette.grey[800],
          display: 'block',
          left: '0px',
          width: '1px',
          height: '40%',
          top: '50%',
          transform: 'translateY(-50%)',
          transition: '0.15s opacity',
          opacity: '1',
        },
      }}
    >
      <IconButton size="small" onClick={handleClick}>
        <AddIcon sx={{ height: '25px', width: '25px' }} />
      </IconButton>
    </Box>
  )
}

export default AddButton
