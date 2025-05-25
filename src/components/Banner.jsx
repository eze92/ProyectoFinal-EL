import React from 'react';
import bannerImg from '../img/Pokémon_Trading_Card_Game_logo.svg.png';

const BannerPokemon = () => (
    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
        <img
            src={bannerImg}
            alt="Banner Pokemon"
            style={{
            width: '100%',
            maxWidth: '250px',
            height: 'auto',
            objectFit: 'contain',
            borderRadius: '12px',
            boxShadow: '0 4px 16px rgba(0,0,0,0.10)'
            }}
        />
    </div>
);

export default BannerPokemon;