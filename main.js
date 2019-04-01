(function () {
    const url = "https://api.github.com/users";
    const cliente_id = "550bae3de88704b5376f";
    const cliente_secret = "475d069da7f30edd260dd4aa3dd8c22f453fa90d";
    const count = 7;

    async function getUsuario(usuario) {

        const reposResponse = await fetch(`${url}/${usuario}/repos?per_page=${count}&client_id=${cliente_id}&client_secret=${cliente_secret}`);
        //5 repositorios por pagina ordenados do mais recente
        //const reposResponse = await fetch(`${url}/${usuario}/repos?client_id=${cliente_id}&client_secret=${cliente_secret}`);

        const starredResponse = await fetch(`${url}/${usuario}/starred?client_id=${cliente_id}&client_secret=${cliente_secret}`);
        // https://api.github.com/users/vuejs/starred{/owner}{/repo}
        const repos = await reposResponse.json(); // await aki pra esperar a conversao
        const starred = await starredResponse.json(); // await aki pra esperar a conversao

        return { repos, starred };
    }

    function showRepos(repos) {
        let output = '';

        repos.forEach(repo => {
            output += `    
            <div class="card card-body mb-2 border border-dark">
            <div class="row">
                <div class="col-md-6"><a href="${repo.html_url}" target="_black">${repo.name}</a></div>
            </div>
        </div>`
        });

         document.getElementById("result").innerHTML = output;
    }

    function showStarred(starred) {
        let output2 = '';

        starred.forEach(star => {
            output2 += `    
            <div class="card card-body mb-2 border border-dark">
            <div class="row">
            <div class="col-md-6">
                <a href="${star.html_url}" target="_black">${star.name}</a>
               <!-- ${star.name} mostra nome do projeto que foi marcado com strela --> 
            </div>
                <div class="col-md-6">
                    <span class="badge badge-primary">${star.owner.login}</span>
                    <!-- Mostra o nome do usuario do git -->
                    <span class="badge badge-success">${star.owner.repos_url}</span>
                    <!-- Mostra o caminho da url -->
                </div>
            </div>
        </div>`
        });

        document.getElementById("result").innerHTML = output2;
    }

    document.getElementById("btn_repos").addEventListener("click", getRepos);

    function getRepos() {
        var usuario = document.getElementById("buscar").value;
        getUsuario(usuario).then(res => {
            showRepos(res.repos)
        });
    }

    document.getElementById("btn_starred").addEventListener("click", getStarred);

    function getStarred() {
        var usuario = document.getElementById("buscar").value;
        getUsuario(usuario).then(res => {
            showStarred(res.starred)
        });
    }
})();  