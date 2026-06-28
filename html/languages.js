const translations={
en:{
    my_tasks: "My tasks",
    complete_1: "",
    all_1: "",
    active_1: "",

},

ru:{

    my_tasks: "Мои задачи",
    complete_1: "",
    all_1: "",
    active_1: "",

},


et:{
    my_tasks: "Minu ülesanded",
    complete_1: "",
    all_1: "",
    active_1: "",

}
};

function setLang(lang){

localStorage.setItem(
"language",
lang
);


document
.querySelectorAll(
"[data-i18n]"
)
.forEach(el=>{

const key=
el.dataset.i18n;

if(
translations[lang][key]
){

el.innerText=
translations[lang][key];

}

});


document
.querySelectorAll(
"[data-i18n-placeholder]"
)
.forEach(el=>{

const key=
el.dataset.i18nPlaceholder;

if(
translations[lang][key]
){

el.placeholder=
translations[lang][key];

}

});

}



document
.querySelector(
".btn_lang_eng"
)
.addEventListener(
"click",
()=>setLang("en")
);


document
.querySelector(
".btn_lang_rus"
)
.addEventListener(
"click",
()=>setLang("ru")
);


document .querySelector( ".btn_lang_est") .addEventListener( "click", ()=>setLang("et"));



const savedLang =
localStorage.getItem(
"language"
) || "en";


setLang(savedLang);