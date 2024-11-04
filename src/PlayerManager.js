import React, { useState } from 'react';

function PlayerManager({ players, onAddPlayer, onUpdatePlayer, onRemovePlayer }) {
    const [newPlayer, setNewPlayer] = useState({ name: '', tier: 1, rating: 1 });

    const handleAddPlayer = () => {
        if (newPlayer.name) {
            onAddPlayer(newPlayer);
            setNewPlayer({ name: '', tier: 1, rating: 1 });
        }
    };

    return (
        <div style={{ marginBottom: '20px', padding: '20px', backgroundColor: '#f4f4f8', borderRadius: '8px' }}>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '20px' }}>
                <input
                    type="text"
                    placeholder="New player name"
                    value={newPlayer.name}
                    onChange={(e) => setNewPlayer({ ...newPlayer, name: e.target.value })}
                    style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc', flex: 1 }}
                />
                <input
                    type="number"
                    min="1"
                    max="4"
                    placeholder="Tier"
                    value={newPlayer.tier}
                    onChange={(e) => setNewPlayer({ ...newPlayer, tier: parseInt(e.target.value) })}
                    style={{ width: '60px', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                />
                <input
                    type="number"
                    min="1"
                    max="4"
                    placeholder="Rating"
                    value={newPlayer.rating}
                    onChange={(e) => setNewPlayer({ ...newPlayer, rating: parseInt(e.target.value) })}
                    style={{ width: '60px', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                />
                <button
                    onClick={handleAddPlayer}
                    style={{
                        backgroundColor: '#28a745',
                        color: '#fff',
                        padding: '10px 15px',
                        borderRadius: '4px',
                        border: 'none',
                        cursor: 'pointer',
                    }}
                >
                    Add Player
                </button>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                {players.map((player, index) => (
                    <div
                        key={index}
                        style={{
                            backgroundColor: '#fff',
                            padding: '15px',
                            borderRadius: '8px',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                            borderLeft: `5px solid ${getBorderColor(player.tier)}`,
                            flex: '1 1 200px',
                            maxWidth: '220px',
                        }}
                    >
                        <h3 style={{ margin: '0 0 10px', color: '#333' }}>{player.name}</h3>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <label style={{ color: '#666', fontSize: '0.9em' }}>Tier:</label>
                                <input
                                    type="number"
                                    min="1"
                                    max="4"
                                    value={player.tier}
                                    onChange={(e) => onUpdatePlayer(index, { ...player, tier: parseInt(e.target.value) })}
                                    style={{
                                        width: '50px',
                                        padding: '5px',
                                        borderRadius: '4px',
                                        border: '1px solid #ddd',
                                        marginLeft: '5px',
                                    }}
                                />
                            </div>
                            <div>
                                <label style={{ color: '#666', fontSize: '0.9em' }}>Rating:</label>
                                <input
                                    type="number"
                                    min="1"
                                    max="4"
                                    value={player.rating}
                                    onChange={(e) => onUpdatePlayer(index, { ...player, rating: parseInt(e.target.value) })}
                                    style={{
                                        width: '50px',
                                        padding: '5px',
                                        borderRadius: '4px',
                                        border: '1px solid #ddd',
                                        marginLeft: '5px',
                                    }}
                                />
                            </div>
                        </div>
                        <button
                            onClick={() => onRemovePlayer(index)}
                            style={{
                                marginTop: '10px',
                                width: '100%',
                                backgroundColor: '#dc3545',
                                color: '#fff',
                                padding: '8px',
                                borderRadius: '4px',
                                border: 'none',
                                cursor: 'pointer',
                            }}
                        >
                            Remove
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

function getBorderColor(tier) {
    switch (tier) {
        case 1:
            return '#4CAF50'; 
        case 2:
            return '#2196F3'; 
        case 3:
            return '#FFC107'; 
        case 4:
            return '#FF5722'; 
        default:
            return '#ccc';
    }
}

export default PlayerManager;
