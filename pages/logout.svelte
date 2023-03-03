<script>
    import { beforeUpdate, afterUpdate, onMount, onDestroy } from "svelte";
    import axios from "axios";    

    // if(loggedin) {
    //     // 로그아웃 상태면 그냥 메인으로 보내기
    // }

    axios.get('http://localhost:8080/logout', {
      withCredentials: true // cross domain에서 쿠키 받기 위해서  credentials 설정!
    }).then((res) => {
        console.log(res);

        //쿠키 날리기


        
        alert("location.replace('/main')");
    }).catch((err) => {
        console.log(err);        
        alert("오류가 발생했습니다");
    })

</script>