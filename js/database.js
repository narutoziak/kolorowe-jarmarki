const showList = document.querySelector('.store--items');
const userSession = JSON.parse(sessionStorage.getItem('userSession'));

const addProduct = (product, id) => {
    let html = `
    <div class="col-xl-6 col-xxl-6 col-md-6 mb-5 product--item" data-id=${id}>
    <div class="card bg-light border-0 h-100">
        <div class="card-body p-2 p-lg-2 pt-0 pt-lg-0">
            <a href="${imgTemplate(product.img_address)}" data-lightbox="${product.title}" data-title="${product.title}">
                <img src="${imgTemplate(product.img_address)}" onerror="this.onerror=null;this.src='assets/img/noimg.jpg';" class="img-thumbnail img-fluid" alt="${product.title}" data-lightbox="${product.author}" data-title="${product.img_address}">
            </a> 
            <h5 class="fs-6 fw-bold p-1">${product.title}</h5>
                <p class="p-1 fw-bold"> ${product.cena} zł </p>
                <p class="p-1">Dodał: ${product.author}, ${getTime(product)}</p> 
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


db.collection('produkty').orderBy('created_at', 'desc').onSnapshot(snapshot => {
    // kiedy otrzymujemy dane
        if(snapshot.docs.length === 0){
            const row = document.querySelector('.store--items');
            row.innerHTML = `<h3 class="text-center py-5" >Aktualnie nie mamy żadnych ofert 😭</h3>`
        }
        snapshot.docChanges().forEach(change => {
            const doc = change.doc;
            if(change.type === 'added'){
                addProduct(doc.data(), doc.id);
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

