<script>
    import { beforeUpdate, afterUpdate, onMount, onDestroy } from "svelte";
    import { REST_API_KEY } from "../store/store.js";
    import axios from "axios";
    import BookList from "../components/BookList.svelte";

    //export let name; // props
    let h1;
    let searchSize = 5;
    let searchWord;
    let bookinfos = [];
    let nextPage = 0;
    let isEnd = true;

    const onScroll = () => {
        const scrollHeight = document.documentElement.scrollHeight;
        const scrollTop = document.documentElement.scrollTop;
        const clientHeight = document.documentElement.clientHeight;

        // console.log("scrollHeight: " + scrollHeight);
        // console.log("scrollTop: " + scrollTop);
        // console.log("clientHeight: " + clientHeight);

        if (scrollTop + clientHeight >= scrollHeight) {
            console.log("the end");
            nextSearch();
        }
    };

    const search = () => {
        nextPage = 0;

        if (!searchWord) {
            bookinfos = [];
            h1.innerText = "검색어를 입력해주세요";
            isEnd = true;
            return;
        }
        console.log("searchWord: " + searchWord);
        axios
            .get("https://dapi.kakao.com/v3/search/book?target=title", {
                params: { query: searchWord, size: searchSize },
                headers: {
                    Authorization: "KakaoAK " + $REST_API_KEY,
                },
            })
            .then((response) => {
                h1.innerText = "total count: " + response.data.meta.total_count;
                isEnd = response.data.meta.is_end;

                if (response.data.meta.total_count == 0) {
                    return;
                }

                bookinfos = response.data.documents;

                if (!isEnd) {
                    nextPage = 2; 
                }
            });
    };
    // nextPage
    const nextSearch = () => {
        if (isEnd) {
            return;
        }

        axios
            .get("https://dapi.kakao.com/v3/search/book?target=title", {
                params: { query: searchWord, size: searchSize, page: nextPage },
                headers: {
                    Authorization: "KakaoAK " + $REST_API_KEY,
                },
            })
            .then((response) => {
                if (response.data.meta.total_count == 0) {
                    return;
                }
                h1.innerText = "total count: " + response.data.meta.total_count;
                bookinfos = bookinfos.concat(response.data.documents);
                console.log("nextPage: " + nextPage);
                isEnd = response.data.meta.is_end;
                if (!isEnd) {
                    nextPage++;
                }
            });
    };

    onMount(() => {
        document.addEventListener("scroll", onScroll);
        h1 = document.querySelector("h1");
    });
</script>

<main>
    <h1> </h1>

    <input class="custom-input" type="text" bind:value={searchWord} on:input={search} on:blur={(e) => {console.log("blur");}} />

    <BookList {bookinfos} />
</main>

<style>
	h1 {
		font-family: 'Noto Sans KR', sans-serif;
	}

.custom-input {
  width: 450px;
  height: 50px;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #aca9a9;
  font-size: 16px;
  outline: none;
}

.custom-input:focus {
  border-color: rgb(109, 110, 112);
  box-shadow: 0 0 5px rgb(181, 183, 185);
}

    main {
        text-align: center;
        padding: 1em;
        max-width: 240px;
        margin: 0 auto;
    }

    h1 {
        color: #553024;
        font-size: 20px;
        text-transform: uppercase;
        font-weight: 100;
    }

    @media (min-width: 640px) {
        main {
            max-width: none;
        }
    }
</style>
