import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Drawer, Container, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2'
import { observer } from 'mobx-react-lite';
import { rootStore } from '../stores/RootStore';
import UserCard from './UserCard';
import PostCard from './PostCard';
import PostEdit from './PostEdit';

const Dashboard = observer(() => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { userStore, postStore } = rootStore;
  const { users, loading, error } = userStore;
  const { posts, loading: postLoading, error: postError } = postStore;

  const [selectedUserId, setSelectedUserId] = useState(searchParams.get('userId'));
  const [selectedPostId, setSelectedPostId] = useState(null);

  useEffect(() => {
    postStore.clearPosts();
    userStore.fetchUsers();
    const userIdInParams = searchParams.get('userId');
    if (userIdInParams) {
      const userId = parseInt(userIdInParams)
      setSelectedUserId(userId);
      postStore.fetchPosts(userId);
    }

  }, []);


  const removeUser = (userId) => {
    userStore.removeUser(userId);
    if (selectedUserId === userId) {
      setSelectedUserId(null);
      postStore.clearPosts();
    }
  };

  const removePost = (postId) => {
    postStore.removePost(postId);
  };

  const handleSelectUser = (userId) => {
    if (selectedUserId === userId) {
      setSelectedUserId(null);
      postStore.clearPosts();
      setSearchParams({ });
    }
    else {
      setSelectedUserId(userId);
      postStore.fetchPosts(userId);
      setSearchParams({ userId });
    }
  };

  const handleSelectPost = (postId) => {
    setSelectedPostId(postId);
  };

  const closePostEdit = () => {
    setSelectedPostId(null);
  };

  const savePost = (postId, updatedData) => {
    postStore.updatePost(postId, updatedData);
  };

  if (loading) {
    return <Typography variant="h6" align="center">Loading...</Typography>;
  }

  if (error) {
    return <Typography variant="h6" color="error" align="center">
      Error: {error}
    </Typography>;
  }

  return (
    <Container sx={{ py: 4 }}>
      <Grid container spacing={4}>
        {users.map(user => (
          <Grid key={user.id} size={4}>
            <UserCard
              user={user}
              removeUser={removeUser}
              onSelect={handleSelectUser}
              isSelected={selectedUserId === user.id} />
          </Grid>
        ))}
      </Grid>

      {selectedUserId && (
        <Container sx={{ mt: 4 }}>
          <Typography variant="h5">{users.find(user => user.id === selectedUserId).username}'s posts</Typography>
          {postLoading ? (
            <Typography variant="body1" align="center">Loading posts...</Typography>
          ) : postError ? (
            <Typography variant="body1" color="error" align="center">Error: {postError}</Typography>
          ) : (
            <Grid container spacing={2}>
              {posts.map(post => (
                <Grid key={post.id} size={4}>
                  <PostCard
                    post={post}
                    removePost={removePost}
                    onSelect={handleSelectPost}
                    isSelected={selectedPostId === post.id} />
                </Grid>
              ))}
            </Grid>
          )}

          <Drawer
            anchor="bottom"
            open={Boolean(selectedPostId)}
            onClose={closePostEdit}
            sx={{ zIndex: 1300 }}
          >
            {selectedPostId && <PostEdit
              post={postStore.getPostById(selectedPostId)}
              onClose={closePostEdit}
              onSave={savePost}
            />}
          </Drawer>
        </Container>
      )}
    </Container>
  );
});

export default Dashboard;
