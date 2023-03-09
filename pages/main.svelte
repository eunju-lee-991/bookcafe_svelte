<script>
    import { beforeUpdate, afterUpdate, onMount, onDestroy } from "svelte";
    import { REST_API_KEY } from "../store/store.js";
    import axios from "axios";
    import BookList from "../components/BookList.svelte";
    import { debounce } from "lodash";

    //export let name; // props
    let h1;
    let searchSize = 5;
    let searchWord;
    let bookinfos = [];
    let nextPage = 0;
    let isEnd = true;

    const debouncedSearch = debounce((e) => {
        console.log("delayed search word : " + e.target.value);

        if(e){
            searchWord = e.target.value;
            search(e);
        }

    }, 200);

    const onScroll = () => {
        const scrollHeight = document.documentElement.scrollHeight;
        const scrollTop =
            document.documentElement.scrollTop || document.body.scrollTop;
        const clientHeight = document.documentElement.clientHeight;

        if (scrollTop + clientHeight + 5 >= scrollHeight) {
            nextSearch();
        }
    };

    const search = (e) => {
        nextPage = 0;

        if (!searchWord) {
            bookinfos = [];
            isEnd = true;
            return;
        }
        axios
            .get("https://dapi.kakao.com/v3/search/book", {
                params: {
                    target: "title",
                    query: searchWord,
                    size: searchSize,
                },
                headers: {
                    Authorization: "KakaoAK " + $REST_API_KEY,
                },
            })
            .then((response) => {
                const totalCount = response.data.meta.total_count;
                console.log("total count: " + totalCount);
                isEnd = response.data.meta.is_end;

                bookinfos = response.data.documents;
                if (!isEnd) {
                    nextPage = 2;
                }
            })
            .catch((error) => {
                console.log(error);
                alert("에러가 발생했습니다.");
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
                const totalCount = response.data.meta.total_count;
                if (totalCount == 0) {
                    return;
                }
                bookinfos = bookinfos.concat(response.data.documents);
                isEnd = response.data.meta.is_end;
                if (!isEnd) {
                    nextPage++;
                }
            });
    };

    onMount((e) => {
        document.addEventListener("scroll", onScroll);
        search(e);
    });
</script>

<main>
    <h1>리뷰 작성할 책을 검색하세요</h1>

    <input class="custom-input" type="text" on:input={debouncedSearch} />
    {#if bookinfos.length == 0 && searchWord != null && searchWord != ""}
        <h2>찾으시는 검색 결과가 없습니다</h2>
    {:else}
        <BookList {bookinfos} />
    {/if}
</main>

<style>
    .custom-input {
        width: 450px;
        height: 50px;
        padding: 8px;
        border-radius: 4px;
        border: 1px solid #d887b0;
        font-size: 16px;
        outline: none;
        margin-bottom: 70px;
        margin-top: 10px;
    }

    .custom-input:focus {
        border-color: #dd1e7e;
        box-shadow: 0 0 5px rgb(181, 183, 185);
    }

    main {
        text-align: center;
        padding: 1em;
        max-width: 240px;
        margin: 0 auto;
    }

    h1 {
        color: #f1e7ed;
        font-size: 30px;
        font-weight: bold;
    }

    @media (min-width: 640px) {
        main {
            max-width: none;
        background-color: #222;
        height: 100vh;
        }
    }
</style>
