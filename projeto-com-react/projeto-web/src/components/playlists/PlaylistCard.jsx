import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardActionArea, CardMedia, CardContent, Typography } from '@mui/material';
import vacateste from '../../assets/img/vacateste.jpg'; // Importa a imagem

function PlaylistCard({ playlist }) {
  return (
    <Card sx={{ 
      backgroundColor: 'background.paper',
      width: '100%' // Define a largura para 100% para que o card se expanda e se ajuste ao grid item
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