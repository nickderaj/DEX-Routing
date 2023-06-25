import { fetchPools, fetchSymbols, fetchTokens } from '@/api/dex.api';
import { useQueries } from '@tanstack/react-query';
import { useState } from 'react';
import { Button, Modal } from 'ui';
import PrimaryLayout from '../components/Layout/PrimaryLayout';
import { PageWithLayout } from './page';

const Home: PageWithLayout = () => {
  const results = useQueries({
    queries: [
      { queryKey: ['post', 1], queryFn: fetchTokens, staleTime: Infinity },
      { queryKey: ['post', 2], queryFn: fetchPools, staleTime: Infinity },
      { queryKey: ['post', 3], queryFn: fetchSymbols, staleTime: Infinity },
    ],
  });
  const tokens = useState<string[]>(results[0].data.tokens || []);
  const pools = useState<string[]>(results[1].data.pools || []);
  const symbols = useState<string[]>(results[2].data.symbols || []);
  console.log('tokens: ', tokens);
  console.log('pools: ', pools);
  console.log('symbols: ', symbols);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <main className="mx-auto w-auto px-4 pt-16 pb-8 sm:pt-24 lg:px-8 flex flex-col min-h-screen items-center justify-center bg-zinc-900">
        <h1 className="mx-auto text-center text-6xl font-extrabold tracking-tight text-white sm:text-7xl lg:text-8xl xl:text-8xl">
          DEX
          <span className="block bg-gradient-to-r from-primary to-neutral-500 bg-clip-text text-transparent px-2">
            Routing Assignment
          </span>
        </h1>
        <div className="mx-auto mt-5 max-w-xl sm:flex sm:justify-center md:mt-8 scale-150">
          <Button onClick={toggleModal}>Click me</Button>
        </div>
      </main>
      <Modal title="Sample Modal" onClose={toggleModal} isOpen={isOpen}>
        <div className="w-full flex justify-center items-center mb-4">
          <Button onClick={toggleModal}>Close</Button>
        </div>
      </Modal>
    </>
  );
};

Home.getLayout = (page: React.ReactNode) => <PrimaryLayout title="Home Page">{page}</PrimaryLayout>;
export default Home;
