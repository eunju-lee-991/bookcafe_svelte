<script>
	import { beforeUpdate, afterUpdate, onMount, onDestroy } from 'svelte'
	import axios from 'axios'

	export let name; // props
	onMount(() =>
		axios.get(`http://localhost:8080/members`)
			.then(response => console.log(response.data))

	)
</script>

<main>
	<h1>Hello {name}!</h1>
	<p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>