import { config } from "dotenv";
config();


// client/api/player-api.js

const BASE_URL = Proc;

/**
 * Fetch the full list of players (for leaderboard).
 */
export async function getPlayers() {
  const res = await fetch(BASE_URL);
  if (!res.ok) {
    throw new Error(`Error fetching players: ${res.statusText}`);
  }
  return await res.json();
}

/**
 * Add a new player with no recorded time yet.
 * @param {string} name – player's name
 */
export async function addPlayer(name) {
  const res = await fetch(`${BASE_URL}/addPlayer`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name })
  });
  if (!res.ok) {
    throw new Error(`Error adding player: ${res.statusText}`);
  }
  return await res.json();
}

/**
 * Update an existing player's best time if beaten.
 * @param {{ id: number, lowestTime: number }} params
 */
export async function updatePlayerTime({ id, lowestTime }) {
  const res = await fetch(`${BASE_URL}/updatePlayer`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, lowestTime })
  });
  if (!res.ok) {
    throw new Error(`Error updating player time: ${res.statusText}`);
  }
  return await res.json();
}
