'use client';
import { User } from '@/types/users';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEventHandler, useEffect, useState } from 'react';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const lsAllUsers = localStorage.getItem('users');
    if (lsAllUsers) {
      const allUsers: Array<User> = JSON.parse(lsAllUsers);
      if (allUsers?.length) {
        allUsers.find((user) => {
          if (user.username === username && user.password === password) {
            localStorage.setItem('auth', user.id);
          }
        });
      }
      setUsername('');
      setPassword('');
      router.push('/dashboard');
    }
  };

  useEffect(() => {
    const userId = localStorage.getItem('auth');
    if (userId) router.replace('/dashboard');
  }, []);

  return (
    <div>
      <header>
        <Link href="/signup" className='border border-black rounded px-2 bg-orange-100'>Go To Signup</Link>
      </header>
    <form
      onSubmit={handleLogin}
      className=' h-screen flex justify-center items-center'
    >
      <div className='flex flex-col bg-slate-200 h-1/4 w-1/4 flex flex-col justify-around items-center border border-black rounded p-8'>
        <div className=''>
          <label>Username:</label>
          <input
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className='border border-black rounded ml-2'
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type='password'
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='border border-black rounded ml-2'
          />
        </div>
        <button
          type='submit'
          className='border border-black bg-green-300 mt-4 rounded px-2 py-1'
        >
          Log In
        </button>
      </div>
    </form>
    </div>
  );
};

export default LoginPage;
