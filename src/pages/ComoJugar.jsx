import React from 'react';
import { Card, Container } from 'react-bootstrap';

function ComoJugar() {
  return (
    <div
      className="container"
      style={{
        background: '#f5f7fa',
        borderRadius: '12px',
        padding: '2rem',
        minHeight: '80vh',
        marginTop: '2rem',
        marginBottom: '2rem'
      }}
    >
      <Card
        style={{
          borderRadius: 16,
          boxShadow: '0 4px 24px rgba(0,0,0,0.10)',
          backgroundColor: '#fff',
          padding: '2rem',
          maxWidth: 900,
          margin: '0 auto'
        }}
      >
        <Card.Body>
          <h2 className="text-center mb-4">¿Cómo jugar al Pokémon TCG?</h2>
          <p>
            El juego de cartas coleccionables Pokémon (Pokémon TCG) es un divertido juego de estrategia donde dos jugadores se enfrentan usando mazos de cartas Pokémon, Energía y Entrenador.
          </p>
          <h4 className="mt-4">Objetivo del juego</h4>
          <p>
            El objetivo es ser el primero en tomar todas tus cartas de premio, derrotando a los Pokémon del rival.
          </p>
          <h4 className="mt-4">¿Qué necesitas?</h4>
          <ul>
            <li>Un mazo de 60 cartas (Pokémon, Energía y Entrenador)</li>
            <li>Marcadores de daño</li>
            <li>Moneda para lanzar</li>
            <li>Cartas de premio (6 por jugador)</li>
          </ul>
          <h4 className="mt-4">Preparación</h4>
          <ol>
            <li>Baraja tu mazo y roba 7 cartas.</li>
            <li>Coloca un Pokémon Básico como tu Pokémon Activo y hasta 5 en la Banca.</li>
            <li>Coloca 6 cartas de tu mazo como cartas de premio, boca abajo.</li>
            <li>Lanza una moneda para ver quién empieza.</li>
          </ol>
          <h4 className="mt-4">Turnos</h4>
          <p>Cada turno se compone de:</p>
          <ul>
            <li>Robar una carta</li>
            <li>Poner Pokémon en la banca</li>
            <li>Unir una carta de Energía</li>
            <li>Evolucionar Pokémon</li>
            <li>Usar habilidades y cartas de Entrenador</li>
            <li>Retirar Pokémon</li>
            <li>Atacar</li>
          </ul>
          <h4 className="mt-4">¿Cómo se gana?</h4>
          <ul>
            <li>Cuando tomas todas tus cartas de premio</li>
            <li>Si el rival no tiene Pokémon en juego</li>
            <li>Si el rival no puede robar carta al inicio de su turno</li>
          </ul>
          
          <p className="mt-4 text-center">
            Para más detalles, visita la <a href="https://cartaspokemon.es/aprende-a-jugar/" target="_blank" rel="noopener noreferrer">guía oficial</a>.
          </p>
        </Card.Body>
      </Card>
    </div>
  );
}

export default ComoJugar;