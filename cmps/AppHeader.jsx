import { UserMsg } from '../cmps/UserMsg.jsx'

const { Link, NavLink } = ReactRouterDOM

export function AppHeader() {
	return (
		<section>
			<header className="app-header">
				<Link to="/">
					<h3 className="logo">AppSus</h3>
				</Link>
				<nav>
					<NavLink to="/">Home</NavLink>
					<NavLink to="/about">About</NavLink>
					<NavLink to="/mail">Mail</NavLink>
					<NavLink to="/note">Note</NavLink>
					<NavLink to="/book">Books</NavLink>
				</nav>
			</header>
			<UserMsg />
		</section>
	)
}
