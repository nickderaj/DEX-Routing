import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { AppProps } from 'next/app';
import '../styles/globals.css';
import { PageWithLayout } from './page';

interface AppPropsWithLayout extends AppProps {
  Component: PageWithLayout;
}

const queryClient = new QueryClient();

const App: React.FC<AppPropsWithLayout> = ({ Component, pageProps }) => {
  const getLayout = Component.getLayout ?? ((page) => page);
  return <QueryClientProvider client={queryClient}>{getLayout(<Component {...pageProps} />)}</QueryClientProvider>;
};

export default App;
