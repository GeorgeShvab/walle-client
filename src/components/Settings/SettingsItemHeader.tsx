import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import useTheme from '@mui/material/styles/useTheme'
import { SxProps } from '@mui/material/styles'
import { FC, ReactElement } from 'react'

interface PropsType {
  children: string | ReactElement
  subtitle?: string | ReactElement
  sx?: SxProps
}

const SettingsItemHeader: FC<PropsType> = ({ children, subtitle, sx }) => {
  const { palette } = useTheme()

  return (
    <Box sx={sx}>
      {typeof children === 'string' ? (
        <Typography variant="h6" fontSize="18px">
          {children}
        </Typography>
      ) : (
        children
      )}
      {subtitle &&
        (typeof subtitle === 'string' ? (
          <Typography
            fontSize="small"
            color={
              palette.mode === 'light' ? palette.grey[500] : palette.grey[600]
            }
          >
            {subtitle}
          </Typography>
        ) : (
          subtitle
        ))}
    </Box>
  )
}

export default SettingsItemHeader
