<script>
	import Main from "../pages/main.svelte";
	import Login from "../pages/login.svelte";
	import { Router, Link, Route } from "svelte-routing";
	import Token from "../pages/token.svelte";

	export let url = "";
</script>

<main>
	
	<Router url={url}>
		<nav>
			<Link to="/main">MAIN</Link>
			<Link to="/login">LOGIN</Link>
		</nav>
		<div>
			<Route path="main" component={Main} />
			<Route path="login" component={Login} />
			<Route path="login/token" component={Token} />
		</div>
	</Router>
</main>
