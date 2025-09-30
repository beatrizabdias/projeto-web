import React from 'react';
import ArtistHeader from '../../components/ArtistHeader.jsx';
import ArtistMaisTocadas from '../../components/ArtistMaisTocadas.jsx';
import Song from '../../components/Song.jsx';
import './artist.css';  
import ArtistParecidos from '../../components/ArtistParecidos';

export default function ArtistPage() {
    return (
        <main>
            <ArtistHeader />
            <ArtistMaisTocadas />
            <Song />
            <Song />
            <Song />
            <Song />
            <Song />
            <Song />
         

        </main>
    );
}