import { writable, readable } from 'svelte/store';

export let REST_API_KEY = readable('7bcfc7029ccb017c031af94a6e2dd46a');
export let REDIRECT_URI = readable('http://localhost:5000/login/token');
// export let REDIRECT_URI = readable('http://localhost:8080/api/login/token');