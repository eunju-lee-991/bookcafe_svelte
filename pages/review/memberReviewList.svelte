<script>
    import axios from "axios";
    import { setPageInformation } from "../../scripts/common.js";
    import ReviewSimple from "../../components/ReviewSimple.svelte";

    export let id;

    let reviewList = [];
    let currentPage = 1;
    let totalCount;
    let pageNums = [];
    let startPage;
    let endPage;
    let hasPrevPage;
    let hasNextPage;
    const size = 5;
    const pageRangeSize = 5;

    axios
        .get("http://localhost:8080/reviews", {
            params: { memberId: id },                
        })
        .then((response) => {
            console.log("first response");
            console.log(response);
            totalCount = response.data.total_count;

            setPageAndData(currentPage);
        })
        .catch((error) => {
            console.log(error);
            alert("오류가 발생했습니다.");
        });

    const setPageAndData = (clickedPageNum) => {
        if (startPage != null && clickedPageNum == currentPage) {
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

        getReviewData(currentPage, size);
    };

    const getReviewData = (currentPage, size) => {
        // 페이지 번호 누를 때마다 실행. 최초에는 onMount => currentPage 1로 해서 한번 실행?
        console.log("getReviewData");

        axios
            .get("http://localhost:8080/reviews", {
                params: {
                    page: currentPage, // 1 이상의 숫자
                    size: size, // 1 이상의 숫자 (나중에 validation으로 최대 사이즈 정하기)
                    memberId: id
                },
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
</script>

<main>
<!--     
    <input class="custom-input" type="text" /> -->

    {#each reviewList as ReviewSimpleInfo}
        <ReviewSimple {ReviewSimpleInfo} />
    {/each}

    <div class="button-wrapper">
        {#if hasPrevPage}
            <button on:click={() => setPageAndData(startPage - 1)}>
                ◀
            </button>
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
    .custom-input {
        width: 450px;
        height: 50px;
        padding: 8px;
        border-radius: 4px;
        border: 1px solid #aca9a9;
        font-size: 16px;
        outline: none;
        margin-bottom: 70px;
        margin-top: 70px;
    }

    .custom-input:focus {
        border-color: rgb(109, 110, 112);
        box-shadow: 0 0 5px rgb(181, 183, 185);
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
        text-align: center;
        padding: 80px;
        background-color: #222;
    }
</style>
