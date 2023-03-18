import { FC, useEffect, useMemo, useState } from 'react'
import Header from '../../components/Header'
import Box from '@mui/material/Box'
import useTheme from '@mui/material/styles/useTheme'
import Paper from '@mui/material/Paper'
import useMediaQuery from '@mui/material/useMediaQuery'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Alert from '../../components/Alert'
import CircularProgress from '@mui/material/CircularProgress'
import useVerification from './useVerification'
import CenterContentPageWrapper from '../../components/CenterContentPageWrapper'

const Verification: FC = () => {
  const { palette, breakpoints } = useTheme()

  const navigate = useNavigate()

  const isLesserThamMd = useMediaQuery(breakpoints.down('md'))

  const { search } = useLocation()

  const token = useMemo(
    () => new URLSearchParams(search).get('token'),
    [search]
  )

  const [error, success] = useVerification(token)

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        navigate('/home')
      }, 15000)
    }
  }, [success])

  return (
    <CenterContentPageWrapper>
      <Paper
        elevation={2}
        sx={{
          padding: isLesserThamMd ? '35px 30px' : '35px 40px',
          width: '100%',
          maxWidth: isLesserThamMd ? '300px' : '325px',
        }}
      >
        {success || error ? (
          <Box>
            <Typography
              variant="h5"
              fontWeight="700"
              textAlign="center"
              mb="30px"
            >
              {success ? 'Аккаунт підтверджено' : 'Помилка'}
            </Typography>
            <Typography
              textAlign="center"
              mb="25px"
              color={palette.primary.light}
            >
              {success
                ? `Через кілька секунд ми автоматично перенаправимо вас на
                  головну. Якщо перенаправлення не відбулось, скористайтесь
                  кнопкою нижче.`
                : error}
            </Typography>
            <Link to="/home">
              <Button
                variant="contained"
                sx={{
                  textTransform: 'unset',
                  margin: '0 auto',
                  display: 'block',
                }}
              >
                На головну
              </Button>
            </Link>
          </Box>
        ) : (
          <Box display="flex" justifyContent="center">
            <CircularProgress />
          </Box>
        )}
      </Paper>
    </CenterContentPageWrapper>
  )
}

export default Verification
