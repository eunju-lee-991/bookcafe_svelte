<script>
    export let bookinfos = [];

    let slice = (str) => {
        str = str.substr(0, 130);
        str += '...';
        return str;
    }
</script>

<h2>
    Books
</h2>
{#each bookinfos as bookinfo}
<div>
    <p align="left"> <span>title:</span> {bookinfo.title} </p>
    <p align="left"> <span>authors:</span> {bookinfo.authors} </p>
    <p align="left"> <span>contents:</span> 
        {#if bookinfo.contents.length > 130 }            
        {slice(bookinfo.contents)}
        {:else}        
            {bookinfo.contents}
        {/if} 
    </p>
    <p align="left"> <span>publisher:</span> {bookinfo.publisher} </p>
    <p> <img src={bookinfo.thumbnail} alt="이미지를 표시할 수 없습니다" /> </p>
</div>
{/each}

<style>
    div {
        float: left;
        width: 30%;
        height: 400px;
        padding:5px;
        margin:5px;
        border: 1px solid #f5d682;
    }

    p {
        margin:2px;
    }

    span {
        font-size: 25px;
		font-weight: 300;
    }
 </style>   