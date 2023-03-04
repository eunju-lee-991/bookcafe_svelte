<script>
    import { beforeUpdate, afterUpdate, onMount, onDestroy } from "svelte";
    import axios from "axios";    
    import { checkLogIn, deleteCookie } from "../../scripts/common";

    let loggedIn = checkLogIn();
    console.log("로그아웃에서 체크 loggedIn : " + loggedIn);
    if(!loggedIn) {
        // 로그아웃 상태면 메인으로 보내기
        location.replace('/main');
    }

    axios.get('http://localhost:8080/logout', {
      withCredentials: true // cross domain에서 쿠키 받기 위해서  credentials 설정!
    }).then((res) => {
        console.log(res);

        //쿠키 날리기 ** JSESSIONID는 CLIENT에서 접근X 서버에서 지워줌 **
        deleteCookie("memberId");
        deleteCookie("nickname");
        
        alert('로그아웃 되었습니다.');
        location.replace('/main');
    }).catch((err) => {
        console.log(err);        
        alert("오류가 발생했습니다");
    });

</script>