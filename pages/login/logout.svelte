<script>
    import { beforeUpdate, afterUpdate, onMount, onDestroy } from "svelte";
    import axios from "axios";
    import { checkLogIn, deleteCookie } from "../../scripts/common";

    let loggedIn = checkLogIn();
    if (!loggedIn) {
        // 로그아웃 상태면 메인으로 보내기
        location.replace("/main");
    }

    axios
        .get("http://localhost:8080/logout", {
            withCredentials: true, // cross domain에서 쿠키 받기 위해서  credentials 설정!
        })
        .then((res) => {
            console.log(res);
            if (res.status == 204) {
                deleteCookie("memberId");
                deleteCookie("nickname");

                alert("로그아웃 되었습니다.");
                location.replace("/main");
            }
        })
        .catch((err) => {
            console.log(err.response.data);
            alert("오류가 발생했습니다");
        });
</script>

<main>
    <h1>로그아웃...</h1>
</main>

<style>
main {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
        background-color: #222;
}

h1 {
  text-align: center;
  color: wheat;
}
</style>
