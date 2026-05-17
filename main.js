console.log("JS is working");

const dom = {
    bodyScroll   : document.body,
    overlay      : document.querySelector(".overlay"),
    headerBar    : document.querySelector(".header__bar"),
    toggleBtn    : document.querySelector(".header__toggle"),
    headerNav    : document.querySelector(".nav"),
    closeBtn     : document.querySelector(".nav__close"),
 
    form         : document.querySelector(".cta__form"),
    inputWrapper : document.querySelector(".cta__input"),
    emailInput   : document.querySelector("#email"),
    errorMessage : document.querySelector(".error"),
    errorIcon    : document.querySelector(".cta__error-icon"),

    faqQuestions : document.querySelectorAll(".faqs__questions"),
    faqItems     : document.querySelectorAll(".faqs__item"),

    tabButtons   : document.querySelectorAll(".feature__tab-btn"),
    tabPanels    : document.querySelectorAll(".feature__tab-panel"),
};

const menu = {
    init(){
        this.bindEvents();
    },

    bindEvents(){
        dom.toggleBtn.addEventListener('click',()=> this.openMenu());
        dom.closeBtn.addEventListener('click',()=>this.closeMenu());

        dom.overlay.addEventListener('click',()=>{
            if (dom.headerNav.classList.contains('is-open')){
                this.closeMenu();
            }
        });
    },

    openMenu(){
        dom.headerBar.style.visibility = 'hidden';
        dom.headerNav.classList.add('is-open');
        dom.headerNav.setAttribute('aria-hidden','false');
        dom.overlay.classList.add('overlay-active');
        dom.bodyScroll.classList.add('menu-open');
        dom.toggleBtn.setAttribute('aria-expanded','true');
        dom.closeBtn.focus();
    },

    closeMenu(){
         dom.headerBar.style.visibility = 'visible';
       dom.headerNav.classList.remove('is-open');
        dom.headerNav.setAttribute('aria-hidden','true');
        dom.toggleBtn.setAttribute('aria-expanded','false');
        dom.bodyScroll.classList.remove('menu-open');
        dom.overlay.classList.remove('overlay-active');
        dom.toggleBtn.focus();

    },
};

const formValidation = {
    init(){
        this.bindEvents();
    },

    bindEvents(){
      dom.form.addEventListener("submit", (e) => {
      e.preventDefault();

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const emailValue = dom.emailInput.value.trim();

      if (!emailPattern.test(emailValue)) {
          this.showError();
      } else {
          this.hideError();
      }
    });
    },
    showError(){
        dom.inputWrapper.classList.add("active");
        dom.errorMessage.classList.add("active");
        dom.errorIcon.classList.add("active");
    },
     hideError(){
        dom.inputWrapper.classList.remove("active");
        dom.errorMessage.classList.remove("active");
        dom.errorIcon.classList.remove("active");
    },
};

const faq = {
    init(){
        this.bindEvents();
    },
    bindEvents(){

        dom.faqQuestions.forEach((question)=>{
         question.addEventListener("click",()=>{
            this.toggle(question); 
            });
        });
    },

    toggle(question){                    
        
        const currentItem = question.parentElement;
        
        dom.faqItems.forEach((item)=>{
         const button = item.querySelector(".faqs__questions");
         if(item !==currentItem){
                item.classList.remove("active");
                button.setAttribute("aria-expanded", "false");
                
            }
        });
        currentItem.classList.toggle("active");
        const isActive = currentItem.classList.contains("active");
        question.setAttribute("aria-expanded", isActive);
        
    },
};

const tabMenu = {
    init(){
        this.bindEvents();
    },
    bindEvents(){

      dom.tabButtons.forEach((button) => {
        button.addEventListener("click", () => { 
            this.switchTab(button);
        });
      });
    },

    switchTab(button) {
        
        // remove active from all buttons
       dom.tabButtons.forEach((btn) => {
            btn.classList.remove("active");
            btn.setAttribute("aria-selected", "false");
            btn.setAttribute("tabindex", "-1");
        });

        // hide all panels
        dom.tabPanels.forEach((panel) => {
            panel.classList.add("hidden");
            panel.classList.remove("active");
        });

        // activate clicked button
         button.classList.add("active");
         button.setAttribute("aria-selected", "true");
         button.setAttribute("tabindex", "0");

        // get matching panel id
         const targetTab = button.dataset.tab;

        // find matching panel
        const activePanel = document.getElementById(targetTab);

        // show panel
        activePanel.classList.remove("hidden");
        activePanel.classList.add("active");
    },
};

function appInit(){
    menu.init();
    formValidation.init();
    faq.init();
    tabMenu.init();

}

document.addEventListener("DOMContentLoaded", appInit);
