<script>
    import { beforeUpdate, afterUpdate, onMount, onDestroy } from "svelte";
    import { REST_API_KEY, REDIRECT_URI } from "../store/store.js";
    import axios from "axios";    

    

    // if(loggedin) {
    //     // 로그인 상태면 메인으로 보내기
    // }

    const loginUrl = "https://kauth.kakao.com/oauth/authorize?response_type=code&client_id="+$REST_API_KEY+"&redirect_uri="+$REDIRECT_URI;

    const login = () => {
        location.href = loginUrl;
    }
</script>

<main>
    <button on:click={login}> 
        <img src="images/kakao_login_img.png" alt="이미지없음" />
    </button>    
</main>

<style>
    button {
        border: none;
        cursor: pointer;
    }
</style>
