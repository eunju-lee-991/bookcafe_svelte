<script>
    import axios from "axios";
    import { onMount } from "svelte";
    import { REST_API_KEY } from "../../store/store.js";
    import ReviewDetail from "../../components/ReviewDetail.svelte"; // component import
    import ReviewUpdateForm from "../../components/ReviewUpdateForm.svelte"; // component import
    import BookInformation from "../../components/BookInformation.svelte";
    import { getCookie } from "../../scripts/common.js";

    export let reviewId;
    let isUpdateState = false;

    const memberId = getCookie("memberId");

    const showUpdateForm = () => {
        isUpdateState = true;
    }

    const cancleUpdate = () => {
        isUpdateState = false;
    }

    const updateReview = () => {
        const aa = document.getElementById("edit-contents");
        console.log(aa.value); 






    }


    const deleteReview = () => {
        axios
            .delete("http://localhost:8080/reviews/" + reviewId, {
                withCredentials: true, 
            })
            .then((res) => {
                console.log(res);
                location.replace('/main');
            })
            .catch((err) => {
                console.log(err);
                alert("오류가 발생했습니다");
            });
    }

    let reviewDetails = {};
    let bookinfo = {};

    axios
        .get("http://localhost:8080/reviews/" + reviewId, {
            withCredentials: true, 
        })
        .then((res) => {
            console.log(res);
            reviewDetails = res.data.review;
            let myIsbn = reviewDetails.isbn;

            getBookInfo(myIsbn);
        })
        .catch((err) => {
            console.log(err);
            alert("오류가 발생했습니다");
        });

    const getBookInfo = (myIsbn) =>
        axios
            .get("https://dapi.kakao.com/v3/search/book", {
                params: { target: "isbn", query: myIsbn },
                headers: {
                    Authorization: "KakaoAK " + $REST_API_KEY,
                },
            })
            .then((response) => {
                console.log(response);
                bookinfo = response.data.documents[0];
            })
            .catch((error) => {
                console.log(error);
                alert("에러가 발생했습니다.");
            });
</script>

<main>
    <div class="contatiner">
        <BookInformation {bookinfo} writable={false} />
        {#if isUpdateState}
            <ReviewUpdateForm {reviewDetails} />
            <div class="button-wrapper">
                <button id="cancle-button" on:click={cancleUpdate}>취소</button>
                <button id="update-button" on:click={updateReview}>완료</button>
            </div>
        {:else}
            <ReviewDetail {reviewDetails} />
            {#if reviewDetails.memberId == memberId}
                <div class="button-wrapper">
                    <button id="edit-button" on:click={showUpdateForm}
                        >리뷰수정</button
                    >
                    <button id="edit-button" on:click={deleteReview}
                        >리뷰삭제</button
                    >
                </div>
            {/if}
        {/if}
    </div>
</main>

<style>
    .contatiner {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .button-wrapper {
        display: flex;
        flex-direction: row;
        align-self: flex-end;
        margin-right: 11%;
        margin-bottom: 40px;
        /* align-items: center; */
    }
    button {
        font-family: "Courier New", Courier, monospace;
        padding: 8px;
        margin-left: 15px;
    }
</style>
