<script>
  import axios from "axios";
  import queryString from "query-string";

  // 인가코드 받아옴
  // 받아온 인가코드 백엔드(토큰받는 url)에 넘김
  let parsed = {};
  let code = "";
  let message = "로그인 중...";
  let accessToken;

  const testJWT = () => {
    axios
      .get("http://localhost:8080/api/jwt-test", {
        withCredentials: true, 
        headers: {
        Authorization: "Bearer " + accessToken,
  },
      })
      .then((res) => {
        if (res.status == 200) {
          console.log(res);
         
        }
      })
      .catch((err) => {
        console.log('err')
        console.log(err)
      });
  }

  if (typeof window !== "undefined") {
    parsed = queryString.parse(window.location.search);

    if (parsed.code != null) {
      code = parsed.code;
    } else if (parsed.error != null) {
      // 로그인 취소 시 다시 로그인 화면으로 돌아감
      console.log(
        "error: " +
          parsed.error +
          ", error discription: " +
          parsed.error_description
      );
      location.href = "/login";
    }
  }

  if (code != "" && code != null) {
    axios
      .get("http://localhost:8080/api/login/token?code=" + code, {
        withCredentials: true, // cross domain에서 쿠키 받기 위해서  credentials 설정
      })
      .then((res) => {
        if (res.status == 200) {
          console.log(res);
          let propertyCookie =
            "; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/";

          //  쿠키 설정
          let nickname = res.data.member.nickname;
          document.cookie = "nickname=" + nickname + propertyCookie;

          accessToken = res.data.tokenInfo.accessToken;

          // setTimeout(() => location.replace("/main"), 100);
        }
      })
      .catch((err) => {
        if (err.response) {
          console.log(err.response.data);
          alert("잘못된 접근입니다.");
          location.replace("/main");
        }
      });
  }
</script>

<main>
  <h1>{message}</h1>
  <button on:click={testJWT}> JWT TEST </button>
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
