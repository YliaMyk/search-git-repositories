let repositories = document.getElementById('repo');
let searchInput = document.getElementById('input')

document.addEventListener('keydown', function(event) {
  if (event.code  == 'Enter') {
    getRepo();
  }
});

const getRepo = async() => {
  let message = searchInput.value;
  await searchRepo(message);
}

const searchRepo = async (message) => {
  return await fetch(`https://api.github.com/search/repositories?q=${message}&type=repositories&per_page=10`).then((res) => {
    if (res) {
      res.json().then(res => {
        let out = ``;
        if (res.items.length === 0) {
          out = `<h1>Ничего не найдено</h1>`;
        }
        res.items.forEach(item => {
          let repo = createCard(item);
          out += repo;
        });
        repositories.innerHTML = out;
      })
    } else {
      alert('Ничего не найдено');
    }
  })
}


const createCard = (repo) => {
  let out = `<div class="card">`;
  out += `<a class="card__name" href="${repo.url}">${repo.owner.login}/${repo.name}</a>`;
  out += `<p class="card__description">${repo.description}</p>`;
  out += `<div class="row">`;
  out += `<a class="card__start card_margin-right" href="${repo.stargazers_url}">`;
  out += `<img class="card__icon" src="img/Star border.svg">`;
  out += `<p>${repo.stargazers_count}</p>`;
  out += `</a>`;
  out += `<p class="card__p card_margin-right">${repo.language}</p>`;
  let date = new Date(repo.updated_at);
  out += `<p class="card__p card_margin-right">Update on ${date.toDateString()}</p>`;
  out += `</div>`;
  out += `</div>`;
  return out;
}

