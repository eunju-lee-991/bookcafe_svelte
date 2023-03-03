<script>
    export let bookinfo = {};

    let slice = (str) => {
        str = str.substr(0, 130);
        str += "...";
        return str;
    };
</script>

<main>
    <div class="container" style="border: 1px solid black; border-radius: 5px; border-color: #BEBEBE;">
        <div class="image-wrapper">
            <img src={bookinfo.thumbnail} alt="이미지를 표시할 수 없습니다" />
        </div>
        <div class="content-wrapper">
            <h2>{bookinfo.title}</h2>
            <p>authors: {bookinfo.authors}</p>
            <p>isbn: {bookinfo.isbn}</p>
            <p>
                contents:
                {#if bookinfo.contents.length > 130}
                    {slice(bookinfo.contents)}
                {:else}
                    {bookinfo.contents}
                {/if}
            </p>
            <p>publisher: {bookinfo.publisher}</p>
        </div>
    </div>
</main>

<style>
    img {
        width: 100%;
        height: auto;
    }

    p {
        margin: 1px;
        color: #333; /* 글꼴 색상 */
        line-height: 2;
        font-size: 18px;
        font-weight: 300;
        text-align: left; /* 텍스트 정렬 */
    }

    .container {
        width: 1300px;
        margin: 30px;
        padding: 10px;
        display: flex;
        align-items: center; /* 이미지와 나머지 요소를 세로 방향으로 정렬 */
        gap: 20px; /* 이미지와 나머지 요소 사이의 간격 */
        background-color: #e4e4eb;
    }

    .image-wrapper {
        margin: 10px;
        width: 17%;
        flex: 0 0 auto; /* 이미지가 자신의 크기를 유지할 수 있도록 설정 */
    }

    .content-wrapper {
        display: flex;
        flex-direction: column; /* 제목, 내용, 글쓴이를 세로 방향으로 정렬 */
        flex: 1; /* 나머지 공간을 차지할 수 있도록 설정 */
    }
</style>
