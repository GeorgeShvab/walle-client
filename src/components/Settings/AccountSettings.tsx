import Box from '@mui/material/Box'
import { FC } from 'react'
import SettingsItemHeader from './SettingsItemHeader'
import Button from '@mui/material/Button'
import useTheme from '@mui/material/styles/useTheme'
import useMediaQuery from '@mui/material/useMediaQuery'
import useLogout from '../../hooks/useLogout'
import PasswordSettings from './PasswordSettings'

const AccountSettings: FC = () => {
  const { breakpoints } = useTheme()

  const isLesserThanMd = useMediaQuery(breakpoints.down('md'))

  const logout = useLogout()

  return (
    <Box>
      <Box mb="50px">
        <SettingsItemHeader
          subtitle={'Змініть пароль, якщо вважаєте його ненадійним'}
          sx={{ mb: '20px' }}
        >
          Зміна паролю
        </SettingsItemHeader>
        <PasswordSettings />
      </Box>
      <Box>
        <SettingsItemHeader
          subtitle={
            "Вийдіть, якщо не хочете щоб інші користувачі цього комп'ютера могли переглядати ваші записи"
          }
          sx={{ mb: '15px' }}
        >
          Вихід з аккаунту
        </SettingsItemHeader>
        <Button
          variant="contained"
          size={isLesserThanMd ? 'large' : 'medium'}
          sx={{
            textTransform: 'unset',
          }}
          onClick={logout}
          fullWidth
        >
          Вийти
        </Button>
      </Box>
    </Box>
  )
}

export default AccountSettings
