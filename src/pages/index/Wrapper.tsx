import Box from '@mui/material/Box'
import { FC, ReactElement } from 'react'
import imageLightMode from '../../assets/intro_light.png'
import imageDarkMode from '../../assets/intro_dark2.png'
import useTheme from '@mui/material/styles/useTheme'
import { useMediaQuery } from '@mui/material'

const Wrapper: FC<{ children: ReactElement }> = ({ children }) => {
  const { palette, breakpoints } = useTheme()

  const isLesserThanMd = useMediaQuery(breakpoints.down('md'))

  return (
    <Box
      position={'relative'}
      minHeight="100vh"
      overflow="hidden"
      sx={{ overflowClipMargin: '0' }}
    >
      {children}
      {!isLesserThanMd && (
        <Box
          position={'absolute'}
          bottom="0"
          right="0"
          width="50%"
          height="95%"
        >
          <img
            alt="Intro"
            src={palette.mode === 'light' ? imageLightMode : imageDarkMode}
            style={{
              display: 'block',
              objectPosition: 'left',
            }}
            width="900px"
            height="900px"
          />
        </Box>
      )}
    </Box>
  )
}

export default Wrapper
