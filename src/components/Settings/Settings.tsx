import Box from '@mui/material/Box'
import Fade from '@mui/material/Fade'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'
import useTheme from '@mui/material/styles/useTheme'
import Modal from '@mui/material/Modal'
import Paper from '@mui/material/Paper'
import { FC, useMemo, useState } from 'react'
import CenterContent from '../CenterContent'
import { SettingsSection } from '../../../types'
import SettingsMenu from './SettingsMenu'
import AccountSettings from './AccountSettings'
import InterfaceSettings from './InterfaceSettings'
import CloseIcon from '@mui/icons-material/Close'
import { useAppSelector } from '../../redux/store'
import { selectUser } from '../../redux/slices/user'
import Info from './Info'

interface PropsType {
  open: boolean
  onClose: () => void
}

const Settings: FC<PropsType> = ({ open, onClose }) => {
  const { palette, breakpoints } = useTheme()

  const isLesserThanMd = useMediaQuery(breakpoints.down('md'))

  const user = useAppSelector(selectUser)

  const [section, setSection] = useState<SettingsSection>('interface')

  const handleChangeSection = (arg: SettingsSection) => {
    setSection(arg)
  }

  const handleClose = () => {
    onClose()
  }

  const currentSection = useMemo(() => {
    switch (section) {
      case 'account':
        return <AccountSettings />
      case 'info':
        return <Info />
      default:
        return <InterfaceSettings />
    }
  }, [section])

  return (
    <Modal open={open} onClose={onClose}>
      <Fade in={open}>
        <CenterContent>
          <Paper
            sx={{
              height: '75vh',
              width: isLesserThanMd ? '95vw' : '700px',
              overflow: isLesserThanMd ? 'auto' : 'hidden',
              position: 'relative',
            }}
          >
            <Box
              display={isLesserThanMd ? 'block' : 'flex'}
              height={isLesserThanMd ? 'fit-content' : '100%'}
              minWidth="100%"
            >
              <Box flex="0 0 30%" padding={'25px 40px 25px 10px'}>
                <Typography variant="h5" mb="15px" pl="25px">
                  Налаштування
                </Typography>
                <SettingsMenu
                  section={section}
                  onClick={handleChangeSection}
                  user={user.data}
                />
              </Box>
              <Box
                padding={isLesserThanMd ? '28px 40px 40px' : '28px 40px'}
                minHeight="100%"
                flex="0 3 70%"
                overflow="auto"
                sx={{
                  backgroundColor:
                    palette.mode === 'light'
                      ? palette.grey[50]
                      : palette.background.light,
                  '&::-webkit-scrollbar': {
                    width: isLesserThanMd ? undefined : '10px',
                  },
                  '&::-webkit-scrollbar-track': {
                    backgroundColor:
                      palette.mode === 'light' ? palette.grey[100] : '#0e0e0e',
                  },
                  '&::-webkit-scrollbar-thumb': {
                    backgroundColor:
                      palette.mode === 'light'
                        ? palette.grey[300]
                        : palette.background.light,
                  },
                }}
              >
                {currentSection}
              </Box>
            </Box>
            <IconButton
              sx={{
                position: 'absolute',
                top: isLesserThanMd ? '25px' : '15px',
                right: isLesserThanMd ? '20px' : '15px',
              }}
              onClick={handleClose}
              size="small"
            >
              <CloseIcon />
            </IconButton>
          </Paper>
        </CenterContent>
      </Fade>
    </Modal>
  )
}

export default Settings
