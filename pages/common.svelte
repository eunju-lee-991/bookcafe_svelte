<script>
// login out에서 common 함수로 쿠키 가져와서 처리하기
// 어디 폴더 아래 둘지 정리 ㄱㄱㄱ

    const test = (name) => { // memberId 쿠키 가쟈오기 테스트
        const cookies = document.cookie.split(";");

        cookies.forEach(cookie => {
            const _cookie = cookie.trim();
            if(_cookie.startsWith(name+"=")){
                console.log(cookie.substring(name.length + 1));
                // return cookie.substring(name.length + 1);
            }
        });
        console.log("null");
        // return null;
  }
</script>