import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardActionArea, CardMedia, CardContent, Typography } from '@mui/material';
import vacateste from '../../assets/img/vacateste.jpg';

function PlaylistCard({ playlist }) {
  return (
    <Card sx={{ 
      backgroundColor: 'background.paper',
      width: '100%' // Garante que o card preencha o Grid item
      // Removido: maxWidth: 200
    }}>
      <CardActionArea component={Link} to={`/playlists/${playlist.id}`}>
        <CardMedia
          component="img"
          height="140"
          image={playlist.imagem || vacateste}
          alt={playlist.nome}
        />
        <CardContent>
          <Typography gutterBottom variant="body1" component="div" noWrap>
            {playlist.nome}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default PlaylistCard;