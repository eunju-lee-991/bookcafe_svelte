<script>
    import { beforeUpdate, afterUpdate, onMount, onDestroy } from "svelte";
    import { REST_API_KEY } from "../store/store.js";
    import axios from "axios";
    import BookList from "../components/BookList.svelte";

    //export let name; // props
    let h1;
    let jsonData;
    let searchWord;
    let bookinfos = [];
    let nextPage = 0;
    let isEnd = true;

    const test = (name) => { // memberId 쿠키 가쟈오기 테스트
        const cookies = document.cookie.split(";");

        cookies.forEach(cookie => {
            const _cookie = cookie.trim();
            if(_cookie.startsWith(name+"=")){
                console.log(cookie.substring(name.length + 1));
                // return cookie.substring(name.length + 1);
            }
        });
        console.log("null");
        // return null;
  }

    //     axios.get('http://localhost:8080/testCookie',
    //         {
    //   withCredentials: true
    // })
    //     .then((res) => {
    //   console.log(res);
    //   //setTimeout(() => location.replace('/main'), 1500);
    //   console.log(document.cookie);
    // })
        

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

        axios
            .get("https://dapi.kakao.com/v3/search/book?target=title", {
                params: { query: searchWord, size: 9 },
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
                params: { query: searchWord, size: 9, page: nextPage },
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
    <button on:click={() => test("memberId")}>TEST</button> 

    <h1>책을 검색하세요</h1>

    <input type="text" bind:value={searchWord} on:input={search} />

    <BookList {bookinfos} />
    <button on:click={nextSearch}> 더보기 </button>
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
