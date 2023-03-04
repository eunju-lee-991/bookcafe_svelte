<script>
    import axios from "axios";
    import { onMount } from "svelte";
    import { REST_API_KEY } from "../../store/store.js";
    import ReviewDetail from "../../components/ReviewDetail.svelte"; // component import
    import BookInfo from "../../components/Bookinfo.svelte";
    export let reviewId;

    let reviewDetails = {};
    let bookinfo = {};
    let test = "123";

    axios
        .get("http://localhost:8080/reviews/" + reviewId, {
            withCredentials: true, // cross domain에서 쿠키 받기 위해서  credentials 설정!
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
    <BookInfo {bookinfo} />

    <ReviewDetail {reviewDetails} />
</main>
