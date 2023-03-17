import Box from '@mui/material/Box'
import { FC } from 'react'
import Wrapper from './Wrapper'
import Header from '../../components/Header'
import useTheme from '@mui/material/styles/useTheme'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { Link } from 'react-router-dom'
import { useMediaQuery } from '@mui/material'

const Index: FC = () => {
  const { palette, breakpoints } = useTheme()

  const isLesserThamMd = useMediaQuery(breakpoints.down('md'))

  return (
    <Box component="main" minHeight="100vh">
      <Wrapper>
        <Box className="container">
          <Header />
          <Box
            padding={isLesserThamMd ? '75px 0 50px 0' : '100px 0 50px 0'}
            maxWidth={isLesserThamMd ? 'unset' : '500px'}
            display="flex"
            flexDirection="column"
            gap="50px"
            minHeight={
              isLesserThamMd ? ' calc(100vh - 197px)' : 'calc(100vh - 222px)'
            }
            textAlign={isLesserThamMd ? 'center' : 'left'}
          >
            <Box flex="3 0 auto">
              <Typography variant="h1" fontWeight="800" mb="40px">
                Швидкий та зручний веб редактор для текстових файлів
              </Typography>
              <Typography color={palette.primary.light} mb="50px">
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
                <Link to="/app">Меню</Link>
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
