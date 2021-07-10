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
        // console.log(snap.docs.length);
        const doc = snap.docs;
        let findUser=false;
        let userIndex;
        for(let i=0; i<doc.length; i++){
                if(doc[i].data().login === form.login.value){
                    findUser=true;
                    userIndex=i;
                    break;
                }
        }
        if(findUser){
            console.log('znaleziony user: ', doc[userIndex].data().login, form.login.value);
            if(form.password.value === doc[userIndex].data().pass){
                feedback.textContent=``;
                sessionStorage.setItem('userSession', JSON.stringify(doc[userIndex].data()));
                location.replace('index.html');
            }else{
                feedback.textContent = `Błędne hasło!`;
            }
        }else{
            feedback.textContent = `Nie istnieje user o podanym loginie!`;
        }
    });
})