import Box from '@mui/material/Box'
import { FC } from 'react'
import Header from '../../components/Header'
import * as yup from 'yup'
import Paper from '@mui/material/Paper'
import { Formik, FormikHelpers } from 'formik'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { Link } from 'react-router-dom'
import FormHelperText from '@mui/material/FormHelperText'
import Divider from '@mui/material/Divider'
import GoogleIcon from '@mui/icons-material/Google'
import useTheme from '@mui/material/styles/useTheme'
import useMediaQuery from '@mui/material/useMediaQuery'
import useGoogleAuthorization from '../../hooks/googleAuth'
import Alert from '../../components/Alert'
import useRegistration from './useRegistration'
import { RegistrationArgs } from '../../../types'

const validationSchema = yup.object().shape({
  password: yup
    .string()
    .min(6, 'Пароль повинен містити принанні 6 символів')
    .max(80, 'Пароль повинен містити не більше 80 символів')
    .required('Вигадайте надійний пароль'),
  email: yup.string().email('Некоректний емейл').required('Введіть ваш емейл'),
  name: yup
    .string()
    .min(1, "Ім'я повинно містити принанні 1 символ")
    .max(25, "Ім'я повинно містити не більше 25 символів")
    .required("Введіть своє ім'я"),
})

const initialValues = {
  password: '',
  email: '',
  name: '',
}

const Registration: FC = () => {
  const { palette, breakpoints } = useTheme()

  const [googleAuth, googleAuthServerError] = useGoogleAuthorization()

  const [register, registrationServerError] = useRegistration()

  const error = googleAuthServerError || registrationServerError

  const isLesserThamMd = useMediaQuery(breakpoints.down('md'))

  const handleSubmit = async (
    values: RegistrationArgs,
    actions: FormikHelpers<RegistrationArgs>
  ) => {
    const data = await register(values)

    if (data) {
      actions.setErrors(data)
    }
  }

  return (
    <Box
      component="main"
      minHeight="100vh"
      sx={{
        backgroundColor:
          palette.mode === 'light'
            ? palette.grey[50]
            : palette.background.default,
      }}
    >
      <Alert open={Boolean(error)} text={error} />
      <Box className="container">
        <Header link />
        <Box display="flex" justifyContent="center" paddingTop="85px">
          <Paper
            elevation={2}
            sx={{
              padding: isLesserThamMd ? '35px 30px' : '35px 40px',
              width: '100%',
              maxWidth: isLesserThamMd ? '300px' : '325px',
            }}
          >
            <Formik
              onSubmit={handleSubmit}
              initialValues={initialValues}
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
                        Реєстрація
                      </Typography>
                      <TextField
                        variant="outlined"
                        size="small"
                        name="name"
                        label="Ім'я"
                        type="text"
                        autoComplete="given-name"
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={Boolean(touched.name) && Boolean(errors.name)}
                        sx={{ mb: '10px' }}
                        fullWidth
                      ></TextField>
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
                        sx={{ mb: '10px' }}
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
                        sx={{ mb: '2px' }}
                        fullWidth
                      ></TextField>
                      <FormHelperText
                        sx={{ mb: '15px' }}
                        error={
                          (Boolean(touched.name) && Boolean(errors.name)) ||
                          (Boolean(touched.email) && Boolean(errors.email)) ||
                          (Boolean(touched.password) &&
                            Boolean(errors.password))
                        }
                      >
                        {(touched.name && errors.name) ||
                          (touched.email && errors.email) ||
                          (touched.password && errors.password) ||
                          ' '}
                      </FormHelperText>
                      <Button
                        type="submit"
                        variant="contained"
                        size={isLesserThamMd ? 'large' : 'medium'}
                        sx={{
                          textTransform: 'unset',
                        }}
                        fullWidth
                      >
                        Зареєструватись
                      </Button>
                    </Box>
                    <Divider sx={{ padding: '15px 0' }}>або</Divider>
                    <Box mb="15px">
                      <Button
                        variant="outlined"
                        size={isLesserThamMd ? 'large' : 'medium'}
                        startIcon={<GoogleIcon />}
                        sx={{ textTransform: 'unset' }}
                        onClick={() => googleAuth()}
                        fullWidth
                      >
                        Продовжити з Google
                      </Button>
                    </Box>
                    <Typography textAlign="center" fontSize="small">
                      Вже зареєстровані? <Link to="/login">Увійти</Link>
                    </Typography>
                  </form>
                </Box>
              )}
            </Formik>
          </Paper>
        </Box>
      </Box>
    </Box>
  )
}

export default Registration
