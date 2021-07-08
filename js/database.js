const showList = document.querySelector('.store--items');
const userSession = JSON.parse(sessionStorage.getItem('userSession'));

const addProduct = (product, id) => {
    let html = `
    <div class="col-xl-4 col-xxl-4 col-md-6 mb-5 product--item" data-id=${id}>
    <div class="card bg-light border-0 h-100">
        <div class="card-body p-2 p-lg-2 pt-0 pt-lg-0">
            <a href="${imgTemplate(product.img_address)}" data-lightbox="${product.title}" data-title="${product.title}">
                <img src="${imgTemplate(product.img_address)}" onerror="this.onerror=null;this.src='assets/img/noimg.jpg';" class="img-thumbnail img-fluid" alt="${product.title}" data-lightbox="${product.author}" data-title="${product.img_address}">
            </a> 
            <p class="fs-12 p-1 m-0 searching-title">${product.title}</p>
                <p class="p-1 m-0 fw-bold"> ${product.cena} zł </p>
                <p class="fs-16 p-1"><span class="searching-voivode"></span>, ${getTime(product)}</p>
                <button type="button" class="btn btn-primary show--offer" data-bs-toggle="modal" data-bs-target="#showProductModal">Przejdź do oferty</button>
        </div>
    </div>
    </div>
    `
    showList.innerHTML += html;

}

const deleteProduct = (id) => {
    const product = document.querySelectorAll('.product--item');
    product.forEach(item => {
        if(item.getAttribute('data-id') === id){
            item.remove();
        }
    });
}
const showSellerVoivode = async (user) => {
    const voivodeUI = document.querySelectorAll('.searching-voivode');
    console.log(voivodeUI, user);
    return voivodeUI;
};

db.collection('produkty').orderBy('created_at', 'desc').onSnapshot(snapshot => {
    // kiedy otrzymujemy dane
        if(snapshot.docs.length === 0){
            const row = document.querySelector('.store--items');
            row.innerHTML = `<h3 class="text-center py-5" >Aktualnie nie mamy żadnych ofert 😭</h3>`
        }
        snapshot.docChanges().forEach((change,index) => {
            const doc = change.doc;
            if(change.type === 'added'){
                addProduct(doc.data(), doc.id);
                findUser(doc.data()).then(data => {
                    const voivodeUI = document.querySelectorAll('.searching-voivode');
                    voivodeUI[index].textContent = data.voivode;
                })
            }else if(change.type === 'removed'){
                deleteProduct(doc.id);
            }
        })

    // // console.log(snapshot.docs.length);
    // snapshot.docs.forEach((doc) => {
    //     // console.log(doc.data());
    //     addProduct(doc.data());
    //     // console.log(index);
    // });
    const btn = document.querySelectorAll('.show--offer');
    btn.forEach((item, index )=> {
        item.addEventListener('click', e => {
            e.preventDefault();
            if(userSession === null){
                location.replace('login.html');
            }else{
                addToFavourite(snapshot.docs[index].data(), snapshot.docs[index].id);
            }
        });
    })
});


let getTitle = async () => {
    let tableRows = document.querySelectorAll('.searching-title');
    return tableRows;
}


const findItem = (searchingItem) => {
    getTitle().then(search => {
        Array.from(search)
        .filter((title) => !title.textContent.toLocaleLowerCase().includes(searchingItem))
        .forEach((title) => title.parentElement.parentElement.parentElement.classList.add('filtered', 'flex'));
    
        Array.from(search)
        .filter((title) => title.textContent.toLocaleLowerCase().includes(searchingItem))
        .forEach((title) => title.parentElement.parentElement.parentElement.classList.remove('filtered', 'flex'));
    }).catch(err => {
        console.log(err);
    })
};

let getVoivode = async () => {
    let voivodeItem = document.querySelectorAll('.searching-voivode');
    return voivodeItem;
}

const findVoivode = (searchingVoivode) => {
    getVoivode().then(search => {
        Array.from(search)
        .filter((title) => !title.textContent.toLocaleLowerCase().includes(searchingVoivode))
        .forEach((title) => title.parentElement.parentElement.parentElement.classList.add('filtered', 'flex'));
    
        Array.from(search)
        .filter((title) => title.textContent.toLocaleLowerCase().includes(searchingVoivode))
        .forEach((title) => title.parentElement.parentElement.parentElement.classList.remove('filtered', 'flex'));
    }).catch(err => {
        console.log(err);
    })
}


const indexForm = document.querySelector('input[name="search-item"]');
indexForm.addEventListener('keyup', e => {
    e.preventDefault();
    const query =  indexForm.value.trim().toLowerCase();
    // console.log(query);
    findItem(query);
});

const voivodeForm = document.querySelector('input[list="voivodeship"]');
voivodeForm.addEventListener('keyup', e => {
    e.preventDefault();
    const query = voivodeForm.value.trim().toLowerCase();
    findVoivode(query);
});

const searchBtn = document.querySelector('.search-item');
searchBtn.addEventListener('click', e => {
    e.preventDefault();
    const queryItem = indexForm.value.trim().toLowerCase();
    const queryVoivode = voivodeForm.value.trim().toLowerCase();
    console.log(queryItem.length, queryVoivode.length);
    if(queryItem.length == 0){
        indexForm.parentElement.classList.add('warning');
        indexForm.classList.add('warning');

        voivodeForm.parentElement.classList.add('warning');
        voivodeForm.classList.add('warning');
    }else if (queryItem.length > 0){
        indexForm.parentElement.classList.remove('warning');
        indexForm.classList.remove('warning');

        voivodeForm.parentElement.classList.remove('warning');
        voivodeForm.classList.remove('warning');
    }
    
    
});
