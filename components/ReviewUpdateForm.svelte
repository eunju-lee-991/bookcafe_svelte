<script>
    export let reviewDetails = {}; 
 
 </script>
 
 <main> 
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
        background-color: #65646d; /* 배경색 */
        border-top: 3px solid rgb(0, 0, 0);
        border-bottom: 3px solid rgb(0, 0, 0);
        border-radius: 15px;
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

    input {
        flex: 1;
        border: none;
        border-right: 1px solid #ddd;
        border-radius: 5px ;
        padding: 10px;
        box-sizing: border-box;
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
       color: whitesmoke;
    }
    textarea{
        width: 68%;
        height: 150px;
       font-size: 20px;
        margin-bottom: 40px;
        flex: 1;
        border: none;
        border-right: 1px solid #ddd;
        border-radius: 5px;
        padding: 10px;
        box-sizing: border-box;
    }
    .title {
        width: 85%;
       font-size: 20px;
       margin-top: 10px;
        margin-bottom: 40px;
    }
    .title-wrapper {
       width: 75%;
       display: flex;
       justify-content: center;
       align-items: center;
       flex-direction: row;
       margin: 15px;
    }
 </style>
 