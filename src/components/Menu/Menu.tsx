import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import useTheme from '@mui/material/styles/useTheme'
import { FC } from 'react'
import Tabs from './Tabs'
import ToolBarLeftActions from '../ToolBar/ToolBarLeftActions'
import Drawer from '@mui/material/Drawer'
import useMediaQuery from '@mui/material/useMediaQuery'

interface PropsType {
  onClose?: () => void
  onOpen?: () => void
  open: boolean
}

const Menu: FC<PropsType> = ({ onClose, onOpen, open }) => {
  const { palette, breakpoints } = useTheme()

  const isLesserThanMd = useMediaQuery(breakpoints.down('md'))

  return (
    <Drawer open={open} onClose={onClose} sx={{ position: 'relative' }}>
      <Box
        minHeight="100%"
        sx={{
          backgroundColor:
            palette.mode === 'light'
              ? palette.grey[100]
              : palette.background.light,
        }}
        width="75vw"
      >
        <Box
          padding="0 0 5px 0"
          sx={{
            backgroundColor:
              palette.mode === 'light'
                ? palette.grey[100]
                : palette.background.light,
          }}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            padding="5px 5px 5px 15px"
            position="sticky"
            top="0"
            zIndex="10"
            sx={{
              backgroundColor:
                palette.mode === 'light'
                  ? palette.grey[100]
                  : palette.background.light,
            }}
          >
            <Typography
              variant={isLesserThanMd ? 'h5' : 'h6'}
              fontWeight="800"
              fontSize={isLesserThanMd ? '26px' : undefined}
              padding="2px 5px 0 5px"
            >
              WallE
            </Typography>
            <ToolBarLeftActions />
          </Box>
          <Tabs />
        </Box>
      </Box>
    </Drawer>
  )
}

export default Menu
