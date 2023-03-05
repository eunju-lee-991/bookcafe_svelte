<script>
	import Main from "../pages/main.svelte";
	import Login from "../pages/login/login.svelte";
	import Logout from "../pages/login/logout.svelte";
	import { Router, Link, Route } from "svelte-routing";
	import Authorization from "../pages/login/authorization.svelte";
	import { getCookie, checkLogIn } from "../scripts/common.js";
	import ReviewDetail from "../pages/review/reviewDetail.svelte";
	import ReviewList from "../pages/review/reviewList.svelte";
import MemberReviewList from "../pages/review/memberReviewList.svelte";

	export let url = "";

	let loggedIn = false;
	let nickname = getCookie("nickname");
	loggedIn = checkLogIn();
</script>

<main>
	<Router {url}>
		<nav>
			<a href="/main">MAIN</a>
			<a href="/reviews">REVIEWS</a>
			{#if loggedIn}
			<!-- 나중에 마이페이지 안에서 my review 조회할 수 있게  -->
			<a href="/members/:id/reviews">MY REVIEW</a>
				<a href="/logout">LOGOUT</a>
			{:else}
				<a href="/login">LOGIN</a>
			{/if}
			{#if nickname}
				<span class="welcome"> {nickname}님, 환영합니다 </span>
			{/if}
			<!-- 
			<Link to="/main">MAIN</Link>
			<Link to="/login">LOGIN</Link> 	
			<Link to="/logout">LOGOUT</Link> 	 -->

		</nav>
		<div>
			<Route path="" component={Main} />
			<Route path="main" component={Main} />
			<Route path="login" component={Login} />
			<Route path="login/token" component={Authorization} />
			<Route path="logout" component={Logout} />
			<Route path="reviews" component={ReviewList} />
			<Route path="reviews/:reviewId" component={ReviewDetail} />
			<Route path="/members/:id/reviews" component={MemberReviewList} />
		</div>
	</Router>
</main>

<style>
	nav {
		display: flex;
		justify-content: flex-start; /* Change this */
		align-items: center;
		background-color: #333;
		padding: 10px;
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
</style>
