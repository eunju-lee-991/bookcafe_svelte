<script>
	import Main from "../pages/main.svelte";
	import Login from "../pages/login/login.svelte";
	import Logout from "../pages/login/logout.svelte";
	import { Router, Link, Route } from "svelte-routing";
	import Authorization from "../pages/login/authorization.svelte";
	import { getCookie, checkLogIn } from "../scripts/common.js";
	import ReviewDetail from "../pages/review/reviewDetail.svelte";
	import ReviewList from "../pages/review/reviewList.svelte";
	import Mypage from "../pages/myPage.svelte";
	import MemberReviewList from "../pages/review/memberReviewList.svelte";

	export let url = "";

	let loggedIn = checkLogIn();
	let memberId = getCookie("memberId");
	let nickname = getCookie("nickname");
</script>

<main>
	<Router {url}>
		<nav>
			<a href="/main">MAIN</a>
			<a href="/reviews">REVIEWS</a>
			{#if loggedIn}
				<a href="/logout">LOGOUT</a>
			{:else}
				<a href="/login">LOGIN</a>
			{/if}
			{#if nickname}
				<span class="welcome"> 
					<a href="/members/{memberId}" class="nickname"> {nickname}</a>
					님, 환영합니다 
				</span>
			{/if}
		</nav>
		<div>
			<Route path="" component={Main} />
			<Route path="main" component={Main} />
			<Route path="login" component={Login} />
			<Route path="login/token" component={Authorization} />
			<Route path="logout" component={Logout} />
			<Route path="reviews" component={ReviewList} />
			<Route path="reviews/:reviewId" component={ReviewDetail} />
			<Route path="/members/:id" component={Mypage} />
			<Route path="/members/:id/reviews" component={MemberReviewList} />
		</div>
	</Router>
</main>

<style>
	nav {
		display: flex;
		justify-content: flex-start; /* Change this */
		align-items: center;
		background-color: #303030;
		padding: 10px;
		height: 50px;
		color: #fff;
	}

	nav a {
		color: #fff;
		text-decoration: none;
		margin: 20px;
	}

	nav a:hover {
		text-decoration: underline;
	}

	.welcome {
		margin-left: auto;
		margin-right: 20px;
	}

	.nickname {
		margin: 2px;
		margin-right: 6px;
		font-size: 16.5px;
		text-decoration: solid;
        cursor: pointer; /* 포인터 모양으로 변경 */
	}
</style>
