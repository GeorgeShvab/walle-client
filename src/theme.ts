import createTheme from '@mui/material/styles/createTheme'
import { Font, Mode } from '../types'
import '@mui/material/styles/createPalette'

declare module '@mui/material/styles/createPalette' {
  interface CommonColors {
    light: string
  }
  interface TypeBackground {
    light: string
  }
}

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
    dark: '#fcfcfc',
    default: '#ffffff',
  },
  secondary: {
    main: '#41608D',
  },
}

const darkThemeTokens = {
  primary: {
    light: '#f4f4f4',
    main: '#f4f4f4',
    dark: '#fafafa',
    default: '#f4f4f4',
    buttonDarkColor: '#ffffff',
  },
  background: {
    light: '#202020',
    main: '#121212',
    dark: '#121212',
    default: '#121212',
  },
  secondary: {
    main: '#41608D',
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
    components: {
      MuiIconButton: {
        defaultProps: {
          sx: {
            color:
              (mode === 'light'
                ? lightThemeTokens.primary.main
                : darkThemeTokens.primary.main) + ' !important',
            svg: {
              height: '22px',
              width: '22px',
              color:
                (mode === 'light'
                  ? lightThemeTokens.primary.main
                  : darkThemeTokens.primary.main) + ' !important',
            },
            '@media screen and (max-width: 768px)': {
              svg: {
                height: '26px',
                width: '26px',
              },
            },
            '& svg path': {
              fill:
                mode === 'light'
                  ? lightThemeTokens.primary.main
                  : darkThemeTokens.primary.main + ' !important',
              color:
                (mode === 'light'
                  ? lightThemeTokens.primary.main
                  : darkThemeTokens.primary.main) + ' !important',
            },
            '& svg': {
              fill:
                mode === 'light'
                  ? lightThemeTokens.primary.main
                  : darkThemeTokens.primary.main + ' !important',
              color:
                (mode === 'light'
                  ? lightThemeTokens.primary.main
                  : darkThemeTokens.primary.main) + ' !important',
            },
          },
        },
      },
      MuiListItemIcon: {
        defaultProps: {
          sx: {
            svg: {
              height: '22px',
              width: '22px',
              color:
                (mode === 'light'
                  ? lightThemeTokens.primary.main
                  : darkThemeTokens.primary.main) + ' !important',
            },
            '@media screen and (max-width: 768px)': {
              svg: {
                height: '26px',
                width: '26px',
              },
            },
            '& svg path': {
              fill:
                mode === 'light'
                  ? lightThemeTokens.primary.main
                  : darkThemeTokens.primary.main,
            },
          },
        },
      },
      MuiListItemButton: {
        defaultProps: {
          disableRipple: true,
          /*sx: {
            '&.Mui-selected': {
              background: 'none',
              position: 'relative',
              opacity: '1',
            },
            '&:hover': {
              backgroundColor: 'transparent ! important',
              opacity: '1',
            },
            paddingLeft: '25px',
            '& > div:first-of-type': {
              minWidth: '46px',
            },
            opacity: '0.35',
            transition: '0.25s opacity',
          },*/
        },
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
