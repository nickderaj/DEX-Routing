import type { AppProps } from 'next/app';
import '../styles/globals.css';
import { PageWithLayout } from './page';

interface AppPropsWithLayout extends AppProps {
  Component: PageWithLayout;
}

const App: React.FC<AppPropsWithLayout> = ({ Component, pageProps }) => {
  const getLayout = Component.getLayout ?? ((page) => page);
  return <>{getLayout(<Component {...pageProps} />)}</>;
};

export default App;
