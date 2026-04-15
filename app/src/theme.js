import { createTheme } from '@mui/material/styles';
import { responsiveFontSizes } from "@mui/material/styles";

export const colors = {
  tealDark: {
    100: '#010607',
    200: '#020b0d',
    300: '#031012',
    400: '#041417',
    500: '#051819', // базовый цвет
    600: '#1f3436',
    700: '#395052',
    800: '#536c6e',
    900: '#6d888a',
  },
  lime: {
    100: '#4a5f00',
    200: '#6e8f00',
    300: '#92bf00',
    400: '#aee62a',
    500: '#c8f63e', // базовый цвет
    600: '#d4f75e',
    700: '#e0f98a',
    800: '#ecfbb5',
    900: '#f7fde0',
  }

}

let theme = createTheme({
  cssVariables: true,

  palette: {
    mode: 'dark',
     error: {
      main: "#ff4f71",
    },

   
    secondary: {
      main: colors.lime[500],
    },

    background: {
      default: colors.tealDark[500],
      paper: colors.tealDark[500],
    },

    primary: {
      main: colors.tealDark[300],
    },

  },

  typography: {
    fontSize: 13,
    subtitle1: {
      fontWeight: 'bold',
    },
  },

  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: colors.tealDark[700],
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        containedSecondary: {
          backgroundColor: colors.lime[500],
          '&:hover': {
            backgroundColor: colors.lime[600],
          },
        },
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: colors.lime[500],
            borderWidth: 2
          }
        }
      }
    },

    MuiInputLabel: {
      styleOverrides: {
        root: {
          "&.Mui-focused": {
            color: colors.lime[500]
          }
        }
      }
    },

    MuiAvatar: {
      styleOverrides: {
        root: {
          backgroundColor: colors.tealDark[300],
          color: colors.lime[500],
        },
      },
    },

  }



})

theme = responsiveFontSizes(theme);

export default theme;