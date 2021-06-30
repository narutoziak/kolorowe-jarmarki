// back to register
registerButton.addEventListener('click', e => {
    e.preventDefault();
    location.replace('register.html')
})
// form
const form = document.querySelector('form');

const feedback = document.querySelector('.feedback--error');

// logged and forward to index.html if success
form.addEventListener('submit', e => {
    e.preventDefault();
    db.collection('users').get().then(snap => {
        snap.docs.forEach(doc => {
            if(doc.data().login === form.login.value){
                if(form.password.value === doc.data().pass){
                    feedback.textContent=``;
                    sessionStorage.setItem('userSession', JSON.stringify(doc.data()));
                    location.replace('index.html');
                }else{
                    feedback.textContent = `Błędne hasło!`;
                }
            }else{
                feedback.textContent = `Nie istnieje user o podanym loginie!`;
            }
        });
    });
    // if(JSON.parse(localStorage.getItem(form.login.value))){
    //     let list = JSON.parse(localStorage.getItem(form.login.value));
    //     // console.log(form.password.value);
    //         if(form.password.value === list.pass){
    //             feedback.textContent = ``;
    //             console.log(list);
    //             sessionStorage.setItem('userSession', JSON.stringify(list));
    //             console.log(sessionStorage.getItem('user'));
    //             // location.replace('index.html');
    //         }else{
    //         feedback.textContent = `Nie istnieje user o podanym loginie!`;

    //         }
    // }else{
    //     feedback.textContent = `Nie istnieje user o podanym loginie!`;

    // }
})