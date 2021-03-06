import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { AuthService } from '../../services/auth.service';
import GoogleButton from '../google-button';
import GithubButton from '../github-button';
import { LightDivider } from '../styled/divider';
import {
  AuthFormContent,
  AuthInput,
  AuthSignInButton,
  AuthErrorBlock,
} from '../styled/auth';

const LoginForm = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const history = useHistory();

  const handleExternalLogin = (service, code) => {
    AuthService.loginExternal(service, code)
      .then(() => history.push('/'))
      .catch(err => setError(err.message));
  };

  const handleLogin = event => {
    event.preventDefault();
    AuthService.loginLocal(login, password)
      .then(() => history.push('/'))
      .catch(err => setError(err.message));
  };

  return (
    <FormWrapper>
      {error ? (
        <AuthErrorBlock onClick={() => setError('')}>{error}</AuthErrorBlock>
      ) : null}
      <form onSubmit={handleLogin}>
        <AuthFormContent>
          <label htmlFor="login__login">Username or email address</label>
          <AuthInput
            id="login__login"
            name="login"
            type="text"
            required
            maxLength="255"
            value={login}
            onChange={e => setLogin(e.target.value.trim())}
          />
          <label htmlFor="login__password">
            Password
            <Link to="/reset-password" tabIndex="-1">
              Forgot password?
            </Link>
          </label>
          <AuthInput
            id="login__password"
            type="password"
            name="password"
            required
            maxLength="30"
            value={password}
            onChange={e => setPassword(e.target.value.trim())}
          />
          <AuthSignInButton>Sign in</AuthSignInButton>
          <LightDivider>OR</LightDivider>
          <GoogleButton
            buttonText="Sign in with Google"
            onSuccess={res => handleExternalLogin('google', res.code)}
            onFailure={() => setError('Server error')}
          />
          <GithubButton
            buttonText="Sign in with GitHub"
            onSuccess={res => handleExternalLogin('github', res.code)}
            onFailure={() => setError('Server error')}
          />
        </AuthFormContent>
      </form>
    </FormWrapper>
  );
};

export default LoginForm;

const FormWrapper = styled.div`
  width: 320px;
  margin: 0 auto;
  ${AuthErrorBlock} {
    margin-bottom: 25px;
  }
  ${AuthFormContent} {
    padding: 30px;
    border: 1px solid var(--border-light);
  }
  ${LightDivider} {
    margin: 15px 0;
  }
  button:nth-of-type(2) {
    margin-bottom: 15px;
  }
  a {
    float: right;
    color: var(--blue);
  }
`;
