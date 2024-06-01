'use client';
import { LandingPage } from '@/types/users';
import { nanoid } from 'nanoid';
import Link from 'next/link';
import { redirect, useRouter } from 'next/navigation';
import { FormEventHandler, useEffect, useState } from 'react';

const CreateLandingPage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const router = useRouter();

  useEffect(() => {
    const userId = localStorage.getItem('auth');
    if (!userId) redirect('/login');
  }, []);

  const handleLandingPageSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    const ownerId = localStorage.getItem('auth')!;
    const lpObj: LandingPage = {
      title,
      description,
      ownerId,
      id: nanoid(),
      views: 0,
    };
    const landingPages = localStorage.getItem('LP') ?? '';
    let LPArr: Array<LandingPage>;
    if (landingPages.length) LPArr = JSON.parse(landingPages);
    else LPArr = [];
    const allLP = [...LPArr, lpObj];

    const stringifiedAllLP = JSON.stringify(allLP);
    localStorage.setItem('LP', stringifiedAllLP);
    setTitle('');
    setDescription('');
    router.push('/dashboard');
  };

  const logout = () => {
    localStorage.setItem('auth', '');
    router.push('/login');
  };

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
        onSubmit={handleLandingPageSubmit}
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
          <button
            type='submit'
            className='border border-black bg-green-500 mt-4 rounded px-2 py-1'
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateLandingPage;
