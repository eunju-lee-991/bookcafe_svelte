<script>
	import Main from "../pages/main.svelte";
	import Login from "../pages/login.svelte";
	import Logout from "../pages/logout.svelte";
	import { Router, Link, Route } from "svelte-routing";
	import Authorization from "../pages/authorization.svelte";

	export let url = "";
</script>

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
</style>

<main>	
	<Router url={url}>
		<nav>
			<a href="/main">MAIN</a>
			<a href="/login">LOGIN</a> 	
			<a href="/logout">LOGOUT</a> 	
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
		</div>
	</Router>
</main>
