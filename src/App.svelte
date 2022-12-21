<script>
	import { beforeUpdate, afterUpdate, onMount, onDestroy } from 'svelte'
	import { restApiKey } from '../store/store.js'
	import axios from 'axios'
	import BookList from '../components/BookList.svelte'

	//export let name; // props
	let h1;
	let jsonData;
	let searchWord;
	let bookinfos;

	const search = () => {
		if(!searchWord){
			return;
		}

		axios.get('https://dapi.kakao.com/v3/search/book?target=title', {
			params: {"query": searchWord},
			headers: {
				Authorization: 'KakaoAK ' + $restApiKey
			}
		})
		.then(response => {
			if(response.data.meta.total_count == 0){
				h1.innerText = '';
				return;
			}
			h1.innerText = response.data.documents[0].title;
			bookinfos = response.data.documents;
			console.log("mmm");
			console.log(bookinfos);
		})
		
	}

	onMount(() => 
		h1 = document.querySelector('h1')
		
		// axios.get(`http://localhost:8080/members`)
		// 	.then(response => {
		// 		jsonData = response.data;
				
		// 		h1.innerText = JSON.stringify(jsonData)
		// 	})
	)
</script>

<main>
	<h1> 책을 검색하세요 </h1>

	<input type="text" bind:value={searchWord} on:input={search} />

	<BookList {bookinfos} />
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