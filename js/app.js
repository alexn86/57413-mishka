document.addEventListener('DOMContentLoaded', function () {
    var navMain = document.querySelector('.main-nav');
    var navToggle = document.querySelector('.main-nav__toggle');
    var orderButton = document.querySelector('.best-product__order-button');
    var modal = document.querySelector('.modal');
    var modalWrapper = document.querySelector('.modal__wrapper');
    var addCartButtons = document.querySelectorAll('.product__add-cart-button');

    navMain.classList.remove('main-nav_no-js');

    navToggle.addEventListener('click', function() {
        if (navMain.classList.contains('main-nav_opened')) {
            navMain.classList.remove('main-nav_opened');
        } else {
            navMain.classList.add('main-nav_opened');
        }
    });

    function showModal(e) {
        e.preventDefault();

        if (modal.classList.contains('modal_opened')) {
            modal.classList.remove('modal_opened');
        } else {
            modal.classList.add('modal_opened');
        }
    }

    if (orderButton) {
        orderButton.addEventListener('click', showModal);
    }
    if (addCartButtons.length) {
        for (var i = 0; i < addCartButtons.length; i++) {
            addCartButtons[i].addEventListener('click', showModal);
        }
    }


    if (modal) {
        modal.addEventListener('click', function (e) {
            if (modal.classList.contains('modal_opened')) {
                if (!modalWrapper.contains(e.target)) {
                    modal.classList.remove('modal_opened');
                }
            }
        })
    }
});