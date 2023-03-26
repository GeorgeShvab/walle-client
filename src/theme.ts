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
          sx: {
            '&.Mui-selected': {
              background: 'none',
              position: 'relative',
              /*'&::after': {
                opacity: '1 !important',
              },*/
              opacity: '1',
            },
            '&:hover': {
              backgroundColor: 'transparent ! important',
              /*'&::after': {
                opacity: '0.5',
              },*/
              opacity: '1',
            },
            /*'&::after': { // old hover effect
              position: 'absolute',
              right: '0',
              top: '50%',
              transform: 'translateY(-50%)',
              content: `""`,
              height: '25%',
              width: '4px',
              backgroundColor:
                mode === 'light'
                  ? lightThemeTokens.primary.main
                  : darkThemeTokens.primary.main,
              borderRadius: '2px 2px 2px 2px',
              opacity: '0',
              transition: '0.15s opacity',
            },*/
            paddingLeft: '25px',
            '& > div:first-of-type': {
              minWidth: '46px',
            },
            opacity: '0.35',
            transition: '0.25s opacity',
          },

          disableRipple: true,
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
