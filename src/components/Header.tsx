import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { FC } from 'react'

const Header: FC = () => {
  return (
    <Box
      component="header"
      display="flex"
      justifyContent="center"
      padding="20px 0"
    >
      <Typography variant="h5" fontWeight="800">
        WallE
      </Typography>
    </Box>
  )
}

export default Header
