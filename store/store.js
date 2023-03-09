import { writable, readable } from 'svelte/store';

export const REST_API_KEY = readable('7bcfc7029ccb017c031af94a6e2dd46a');
export const REDIRECT_URI = readable('http://localhost:5000/login/token');