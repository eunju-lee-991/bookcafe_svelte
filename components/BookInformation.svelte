<script>
    import axios from "axios";
    import { beforeUpdate, afterUpdate, onMount, onDestroy } from "svelte";
    import { getCookie, checkLogIn } from "../scripts/common.js";
    export let bookinfo = {};
    export let writable = false;

    let scrollPosition = 0;
    let canWrite = false;
    let buttonContents = "리뷰쓰기";
    let contentLength = 180;
    let showAll = false;

    const toggleShowAll = (e) => {
        e.preventDefault();
        showAll = !showAll;
    };

    const slice = (str, length) => {
        str = str.substr(0, length);
        return str;
    };

    afterUpdate(() => {
        scrollPosition = window.pageYOffset;
    });

    const toggleWriteReview = () => {
        if (!checkLogIn()) {
            alert("로그인 후 작성 가능합니다.");
            location.href = "/login";
            return;
        }

        if (!canWrite && document.getElementById("title") != null) {
            // 리뷰 쓰기를 눌렀는데 다른 리뷰작성 창이 열려있는 경우
            alert("작성 중인 리뷰가 있습니다");
            return;
        }

        canWrite = !canWrite;

        if (canWrite) {
            buttonContents = "닫기";

            const prevHeight = document.body.scrollHeight; // 리뷰쓰기 모드일 때 스크롤 조금 아래로 내리기
            setTimeout(() => {
                const newHeight = document.body.scrollHeight;
                window.scrollTo({
                    top: newHeight - prevHeight + scrollPosition,
                    behavior: "smooth", // 부드러운 스크롤 이동
                });
            }, 100);
        } else {
            buttonContents = "리뷰쓰기";
        }
    };

    const writeReview = () => {
        const _title = document.getElementById("title").value;
        const _contents = document.getElementById("contents").value;
        const _memberId = getCookie("memberId");
        let _isbn = bookinfo.isbn.includes(" ")
            ? bookinfo.isbn.split(" ")[1]
            : bookinfo.isbn;

        if (!_memberId) {
            alert("로그인을 해주세요");
            location.href = "/login";
        }
        if (!_title.trim()) {
            alert("제목을 입력해주세요");
            return;
        }
        if (!_contents.trim()) {
            alert("content 입력해주세요");
            return;
        }

        const reviewForm = {
            title: _title,
            contents: _contents,
            isbn: _isbn,
            bookTitle: bookinfo.title,
        };

        axios
            .post(
                "http://localhost:8080/reviews",
                reviewForm,
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json",
                    },
                } 
            )
            .then((res) => {
                console.log(res);
                const reviewId = res.data.reviewId;
                alert("정상적으로 리뷰가 등록되었습니다.");
                location.href = "reviews/" + reviewId;
            })
            .catch((error) => {
                console.log(error.response.data);
                alert("오류가 발생했습니다");
            });
    };
</script>

<main>
    <div  class="container" style="border: 3px solid black; border-radius: 10px; border-color: #BEBEBE;">
        <div class="image-wrapper">
            <img src={bookinfo.thumbnail}  alt="도서의 이미지를 표시할 수 없습니다"/>
        </div>
        <div class="content-wrapper" id="content-wrapper">
            {#if writable}
                <div class="button-wrapper">
                    <button on:click={toggleWriteReview}>{buttonContents}</button>
                </div>
            {/if}
            <h1 >{bookinfo.title}</h1>
            <p style="margin-left: 20px; margin-right: 30px;" >
                {#if bookinfo.contents && bookinfo.contents.length > contentLength && !showAll}
                    {slice(bookinfo.contents, contentLength)}
                    <a href="#" on:click={(e) => toggleShowAll(e)}>...더보기</a>
                {:else}
                    {bookinfo.contents}
                {/if}
            </p>
            <p style="margin-left: 20px;" >저자: {bookinfo.authors} | 출판사: {bookinfo.publisher}</p>
        </div>
    </div>
    {#if canWrite}
        <div class="review-form-container">
            <label for="title">제목</label>
            <input type="text" id="title" name="title" />

            <label for="contents">내용</label>
            <textarea id="contents" name="contents" />

            <button on:click={writeReview} id="write-button" style="width: 40px; display: flex; margin-left: 10px;">
                완료
            </button>
        </div>
    {/if}
</main>

<style>
    h1 {
        font-size: 28px;
        margin-bottom: 40px;
    }
    button {
        background-color: #797c79; /* 배경색 */
        border: none; /* 테두리 없앰 */
        color: white; /* 글자색 */
        padding: 2px 5px; /* 안쪽 여백 */
        text-align: center; /* 글자 중앙 정렬 */
        text-decoration: none; /* 밑줄 없앰 */
        display: inline-block; /* 인라인 요소로 표시 */
        font-size: 15px; /* 글자 크기 */
        cursor: pointer; /* 커서 모양 변경 */
        border-radius: 5px; /* 테두리 둥글게 */
        margin-right: 5px;
    }

    button:hover {
        background-color: #515251; /* 배경색 변경 */
    }

    img {
        width: 95%;
        height: auto;
    }

    p {
        margin: 1px;
        margin-top: 10px;
        margin-bottom: 15px;
        color: #1b1b1b; /* 글꼴 색상 */
        line-height: 2;
        font-size: 17px;
        font-weight: 300;
        text-align: left; /* 텍스트 정렬 */
    }

    .container {
        width: 1100px;
        margin: 50px;
        padding: 15px;
        display: flex;
        align-items: center; /* 이미지와 나머지 요소를 세로 방향으로 정렬 */
        gap: 20px; /* 이미지와 나머지 요소 사이의 간격 */
        background-color: #f6f6fa;
        font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
    }

    .container:hover {
        background-color: #f0f0f5;
    }

    .image-wrapper {
        margin: 10px;
        width: 17%;
        flex: 0 0 auto; /* 이미지가 자신의 크기를 유지할 수 있도록 설정 */
    }

    .content-wrapper {
        display: flex;
        flex-direction: column; /* 제목, 내용, 글쓴이를 세로 방향으로 정렬 */
        flex: 1; /* 나머지 공간을 차지할 수 있도록 설정 */
        overflow: auto;
    }

    .button-wrapper {
        display: flex;
        justify-content: flex-end;
        gap: 10px;
    }

    .review-form-container {
        display: flex;
        flex-direction: column;
        justify-self: flex-start;
        gap: 1rem;
        margin: auto;
        margin-right: 60px;
        background-color: gray;
        width: 1050px;
        padding: 20px;
        border-radius: 15px;
        border-top: 3px solid black;
        border-bottom: 3px solid black;
    }
    
    .review-form-container button {
        background-color: black;
    }

    .review-form-container button:hover {
        background-color: rgb(46, 46, 46);
    }

    label {
        font-weight: bold;
        display: flex;
        margin-left: 18px;
        font-size: 15px;
        color: #000000;
    }

    input[type="text"],
    textarea {
        padding: 0.5rem;
        width: 80%;
        border: 1px solid #ccc;
        border-radius: 4px;
    }

    a {
        color: black; /* 링크 색상 */
        padding: 2px 4px; /* 내부 패딩 */
        border-radius: 6px; /* 둥근 모서리 */
        cursor: pointer; /* 포인터 모양으로 변경 */
        transition: background-color 0.3s; /* 마우스 오버시 배경색 변경 애니메이션 */
    }

    a:hover {
        background-color: #d3cdcd; /* 마우스 오버시 배경색 변경 */
    }
</style>
