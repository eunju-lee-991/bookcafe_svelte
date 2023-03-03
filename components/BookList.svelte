<script>
    import BookInfo from "./Bookinfo.svelte";
    export let bookinfos = [];
</script>

<main>
    <div class="bookinfo-container">
        {#each bookinfos as bookinfo}
            <BookInfo {bookinfo} />
        {/each}
    </div>
</main>

<style>
    main {
        font-family: "Noto Sans KR", sans-serif;
    }

    .bookinfo-container {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
    }
</style>
