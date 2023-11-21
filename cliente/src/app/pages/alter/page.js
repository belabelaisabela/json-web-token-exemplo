'use client'
import 'react-toastify/dist/ReactToastify.min.css';
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from 'react-toastify';
import styles from './style3.css'


export default function Alter() {
  const [user, setUser] = useState({
    name: '', email: '', password: ''
  });

  const { push, refresh } = useRouter();

  const handlerFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await postUser(user);
      push('/pages/dashboard');
    } catch {
      return toast.error('Error');
  }

  const success = true;
   if (success) {
      toast.success('Usuário cadastrado com sucesso!');
    } else {
      toast.error('Ocorreu um erro ao cadastrar o usuário.');
    }
  };
 
    return (
    <body>
    <div>
    <nav id="menu-h">
        <ul>
            <li><Link href={"/pages/dashboard"}>Home</Link></li>
            <li><Link href={"/pages/register"}>Register</Link></li>
            <li><Link href={"/pages/alter"}>Alter</Link></li>
        </ul>
    </nav>
    <div className="box-formulario">
    <div className="alter">
       
      <form onSubmit={handlerFormSubmit}>
      <h3>ALTERAR</h3>
      <hr></hr>
        <p>Name:</p>
        <input className="inpu"
          placeholder='Name'
          type='name'>
        </input>
        <p>E-mail:</p>
        <input className="inpu"
          placeholder='E-mail'
          type='email'>
        </input>
        <p>Password:</p>
        <input className="inpu"
          placeholder='Password'
          type='password'>
        </input>
        <button className="botao rotacao">Alter</button>
      </form>
      <ToastContainer />
      </div>
    </div>
    </div>
    </body>
    );
};