import ReactDOM from 'react-dom/client';
import './index.css';
import './utils/i18n'
import App from './App';
import { Provider } from 'react-redux';
import { store } from './store';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import ErrorBoundary from './errors/ErrorBoundary'



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <CssBaseline />
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </Provider>
  </ThemeProvider>
);

