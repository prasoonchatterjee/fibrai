'use client';
import { FormEventHandler, useState } from 'react';
import {nanoid} from 'nanoid';
import { User } from '@/types/users';
import { useRouter } from 'next/navigation';

const SignUpPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
 
  const handleSignUp:FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const userObj:User = {username, password, id: nanoid()};
    const allUsers:Array<User> = JSON.parse(localStorage.getItem('users') || '');
    let newAllUsers = []
    if(allUsers?.length) newAllUsers = [...allUsers,userObj];
    else newAllUsers = [userObj];

    const jsonStringObj = JSON.stringify(newAllUsers);
    localStorage.setItem("users",jsonStringObj);
    setUsername('');
    setPassword('');
    router.push('/login');
  }
  
  return (
    <form
      onSubmit={handleSignUp}
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
          Sign Up
        </button>
      </div>
    </form>
  );
};

export default SignUpPage;
