<script>
    import axios from "axios";
    import { setPageInformation } from "../../scripts/common.js";
    import ReviewSimple from "../../components/ReviewSimple.svelte";

    let reviewList = [];
    let currentPage = 1;
    let totalCount;
    let pageNums = [];
    let startPage;
    let endPage;
    let hasPrevPage;
    let hasNextPage;
    let searchParams = {}; // 페이지 번호 클릭했을 때 검색params 전달용
    const size = 5;
    const pageRangeSize = 5;

    const loadPage = (params) => {
        axios
            .get("http://localhost:8080/reviews", {
                // count 가져오는 컨트롤러랑 uri 따로 만들기
                params,
            })
            .then((response) => {
                console.log("first response");
                console.log(response);
                totalCount = response.data.total_count;
                setPageAndData(currentPage, params);
            })
            .catch((error) => {
                console.log(error);
                alert("오류가 발생했습니다.");
            });
    };

    const setPageAndData = (clickedPageNum, params) => {
        // 페이지 번호 눌렀을 때... params 어떻게 ?
        let isSearching = false;
        if (searchParams != null && Object.keys(searchParams).length > 0) {
            isSearching = true;
        }
        if (
            isSearching == false &&
            startPage != null &&
            clickedPageNum == currentPage
        ) {
            return;
        } // 최초 페이지 로드된 후에는 같은 페이지 클릭하면 아래 작업x

        currentPage = clickedPageNum;

        const result = setPageInformation(
            currentPage,
            pageRangeSize,
            size,
            totalCount
        );
        console.log(result);

        startPage = result.startPage;
        endPage = result.endPage;
        pageNums = Array.from(
            Array(endPage - startPage + 1).keys(),
            (num) => num + startPage
        );

        hasPrevPage = result.hasPrevPage;
        hasNextPage = result.hasNextPage;
        
        if (params == null) {
            params = searchParams; // 페이지번호를 눌렀을 경우에는 검색어 전달이 안돼서 전역변수 사용
        }

        const pageParams = {
            page: currentPage, // 1 이상의 숫자
            size: size, // 1 이상의 숫자 (나중에 validation으로 최대 사이즈 정하기)
        };

        const mergedParams = { ...params, ...pageParams };
        params = mergedParams;

        getReviewData(params); // 최초 로드 시에는 검색 조건X
    };

    const getReviewData = (params) => {
        console.log("getReviewData");
        console.log(params);

        axios
            .get("http://localhost:8080/reviews", {
                params,
            })
            .then((response) => {
                console.log(response);
                reviewList = response.data.reviews;
            })
            .catch((error) => {
                console.log(error);
                alert("오류가 발생했습니다.");
            });
    };

    loadPage(null);

    const goSearch = () => {
        const searchOption = document.getElementById("search-select").value;
        const searchWord = document.getElementById("search-input").value;

        searchParams = {
            [searchOption]: searchWord,
        };
        currentPage = 1;

        loadPage(searchParams);
    };
</script>

<main>
    <h1>작성된 리뷰를 감상해보세요</h1>
    <div class="search-container">
        <select id="search-select">
            <option value="title">제목</option>
            <option value="contents">내용</option>
            <option value="bookTitle">책이름</option>
        </select>
        <input
            id="search-input"
            type="text"
            placeholder="검색어를 입력해주세요."
        />
        <button id="search-button" on:click={goSearch}>검색</button>
    </div>

    {#each reviewList as ReviewSimpleInfo}
        <ReviewSimple {ReviewSimpleInfo} />
    {/each}

    <div class="button-wrapper">
        {#if hasPrevPage}
            <button on:click={() => setPageAndData(startPage - 1)}> ◀ </button>
        {/if}

        {#each pageNums as pageNum}
            <button
                class={pageNum === currentPage ? "active" : ""}
                on:click={() => setPageAndData(pageNum)}
            >
                {pageNum}
            </button>
        {/each}
        {#if hasNextPage}
            <button on:click={() => setPageAndData(endPage + 1)}> ▶ </button>
        {/if}
    </div>
</main>

<style>
    .search-container {
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #fff;
        padding: 10px;
        border-radius: 5px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
        width: 600px;
        height: 40px;
        margin-bottom: 35px;
        margin-left: 29%;
    }

    #search-input {
        flex: 1;
        border: none;
        border-right: 1px solid #ddd;
        border-radius: 5px 0 0 5px;
        padding: 10px;
        box-sizing: border-box;
    }

    select {
        padding: 10px;
        border: none;
        border-right: 1px solid #ddd;
        border-radius: 0 5px 5px 0;
        background-color: #f2f2f2;
    }

    #search-button {
        padding: 10px;
        margin-left: 10px;
        border: none;
        background-color: #333232;
        color: #fff;
        cursor: pointer;
    }

    button {
        display: inline-block;
        padding: 8px 16px;
        border: 1px solid #ccc;
        background-color: #fff;
        color: #333;
        font-size: 14px;
        cursor: pointer;
    }

    button:hover {
        background-color: #f2f2f2;
    }

    button.active {
        background-color: #6c7074;
        color: #fff;
    }
    button:focus {
        outline: none;
        box-shadow: 0 0 0 2px #999;
    }

    .button-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 50px;
        margin-bottom: 100px;
        background-color: #222;
    }

    .button-wrapper button {
        margin: 0 4px;
        padding: 6px 12px;
        font-size: 14px;
        font-weight: 500;
        color: #333;
        background-color: #fff;
        border: 1px solid #ddd;
        border-radius: 3px;
        cursor: pointer;
    }

    .button-wrapper button.active {
        color: #fff;
        background-color: #007bff;
        border-color: #007bff;
    }

    main {
        padding: 40px;
        padding-left: 14%;
        text-align: center;
        background-color: #222;
        height: 100%;
    }

    h1 {
        color: #f1e7ed;
        font-size: 30px;
        font-weight: bold;
        margin-bottom: 60px;
    }
</style>
