import axios from "axios";
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
*
*
*/
export async function getPlayerByUsername(name) {
  const res = await fetch(`${PLAYERS_URL}/${name}`, { method: "GET" });

  if (!res.ok) {
    console.log("player doesn't exist (response error)");
    return null;
  }

  const json = await res.json();

  if (!json.data) {
    console.log("player doesn't exist (data null)");
    return null;
  }

  return json.data; 
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

  const json = await res.json();
  return json.data; 
}

/**
 * Update an existing player's best_time.
 * @param {Object} player - { name: string, time: number }
 * @returns {Promise<Object>} The updated player object.
 */
export async function updatePlayerTime(player, time) {
  const url = PLAYERS_URL;
  const payload = {
    username: player.username,
    time: Math.round(time),
  };

  console.log("🧪 Sending PUT to:", url);
  console.log("📦 Payload:", payload);

  try {
    const res = await axios.put(url, payload);
    console.log("✅ Update response:", res.data);
    return res.data;
  } catch (err) {
    if (err.response) {
      console.error("❌ Server responded with error:", err.response.status, err.response.data);
    } else {
      console.error("❌ Axios error:", err.message);
    }
    throw new Error("Failed to update player");
  }
}

