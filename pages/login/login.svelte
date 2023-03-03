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

    const loginUrl =
        "https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=" +
        $REST_API_KEY +
        "&redirect_uri=" +
        $REDIRECT_URI;

    const login = () => {
        location.href = loginUrl;
    };

</script>

    <main id="main">
        <button on:click={login} >
            <img src="images/kakao_login_img.png" alt="이미지없음" />
        </button>
    </main>

<style>
    button {
        border: none;
        cursor: pointer;
    }

    main {
        width: 100%;
        height: 100vh;
        background-image: url('../images/book_background.jpg');
        background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
    }
</style>
