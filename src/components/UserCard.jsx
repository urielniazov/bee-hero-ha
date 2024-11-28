import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, Typography, Avatar, CardActions, Button } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { red } from '@mui/material/colors';
import CloseIcon from '@mui/icons-material/Close';
import './SelectableCard.css';

const UserCard = ({ user, removeUser, isSelected, onSelect }) => {
    const navigate = useNavigate();
    const { id, name, username, email, company: { name: companyName }, address: { geo: { lat, lng } } } = user;
    const getInitials = (fullName) => {
        const nameParts = fullName.split(' ');
        const initials = nameParts
            .map(part => part[0].toUpperCase())
            .join('');

        return initials;
    };

    const initials = getInitials(name);

    const handleRemoveUser = (event) => {
        event.stopPropagation();
        removeUser(id);
    };

    const handleCardClick = () => {
        onSelect(id);
    };

    const handleCoordinatesClick = (e) => {
        e.stopPropagation();
        const data = { lng, lat };
        navigate("/map", { state: data });
    };
    return (
        <Card
            className={`card ${isSelected ? 'selected' : ''}`}
            onClick={handleCardClick}
        >
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }}>
                        {initials}
                    </Avatar>
                }
                action={
                    <IconButton onClick={handleRemoveUser}>
                        <CloseIcon />
                    </IconButton>
                }
                title={`${name} (${username})`}
                subheader={email}
            />
            <CardContent>
                <Typography variant="subtitle2" gutterBottom sx={{ display: 'block' }}>
                    {companyName}
                </Typography>
            </CardContent>
            <CardActions>
                <Button onClick={handleCoordinatesClick} size="small">{lat},{lng}</Button>
            </CardActions>
        </Card>
    );
};

export default UserCard;
