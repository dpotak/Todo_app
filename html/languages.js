const translations={
en:{

},



ru:{


},


et:{


}
};

function setLang(lang){
document.querySelectorAll("[data-i18n]").forEach(el=>{
el.innerText=translations[lang][el.dataset.i18n];
});
}

function toggleDropdown() {
    document.getElementById("dropdown").classList.toggle("show");
}

const projects = document.querySelectorAll(
  '.kvadrat_1_progetcs, .kvadrat_2_progetcs, .kvadrat_3_progetcs, .kvadrat_4_progetcs, .kvadrat_5_progetcs'
);

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
}, {
  threshold: 0.15
});

projects.forEach(p => observer.observe(p));

function toggleSkill(id){

const block=document.getElementById(id);

block.classList.toggle("active");

}