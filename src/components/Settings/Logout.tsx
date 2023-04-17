import useMediaQuery from '@mui/material/useMediaQuery'
import useTheme from '@mui/material/styles/useTheme'
import { FC } from 'react'
import useLogout from '../../hooks/useLogout'
import LoadingButton from '@mui/lab/LoadingButton'

const Logout: FC = () => {
  const { breakpoints } = useTheme()

  const isLesserThanMd = useMediaQuery(breakpoints.down('md'))

  const [logout, { isLoading }] = useLogout()

  return (
    <LoadingButton
      type="submit"
      variant="contained"
      size={isLesserThanMd ? 'large' : 'medium'}
      loading={isLoading}
      onClick={logout}
      sx={{
        textTransform: 'unset',
      }}
      fullWidth
    >
      Вийти
    </LoadingButton>
  )
}

export default Logout
