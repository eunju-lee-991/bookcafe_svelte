<script>
    export let bookinfo = {};
    import axios from "axios";
    import { getCookie } from "../scripts/common.js";

    let canWrite = false;
    let buttonContents = "리뷰쓰기";

    let slice = (str) => {
        str = str.substr(0, 130);
        str += "...";
        return str;
    };

    const toggleWriteReview = () => {
        canWrite = !canWrite;
        if (canWrite) {
            buttonContents = "닫기";
        } else {
            buttonContents = "리뷰쓰기";
        }
    };

    const writeReview = () => {
        const _title = document.getElementById("title").value;
        const _contents = document.getElementById("contents").value;
        const _memberId = getCookie("memberId");
        let _isbn = bookinfo.isbn.includes(' ') ? bookinfo.isbn.split(' ')[1] : bookinfo.isbn;

        console.log(_title);
        console.log(_contents);

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
            memberId: _memberId,
            title: _title,
            contents: _contents,
            isbn: _isbn,
            bookTitle: bookinfo.title,
        };

        console.log(reviewForm)
        axios
            .post(
                "http://localhost:8080/reviews",
                reviewForm,
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json",
                    },
                } // cross domain에서 쿠키 받기 위해서  credentials 설정!
            )
            .then((res) => {
                console.log(res);
                const reviewId = res.data.reviewId;
                console.log(reviewId)
            })
            .catch((err) => {
                console.log(err);
                alert("오류가 발생했습니다");
            });
    };
</script>

<main>
    <div
        class="container"
        style="border: 1px solid black; border-radius: 5px; border-color: #BEBEBE;"
    >
        <div class="image-wrapper">
            <img src={bookinfo.thumbnail} alt="이미지를 표시할 수 없습니다" />
        </div>
        <div class="content-wrapper">
            <div class="button-wrapper">
                <button on:click={toggleWriteReview}>{buttonContents}</button>
                <button>리뷰보기</button>
            </div>
            <h2>{bookinfo.title}</h2>
            <p>authors: {bookinfo.authors}</p>
            <p>isbn: {bookinfo.isbn}</p>
            <p>
                contents:
                {#if bookinfo.contents.length > 130}
                    {slice(bookinfo.contents)}
                {:else}
                    {bookinfo.contents}
                {/if}
            </p>
            <p>publisher: {bookinfo.publisher}</p>
        </div>
    </div>
    {#if canWrite}
        <div class="review-form-container">
            <label for="title">제목</label>
            <input type="text" id="title" name="title" />

            <label for="contents">내용</label>
            <textarea id="contents" name="contents" />

            <button
                on:click={writeReview}
                id="write-button"
                style="width: 40px; display: flex; margin-left: 10px;"
            >
                완료
            </button>
        </div>
    {/if}
</main>

<style>
    button {
        background-color: #4caf50; /* 배경색 */
        border: none; /* 테두리 없앰 */
        color: white; /* 글자색 */
        padding: 2px 5px; /* 안쪽 여백 */
        text-align: center; /* 글자 중앙 정렬 */
        text-decoration: none; /* 밑줄 없앰 */
        display: inline-block; /* 인라인 요소로 표시 */
        font-size: 15px; /* 글자 크기 */
        cursor: pointer; /* 커서 모양 변경 */
        border-radius: 2px; /* 테두리 둥글게 */
        margin-right: 5px;
    }

    button:hover {
        background-color: #3e8e41; /* 배경색 변경 */
    }

    img {
        width: 100%;
        height: auto;
    }

    p {
        margin: 1px;
        color: #333; /* 글꼴 색상 */
        line-height: 2;
        font-size: 18px;
        font-weight: 300;
        text-align: left; /* 텍스트 정렬 */
    }

    .container {
        width: 1300px;
        margin: 30px;
        padding: 5px;
        display: flex;
        align-items: center; /* 이미지와 나머지 요소를 세로 방향으로 정렬 */
        gap: 20px; /* 이미지와 나머지 요소 사이의 간격 */
        background-color: #eaeaf0;
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
    }

    .button-wrapper {
        display: flex;
        justify-content: flex-end;
        gap: 10px;
    }

    .review-form-container {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        max-width: 1000px;
        margin: auto;
        margin-right: 40px;
    }

    label {
        font-weight: bold;
        display: flex;
        margin-left: 15px;
    }

    input[type="text"],
    textarea {
        padding: 0.5rem;
        border: 1px solid #ccc;
        border-radius: 4px;
    }
</style>
