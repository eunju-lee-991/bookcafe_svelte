<script>
    export let reviewDetails = {}; 
 
 </script>
 
 <main>
    <span style="font-size: 30px; color:brown">♣♣♣♣</span>    
    <div id="review-form" class="review-container">
       <div class="review-wrapper">
          <div class="title-wrapper">
             <span class="quotation">"</span>
             <input id="edit-title" class="title" value={reviewDetails.title}/>
             <span class="quotation">"</span>
          </div>
          <textarea id="edit-contents" value={reviewDetails.contents}/>
          <div class="additional">
             <span>{reviewDetails.nickname}</span>
             <span class="delimiter">|</span>
             <span>작성일자: {reviewDetails.updatedDate}</span>
          </div> 
          <div class="like-wrapper">LIKE</div>
       </div>
    </div>
 </main>
 
 <style>
    .like-wrapper{
       align-self: flex-end;
 
    }
 
    .review-container {
       /* border: 1px solid black; */
       border-top: 2px solid black;
       border-bottom: 2px solid black;
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
       margin: 5px;
    }
    .additional .delimiter {
       font-weight: bold;
       color: #757272;
    }
    .quotation {
       font-family: fantasy;
       font-size: 45px;
       margin: 11px;
    }
    textarea{
        width: 60%;
        height: 170px;
       font-size: 20px;
        margin-bottom: 40px;
    }
    .title {
        width: 85%;
       font-size: 20px;
        margin-bottom: 40px;
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
 