import Box from '@mui/material/Box'
import useTheme from '@mui/material/styles/useTheme'
import useMediaQuery from '@mui/material/useMediaQuery'
import { Formik } from 'formik'
import { FC } from 'react'
import * as yup from 'yup'
import { useUpdatePassword } from './useSettings'
import TextField from '@mui/material/TextField'
import FormHelperText from '@mui/material/FormHelperText'
import Button from '@mui/material/Button'

const validationSchema = yup.object().shape({
  oldPassword: yup
    .string()
    .min(6, 'Невірний старий пароль')
    .max(80, 'Невірний старий пароль')
    .required('Введіть старий пароль'),
  password: yup
    .string()
    .min(6, 'Пароль повинен містити принанні 6 символів')
    .max(80, 'Пароль повинен містити не більше 80 символів')
    .required('Вигадайте надійний пароль'),
})

const initialValues = {
  oldPassword: '',
  password: '',
}

const PasswordSettings: FC = () => {
  const { breakpoints } = useTheme()

  const isLesserThanMd = useMediaQuery(breakpoints.down('md'))

  const updatePassword = useUpdatePassword()

  return (
    <Box>
      <Formik
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={updatePassword}
      >
        {({
          errors,
          values,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <Box>
            <form onSubmit={handleSubmit}>
              <Box>
                <TextField
                  variant="outlined"
                  size="small"
                  name="oldPassword"
                  label="Старий пароль"
                  type="password"
                  autoComplete="password"
                  value={values.oldPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={
                    Boolean(touched.oldPassword) && Boolean(errors.oldPassword)
                  }
                  sx={{ mb: '10px' }}
                  fullWidth
                />
                <TextField
                  variant="outlined"
                  size="small"
                  name="password"
                  label="Новий пароль"
                  type="password"
                  autoComplete="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(touched.password) && Boolean(errors.password)}
                  sx={{ mb: '2px' }}
                  fullWidth
                />
                <FormHelperText
                  sx={{ mb: '15px' }}
                  error={
                    (Boolean(touched.oldPassword) &&
                      Boolean(errors.oldPassword)) ||
                    (Boolean(touched.password) && Boolean(errors.password))
                  }
                >
                  {(touched.oldPassword && errors.oldPassword) ||
                    (touched.password && errors.password) ||
                    ''}
                </FormHelperText>
                <Button
                  type="submit"
                  variant="contained"
                  size={isLesserThanMd ? 'large' : 'medium'}
                  sx={{
                    textTransform: 'unset',
                  }}
                  fullWidth
                >
                  Змінити пароль
                </Button>
              </Box>
            </form>
          </Box>
        )}
      </Formik>
    </Box>
  )
}

export default PasswordSettings
