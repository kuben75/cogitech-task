import {API_BASE_URL} from "../constants/api.js";

/**
 *
 * @param {string} endpoint - Końcówka adresu API (np. '/users')
 * @param {AbortSignal} signal - Sygnał do anulowania zapytania
 * @returns {Promise<any>} Dane w formacie JSON
 */

export const fetchJson = async (endpoint, signal) => {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, { signal });
    if (!res.ok) throw new Error(`${endpoint}: błąd HTTP ${res.status}`);
    return res.json();
};