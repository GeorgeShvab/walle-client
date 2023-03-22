import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import AddIcon from '@mui/icons-material/Add'

const AddButton: FC = () => {
  const navigate = useNavigate()

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
      sx={{
        '&:first-of-type': {
          padding: '0',
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
