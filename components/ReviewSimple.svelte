<script>
    import axios from "axios";
    import { REST_API_KEY } from "../store/store.js";
    import { beforeUpdate, afterUpdate, onMount, onDestroy } from "svelte";
    export let ReviewSimpleInfo = [];
    let thumbnailUrl = '';

    const getBookInfo = (myIsbn) =>
        axios
            .get("https://dapi.kakao.com/v3/search/book", {
                params: { target: "isbn", query: myIsbn },
                headers: {
                    Authorization: "KakaoAK " + $REST_API_KEY,
                },
            })
            .then((response) => {
                thumbnailUrl = response.data.documents[0].thumbnail;
            })
            .catch((error) => {
                console.log(error);
                alert("에러가 발생했습니다.");
            });

    $: getBookInfo(ReviewSimpleInfo.isbn);

</script>

<main>
    <div class="parent-container">    
        <div class="image-wrapper">
            <img
                src={thumbnailUrl}
                alt="해당 도서의 이미지를 표시할 수 없습니다"
            />
        </div>
        <div class="container">
            <div class="title-wrapper">
                <span class="quotation">"</span>
                <a href="/reviews/{ReviewSimpleInfo.reviewId}"
                    >{ReviewSimpleInfo.title}</a
                >

                <span class="quotation">"</span>
            </div>
            <div class="book-title-wrapper">
                <span style="font-size: 22px; color:green; margin-left: 20%;">♣</span>
                <span style="width: 90%;">{ReviewSimpleInfo.bookTitle}</span>
            </div>
            <div class="additional-wrapper">
                <span>{ReviewSimpleInfo.updatedDate}</span>
            </div>
        </div>
    </div>
</main>

<style>
    .parent-container {
        background-color: #65646d; /* 배경색 */
        border-top: 3px solid rgb(0, 0, 0);
        border-bottom: 3px solid rgb(0, 0, 0);
        border-radius: 10px;
        margin-right: 20%;
        margin-left: 20%;
        margin-bottom: 40px;
        margin-top: 22px;
        display: flex;
        flex-direction: row;
        align-items: center;
        width: 950px;
    }

    .container {
        padding: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 600px;
    }

    .book-title-wrapper {
        width: 90%; 
        color: #bfbec7;
        font-size: 13px;
        font-weight: bold;
        display: flex;
        flex-direction: row;
        align-items: center;
        text-align: left;
        margin: 10px;
        margin-bottom: 25px;
    }
    
    .book-title-wrapper span {
    margin-right: 10px;
    }

    img {
        width: 75%;
    }

    .image-wrapper {
        margin: 20px;
        width: 200px;
    }

    .title-wrapper {
        font-size: 25px;
        margin: 18px;
    }

    .quotation {
        font-family: fantasy;
        font-size: 35px;
        margin: 1px;
    }

    a {
        color: black; /* 링크 색상 */
        text-decoration: none; /* 밑줄 제거 */
        display: inline-block; /* 버튼 스타일 적용 */
        background-color: #65646d; /* 배경색 */
        padding: 10px 20px; /* 내부 패딩 */
        border-radius: 5px; /* 둥근 모서리 */
        cursor: pointer; /* 포인터 모양으로 변경 */
        transition: background-color 0.3s; /* 마우스 오버시 배경색 변경 애니메이션 */
    }

    a:hover {
        text-decoration: underline; 
    }

    .additional-wrapper {
        margin: 1px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .additional-wrapper span {
        font-size: 14px;
        margin-right: 10px;
    }
    
    main{
        background-color: #222;
    }
</style>
