<script>
    import axios from "axios";

    export let id;
    let memberInfo = {};

    const getMemberInfo = (id) => {
        axios
            .get("http://localhost:8080/members/" + id)
            .then((response) => {
                console.log("getMemberInfo");
                console.log(response);
                memberInfo = response.data;
            })
            .catch((error) => {
                console.log(error);
                alert("에러가 발생했습니다.");
            });
    };

    getMemberInfo(id);
</script>

<main>
    <div class="container">
        <div class="image-wrapper">
            <img
                src={memberInfo.profileImageUrl}
                alt="해당 프로필의 이미지를 표시할 수 없습니다"
            />
        </div>
        <div class="info-wrapper">
            <span> 닉네임 : {memberInfo.nickname}</span>
            <span> 이메일 : {memberInfo.email}</span>
            <span> 가입일자 : {memberInfo.joinDate}</span>
            <a href="{memberInfo.id}/reviews"> 내가 쓴 리뷰 보기</a>          
        </div>
    </div>
</main>

<style>
    .container {
        border-top: 1px dotted rgb(231, 229, 229);
        border-bottom: 1px dotted rgb(230, 227, 227);
        margin-left: 30%;
        padding: 10px;
        display: flex;
        flex-direction: row;
        align-items: center;
        width: 750px;
        color: #dfd9d9;
        
    }

    img {
        width: 300px;
        height: auto;
    }

    .image-wrapper {
        border: 1px groove rgb(196, 192, 192);
        padding: 3px;
        display: flex;
        align-items: center;
    }

    .info-wrapper {
        display: flex;
        flex-direction: column;
    }

    .info-wrapper span {
        margin: 10px;
        font-size: 17px;
        font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
    }
    a {
        color: black; /* 링크 색상 */
        text-decoration: none; /* 밑줄 제거 */
        display: inline-block; /* 버튼 스타일 적용 */
        background-color: #ece8e8; /* 배경색 */
        padding: 10px 20px; /* 내부 패딩 */
        border-radius: 5px; /* 둥근 모서리 */
        cursor: pointer; /* 포인터 모양으로 변경 */
        transition: background-color 0.3s; /* 마우스 오버시 배경색 변경 애니메이션 */
        margin: 30px;
        text-align: center;
        width: auto;
    }

    a:hover {
        background-color: #dfd9d9; /* 마우스 오버시 배경색 변경 */
    }
    main{
        background-color: #222;
        height: 100vh;
        padding: 70px;
    }
</style>
