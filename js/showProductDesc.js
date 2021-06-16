const showProductDesc = (product, id) => {
    const modal = document.querySelector('.modal-content');
    const userSeller =JSON.parse(localStorage.getItem(product.author));
        let html = `<div class="modal-header">
    <h5 class="modal-title" id="exampleModalLabel">Oferta sprzedaży użytkownika <span class="text-primary">${product.author}</span></h5>
    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <div class="modal-body">
        <div class="modal--product">
            <div class="item--modal">
                <h3 class="fw-bold" >${product.title}</h3>
                <p>${id}</p>
                <p>Dodano: ${getTime(product)}</p>
                <p class="productName"><span>Nazwa:</span> ${product.description}</p>
                <p class="productPrice"><span>Cena:</span> ${product.cena} zł</p>
                <p class="productSpecs"><span>Opis szczegółowy:</span> ${product.long_desc}</p>
            </div>
            <div class="item--image">
            <a href="${product.img_address}" data-lightbox="${product.author}" data-title="${product.title}">
                <img src="${product.img_address}" class="img-thumbnail img-fluid" alt="${product.title}" data-lightbox="${product.author}" data-title="${product.img_address}">
            </a> 
            </div>
        </div>
        <hr>
        <div>
            <h3>Dane kontaktowe</h3>
            <p>Imię sprzedawcy: ${userSeller.name}</p>
            <p>Email sprzedawcy: <a href="mailto:${userSeller.email}">${userSeller.email}</a></p>
            <p>Województwo sprzedawcy: ${userSeller.voivode}</p>
            <p class="phone--number">Nr telefonu: <button type="button" class="btn btn-primary show--phonenr">Pokaż numer telefonu</button></p>
        </div>
    </div>
    <div class="modal-footer">`;
        if(userSession.radioType === 'seller'){
        html += ` <button type="button" style="display:none;" class="btn btn-success add--or--remove--fav"></button>
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Zamknij</button>
            <h3 class="feedback"></h3>
            </div>`;
        }else{
            html += ` <button type="button" class="btn btn-success add--or--remove--fav"></button>
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Zamknij</button>
            <h3 class="feedback"></h3>
            </div>`;
        }
        // Dodaj do ulubionych <i class="bi bi-star text-warning">
         modal.innerHTML = html;
         const btnPhone = document.querySelector('.show--phonenr');
         btnPhone.addEventListener('click', e => {
             e.preventDefault();
             const nr = document.querySelector('.phone--number');
             btnPhone.remove();
             nr.innerHTML += userSeller.tel;
         });
}

const addToFavourite = (product ,id) => {
        showProductDesc(product, id);
        // save product to localStorage and update sessionStorage
        const btnFav = document.querySelector('.add--or--remove--fav');
        btnFav.innerHTML = `Dodaj do ulubionych <i class="bi bi-star text-warning">`;
        const error = document.querySelector('.feedback');
        btnFav.addEventListener('click', e => {
            e.preventDefault();
                if(sessionStorage.getItem("userSession") === null){
                    location.replace('login.html');
                }else{
                    let loggedUser =JSON.parse(sessionStorage.getItem("userSession"));
                    if(loggedUser.products.length == 0){
                        loggedUser.products.push(id);
                        localStorage.setItem(loggedUser.login, JSON.stringify(loggedUser));
                        sessionStorage.setItem("userSession", JSON.stringify(loggedUser));
                    }else{
                        let matched=false;
                        loggedUser.products.forEach(item => {
                            if(item === id){
                                matched=true;
                                error.classList.remove('text-success');
                                error.classList.add('text-danger');
                                error.textContent = `Już masz ten produkt w ulubionych!`
                            }
                        });
                            if(!matched){
                                loggedUser.products.push(id);
                                localStorage.setItem(loggedUser.login, JSON.stringify(loggedUser));
                                sessionStorage.setItem("userSession", JSON.stringify(loggedUser));
                                error.classList.remove('text-danger');
                                error.classList.add('text-success');
                                error.textContent = `Dodano produkt do ulubionych!`;
                            }
                    }
                    // {"login":"piotrek1212","pass":"test","email":"piotr@o2.pl","name":"Piotr","surname":"Piotrowski","tel":"122222222","voivode":"lubelskie","radioType":"buyer","hobby":["cars"],"products":[]}
                    // console.log(loggedUser);
                }
           
        });
}


const removeFromFavourite = (product, id) => {
    showProductDesc(product, id);
    const btnDelete = document.querySelector('.add--or--remove--fav');
    btnDelete.classList.remove("btn-primary");
    btnDelete.classList.add("btn-danger");
    btnDelete.innerHTML = `Usuń z ulubionych <i class="bi bi-trash"></i>`;
    btnDelete.setAttribute('data-bs-dismiss', "modal");
    btnDelete.addEventListener('click', e => {
        e.preventDefault();
        userSession.products.splice(userSession.products.indexOf(id), 1);
        localStorage.setItem(userSession.login, JSON.stringify(userSession));
        sessionStorage.setItem("userSession", JSON.stringify(userSession));
        deleteProduct(id);
        console.log('deleted');
    });
}