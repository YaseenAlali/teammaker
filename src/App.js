import logo from './logo.svg';
import './App.css';
import TeamBuilder from './TeamBuilder';
import PlayerManager from './PlayerManager';
import { useState } from 'react';
function App() {
  const [players, setPlayers] = useState([
    { name: '18-Mattysmirks', tier: 1, rating: 1 },
    { name: '6-Ghostboy', tier: 1, rating: 1 },
    { name: '5-Cow', tier: 1, rating: 2 },
    { name: '21-B@rking', tier: 1, rating: 2 },
    { name: '3-Kazjon', tier: 1, rating: 3 },
    { name: '14-DreadReapr', tier: 1, rating: 3 },
    { name: '19-Yu$ufNi$iç', tier: 1, rating: 3 },
    { name: '16-Eternal', tier: 2, rating: 1 },
    { name: '15-Poero', tier: 2, rating: 1 },
    { name: '20-YAGUARTE', tier: 2, rating: 1 },
    { name: "2-Empyre'", tier: 2, rating: 1 },
    { name: '32-wowowowow', tier: 2, rating: 1 },
    { name: '25-The king', tier: 2, rating: 3 },
    { name: '12-Crazy Old Man', tier: 2, rating: 3 },
    { name: '26-PBR', tier: 2, rating: 4 },
    { name: '17-Kyagara', tier: 3, rating: 1 },
    { name: '30-Jornev', tier: 3, rating: 2 },
    { name: '24-Tehboohb', tier: 3, rating: 2 },
    { name: '8-Orgueil', tier: 3, rating: 2 },
    { name: '27-Gimli', tier: 3, rating: 2 },
    { name: '1-B@lin', tier: 3, rating: 4 },
    { name: '10-Mag', tier: 3, rating: 4 },
    { name: '13-Stevil', tier: 3, rating: 4 },
    { name: '29-Dragonassassin', tier: 3, rating: 4 },
    { name: '28-o4i', tier: 3, rating: 4 },
    { name: '7-Gimli Kardashian', tier: 3, rating: 4 },
    { name: '9-Ajax', tier: 4, rating: 1 },
    { name: '4-Marabou', tier: 4, rating: 2 },
    { name: '11-deHAA', tier: 4, rating: 3 },
    { name: '22-Herekope', tier: 4, rating: 3 },
    { name: '23-Kotov', tier: 4, rating: 4 },
    { name: '31-Z arc?', tier: 4, rating: 4 },
  ]);
  const [ShowPlayerList, SetShowPlayerList] = useState(false)

  const toggleShowPlayerList = () => SetShowPlayerList(!ShowPlayerList);

  const addPlayer = (newPlayer) => setPlayers([...players, newPlayer]);

  const updatePlayer = (index, updatedPlayer) => {
    const updatedPlayers = [...players];
    updatedPlayers[index] = updatedPlayer;
    setPlayers(updatedPlayers);
  };

  const removePlayer = (index) => setPlayers(players.filter((_, i) => i !== index));

  return (
    <div>
      <TeamBuilder players={players} ShowPlayerList={ShowPlayerList} toggleShowPlayerList={toggleShowPlayerList} />

      {ShowPlayerList &&
        <PlayerManager
          players={players}
          onAddPlayer={addPlayer}
          onUpdatePlayer={updatePlayer}
          onRemovePlayer={removePlayer}
        />
      }
    </div>
  );
}

export default App;
