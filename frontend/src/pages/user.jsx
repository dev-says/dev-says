import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';

import { UserService } from '../services/users.service';
import UserNotFound from '../components/user/not-found';
import UserInfo from '../components/user/info';
import UserPosts from '../components/user/posts';

const UserPage = () => {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUser = async () => {
    const { user } = await UserService.getByUsername(username);
    setUser(user);
  };

  useEffect(() => {
    fetchUser().then(() => setIsLoading(false));
  }, []);

  return isLoading ? (
    <h1>Loading...</h1>
  ) : !user ? (
    <UserNotFound username={username} />
  ) : (
    <Wrapper>
      <UserInfo user={user} />
      <UserPosts user={user} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  max-width: 700px;
  margin: 0 auto;
  padding: 30px 0;
  & > :first-child {
    margin-bottom: 35px;
  }
`;

export default UserPage;
