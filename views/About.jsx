
export function About() {
    const teamMembers = [
        {
            name: "Daniel Kirushin",
            // image: "./assets/img/lupin.jpg",
            description: "short description .",
            // facebook: "https://facebook-url.com",
            // linkedin: "https://linkedin-url.com",
            // github: "https://github.com/OmerHassin"
        },
        {
            name: "Alon Lavi",
            // image: "./assets/img/kfir.png",
            description: "short description ",
            // facebook: "https://facebook-url.com",
            // linkedin: "https://linkedin-url.com",
            // github: "https://github.com/kfirshaked45"
        }
    ];

    return (
        <section className="about">
            <h1>Project create:</h1>
            {teamMembers.map((member, index) => (
                <div key={index} className="team-member">
                    <img src={member.image}  className="profile-picture" />
                    <h2>{member.name}</h2>
                    <p>{member.description}</p>
                    <div className="social-media-links">
                        <a href={member.facebook} target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-facebook fa-2xl"></i></a>
                        <a href={member.linkedin} target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-linkedin fa-2xl"></i></a>
                        <a href={member.github} target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-github fa-2xl"></i></a>
                    </div>
                </div>
            ))}
        </section>
    )
  }
