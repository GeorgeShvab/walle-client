import { FC } from 'react'
import Header from '../../components/Header'
import Box from '@mui/material/Box'
import useTheme from '@mui/material/styles/useTheme'
import Paper from '@mui/material/Paper'
import useMediaQuery from '@mui/material/useMediaQuery'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { Link } from 'react-router-dom'
import CenterContentPageWrapper from '../../components/CenterContentPageWrapper'
import useTitle from '../../hooks/useTitle'

const RegistrationSuccess: FC = () => {
  const { palette, breakpoints } = useTheme()

  const isLesserThanMd = useMediaQuery(breakpoints.down('md'))

  useTitle('Реєстрація')

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
            Дякуємо за реєстрацію
          </Typography>
          <Typography
            textAlign="center"
            mb="25px"
            color={palette.primary.light}
          >
            Ми надіслали лист для підтвердження поштової скриньки на вказаний
            адрес. Відкрийте лист та слідуйте інструкціям.
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

export default RegistrationSuccess
