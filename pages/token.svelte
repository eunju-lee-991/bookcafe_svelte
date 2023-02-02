<script>
    import queryString from 'query-string';
    
    // 인가코드 받아옴
    // 받아온 인가코드 백엔드(토큰받는 url)에 넘김
    let parsed = {};

if (typeof window !== "undefined") {
  parsed = queryString.parse(window.location.search);
}

console.log('code: ' + parsed);



</script>

<h1> 리다이렉트 </h1>