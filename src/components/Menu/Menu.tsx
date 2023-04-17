import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import useTheme from '@mui/material/styles/useTheme'
import { FC, UIEvent, useState } from 'react'
import Tabs from './Tabs'
import ToolBarLeftActions from '../ToolBar/ToolBarLeftActions'
import Drawer from '@mui/material/Drawer'
import useMediaQuery from '@mui/material/useMediaQuery'
import throttle from '../../utils/throttle'

interface PropsType {
  onClose?: () => void
  onOpen?: () => void
  open: boolean
}

const Menu: FC<PropsType> = ({ onClose, onOpen, open }) => {
  const { palette, breakpoints } = useTheme()

  const isLesserThanMd = useMediaQuery(breakpoints.down('md'))

  const [isScrolled, setIsScrolled] = useState<boolean>(false)

  let handleScroll = (e: UIEvent<HTMLElement>) => {
    if ((e.target as HTMLElement).scrollTop > 25) {
      setIsScrolled(true)
    } else if (isScrolled) {
      setIsScrolled(false)
    }
  }

  handleScroll = throttle(handleScroll, 50)

  const handleClose = () => {
    onClose && onClose()
    setIsScrolled(false)
  }

  return (
    <Drawer
      open={open}
      onClose={handleClose}
      sx={{ position: 'relative' }}
      SlideProps={{ onScroll: handleScroll }}
    >
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
            boxShadow={
              isScrolled
                ? `0 0 10px 0 ${
                    palette.mode === 'light'
                      ? palette.grey[400]
                      : palette.background.default
                  }`
                : undefined
            }
            sx={{
              transition: '0.5s box-shadow',
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
