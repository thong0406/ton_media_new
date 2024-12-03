import React, { FormEvent, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from '../../constants';
import  { redirect } from 'react-router-dom'

export default function Login() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const onSubmit = async (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${BACKEND_URL}/login`, {
                username: username,
                password: password
            });
            const { jwtToken } = res.data;
            console.log(res.data);
            if (jwtToken) {
                localStorage.setItem("jwtToken", jwtToken);
                return redirect('/');
            }
            else {

            }
        }
        catch (e) {
            console.log(e);
        }
    }

    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                        Sign in to your account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form onSubmit={onSubmit} className="space-y-6">
                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="username" className="block text-sm/6 font-medium text-gray-900">
                                    Username
                                </label>
                                <div className="text-sm text-red-700">{ usernameError }</div>
                            </div>
                            <div className="mt-2">
                                <input 
                                    id="username" 
                                    name="username" 
                                    value={username} 
                                    type="text" 
                                    required 
                                    autoComplete="current-username" 
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6" 
                                    onChange={(e) => { setUsername(e.target.value); }}
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                                    Password
                                </label>
                                <div className="text-sm text-red-700">{ passwordError }</div>
                            </div>
                            <div className="mt-2">
                                <input 
                                    id="password" 
                                    name="password" 
                                    value={password} 
                                    type="password" 
                                    required 
                                    autoComplete="current-password" 
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6" 
                                    onChange={(e) => { setPassword(e.target.value); }}
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Sign in
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}