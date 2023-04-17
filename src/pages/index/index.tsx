import Box from '@mui/material/Box'
import { FC } from 'react'
import Wrapper from './Wrapper'
import Header from '../../components/Header'
import useTheme from '@mui/material/styles/useTheme'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { Link } from 'react-router-dom'
import useMediaQuery from '@mui/material/useMediaQuery'
import useTitle from '../../hooks/useTitle'

const Index: FC = () => {
  const { palette, breakpoints } = useTheme()

  const isLesserThanMd = useMediaQuery(breakpoints.down('md'))

  useTitle('WallE')

  return (
    <Box component="main" minHeight="100vh">
      <Wrapper>
        <Box className="container">
          <Header />
          <Box
            padding={isLesserThanMd ? '75px 0 20px 0' : '100px 0 30px 0'}
            maxWidth={isLesserThanMd ? 'unset' : '500px'}
            display="flex"
            flexDirection="column"
            gap="50px"
            minHeight="calc(100vh - 100px)"
            textAlign={isLesserThanMd ? 'center' : 'left'}
          >
            <Box flex="3 0 auto">
              <Typography variant="h1" fontWeight="800" mb="40px">
                Швидкий та зручний веб редактор для текстових файлів
              </Typography>
              <Typography
                color={palette.primary.light}
                mb={isLesserThanMd ? '75px' : '50px'}
              >
                Додаток повністю безкоштовний, підтримує txt, json та xml
                формати. Має інтуїтивний та зручний дизайн і підійде будь-якому
                користувачу.
              </Typography>
              <Link to="/registration">
                <Button variant="contained" size="large">
                  Реєстрація
                </Button>
              </Link>
            </Box>
            <Box>
              <Typography color={palette.primary.light}>
                Вже зареєстровані? <Link to="/login">Увійти</Link> або{' '}
                <Link to="/home">Меню</Link>
              </Typography>
              <Typography color={palette.primary.light}>
                &copy;Георгій Шваб. Всі права збережено.
              </Typography>
            </Box>
          </Box>
        </Box>
      </Wrapper>
    </Box>
  )
}

export default Index
