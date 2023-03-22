import Box from '@mui/material/Box'
import { FC } from 'react'
import ToolBarLeftActions from './ToolBarLeftActions'
import ToolBarRightActions from './ToolBarRightActions'
import Documents from './Documents'
import useTheme from '@mui/material/styles/useTheme'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import useMediaQuery from '@mui/material/useMediaQuery'

import MenuIcon from '@mui/icons-material/Menu'

const ToolBar: FC = () => {
  const { breakpoints } = useTheme()

  const isLesserThanMd = useMediaQuery(breakpoints.down('md'))

  return (
    <Box>
      <Box
        display="flex"
        padding={isLesserThanMd ? '5px 0' : '0'}
        width="100vw"
      >
        <Box
          flex={isLesserThanMd ? '3 0 auto' : '0 0 auto'}
          display="flex"
          alignItems="center"
          gap={isLesserThanMd ? '4px' : '25px'}
          pl="10px"
        >
          {isLesserThanMd && (
            <IconButton>
              <MenuIcon />
            </IconButton>
          )}
          <Typography
            variant={isLesserThanMd ? 'h5' : 'h6'}
            fontWeight="800"
            fontSize={isLesserThanMd ? '26px' : undefined}
            padding="2px 5px 0 5px"
          >
            WallE
          </Typography>
          {!isLesserThanMd && <ToolBarLeftActions />}
        </Box>
        {!isLesserThanMd && (
          <Box flex="3 3 auto" overflow="hidden">
            <Documents />
          </Box>
        )}
        <Box flex={isLesserThanMd ? '0 0 auto' : '0 0 auto'}>
          <ToolBarRightActions />
        </Box>
      </Box>
    </Box>
  )
}

export default ToolBar
