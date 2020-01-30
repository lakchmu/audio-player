import { useState, FormEvent } from 'react';
import fetch from 'isomorphic-unfetch';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { inject, observer } from 'mobx-react';

import Input from '../components/input';
import Email from '../public/images/email.svg';
import Password from '../public/images/password.svg';
import { StoreInterface } from '../store';

import '../styles/styles.sass';

interface SignInProps { store?: StoreInterface }

const SignIn: NextPage<SignInProps> = inject('store')(observer(({ store }) => {
  const [state, setState] = useState({ email: '', password: '' });
  const router = useRouter();

  const onSubmit = async (event: FormEvent<HTMLInputElement>): Promise<void> => {
    event.preventDefault();

    const data = await fetch('http://localhost:3000/api/login', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(state),
    });

    const user = await data.json();

    store.setCurrentUser(user);

    if (user) router.push('/');
  };

  const handleEmailChange = (value: string): void => {
    setState({ ...state, email: value });
  };

  const handlePasswordChange = (value: string): void => {
    setState({ ...state, password: value });
  };

  return (
    <div className="login-page has-background-primary">
      <form className="login-form">
        <div className="title is-1">Sign in</div>
        <Input type="email" icon={Email} placeholder="email" value={state.email} onChange={handleEmailChange} />
        <Input type="password" icon={Password} placeholder="password" value={state.password} onChange={handlePasswordChange} />
        <Input type="submit" value="Sign in" onClick={onSubmit} />
      </form>
    </div>
  );
}));

export default SignIn;
