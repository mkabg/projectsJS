// client/api/player-api.js

import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// __dirname workaround for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from the client folder
dotenv.config({ path: path.resolve(__dirname, "../.env") });

// Read the PLAYERS_URL environment variable
const PLAYERS_URL = process.env.PLAYERS_URL;
if (!PLAYERS_URL) {
  throw new Error("PLAYERS_URL is not defined in .env");
}

/**
 * Fetch the list of all players.
 * @returns {Promise<Array>} Array of player objects.
 */
export async function getPlayers() {
  const res = await fetch(PLAYERS_URL, { method: "GET" });
  if (!res.ok) {
    throw new Error(`Error fetching players: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

/**
 * Fetch the leaderboard sorted by best_time.
 * @returns {Promise<Array>} Array of player objects (best_time > 0).
 */
export async function getLeaderboard() {
  const res = await fetch(`${PLAYERS_URL}/leaderboard`, { method: "GET" });
  if (!res.ok) {
    throw new Error(`Error fetching leaderboard: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

/**
 * Add a new player.
 * @param {Object} player - { name: string, best_time: number }
 * @returns {Promise<Object>} The created player object.
 */
export async function addPlayer(player) {
  const res = await fetch(PLAYERS_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(player),
  });
  if (!res.ok) {
    throw new Error(`Error adding player: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

/**
 * Update an existing player's best_time.
 * @param {Object} player - { name: string, time: number }
 * @returns {Promise<Object>} The updated player object.
 */
export async function updatePlayerTime(player) {
  const res = await fetch(PLAYERS_URL, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(player),
  });
  if (!res.ok) {
    throw new Error(`Error updating player time: ${res.status} ${res.statusText}`);
  }
  return res.json();
}
