<script>
    import BookInformation from "./BookInformation.svelte";
    export let bookinfos = [];
</script>

<main>
    <div class="bookinfo-container">
        {#each bookinfos as bookinfo}
            <BookInformation {bookinfo} writable={true}  />
        {/each}
    </div>
</main>

<style>
    main {
        font-family: "Noto Sans KR", sans-serif;
        background-color: #222;
        height: 100vh;
    }

    .bookinfo-container {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        background-color: #222;
    }
        
</style>
