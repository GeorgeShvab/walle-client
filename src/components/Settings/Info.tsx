import Box from '@mui/material/Box'
import { FC } from 'react'
import SettingsItemHeader from './SettingsItemHeader'
import { Typography } from '@mui/material'

const Info: FC = () => {
  return (
    <Box>
      <Box sx={{ mb: '30px' }} textAlign="justify">
        <SettingsItemHeader sx={{ mb: '20px' }}>Функціонал</SettingsItemHeader>
        <Typography fontSize="small" mb="8px">
          Наразі, не весь функціонал додатку доступний. У даній версії немає
          окремого редактора для json та xml файлів.
        </Typography>
        <Typography fontSize="small" mb="8px">
          З допомогою WallE можна створювати та редагувати тесктові документи.
          Щоб додати документ, натисніть на знак "плюс" у правому перхньому
          кутку додатку.
        </Typography>
        <Typography fontSize="small" mb="8px">
          На головній сторінці, куди можна попасти натиснувши на знак будиночку
          зверху зліва, представлені всі ваші документи.
        </Typography>
        <Typography fontSize="small" mb="8px">
          Зверху перелічені відкриті документи. Натиснувши на знак хрестику, ви
          закриєте документ, але його знову можна буде знайти на головній
          сторінці.
        </Typography>
        <Typography fontSize="small" mb="8px">
          Видалення документу як і ряд інших функцій є у меню дій документа. Щоб
          відкрити його натисніть на знак у вигляді трьох крапок, зверху зліва,
          на сторінці документа. Також, це можна зробити, перебуваючи на
          головній сторінці та натиснувши правою кнопкою миші на документ.
        </Typography>
        <Typography fontSize="small" mb="8px">
          Документ має кілька типів доступу, які можна переглянути та змінити у
          меню документа.
        </Typography>
        <Typography fontSize="small">
          Щоб показати документ іншим користувачам, або надати можливість його
          редагування, зкопіюйте посилання на документ і впевніться, що він має
          потрібний вам тип доступу. Не рекомендується одночасно змінювати
          документ двом користувачам, тому що додаток немає синхронізації, і в
          результаті користувачі будуть перезаписувати текст один одного.
        </Typography>
      </Box>
      <Box textAlign="justify">
        <SettingsItemHeader sx={{ mb: '20px' }}>Про проєкт</SettingsItemHeader>
        <Typography fontSize="small" mb="8px">
          Проєкт розроблений в першу чергу як пет-проєкт. Другорядна ціль
          розробки це особисте використання, вже втомився зберігати потрібну
          інформацію у блокнотах на робочому столі.
        </Typography>
        <Typography fontSize="small" mb="8px">
          Проєкт створено на MERN стеку разом з TypeScript. Також використовував
          Redux toolkit, зокрема RTK Query.
        </Typography>
        <Typography fontSize="small" mb="8px">
          <a href="https://github.com/GeorgeShvab">Сторінка</a> автора на
          Github.
        </Typography>
        <Typography fontSize="small" mb="8px">
          Ось репозиторії{' '}
          <a href="https://github.com/GeorgeShvab/walle-server">бекенду</a> та{' '}
          <a href="https://github.com/GeorgeShvab/walle-client">фронтенду</a>{' '}
          проєкту на Github.
        </Typography>
      </Box>
    </Box>
  )
}

export default Info
