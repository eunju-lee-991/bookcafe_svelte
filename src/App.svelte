<script>
	import Main from "../pages/main.svelte";
	import Login from "../pages/login.svelte";
	import { Router, Link, Route } from "svelte-routing";
	import Authorization from "../pages/authorization.svelte";

	export let url = "";
</script>

<main>
	
	<Router url={url}>
		<nav>
			<Link to="/main">MAIN</Link>
			<Link to="/login">LOGIN</Link> 	
		</nav>
		<div>
			<Route path="" component={Main} />
			<Route path="main" component={Main} />
			<Route path="login" component={Login} />
			<Route path="login/token" component={Authorization} />
		</div>
	</Router>
</main>
