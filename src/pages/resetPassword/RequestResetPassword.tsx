import { FC, useEffect } from 'react'
import CenterContentPageWrapper from '../../components/CenterContentPageWrapper'
import useTheme from '@mui/material/styles/useTheme'
import useMediaQuery from '@mui/material/useMediaQuery'
import Paper from '@mui/material/Paper'
import { Formik, FormikHelpers } from 'formik'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import FormHelperText from '@mui/material/FormHelperText'
import Button from '@mui/material/Button'
import { Link, useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import { useRequestPasswordReset } from './useResetPassword'
import CircularProgress from '@mui/material/CircularProgress'

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Вкажіть коректний емейл')
    .required('Вкажіть Ваш емейл'),
})

interface Values {
  email: string
}

const RequestResetPassword: FC = () => {
  const { breakpoints, palette } = useTheme()

  const isLesserThanMd = useMediaQuery(breakpoints.down('md'))

  const [sendRequest, { success, error, isLoading }] = useRequestPasswordReset()

  const handleSubmit = (values: Values, actions: FormikHelpers<Values>) => {
    sendRequest(values.email)
  }

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
    <CenterContentPageWrapper>
      <Paper
        elevation={2}
        sx={{
          padding: isLesserThanMd ? '35px 30px' : '35px 40px',
          width: '100%',
          maxWidth: isLesserThanMd ? '100%' : '400px',
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
              {success ? 'Лист надіслано' : 'Помилка'}
            </Typography>
            <Typography
              textAlign="center"
              mb="25px"
              color={palette.primary.light}
            >
              {success
                ? `Відкрийте лист та слідуйте подальшим інструкціям.`
                : error}
            </Typography>
            <Link to="/">
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
          <Formik
            onSubmit={handleSubmit}
            initialValues={{ email: '' }}
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
                      mb="10px"
                    >
                      Зміна паролю
                    </Typography>
                    <Typography textAlign="center" mb="40px">
                      Введіть Ваш емейл щоб отримати лист з подальшими
                      інструкціями
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
                      helperText={(touched.email && errors.email) || ' '}
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
                      Отримати лист
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
  )
}

export default RequestResetPassword
