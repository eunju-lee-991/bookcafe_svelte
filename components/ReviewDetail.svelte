<script>
   import axios from "axios";
   import { afterUpdate, onMount } from "svelte";
   import { getCookie } from "../scripts/common.js";
   export let reviewDetails = {}; // Component 호출하는 곳에서 보내는 데이터 받기

   let loginMemberId = getCookie("memberId");
   let likeId;
   let isCliked;
   let likeButton;
   let likeCount;

   const clickLike = () => {
      if (!loginMemberId) {
         alert("로그인이 필요합니다.");
         return;
      }
      if (loginMemberId == null) {
         console.log("loginMemberId == null");
      }

      if (isCliked) {
         cancleLike();
      } else {
         doLike();
      }
      isCliked = !isCliked;
   };

   const doLike = () => {
      const data = {
         reviewId: reviewDetails.reviewId,
         memberId: loginMemberId,
      };

      axios
         .post("http://localhost:8080/likes", data, {
            withCredentials: true,
         })
         .then((response) => {
            console.log(response);
            console.log(response.data.likeId);

            likeId = response.data.likeId;
            isCliked = true;
            likeButton.classList.add("active");
            likeCount += 1;
         })
         .catch((error) => {
            console.log(error.response);
         });
   };

   const cancleLike = () => {
      console.log("delete " + likeId);

      axios
         .delete("http://localhost:8080/likes/" + likeId, {
            withCredentials: true,
         })
         .then((response) => {
            console.log(response.status);
            likeId = null;
            isCliked = false;
            likeButton.classList.remove("active");
            likeCount -= 1;
         })
         .catch((error) => {
            console.log(error.response);
         });
   };

   $: checkClick(reviewDetails); // reviewDetails 변경될 때마다 checkClikc 실행

   const checkClick = () => {
      likeCount = reviewDetails.likeCount; // reviewDetails 최초 변경 시 likeCount 세팅

      if (Object.keys(reviewDetails).length === 0 || loginMemberId == null) {
         return;
      }

      let params =
         "?memberId=" + loginMemberId + "&reviewId=" + reviewDetails.reviewId;

      console.log(params);

      axios
         .get("http://localhost:8080/likes" + params)
         .then((response) => {
            console.log(response);
            console.log(response.data.likeId);

            isCliked = response.data.clicked;
            console.log(isCliked);

            if (isCliked) {
               likeId = response.data.likeId;
               likeButton.classList.add("active");
            } else {
            }
         })
         .catch((error) => {
            console.log(error.response);
         });
   };

   onMount(() => {
      likeButton = document.getElementById("likeButton");
   });
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
            <button on:click={clickLike}>
               <img
                  src="/images/like-button.png"
                  alt="LIKE"
                  id="likeButton"
                  class={isCliked == true ? "active" : ""}
               />
            </button>
            <span> {likeCount} 명이 좋아합니다.</span>
         </div>
      </div>
   </div>
</main>

<style>
   .like-wrapper {
      align-self: flex-end;
      margin: 15px;
      color: #e0dfe6;
      align-items: center;
   }

   .like-wrapper span {
      font-size: 17px;
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
