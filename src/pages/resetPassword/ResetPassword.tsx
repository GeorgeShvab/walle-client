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
import { FailedResponse, ValidationError } from '../../../types'
import LoadingButton from '@mui/lab/LoadingButton'

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

  const [resetPassword, { isError, isSuccess, isLoading, error }] =
    useResetPassword()

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        navigate('/login')
      }, 10000)
    }
  }, [isSuccess])

  const handleSubmit = async (
    values: { password: string },
    actions: FormikHelpers<{ password: string }>
  ) => {
    await resetPassword(
      { verificationToken: token || undefined, ...values },
      actions
    )
  }

  if (
    (error as FailedResponse<ValidationError>)?.data?.errors
      .verificationToken ||
    isSuccess
  ) {
    let text

    if (isSuccess) {
      text = `Через кілька секунд ми автоматично перенаправимо вас на
    сторінку авторизації. Якщо перенаправлення не відбулось, скористайтесь
    кнопкою нижче.`
    } else {
      text = (error as FailedResponse<ValidationError>).data.errors
        .verificationToken
    }

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
          <Box>
            <Typography
              variant="h5"
              fontWeight="700"
              textAlign="center"
              mb="30px"
            >
              {isSuccess ? 'Пароль змінено' : 'Помилка'}
            </Typography>
            <Typography
              textAlign="center"
              mb="25px"
              color={palette.primary.light}
            >
              {text}
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
        </Paper>
      </CenterContentPageWrapper>
    )
  }

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
        <Formik
          onSubmit={handleSubmit}
          initialValues={{ password: '' }}
          validationSchema={validationSchema}
          validateOnBlur={isError}
          validateOnChange={isError}
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
                    Зміна пароля
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
                    helperText={(touched.password && errors.password) || ' '}
                    sx={{ mb: '10px' }}
                    fullWidth
                  ></TextField>
                  <LoadingButton
                    type="submit"
                    variant="contained"
                    size={isLesserThanMd ? 'large' : 'medium'}
                    disabled={Boolean(!values.password)}
                    loading={isLoading}
                    sx={{
                      textTransform: 'unset',
                      mb: '15px',
                    }}
                    fullWidth
                  >
                    Змінити пароль
                  </LoadingButton>
                </Box>
                <Typography textAlign="center" fontSize="small">
                  <Link to="/">На головну</Link>
                </Typography>
              </form>
            </Box>
          )}
        </Formik>
      </Paper>
    </CenterContentPageWrapper>
  )
}

export default ResetPassword
