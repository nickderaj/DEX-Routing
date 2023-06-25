import { fetchTokens } from '@/api/dex.api';
import BestPoolModal from '@/components/Modals/BestPoolModal';
import { useQueries } from '@tanstack/react-query';
import { useState } from 'react';
import { Button, SearchBar } from 'ui';
import PrimaryLayout from '../components/Layout/PrimaryLayout';
import { PageWithLayout } from './page';

const Home: PageWithLayout = () => {
  const [search, setSearch] = useState<string>('');
  const [selected, setSelected] = useState<string>('');
  const results = useQueries({
    queries: [
      { queryKey: ['post', 1], queryFn: fetchTokens, staleTime: Infinity },
      // { queryKey: ['post', 2], queryFn: fetchPools, staleTime: Infinity },
      // { queryKey: ['post', 3], queryFn: fetchSymbols, staleTime: Infinity },
    ],
  });
  const tokens = results[0]?.data?.tokens || [];

  const handleClick = (token: string) => {
    setSelected(token);
  };

  return (
    <>
      <main className="mx-auto w-auto px-4 pt-16 pb-8 sm:pt-24 lg:px-8 flex flex-col min-h-screen items-center justify-center bg-slate-900">
        <h1 className="mx-auto text-center text-6xl font-extrabold tracking-tight text-white sm:text-7xl lg:text-8xl xl:text-8xl">
          DEX
          <span className="block bg-gradient-to-r from-primary to-neutral-500 bg-clip-text text-transparent px-2">Router</span>
        </h1>
        <div className="mt-6 w-full px-6 sm:w-8/12 md:w-6/12">
          <SearchBar value={search} setValue={setSearch} />
        </div>
        <div className="flex flex-wrap w-9/12 sm:w-6/12 md:w-4/12 justify-center items-center gap-2 my-6 auto-cols-auto">
          {tokens
            .filter((t) => {
              if (!search) return true;
              return t.includes(search);
            })
            .map((token) => (
              <Button key={token} onClick={() => handleClick(token)}>
                {token}
              </Button>
            ))}
        </div>
      </main>
      {!!selected && (
        <BestPoolModal token={selected} onClose={() => setSelected('')} tokens={tokens.filter((t) => t !== selected)} />
      )}
    </>
  );
};

Home.getLayout = (page: React.ReactNode) => <PrimaryLayout title="Home Page">{page}</PrimaryLayout>;
export default Home;
