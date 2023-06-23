import Head from 'next/head';

type Props = {
  title: string;
  description?: string;
  children: React.ReactNode;
};

const PrimaryLayout: React.FC<Props> = ({ title, description, children }) => {
  const defaultDescription = 'Nextjs Frontend Example';

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property="og:title" content={title} />
        <meta name="description" content={description || defaultDescription} key="desc" />
        <meta property="og:description" content={description || defaultDescription} />
        <meta property="og:image" content={'/favicon.ico'} />
      </Head>

      {/* Navbar here */}
      <main>{children}</main>
      <div className="m-auto" />
      {/* Footer here */}
    </>
  );
};

export default PrimaryLayout;
