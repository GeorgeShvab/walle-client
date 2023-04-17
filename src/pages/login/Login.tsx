import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import FormHelperText from '@mui/material/FormHelperText'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import useTheme from '@mui/material/styles/useTheme'
import { Formik } from 'formik'
import { FC } from 'react'
import { Link } from 'react-router-dom'
import * as yup from 'yup'
import useGoogleAuthorization from '../../hooks/googleAuth'
import useMediaQuery from '@mui/material/useMediaQuery'
import GoogleIcon from '@mui/icons-material/Google'
import useLogin from './useLogin'
import CenterContentPageWrapper from '../../components/CenterContentPageWrapper'
import LoadingButton from '@mui/lab/LoadingButton'
import useTitle from '../../hooks/useTitle'

const validationSchema = yup.object().shape({
  password: yup
    .string()
    .min(6, 'Невірний емейл або пароль')
    .max(80, 'Невірний емейл або пароль')
    .required('Введіть ваш пароль'),
  email: yup
    .string()
    .email('Невірний емейл або пароль')
    .required('Введіть ваш емейл'),
})

const initialValues = {
  password: '',
  email: '',
}

const Login: FC = () => {
  const { breakpoints } = useTheme()

  const googleAuth = useGoogleAuthorization()

  const isLesserThanMd = useMediaQuery(breakpoints.down('md'))

  const [handleSubmit, { isLoading, isError }] = useLogin()

  useTitle('Вхід')

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
          initialValues={initialValues}
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
                    Вхід
                  </Typography>
                  <TextField
                    variant="outlined"
                    size="small"
                    name="email"
                    label="Емейл"
                    type="text"
                    autoComplete="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(touched.email) && Boolean(errors.email)}
                    sx={{
                      mb: '10px',
                    }}
                    fullWidth
                  ></TextField>
                  <TextField
                    variant="outlined"
                    size="small"
                    name="password"
                    label="Пароль"
                    type="password"
                    autoComplete="new-password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={
                      Boolean(touched.password) && Boolean(errors.password)
                    }
                    sx={{
                      mb: '2px',
                    }}
                    fullWidth
                  ></TextField>
                  <FormHelperText
                    sx={{ mb: '15px' }}
                    error={
                      (Boolean(touched.email) && Boolean(errors.email)) ||
                      (Boolean(touched.password) && Boolean(errors.password))
                    }
                  >
                    {(touched.email && errors.email) ||
                      (touched.password && errors.password) ||
                      ' '}
                  </FormHelperText>
                  <LoadingButton
                    type="submit"
                    variant="contained"
                    size={isLesserThanMd ? 'large' : 'medium'}
                    disabled={Boolean(!values.email || !values.password)}
                    loading={isLoading}
                    sx={{
                      textTransform: 'unset',
                    }}
                    fullWidth
                  >
                    Увійти
                  </LoadingButton>
                </Box>
                <Divider sx={{ padding: '15px 0' }}>або</Divider>
                <Box mb="15px">
                  <Button
                    variant="outlined"
                    size={isLesserThanMd ? 'large' : 'medium'}
                    startIcon={<GoogleIcon />}
                    sx={{ textTransform: 'unset' }}
                    onClick={() => googleAuth()}
                    fullWidth
                  >
                    Продовжити з Google
                  </Button>
                </Box>
                <Typography textAlign="center" fontSize="small">
                  Ще не зареєстровані?{' '}
                  <Link to="/registration">Зареєструватись</Link>
                </Typography>
                <Typography textAlign="center" fontSize="small">
                  <Link to="/account/request-reset-password">
                    Забули пароь?
                  </Link>
                </Typography>
              </form>
            </Box>
          )}
        </Formik>
      </Paper>
    </CenterContentPageWrapper>
  )
}

export default Login
