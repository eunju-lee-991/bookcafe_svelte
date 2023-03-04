<script>
    import { beforeUpdate, afterUpdate, onMount, onDestroy } from "svelte";
    import { REST_API_KEY, REDIRECT_URI } from "../../store/store.js";
    import { checkLogIn } from "../../scripts/common.js";

    let loggedIn = checkLogIn();
    console.log("여기는 로그인에서 체크 loggedIn : " + loggedIn);

    if (loggedIn) {
        // 로그인 상태면 메인으로 보내기
        alert("로그인 상태 location.replace('/main')");
    }

    let scope = "profile_image,account_email,gender,age_range,birthday";
    const loginUrl =
        "https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=" +
        $REST_API_KEY +
        "&redirect_uri=" +
        $REDIRECT_URI +
        "&scope=" +
        scope;

    console.log(loginUrl);

    const login = () => {
        location.href = loginUrl;
    };
</script>

<main id="main">
    <button on:click={login}>
        <img src="images/kakao_login_img.png" alt="이미지없음" />
    </button>
</main>

<style>
    img{
        width: 100%;
        height: 100%;
    }

    button {
        width: 380px;
        height: auto;
        border: none;
        cursor: pointer;
        margin-top: 150px;
    }

    main {
        align-items: flex-start;
        display: flex;
        justify-content: center;
        width: 100%;
        height: 100vh;
        background-image: url("../images/book_background.jpg");
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center center;
    }
</style>
