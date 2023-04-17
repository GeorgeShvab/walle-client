import { FC } from 'react'
import CenterContentPageWrapper from '../../components/CenterContentPageWrapper'
import useTheme from '@mui/material/styles/useTheme'
import useMediaQuery from '@mui/material/useMediaQuery'
import Paper from '@mui/material/Paper'
import { Formik } from 'formik'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { Link } from 'react-router-dom'
import * as yup from 'yup'
import { useRequestPasswordReset } from './useResetPassword'
import LoadingButton from '@mui/lab/LoadingButton'

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Вкажіть коректний емейл')
    .required('Вкажіть Ваш емейл'),
})

const RequestResetPassword: FC = () => {
  const { breakpoints, palette } = useTheme()

  const isLesserThanMd = useMediaQuery(breakpoints.down('md'))

  const [handleSubmit, { isSuccess, isError, isLoading }] =
    useRequestPasswordReset()

  if (isSuccess || isError) {
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
              {isSuccess ? 'Лист надіслано' : 'Помилка'}
            </Typography>
            <Typography
              textAlign="center"
              mb="25px"
              color={palette.primary.light}
            >
              {isSuccess
                ? `Відкрийте лист та слідуйте подальшим інструкціям.`
                : isError}
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
          initialValues={{ email: '' }}
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
                    mb="10px"
                  >
                    Зміна пароля
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
                  <LoadingButton
                    type="submit"
                    variant="contained"
                    size={isLesserThanMd ? 'large' : 'medium'}
                    disabled={Boolean(!values.email)}
                    loading={isLoading}
                    sx={{
                      textTransform: 'unset',
                      mb: '15px',
                    }}
                    fullWidth
                  >
                    Отримати лист
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

export default RequestResetPassword
