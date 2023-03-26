import Box from '@mui/material/Box'
import { FC, useState } from 'react'
import { Mode } from '../../../types'
import DarkThemePreview from '../../assets/dark_theme_preview.jpg'
import LightThemePreview from '../../assets/light_theme_preview.jpg'
import useTheme from '@mui/material/styles/useTheme'

interface PropsTypes {
  mode: Mode
  onSelect: (arg: Mode) => void
}

const ModeSettings: FC<PropsTypes> = (props) => {
  const { palette } = useTheme()

  const [mode, setMode] = useState<Mode>(props.mode)

  const handleClick = (argMode: Mode) => {
    setMode(argMode)

    props.onSelect(argMode)
  }

  return (
    <Box display="flex" gap="5%">
      <Box
        borderRadius={1}
        flex="0 0 47.5%"
        position="relative"
        onClick={() => handleClick('dark')}
        className={mode === 'dark' ? 'selected' : ''}
        sx={{
          '&::after': {
            position: 'absolute',
            content: `""`,
            height: '4px',
            width: '50%',
            bottom: '-15px',
            borderRadius: '2px',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor:
              mode === 'light' ? palette.primary.main : palette.primary.main,
            display: 'none',
          },
          '&.selected': {
            '&::after': { display: 'block !important' },
          },
        }}
      >
        <img
          src={DarkThemePreview}
          alt="Темна тема"
          width="100%"
          height="100%"
          style={{ display: 'block' }}
        />
      </Box>
      <Box
        borderRadius={1}
        flex="0 0 47.5%"
        position="relative"
        onClick={() => handleClick('light')}
        className={mode === 'light' ? 'selected' : ''}
        sx={{
          '&::after': {
            position: 'absolute',
            content: `""`,
            height: '4px',
            width: '50%',
            bottom: '-15px',
            borderRadius: '2px',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor:
              mode === 'light' ? palette.primary.main : palette.primary.main,
            display: 'none',
          },
          '&.selected': {
            '&::after': { display: 'block !important' },
          },
        }}
      >
        <img
          src={LightThemePreview}
          alt="Світла тема"
          width="100%"
          height="100%"
          style={{ display: 'block' }}
        />
      </Box>
    </Box>
  )
}

export default ModeSettings
