import Box from '@mui/material/Box'
import { FC } from 'react'
import SettingsItemHeader from './SettingsItemHeader'
import useTheme from '@mui/material/styles/useTheme'
import PasswordSettings from './PasswordSettings'
import Logout from './Logout'
import { useGetMeQuery } from '../../api/userApiSlice'
import Typography from '@mui/material/Typography'
import { Link } from 'react-router-dom'

const AccountSettings: FC = () => {
  const { palette } = useTheme()

  const { data } = useGetMeQuery()

  return (
    <Box>
      <Box mb="50px">
        <SettingsItemHeader
          subtitle={'Змініть пароль, якщо вважаєте його ненадійним'}
          sx={{ mb: '20px' }}
        >
          Зміна пароля
        </SettingsItemHeader>
        {data?.registeredWithGoogle ? (
          <Typography
            fontSize="small"
            color={
              palette.mode === 'light' ? palette.grey[500] : palette.grey[600]
            }
          >
            Ви були зареєстровані з допомогою Google і ще не встановили пароль.
            Щоб встановити пароль, скористайтесь{' '}
            <Link to="/account/request-reset-password">
              зміною пароля по емейл
            </Link>
            .
          </Typography>
        ) : (
          <PasswordSettings />
        )}
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
        <Logout />
      </Box>
    </Box>
  )
}

export default AccountSettings
