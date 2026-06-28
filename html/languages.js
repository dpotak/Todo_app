const translations={
en:{
    my_tasks: "My tasks",
    complete_1: "Completed",
    all_1: "All",
    active_1: "Active",
    tasks_here_yet: "No tasks here yet",
    items_left: "0 items left",
    clear_completed: "Clear completed",
    Russia_1: "Russia",
    English_1: "English",
    Estonian_1: "Estonian",
    What_do_you_need: "What do you need to do?",

},

ru:{

    my_tasks: "Мои задачи",
    complete_1: "Завершенный",
    all_1: "Все",
    active_1: "Активный",
    tasks_here_yet: "Задач пока нет.",
    items_left: "0 оставшиеся задачи",
    clear_completed: "Очистить завершеные",
    Russia_1: "Русский",
    English_1: "Англиский",
    Estonian_1: "Эстонский",
    What_do_you_need: "Что вам нужно сделать?",

},


et:{
    my_tasks: "Minu ülesanded",
    complete_1: "Lõpetatud",
    all_1: "Kõik",
    active_1: "Aktiivne",
    tasks_here_yet: "Siin pole veel ülesandeid",
    items_left: "0 allesjäänud esemeid",
    clear_completed: "Tühjendamine lõpetatud",
    Russia_1: "Vene keel",
    English_1: "Inglise keel",
    Estonian_1: "Eesti keel",
    What_do_you_need: "Mida sa pead tegema?",

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

function setLang(lang){

localStorage.setItem("language", lang);

// TEXT CONTENT
document.querySelectorAll("[data-i18n]").forEach(el => {
const key = el.dataset.i18n;
if (translations[lang][key]) {
el.innerText = translations[lang][key];
}
});

// PLACEHOLDER
document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
const key = el.dataset.i18nPlaceholder;
if (translations[lang][key]) {
el.placeholder = translations[lang][key];
}
});

}