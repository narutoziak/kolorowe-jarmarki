document.addEventListener('DOMContentLoaded', e => {
    const path = location.pathname.split('/');
    fetch(`assets/content/nav.html`)
    .then( response => {return response.text();})
    .then( dane => {
        const navbar =document.querySelector('.navbar');
        navbar.innerHTML+= dane;
        
        const nav = document.querySelector('.navbar-nav ');

        if(sessionStorage.getItem("userSession") === null){
            nav.innerHTML+= `
                <li class="nav-item"><a class="nav-link" href="login.html">Zaloguj się</a></li>
            `;
        }else{
            nav.innerHTML+= `
            <li class="nav-item"><a class="nav-link" href="home.html">Moje konto</a></li>
            <li class="nav-item logout"><a class="nav-link" href="index.html" >Wyloguj się</a></li>
            `;
            const logout = document.querySelector('.logout');
            
            logout.addEventListener('click', e =>{
                e.preventDefault();
                location.replace('index.html');
                sessionStorage.clear();
            });
        }

            });
});

const getTime = (product) => {
    let time = product.created_at.toDate();
    // console.log(time, time.getDay());
    let day = time.getDate();
    if(day < 10)
        day=`0${day}`;
    let month = time.getMonth();
    let year = time.getFullYear();
    let showTime = `${day}.${month+1}.${year}`
    return showTime
}

const imgTemplate = (product) => {
    if (product === ''){
        return `assets/img/noimg.jpg`
    }else{
        return product
    }
}