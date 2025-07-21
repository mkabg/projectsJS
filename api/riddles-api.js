// client/api/riddles-api.js

import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// __dirname workaround for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from the client folder
dotenv.config({ path: path.resolve(__dirname, "../.env") });

// Read the RIDDLES_URL environment variable
const RIDDLES_URL = process.env.RIDDLES_URL;
if (!RIDDLES_URL) {
  throw new Error("RIDDLES_URL is not defined in .env");
}

/**
 * Fetch the list of all riddles.
 * @returns {Promise<Array>} Array of riddle objects.
 */
export async function getAllRiddles() {
  const res = await fetch(RIDDLES_URL, { method: "GET" });
  if (!res.ok) {
    throw new Error(`Error fetching riddles: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

/**
 * Fetch a single riddle by ID.
 * @param {string} id 
 * @returns {Promise<Object>} Riddle object.
 */
export async function getRiddle(id) {
  const res = await fetch(`${RIDDLES_URL}/${id}`, { method: "GET" });
  if (!res.ok) {
    throw new Error(`Error fetching riddle ${id}: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

/**
 * Create a new riddle.
 * @param {Object} riddle — { name, taskDescription, correctAnswer }
 * @returns {Promise<Object>} The created riddle.
 */
export async function createRiddle(riddle) {
  const res = await fetch(RIDDLES_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(riddle),
  });
  if (!res.ok) {
    throw new Error(`Error creating riddle: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

/**
 * Update an existing riddle by ID.
 * @param {Object} riddle — must include `id` and any fields to update
 * @returns {Promise<Object>} The updated riddle.
 */
export async function updateRiddle(riddle) {
  const { id, ...updates } = riddle;
  const res = await fetch(`${RIDDLES_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });
  if (!res.ok) {
    throw new Error(`Error updating riddle ${id}: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

/**
 * Delete a riddle by ID.
 * @param {string} id 
 * @returns {Promise<Object>} Deletion result.
 */
export async function deleteRiddle(id) {
  const res = await fetch(`${RIDDLES_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) {
    throw new Error(`Error deleting riddle ${id}: ${res.status} ${res.statusText}`);
  }
  return res.json();
}
