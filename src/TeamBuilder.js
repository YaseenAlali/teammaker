import React, { useState, useEffect, useRef } from 'react';

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function calculateWeight(tier, rating, numTiers = 4, numRatings = 4, weightPerTier = 20, weightPerRating = 5) {
    const tierWeight = numTiers + 1 - tier;
    const ratingWeight = numRatings + 1 - rating;
    return tierWeight * weightPerTier + ratingWeight * weightPerRating;
}

const teamColors = ['green', 'black', 'blue', 'purple', '#FF69B4', 'violet', 'orange', 'gray'];

function TeamBuilder({ players, teamSize = 4, toggleShowPlayerList, ShowPlayerList }) {
    const [teams, setTeams] = useState([]);
    const [isBuildingTeams, setIsBuildingTeams] = useState(false);
    const [timeoutValue, setTimeoutValue] = useState(500);
    const [selectedPlayers, setSelectedPlayers] = useState([]);
    const [IsPaused, SetIsPaused] = useState(false);
    const cba = useRef(false);
    const intervalRef = useRef();

    useEffect(() => {
        cba.current = IsPaused;
    }, [IsPaused]);

    useEffect(() => {
        const updatedTeams = teams.map(team => {
            const updatedTeamPlayers = team.team.map(playerInTeam => {
                const updatedPlayer = players.find(p => p.name === playerInTeam.name);
                return updatedPlayer
                    ? {
                        ...playerInTeam,
                        tier: updatedPlayer.tier,
                        rating: updatedPlayer.rating,
                        weight: calculateWeight(updatedPlayer.tier, updatedPlayer.rating)
                    }
                    : playerInTeam;
            });

            const updatedTeamWeight = updatedTeamPlayers.reduce((sum, player) => sum + player.weight, 0);

            return {
                ...team,
                team: updatedTeamPlayers,
                weight: updatedTeamWeight,
            };
        });

        setTeams(updatedTeams);
    }, [players, calculateWeight]);

    const startTeamBuilding = () => {
        setTeams([]);
        setIsBuildingTeams(true);
        setSelectedPlayers([]);
    };
    const buildTeams = () => {
        let playersCopy = players.map(player => ({
            ...player,
            weight: calculateWeight(player.tier, player.rating)
        }));
        shuffle(playersCopy);

        const numTeams = Math.ceil(playersCopy.length / teamSize);
        const initialTeams = Array.from({ length: numTeams }, () => ({ team: [], weight: 0 }));

        playersCopy.sort((a, b) => b.weight - a.weight);

        let playerIndex = 0;

        const addPlayerToTeams = () => {
            if (playerIndex >= playersCopy.length) {
                clearInterval(intervalRef.current);
                setIsBuildingTeams(false);
                return;
            }

            if (!cba.current) {
                let bestTeam = initialTeams
                    .filter(team => team.team.length < teamSize)
                    .reduce((lowest, team) => (team.weight < lowest.weight ? team : lowest));

                bestTeam.team.push(playersCopy[playerIndex]);
                bestTeam.weight += playersCopy[playerIndex].weight;
                playerIndex++;

                setTeams([...initialTeams]);
            }
        };

        intervalRef.current = setInterval(addPlayerToTeams, timeoutValue);
    };

    useEffect(() => {
        if (isBuildingTeams) {
            buildTeams();
        }
    }, [isBuildingTeams]);

    const handlePlayerClick = (teamIndex, playerIndex) => {
        if (selectedPlayers.length === 1 && selectedPlayers[0].teamIndex === teamIndex && selectedPlayers[0].playerIndex === playerIndex) {
            setSelectedPlayers([]);
            return;
        }

        const newSelection = { teamIndex, playerIndex };
        setSelectedPlayers([...selectedPlayers, newSelection]);

        if (selectedPlayers.length === 1) {
            swapPlayers(selectedPlayers[0], newSelection);
            setSelectedPlayers([]);
        }
    };

    const togglePause = () => {
        SetIsPaused(!IsPaused)
    }

    const swapPlayers = (firstSelection, secondSelection) => {
        const newTeams = [...teams];

        const teamA = newTeams[firstSelection.teamIndex];
        const teamB = newTeams[secondSelection.teamIndex];

        const playerA = teamA.team[firstSelection.playerIndex];
        const playerB = teamB.team[secondSelection.playerIndex];

        teamA.team[firstSelection.playerIndex] = playerB;
        teamB.team[secondSelection.playerIndex] = playerA;

        teamA.weight = teamA.team.reduce((total, player) => total + player.weight, 0);
        teamB.weight = teamB.team.reduce((total, player) => total + player.weight, 0);

        setTeams(newTeams);
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h1>Team Builder</h1>
            <label>
                Timeout Value (ms):
                <input
                    type="number"
                    value={timeoutValue}
                    onChange={(e) => setTimeoutValue(Number(e.target.value))}
                    style={{ margin: '0 10px', padding: '5px' }}
                />
            </label>
            <div style={{ marginTop: '10px' }}>
                <button onClick={startTeamBuilding} disabled={isBuildingTeams} style={{ padding: '10px 15px', marginRight: '10px' }}>
                    {isBuildingTeams ? 'Building Teams...' : 'Start Team Building'}
                </button>
                <button onClick={togglePause} disabled={!isBuildingTeams} style={{ padding: '10px 15px', marginRight: '10px' }}>
                    {IsPaused ? 'Resume' : 'Pause'}
                </button>
                <button onClick={toggleShowPlayerList} style={{ padding: '10px 15px', marginRight: '10px' }}>
                    {ShowPlayerList ? 'Hide player list' : 'Show player list'}
                </button>
            </div>

            <div className="teams" style={{ display: 'flex', gap: '20px', marginTop: '20px', flexWrap: 'wrap' }}>
                {teams.map((team, index) => {
                    const maxWeight = Math.max(...team.team.map(player => player.weight));

                    return (
                        <div
                            key={index}
                            className="team"
                            style={{
                                border: `3px solid ${teamColors[index % teamColors.length]}`,
                                padding: '10px',
                                borderRadius: '8px',
                                width: '200px',
                                backgroundColor: '#f9f9f9',
                                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)'
                            }}
                        >
                            <h3 style={{ color: teamColors[index % teamColors.length] }}>Team {index + 1}</h3>
                            <ul style={{ padding: '0', listStyle: 'none' }}>
                                {team.team.map((player, i) => {
                                    const isSelected = selectedPlayers.some(selection =>
                                        selection.teamIndex === index && selection.playerIndex === i
                                    );
                                    return (
                                        <li
                                            key={i}
                                            onClick={() => handlePlayerClick(index, i)}
                                            style={{
                                                fontWeight: player.weight === maxWeight ? 'bold' : 'normal',
                                                color: player.weight === maxWeight ? teamColors[index % teamColors.length] : '#333',
                                                padding: '5px 0',
                                                cursor: 'pointer',
                                                backgroundColor: isSelected ? 'rgba(255, 215, 0, 0.3)' : 'transparent'
                                            }}
                                        >
                                            {player.name} (Weight: {player.weight})
                                        </li>
                                    );
                                })}
                            </ul>
                            <p style={{ fontWeight: 'bold', marginTop: '10px' }}>Total Weight: {team.weight}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default TeamBuilder;