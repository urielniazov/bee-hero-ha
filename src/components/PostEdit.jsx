import React, { useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';

const PostEdit = ({ post, onClose, onSave }) => {
    const [title, setTitle] = useState(post.title);
    const [body, setBody] = useState(post.body);
    const [error, setError] = useState('');

    const handleSave = () => {
        if (!title || !body) {
            setError('Both title and body are required.');
            return;
        }
        setError('');
        onSave(post.id, { title, body });
        onClose();
    };

    return (

        <div style={{ padding: 20, width: '100%' }}>
            <Typography variant="h6">Edit Post</Typography>
            <TextField
                label="Title"
                fullWidth
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                sx={{ marginBottom: 2 }}
                required
            />
            <TextField
                label="Body"
                fullWidth
                value={body}
                onChange={(e) => setBody(e.target.value)}
                sx={{ marginBottom: 2 }}
                required
            />
            {error && (
                <Typography variant="body2" color="error" sx={{ marginBottom: 2 }}>
                    {error}
                </Typography>
            )}
            <Button
                variant="contained"
                color="primary"
                onClick={handleSave}
                sx={{ marginRight: 2 }}
            >
                Confirm
            </Button>
            <Button variant="outlined" onClick={onClose}>Cancel</Button>
        </div>
    );
};

export default PostEdit;
