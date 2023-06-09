import { SxProps } from '@mui/material/styles'
import Box from '@mui/material/Box'
import { FC, ReactElement } from 'react'
import Typography from '@mui/material/Typography'
import { Link } from 'react-router-dom'

const Error: FC<{
  sx?: SxProps
  title?: string
  subtitle?: string
  subElement?: ReactElement
}> = ({ sx, title = '404', subtitle = 'Сторінку не знайдено', subElement }) => {
  return (
    <Box sx={sx} textAlign="center">
      <Typography variant="h1" fontWeight="800" fontSize="80px">
        {title}
      </Typography>
      <Typography>{subtitle}</Typography>
      <Typography>
        <Link to="/home">На головну</Link>
      </Typography>
      {subElement}
    </Box>
  )
}

export default Error
