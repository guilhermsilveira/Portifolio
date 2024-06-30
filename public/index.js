async function fetchGitHubData() {
    try {
        const res = await fetch('https://api.github.com/users/guilhermsilveira');
        const data = await res.json();

        document.getElementById('profile-image').src = data.avatar_url;
        document.getElementById('name').innerText = data.name || 'N/A';
        document.getElementById('bio').innerText = data.bio || 'N/A';
        document.getElementById('location').innerText = `Location: ${data.location || 'N/A'}`;
        document.getElementById('company').innerText = data.company ? `Company: ${data.company}` : '';
        document.getElementById('blog').innerText = data.blog ? `Blog: ${data.blog}` : '';
        document.getElementById('twitter').innerText = data.twitter_username ? `Twitter: @${data.twitter_username}` : '';
        document.getElementById('followers').innerText = `Followers: ${data.followers}`;
        document.getElementById('following').innerText = `Following: ${data.following}`;
        document.getElementById('repos').innerText = `Public Repos: ${data.public_repos}`;
        document.getElementById('gists').innerText = `Public Gists: ${data.public_gists}`;
        document.getElementById('created_at').innerText = `Created at: ${new Date(data.created_at).toLocaleDateString()}`;
        document.getElementById('updated_at').innerText = `Updated at: ${new Date(data.updated_at).toLocaleDateString()}`;

        const githubLink = document.getElementById('github-link');
        githubLink.href = data.html_url;
        githubLink.innerText = data.html_url;

    } catch (error) {
        console.error('Erro ao buscar dados do GitHub:', error);
    }
}

fetchGitHubData();


document.addEventListener('DOMContentLoaded', function () {
    fetch('https://api.github.com/users/guilhermsilveira/repos')
        .then(response => response.json())
        .then(data => {
            const repositoriesList = document.getElementById('repositories-list');

            data.forEach(repo => {
                const repoCard = document.createElement('div');
                repoCard.classList.add('col');
                repoCard.innerHTML = `
                    <div class="card">
                        <img src="assets/imgs/github.png" class="card-img-top" alt="GitHub">
                        <div class="card-body">
                            <h5 class="card-title">${repo.name}</h5>
                            <p class="card-text">${repo.description || 'Sem descrição'}</p>
                            <p class="card-text">Estrelas: ${repo.stargazers_count}</p>
                            <p class="card-text">Forks: ${repo.forks}</p>
                        </div>
                    </div>
                `;
                repositoriesList.appendChild(repoCard);
            });
        })
        .catch(error => console.error('Erro ao carregar repositórios:', error));
});