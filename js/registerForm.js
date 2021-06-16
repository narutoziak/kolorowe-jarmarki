const form = document.querySelector('form');

// back to login 
loginButton.addEventListener('click', e => {
    e.preventDefault();
    location.replace('login.html');
})

const namePattern = /^[a-ząęśłćźżóńA-ZĄĘŚŁĆŹŻÓŃ]{2,20}$/; //patern imie i nazwisko
const telPattern = /^[0-9]{9}$/; //patern tel
const emailPattern = /^([a-zA-Z0-9])+([.a-zA-Z0-9_-])*@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-]+)+$/; //patern email
const loginPattern = /^[a-z0-9]{4,20}$/ // patern login
const passPattern = /^[a-z0-9]{2,}$/ //patern pass

// znaczniki odpowiadające za pojawienie się błędu (feedback's)
const feedbackName = document.querySelector('.feedback--name'); //error dla imie
const feedbackSurname = document.querySelector('.feedback--surname'); //error dla nazwisko
const feedbackEmail = document.querySelector('.feedback--email'); //error dla email
const feedbackTel = document.querySelector('.feedback--tel'); //error dla pesel
const feedbackVoivod = document.querySelector('.feedback--voivode'); // error dla selecta
const feedbackLogin = document.querySelector('.feedback--login'); //err dla login
const feedbackPass = document.querySelector('.feedback--pass'); //err dla pass

const feedbackRadio = document.querySelector('.feedback--radios'); //err dla radio
const feedbackCheck = document.querySelector('.feedback--check'); //err dla checkbox

// popup
const popup = document.querySelector('.popup');

const showPopup = (user) => {
    const count = document.querySelector('.modal--anim');
    const dataUser = document.querySelector('.modal--content');

    dataUser.innerHTML = user.show();
    popup.classList.add('displayed');

    
    setTimeout(() => {
       popup.style.opacity="1";
      
    }, 200);
    setTimeout(() => {
        popup.firstElementChild.style.opacity="1";
      }, 300);
      let output=0;
      console.log(count);
      const timer = setInterval(() =>{
        count.textContent = `${output}%`;
        if(output === 100){
            clearInterval(timer);
            location.replace(`login.html`);
        }else{
            output++;
        }
    }, 20);
}


//ustawienie wartosci sprawdzanych jako false
let nameValid, surnameValid, emailValid, telValid, loginValid, passValid;

// odczytywanie po wprowadzeniu klawiszami
form.name.addEventListener('keyup', e => {
    nameValid = validateForm(form.name, e.target.value.trim());
    // console.log(nameValid);
});

form.surname.addEventListener('keyup', e => {
    surnameValid = validateForm(form.surname, e.target.value.trim());
    // console.log(surnameValid);
});

form.email.addEventListener('keyup', e => {
    emailValid = validateForm(form.email, e.target.value.trim());
});

form.tel.addEventListener('keyup', e => {
    telValid = validateForm(form.tel, e.target.value.trim());
})

form.login.addEventListener('keyup', e => {
    loginValid = validateForm(form.login, e.target.value.trim());
})

form.password.addEventListener('keyup', e => {
    passValid = validateForm(form.password, e.target.value.trim());
    // console.log(e.target.value);
})


// funkcja sprawdzająca czy dany input przeszedł test paternami, jezeli tak zwraca mu true
const validateForm = (inputName, value) => {
    switch(inputName){
        case form.name:
            if(namePattern.test(value)){
                inputName.classList.remove('failed');
                inputName.classList.add('success');
                feedbackName.textContent=``;
                return true;
            }else{
                inputName.classList.remove('success');
                inputName.classList.add('failed');
                feedbackName.textContent = `Imię musi składać się od [2,20] znaków!`;
                return false;
            }
        case form.surname:
            if(namePattern.test(value)){
                inputName.classList.remove('failed');
                inputName.classList.add('success');
                feedbackSurname.textContent=``;
                return true;
            }else{
                inputName.classList.remove('success');
                inputName.classList.add('failed');
                feedbackSurname.textContent = `Nazwisko musi składać się od [2,20] znaków!`;
                return false;
            }
        case form.email:
            if(emailPattern.test(value)){
                inputName.classList.remove('failed');
                inputName.classList.add('success');
                feedbackEmail.textContent=``;
                return true;
            }else{
                inputName.classList.remove('success');
                inputName.classList.add('failed');
                feedbackEmail.textContent = `Email musi zawierać znak małpy @ oraz domenę!`;
                return false;
            }
        case form.tel:
            if(telPattern.test(value)){
                inputName.classList.remove('failed');
                inputName.classList.add('success');
                feedbackTel.textContent=``;
                return true;
            }else{
                inputName.classList.remove('success');
                inputName.classList.add('failed');
                feedbackTel.textContent = `Numer telefonu musi składać się z 9 cyfr!`;
                return false;
            }
        case form.login:
            if(loginPattern.test(value)){
                inputName.classList.remove('failed');
                inputName.classList.add('success');
                feedbackLogin.textContent=``;
                return true;
            }else{
                inputName.classList.remove('success');
                inputName.classList.add('failed');
                feedbackLogin.textContent = `Login musi składać się od 4-20 znaków/cyfr !`;
                return false;
            }
        case form.password:
            if(passPattern.test(value)){
                inputName.classList.remove('failed');
                inputName.classList.add('success');
                feedbackPass.textContent=``;
                return true;
            }else{
                inputName.classList.remove('success');
                inputName.classList.add('failed');
                feedbackPass.textContent = `Hasło musi składać się z przynajmniej 2 znaków!`;
                return false;
            }
    }
}


const validateRadio = () => {
    const radio = document.querySelectorAll('[name=radioType]')
    // console.log(radio);
    for(let i=0; i<radio.length; i++){
        if(radio[i].checked){
            return radio[i].value;
        }
    }
};


const validateCheckbox = () => {
    const checkbox = document.querySelectorAll('[name=hobby]');
    let wynik = [];
    for(let i=0; i<checkbox.length; i++){
        if(checkbox[i].checked){
            wynik.push(checkbox[i].value);
        }
        
    }
    return wynik;
};


const voivodeValidate = () => {
    // console.log(voisSelect.value);
    if(voisSelect.value === ""){
        return false
    }else{
        return voisSelect.value;
    }
};

// let nameValid, surnameValid, emailValid, peselValid, loginValid, passValid;
// sending data to localStorage
form.addEventListener('submit', e => {
    e.preventDefault();
    if(!nameValid || !surnameValid || !emailValid || !telValid || !loginValid || !passValid || !voivodeValidate() || !validateRadio() || !validateCheckbox()){
        e.preventDefault();
    }else{
        const user = new User(form.login.value, form.password.value, form.email.value, form.name.value, form.surname.value, form.tel.value, voivodeValidate(), validateRadio(), validateCheckbox());
            if(JSON.parse(localStorage.getItem(user.login))){
                console.log("Istnieje juz taki user");
            }else{
                localStorage.setItem(user.login, JSON.stringify(user));
                showPopup(user);
            }
    // const temp = new User('gorkakrakowsa', 'hasdalo', 'sadad@o2.pl', 'gokra', 'gorkowski', '9999919999', 'lodzkie', 'seller', 'asdasd');
    }
    if(!nameValid){
        validateForm(form.name, form.name.value);
        form.name.focus();
    }
    if(!surnameValid){
        validateForm(form.surname, form.surname.value);
    }
    if(!emailValid){
        validateForm(form.email, form.email.value);
    }
    if(!telValid){
        validateForm(form.tel, form.tel.value);
    }
    if(!loginValid){
        validateForm(form.login, form.login.value);
    }
    if(!passValid){
        validateForm(form.password, form.password.value);
    }
    if(!voivodeValidate()){
        voisSelect.classList.remove('success');
        voisSelect.classList.add('failed');
    }else{
        voisSelect.classList.remove('failed');
        voisSelect.classList.add('success');
    }
    if(!validateRadio()){
        feedbackRadio.textContent = `Nie wybrano żadnej z opcji!`;
    }else{
        feedbackRadio.textContent = ``;
    }
    if(validateCheckbox().length === 0){
        feedbackCheck.textContent = `Nie wybrano żadnej z opcji!`;
    }else{
        feedbackCheck.textContent = ``;
    }

});

class User{
    constructor(login="", pass="", email="", name="", surname="", tel="", voivode="", radioType="", hobby=[], products=[] ){
        this.login = login;
        this.pass = pass;
        this.email = email;
        this.name = name;
        this.surname = surname;
        this.tel = tel;
        this.voivode = voivode;
        this.radioType = radioType;
        this.hobby = hobby;
        this.products = products;
    }
    show(){
        // uzueplnij dane o loginie i email
        return  `<h4>Dane użytkownika:</h4> 
        <p class="user--data">
            login: ${this.login} <br>
            hasło: ${this.pass} <br>
            email: ${this.email} <br>
            imie : ${this.name} <br>
            nazwisko: ${this.surname} <br>
            nr telefonu: ${this.tel} <br>
            voivode: ${this.voivode} <br>
            radioType: ${this.radioType} <br>
            hobby : ${this.hobby} <br>
        </p> 
        `;
    }
}