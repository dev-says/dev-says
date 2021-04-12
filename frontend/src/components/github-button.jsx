import React from 'react';
import styled from 'styled-components';
import PopupWindow from '../helpers/popup-window';
import { toQuery } from '../helpers/url-utils';
import { BaseButton } from './styled/base-button';

const GitHubButton = ({ buttonText, onSuccess, onFailure }) => {
  const githubOauth2Url = 'https://github.com/login/oauth/authorize';
  const githubOauth2Params = {
    client_id: process.env.REACT_APP_GITHUB_CLIENT_ID,
    scope: 'user:email',
  };

  const handleClick = event => {
    event.preventDefault();
    const search = toQuery(githubOauth2Params);
    new PopupWindow('github-auth', `${githubOauth2Url}?${search}`)
      .then(response => onSuccess(response))
      .catch(error => onFailure(error));
  };

  return (
    <ButtonBody onClick={handleClick}>
      {buttonText}
      <svg aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
        <path d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"></path>
      </svg>
    </ButtonBody>
  );
};

export default GitHubButton;

const ButtonBody = styled(BaseButton)`
  background-color: #161b22;
  border: 1px solid #3f3f46;
  color: #c9d1d9;
  svg {
    height: 18px;
    margin-left: 10px;
    vertical-align: bottom;
  }
`;