
if(localStorage.getItem('marcin')){
    console.log('user marcin exist')
}else{
    const seller ={"login":"marcin","pass":"test","email":"marcin@o2.pl","name":"Marcin","surname":"Kowalski","tel":"123543092","voivode":"pomorskie","radioType":"seller","hobby":["cars","other"],"products":[]};
    localStorage.setItem('marcin', JSON.stringify(seller));
}

if(localStorage.getItem('bartek')){
    console.log('user bartek exist')
}else{
    const buyer = {"login":"bartek","pass":"test","email":"bartek@wp.pl","name":"Bartosz","surname":"Bartkiewicz","tel":"452123245","voivode":"pomorskie","radioType":"buyer","hobby":["cars","home"],"products":[]};
    localStorage.setItem('bartek', JSON.stringify(buyer));
}
