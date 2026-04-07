import { createTheme } from '@mui/material/styles';
import { responsiveFontSizes } from "@mui/material/styles";


let theme = createTheme({
  cssVariables: true,
  
  palette: {
    mode: 'dark',
    
  },

  typography: {
    fontSize: 13,
    subtitle1: {
      fontWeight: 'bold', 
    },
  },

  components: {
   
  }



})

theme = responsiveFontSizes(theme);

export default theme;