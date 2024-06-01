'use client';
import { LandingPage } from '@/types/users';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const PreviewLandingPage = () => {
  const [landingPage, setLandingPage] = useState<LandingPage>();
  const router = useRouter();
  const { id } = useParams();

  useEffect(() => {
    const landingPage = localStorage.getItem('preview');
    if(!landingPage) router.push("/dashboard");
    else {
      setLandingPage(JSON.parse(landingPage));
    }
  }, [id]);

  const logout = () => {
    localStorage.setItem('auth', '');
    router.push('/login');
  };


  if (landingPage)
    return (
     <div className='h-screen flex flex-col'>
      <header className='bg-yellow-100 basis-1/10 flex justify-between border-b border-black p-1'>
        <Link
          href={`/edit/${landingPage.id}`}
          className='border border-black rounded bg-green-500 m-1 px-2 py-1 '
        >
          <button type='button'>Edit Page</button>
        </Link>
        <button
          onClick={logout}
          type='button'
          className='border border-black rounded bg-red-500 m-1 px-2 py-1 '
        >
          Logout
        </button>
      </header>
      <main className='basis-2/3 flex justify-center items-center'>
        <article className='bg-slate-300 w-2/3 border border-black rounded p-8'>
        <p>Title:{landingPage.title}</p>
        <p>Description:{landingPage.description}</p>
        </article>
      </main>
      </div>
    );
  return <p>loading</p>;
};

export default PreviewLandingPage;
