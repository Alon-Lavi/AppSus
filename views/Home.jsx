const { Link } = ReactRouterDOM

export function Home() {
	return (
		<section className="home">
			<div className="content-container">
				<h1>Welcome to AppSus!</h1>
				{/* <img src="./assets/img/home.png" className="home-img" alt="Home" /> */}
			</div>
			<div className="features">
				<Link to="/note">
					<div className="feature">
						<img src="./assets/img/keep.svg" alt="Google Keep Clone" className="feature-image" />
						<h2>Google Keep Clone</h2>
						<p>
							Stay organized with our Google Keep clone, a note-taking app that allows you to create, organize, and manage
							your notes seamlessly.
						</p>
					</div>
				</Link>

				<Link to="/mail">
					<div className="feature">
						<img src="./assets/img/gmail.svg" alt="Gmail Clone" className="feature-image" />
						<h2>Gmail Clone</h2>
						<p>
							Manage your emails efficiently with our Gmail clone, providing a familiar and intuitive interface for
							effective communication.
						</p>
					</div>
				</Link>

				<Link to="/book">
					<div className="feature">
						<img src="./assets/img/book.svg" alt="google books" className="feature-image" />
						<h2>Books</h2>
						<p>Every book from Google books, in your device! Providing full books descriptions, prices and sale.</p>
					</div>
				</Link>
			</div>
		</section>
	)
}
