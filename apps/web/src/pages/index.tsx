import { useState } from 'react';
import { Button, Modal } from 'ui';
import PrimaryLayout from '../components/Layout/PrimaryLayout';
import { PageWithLayout } from './page';

const Home: PageWithLayout = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <main className="mx-auto w-auto px-4 pt-16 pb-8 sm:pt-24 lg:px-8 flex flex-col min-h-screen items-center justify-center bg-zinc-900">
        <h1 className="mx-auto text-center text-6xl font-extrabold tracking-tight text-white sm:text-7xl lg:text-8xl xl:text-8xl">
          Nextjs
          <span className="block bg-gradient-to-r from-primary to-neutral-500 bg-clip-text text-transparent px-2">
            Frontend Example
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
