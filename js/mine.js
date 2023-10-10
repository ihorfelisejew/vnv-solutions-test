document.addEventListener('click', documentClick);

function documentClick(e){
    const targetItem = e.target;
    if(targetItem.closest('.icon-menu')){
        document.documentElement.classList.toggle('menu-open');
        const headerMenu = document.querySelector('.header__menu');
        headerMenu.classList.toggle('header__menu-open');
    }
}
//-----------Scroll до відповідних блоків
document.querySelectorAll('.menu__link').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
        const headerMenu = document.querySelector('.header__menu');
        if(headerMenu.classList.contains('header__menu-open')){
            document.querySelector('.menu-open').classList.remove('menu-open');
            headerMenu.classList.remove('header__menu-open');
        }
    });
});
//-------------------------Анімація кнопки в main--------------//
window.onload = () => {
    const mainTitle = document.querySelector(".main__title");
    const mainText = document.querySelector(".main__text");
    const mainButton = document.querySelector(".main__button");
    const whyButton = document.querySelector(".main__button");

    mainTitle.style.opacity = "1";
    setTimeout(() => {
        mainText.style.opacity = "1";
    }, 600);
    setTimeout(() => {
        mainButton.style.opacity = "1";
        whyButton.style.opacity = "1";
    }, 1500);
    setTimeout(() => {
        mainButton.style.overflow = "visible";
        whyButton.style.overflow = "visible";
    }, 1600);
}

//-------------------------Анімація Why-блоків--------------//

function firstShowWhyBlocks(block, index) {
    setTimeout(() => {
        block.style.transition = "all 1s ease 0s"
        block.style.opacity = 1;
        block.style.transform = 'scale(1)';
    }, 300*index);
}

function hideWhyBlocks(block) {
    block.style.transition = "none";
    block.style.opacity = 0;
    block.style.transform = 'scale(0.3)';
}

function showWhyBlocks(block, index) {
    setTimeout(() => {
        block.style.transition = "all 1s ease 0s"
        block.style.opacity = 1;
        block.style.transform = 'scale(1)';
    }, 300 * ((index >= 3) ? (index - 3) : index));
}

function showWhyFunction() {
    var scrollDistance = window.scrollY + window.innerHeight;
    var topWindow = window.scrollY;

    
    const whyBlocks = document.querySelectorAll(".why__item");
    whyBlocks.forEach((block, index) => {
        var blockTop = block.offsetTop + 50;
        var blockBottom = block.offsetTop + block.offsetHeight;

        var checkFirst = false;
        
        if (scrollDistance > blockTop & !checkFirst) {
            firstShowWhyBlocks(block, index);
            checkFirst = true;
        }

        if(topWindow > blockBottom || scrollDistance < blockTop) {
            hideWhyBlocks(block);
        }

        if(topWindow + 100 < blockBottom && topWindow + 50 > blockTop) {
            showWhyBlocks(block, index);
        }

        if (scrollDistance > blockTop & scrollDistance < blockBottom + 200 & checkFirst) {
            firstShowWhyBlocks(block, index);
        }

    });
    
}

window.addEventListener('scroll', showWhyFunction);


//-------------------------Перехід між сервісами--------------//


let isAnimating = false;

function showService(menuIndex) {
    if(isAnimating) return;

    isAnimating = true;

    const servicesItems = document.querySelectorAll('.services__item');
    servicesItems.forEach((item, index) => {
        if(item.classList.contains("services__item-active") && index != menuIndex){
            item.style.transform = "translateY(-50px)";
            item.style.opacity = 0;
            setTimeout(() => {
                item.classList.remove("services__item-active");
                item.style.transform = "translateY(50px)";
            }, 500)
            
        }
    });
    servicesItems.forEach((item, index) => {
        if(index == menuIndex && !item.classList.contains("services__item-active")){
            setTimeout(() => {
                item.style.transform = "translateY(0)";
                item.style.opacity = 1;
                item.classList.add("services__item-active");
            }, 500)
        }
        
    });

    const servicesMenuItems = document.querySelectorAll('.services__menu-item');
    servicesMenuItems.forEach((item, index) => {
        if(item.classList.contains("services__menu-item-active")){
            item.classList.remove("services__menu-item-active");
        }
        if(index == menuIndex){
            item.classList.add("services__menu-item-active");
        }
    });

    setTimeout(() => {
        isAnimating = false;
    }, 500)
}

//-------------------------Налаштування Swiper--------------//
new Swiper('.project__slider', {
    grabCursor: true,
    spaceBetween: 40,
    centeredSlides: true,
    loop: true,
    loopedSlides: 1,
    speed: 700,
    slidesPerView: 'auto'
})

//-------------------------Налаштування форми ---------------//
function ShowType() {
    const typeOfContact = document.querySelector('.type-of-contact');
    const valueType = typeOfContact.value;
    const inputsForContact = document.querySelector('.contact-type-input');
    if(valueType == "Phone") inputsForContact.placeholder = "Enter your phone number here";
    else if(valueType == "E-mail") inputsForContact.placeholder = "Enter your e-mail here";
    else inputsForContact.placeholder = "Enter your telegram here";
}

document.querySelector('.feedback__form').addEventListener('submit', function(event) {
    event.preventDefault();
    //---------name
    var name = document.querySelector('input[placeholder="Name"]').value;
    const labelForName = document.querySelector('.feedback-name__label');

    if(name.trim() === ''){
        
        labelForName.style.display = "block";
        return;
    }else{
        labelForName.style.display = "none";
    }
    //---------contactType
    var contactType = document.querySelector('#type-of-contact').value;
    var checkContact = '';
    var inputContactValue = document.querySelector('#feedback__contact-link').value;

    switch (contactType) {
        case 'Phone':
            checkContact = /^(?:\+380|0)\d{9}$/.test(inputContactValue) ? '' : "Enter a phone number (start with '+380' or '0')";
            break;
        case 'E-mail':
            var lambda = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
            if(!lambda.test(inputContactValue) && inputContactValue !=='') {
                checkContact = "Please, enter the e-mail correctly!"
            }else if (!lambda.test(inputContactValue) && inputContactValue ===''){
                checkContact = "Please, enter the e-mail!"
            }else{
                checkContact = '';
            }
            break;
        case 'Telegram':
            var lambda = /^@+[a-zA-Z0-9_]{5,32}$/;
            if(!lambda.test(inputContactValue) && inputContactValue !=='') {
                checkContact = "Please, enter a nickname correctly!"
            }else if (!lambda.test(inputContactValue) && inputContactValue ===''){
                checkContact = "Please, enter a nickname!"
            }else{
                checkContact = '';
            }
            break;
    }

    const labelForTypeContact = document.querySelector('.feedback-contact-type__label');
    if(checkContact.trim() === ''){
        labelForTypeContact.style.display = "none";
    }else{
        labelForTypeContact.textContent = checkContact;
        labelForTypeContact.style.display = "block";
        return;
    }

    //-------очищення форми
    document.querySelector(".feedback__form").reset();
});

// const circle = document.querySelector('.cursor-test');
// document.addEventListener('mousemove', (e) => {
//     const x = e.pageX;
//     const y = e.pageY;
    
//     circle.style.left = `${x - 25}px`;
//     circle.style.top = `${y - 25}px`;
// });

function closeAllFAQBlocks(index){
    const InsideFAQBlocks = document.querySelectorAll('.faq__item');
    InsideFAQBlocks.forEach((insideBlock, insideIndex) => {
        const insideVisibleBlock = insideBlock.querySelector('.faq__item-visible');
        const insideOpenButton = insideVisibleBlock.querySelector('.faq__item-open');
        const insideAnswerBlock = insideBlock.querySelector('.faq__answer-block');
        if (insideAnswerBlock.classList.contains('active') && insideIndex != index) {
            insideAnswerBlock.style.maxHeight = '0';
            insideAnswerBlock.style.paddingTop = '0px';
            insideAnswerBlock.classList.remove('active');
            insideOpenButton.style.transform = 'rotate(0deg)';
        }
    })
}

function clickOnFAQBlock(block, index){
    closeAllFAQBlocks(index);

    const visibleBlock = block.querySelector('.faq__item-visible');
    const openButton = visibleBlock.querySelector('.faq__item-open');
    const answerBlock = block.querySelector('.faq__answer-block');
    const answerText = answerBlock.querySelector('.faq__item-answer')
    if (answerBlock.classList.contains('active')) {
        answerBlock.style.maxHeight = '0';
        answerBlock.style.paddingTop = '0px';
        answerBlock.classList.remove('active');
        openButton.style.transform = 'rotate(0deg)';
    } else {
        const scrollHeight = answerText.scrollHeight + 20;
        answerBlock.style.maxHeight = scrollHeight + 'px';
        answerBlock.style.paddingTop = '20px';
        answerBlock.classList.add('active');
        openButton.style.transform = 'rotate(180deg)';
    }
}
//------------Відкриття блоків з запитаннями----------//
const FAQBlocks = document.querySelectorAll('.faq__item');
FAQBlocks.forEach((block, index) => {
    block.addEventListener('click', () => clickOnFAQBlock(block, index));
})