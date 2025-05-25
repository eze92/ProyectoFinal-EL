import React from 'react';

const BannerPokemon = () => (
    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
        <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Pok%C3%A9mon_Trading_Card_Game_logo.svg/312px-Pok%C3%A9mon_Trading_Card_Game_logo.svg.png?20141222060945"
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