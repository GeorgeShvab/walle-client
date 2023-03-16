import createTheme from '@mui/material/styles/createTheme'
import { Font, Mode } from '../types'

const lightThemeTokens = {
  primary: {
    light: '#757575',
    main: '#121212',
    dark: '#060606',
    default: '#121212',
  },
  background: {
    light: '#ffffff',
    main: '#ffffff',
    dark: '#f9f9f9',
    default: '#ffffff',
  },
}

const darkThemeTokens = {
  primary: {
    light: '#f2f2f2',
    main: '#f8f8f8',
    dark: '#fafafa',
    default: '#f8f8f8',
  },
  background: {
    light: '#606060',
    main: '#121212',
    dark: '#404040',
    default: '#121212',
  },
}

export const themeSettings = (mode: Mode = 'light', font: Font = 'Rubik') => {
  const fontOptions = getFontOptions(font)

  const theme = createTheme({
    palette: {
      mode: mode,
      ...(mode === 'light' ? lightThemeTokens : darkThemeTokens),
    },
    typography: {
      fontFamily: fontOptions,
      h1: {
        fontSize: 40,
      },
      allVariants: {
        color:
          mode === 'light'
            ? lightThemeTokens.primary.main
            : darkThemeTokens.primary.main,
      },
    },
  })

  return theme
}

const rubik: string = 'Rubik, sans-serif'

const roboto: string = "'Roboto', sans-serif"

const serif: string = "'Roboto Slab', serif"

function getFontOptions(font: Font): string {
  switch (font) {
    case 'Roboto':
      return roboto
    case 'Rubik':
      return rubik
    case 'Roboto Slab':
      return serif
    default:
      return rubik
  }
}
