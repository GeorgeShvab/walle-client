import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { FC } from 'react'
import { Link } from 'react-router-dom'
import useTheme from '@mui/material/styles/useTheme'

const Header: FC<{ link?: boolean }> = ({ link }) => {
  const { palette } = useTheme()

  return (
    <Box
      component="header"
      display="flex"
      justifyContent="center"
      padding="20px 0"
    >
      <Typography variant="h5" fontWeight="800">
        {link ? (
          <Link to="/" style={{ color: palette.primary.main }}>
            WallE
          </Link>
        ) : (
          'WallE'
        )}
      </Typography>
    </Box>
  )
}

export default Header
