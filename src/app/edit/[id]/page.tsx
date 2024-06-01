'use client';
import { LandingPage } from '@/types/users';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { FormEventHandler, useEffect, useState } from 'react';

const EditLandingPage = () => {
  const [landingPage, setLandingPage] = useState<LandingPage>();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const router = useRouter();
  const { id } = useParams();

  useEffect(() => {
    const allLPJSON = localStorage.getItem('LP');
    if (!allLPJSON) router.push('/dashboard');
    else {
      const allLP: Array<LandingPage> = JSON.parse(allLPJSON);
      const requiredLandingPage = allLP.find((lp) => lp.id === id);
      if(requiredLandingPage) {
        const ownerId = localStorage.getItem("auth");
        if(requiredLandingPage.ownerId !== ownerId) router.replace("/dashboard");
        setLandingPage(requiredLandingPage);
        setTitle(requiredLandingPage.title);
        setDescription(requiredLandingPage.description)
      }
    }
  }, [id]);

  const handleLandingPageEdit:FormEventHandler = (e) => {
    e.preventDefault();
    const allLPJSON = localStorage.getItem('LP');
    if (!allLPJSON) router.push('/dashboard');
    else {
      const allLP: Array<LandingPage> = JSON.parse(allLPJSON);
        const requiredLandingPage = allLP.find((lp) => lp.id === id);
        if(requiredLandingPage && landingPage) {
          const filterdLandingPageList = allLP.filter(lp=>lp.id !== id);
          const editedLandingPage:LandingPage = {...landingPage, title, description};
          const newLandingPageList = [...filterdLandingPageList,editedLandingPage];
          localStorage.setItem("LP", JSON.stringify(newLandingPageList));
          setLandingPage(undefined);
          setTitle('');
          setDescription('');
          router.push('/dashboard');
        }
    }
  }

  const logout = () => {
    localStorage.setItem('auth', '');
    router.push('/login');
  };

  const handlePreview = () => {
    const previewPage = {...landingPage, title, description};
    localStorage.setItem('preview', JSON.stringify(previewPage));
    window.open(`/preview/${landingPage?.id}`)
  }

  if (landingPage)
    return (
      <div className='h-screen flex flex-col'>
      <header className='bg-yellow-100 h-12 flex justify-between border-b border-black p-1'>
        <Link
          href={'/dashboard'}
          className='border border-black rounded bg-green-500 m-1 px-2 py-1 '
        >
          <button type='button'>Dasboard</button>
        </Link>
        <button
          onClick={logout}
          type='button'
          className='border border-black rounded bg-red-500 m-1 px-2 py-1 '
        >
          Logout
        </button>
      </header>
      <form
        onSubmit={handleLandingPageEdit}
        className='flex h-1/2 justify-center items-center'
      >
        <div className='flex flex-col bg-slate-200 flex flex-col justify-between items-center border border-black rounded p-8'>
          <div className='flex justify-between w-full m-4'>
            <label>Title:</label>
            <input
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className='border border-black rounded ml-2'
            />
          </div>
          <div className='flex justify-between w-full m-4'>
            <label>Description:</label>
            <input
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className='border border-black rounded ml-2'
            />
          </div>
          <div className='flex justify-between w-full'>
          <button
            type='submit'
            className='border border-black bg-green-500 mt-4 rounded px-2 py-1'
          >
            Publish
          </button>
          <button
            type='button'
            className='border border-black bg-green-500 mt-4 rounded px-2 py-1'
            onClick={handlePreview}
          >
            Preview
          </button>
          </div>
        </div>
      </form>
    </div>
    );
  return <p>loading</p>;
};

export default EditLandingPage;
