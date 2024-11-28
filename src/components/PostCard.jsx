import React from 'react';
import { Card, CardHeader } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import './SelectableCard.css';


const PostCard = ({ post, removePost, isSelected, onSelect }) => {
    const { id, title, body } = post
    const handleRemovePost = (event) => {
        event.stopPropagation();
        removePost(id);
    };

    const handleCardClick = () => {
        onSelect(id);
    };
    return (
        <Card
            className={`card ${isSelected ? 'selected' : ''}`}
            onClick={handleCardClick}
            sx={{ minHeight: 400 }}>
            <CardHeader
                title={title}
                subheader={body}
                action={
                    <IconButton onClick={handleRemovePost}>
                        <CloseIcon />
                    </IconButton>
                }
            />
        </Card>
    );
};

export default PostCard;
