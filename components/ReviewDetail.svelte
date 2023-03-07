<script>
   import axios from "axios";
   export let reviewDetails = {}; // Component 호출하는 곳에서 보내는 데이터 받기
   let isCliked;
   let likeCount;
   // axios.post로 /like

   //get 할 때는 /reviews/:id/count-like


</script>

<main>
   <div id="review-form" class="review-container">
      <div class="review-wrapper">
         <div class="title-wrapper">
            <span class="quotation">"</span>
            <span class="title">{reviewDetails.title}</span>
            <span class="quotation">"</span>
         </div>
         <p style="color: black;">{reviewDetails.contents}</p>
         <div class="additional">
            <span>{reviewDetails.nickname || "존재하지 않는 회원"}</span>
            <span class="delimiter">|</span>
            <span>작성일자: {reviewDetails.updatedDate}</span>
         </div>

         <div class="like-wrapper">
            <button on:click={() => isCliked = !isCliked}>
               <img
                  src="/images/like-button.png"
                  alt="sdasd"
                  class={isCliked == true ? "active" : ""}
               />
            </button>
            <span> LIKE : like숫자</span>
         </div>
      </div>
   </div>
</main>

<style>
   .like-wrapper {
      align-self: flex-end;
      margin: 15px;
   }
   button {
      margin-right: 10px;
      border-radius: 25px;
      cursor: pointer;
      background-color: #e0dfe6;
   }

   img {
      width: 30px;
      filter: opacity(0.4) drop-shadow(0 0 0 rgb(253, 253, 253));
   }

   .active {
      filter: opacity(1) drop-shadow(0 0 0 rgb(253, 253, 253));
   }

   .review-container {
      border-radius: 15px;
      background-color: #65646d;
      border-top: 3px solid rgb(0, 0, 0);
      border-bottom: 3px solid rgb(0, 0, 0);
      display: flex; /* inner-div를 flex container로 설정 */
      justify-content: space-between;
      align-items: center;
      margin-bottom: 50px;
   }

   .review-wrapper {
      /* border: 1px solid black; */
      width: 1100px;
      margin: 10px;
      display: flex;
      flex: 1;
      flex-direction: column;
      align-items: center;
   }

   .additional {
      display: flex;
      flex-direction: row;
      margin-bottom: 10px;
   }

   .additional span {
      color: black;
      margin: 5px;
   }
   .additional .delimiter {
      font-weight: bold;
      color: #333232;
   }
   .quotation {
      font-family: fantasy;
      font-size: 45px;
      margin: 11px;
   }
   .title {
      font-size: 35px;
      color: black;
   }
   .title-wrapper {
      width: 70%;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: row;
      margin: 15px;
   }
   p {
      margin: 45px;
      font-size: 20px;
   }
</style>
