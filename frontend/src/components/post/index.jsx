import React from 'react';
import styled from 'styled-components';

import PostMenu from './menu';
import PostHeader from './header';
import PostBody from './body';
import PostTags from './tags';

const Post = ({ user, post }) => {
  const { id, title, content, createdAt, updatedAt, tags, totalScore } = post;
  return (
    <PostWrapper>
      <PostMenu postId={id} totalScore={totalScore} />
      <PostContent>
        <PostHeader user={user} createdAt={createdAt} updatedAt={updatedAt} />
        <PostBody title={title} content={content} />
        <PostTags tags={tags} />
      </PostContent>
    </PostWrapper>
  );
};

export default Post;

const PostWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  & > * {
    background-color: var(--bg-post);
    box-shadow: 0px 0px 4px #000;
  }
  & > :first-child {
    margin-right: 10px;
  }
`;

const PostContent = styled.div`
  width: 600px;
  padding: 30px;
`;
