import { FC, useEffect, useState } from 'react'
import CenterContentPageWrapper from '../../components/CenterContentPageWrapper'
import useTheme from '@mui/material/styles/useTheme'
import useMediaQuery from '@mui/material/useMediaQuery'
import Paper from '@mui/material/Paper'
import { Formik, FormikHelpers } from 'formik'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import { useResetPassword } from './useResetPassword'
import { ResetPasswordBody } from '../../../types'
import Alert from '../../components/Alert'
import CircularProgress from '@mui/material/CircularProgress'

const validationSchema = yup.object().shape({
  password: yup
    .string()
    .min(6, 'Пароль повинен містити принанні 6 символів')
    .max(80, 'Пароль повинен містити не більше 80 символів')
    .required('Вигадайте надійний пароль'),
})

const ResetPassword: FC = () => {
  const { breakpoints, palette } = useTheme()

  const isLesserThanMd = useMediaQuery(breakpoints.down('md'))

  const navigate = useNavigate()

  const { search } = useLocation()

  const token = new URLSearchParams(search).get('token')

  const [isAlertOpen, setIsAlertOpen] = useState<boolean>(false)

  useEffect(() => {
    if (token) {
      setIsAlertOpen(false)
    }
  }, [token])

  const [resetPassword, { error, success, isLoading }] = useResetPassword()

  const handleSubmit = async (
    values: { password: string },
    actions: FormikHelpers<{ password: string }>
  ) => {
    if (!token) {
      setIsAlertOpen(true)
      return
    }

    const data = await resetPassword({
      password: values.password,
      verificationToken: token,
    })

    if (data?.data?.errors) {
      actions.setErrors(data.data?.errors)
    } else if (!data?.data?.errors && data?.status === 400) {
      setIsAlertOpen(true)
    }
  }

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        navigate('/login')
      }, 10000)
    }
  }, [success])

  if (isLoading) {
    return (
      <CenterContentPageWrapper>
        <Paper
          elevation={2}
          sx={{
            padding: isLesserThanMd ? '35px 30px' : '35px 40px',
            width: '100%',
            maxWidth: isLesserThanMd ? '100%' : '400px',
          }}
        >
          <Box display="flex" justifyContent="center">
            <CircularProgress />
          </Box>
        </Paper>
      </CenterContentPageWrapper>
    )
  }

  return (
    <>
      <Alert
        open={isAlertOpen}
        text="Токен для зміни паролю не знайдено. або термін його дії збіг"
        onClose={() => setIsAlertOpen(false)}
      />
      <CenterContentPageWrapper>
        <Paper
          elevation={2}
          sx={{
            padding: isLesserThanMd ? '35px 30px' : '35px 40px',
            width: '100%',
            maxWidth: isLesserThanMd ? '100%' : '400px',
          }}
        >
          {error || success ? (
            <Box>
              <Typography
                variant="h5"
                fontWeight="700"
                textAlign="center"
                mb="30px"
              >
                {success ? 'Пароль змінено' : 'Помилка'}
              </Typography>
              <Typography
                textAlign="center"
                mb="25px"
                color={palette.primary.light}
              >
                {success
                  ? `Через кілька секунд ми автоматично перенаправимо вас на
                  сторінку авторизації. Якщо перенаправлення не відбулось, скористайтесь
                  кнопкою нижче.`
                  : error}
              </Typography>
              <Link to="/login">
                <Button
                  variant="contained"
                  sx={{
                    textTransform: 'unset',
                    margin: '0 auto',
                    display: 'block',
                  }}
                >
                  На сторінку авторизації
                </Button>
              </Link>
            </Box>
          ) : (
            <Formik
              onSubmit={handleSubmit}
              initialValues={{ password: '' }}
              validationSchema={validationSchema}
            >
              {({
                values,
                errors,
                touched,
                handleSubmit,
                handleBlur,
                handleChange,
              }) => (
                <Box>
                  <form onSubmit={handleSubmit}>
                    <Box>
                      <Typography
                        variant="h5"
                        fontWeight="700"
                        textAlign="center"
                        mb="40px"
                      >
                        Зміна паролю
                      </Typography>
                      <TextField
                        variant="outlined"
                        size="small"
                        name="password"
                        label="Новий пароль"
                        type="password"
                        autoComplete="new-password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={
                          Boolean(touched.password) && Boolean(errors.password)
                        }
                        helperText={
                          (touched.password && errors.password) || ' '
                        }
                        sx={{ mb: '10px' }}
                        fullWidth
                      ></TextField>
                      <Button
                        type="submit"
                        variant="contained"
                        size={isLesserThanMd ? 'large' : 'medium'}
                        sx={{
                          textTransform: 'unset',
                          mb: '15px',
                        }}
                        fullWidth
                      >
                        Змінити пароль
                      </Button>
                    </Box>
                    <Typography textAlign="center" fontSize="small">
                      <Link to="/">На головну</Link>
                    </Typography>
                  </form>
                </Box>
              )}
            </Formik>
          )}
        </Paper>
      </CenterContentPageWrapper>
    </>
  )
}

export default ResetPassword
