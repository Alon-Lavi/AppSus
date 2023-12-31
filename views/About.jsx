export function About() {
	const teamMembers = [
		{
			name: 'Daniel Kirushin',
			image: './assets/img/daniel.jpg',
			// facebook: "",
			// linkedin: "",
			// github: ""
		},
		{
			name: 'Alon Lavi',
			image: './assets/img/alon.jpg',
			facebook: 'https://www.facebook.com/alon.lavi1',
			linkedin: 'https://www.linkedin.com/in/alon-lavi-91344523b/',
			github: 'https://github.com/Alon-Lavi',
		},
	]

	return (
		<section className="about">
			{teamMembers.map((member, index) => (
				<div key={index} className="team-member">
					<img src={member.image} className="profile-picture" />

					<h2>{member.name}</h2>

					<p>{member.description}</p>

					<div className="social-media-links">
						<a href={member.facebook} target="_blank" rel="noopener noreferrer">
							<i className="fa-brands fa-facebook fa-2xl"></i>
						</a>

						<a href={member.linkedin} target="_blank" rel="noopener noreferrer">
							<i className="fa-brands fa-linkedin fa-2xl"></i>
						</a>

						<a href={member.github} target="_blank" rel="noopener noreferrer">
							<i className="fa-brands fa-github fa-2xl"></i>
						</a>
					</div>
				</div>
			))}
		</section>
	)
}
