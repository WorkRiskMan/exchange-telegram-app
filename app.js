// Инициализация Telegram Web App
const tg = window.Telegram.WebApp;
tg.expand();
tg.setHeaderColor('#8a2be2');
tg.setBackgroundColor('#0a0a0a');

// Элементы DOM - Главная страница
const exchangeBtn = document.getElementById('exchangeBtn');
const navigationBtn = document.getElementById('navigationBtn');
const accountBtn = document.getElementById('accountBtn');
const premiumBtn = document.getElementById('premiumBtn');
const supportBtn = document.getElementById('supportBtn');
const notification = document.getElementById('notification');
const notificationText = document.getElementById('notificationText');

// Элементы DOM - Страница обменника
const mainPage = document.getElementById('mainPage');
const exchangePage = document.getElementById('exchangePage');
const backBtn = document.getElementById('backBtn');
const usdtRubOption = document.getElementById('usdtRubOption');
const otherAssetsOption = document.getElementById('otherAssetsOption');
const usdtRubSubButtons = document.getElementById('usdtRubSubButtons');
const otherAssetsPanel = document.getElementById('otherAssetsPanel');
const buyUsdtBtn = document.getElementById('buyUsdtBtn');
const sellUsdtBtn = document.getElementById('sellUsdtBtn');

// Состояния
let usdtRubOpen = false;
let otherAssetsOpen = false;

// Функция показа уведомления
function showNotification(message, duration = 3000) {
    notificationText.textContent = message;
    notification.style.display = 'block';
    
    setTimeout(() => {
        notification.style.display = 'none';
    }, duration);
}

// Анимация при нажатии кнопок
function animateButton(button) {
    button.style.transform = 'scale(0.95)';
    setTimeout(() => {
        button.style.transform = '';
    }, 150);
}

// Переход на страницу обменника
function goToExchangePage() {
    mainPage.style.display = 'none';
    exchangePage.style.display = 'flex';
    tg.BackButton.show();
}

// Возврат на главную страницу
function goToMainPage() {
    exchangePage.style.display = 'none';
    mainPage.style.display = 'flex';
    tg.BackButton.hide();
    // Скрываем все открытые панели
    usdtRubSubButtons.style.display = 'none';
    otherAssetsPanel.style.display = 'none';
    usdtRubOpen = false;
    otherAssetsOpen = false;
}

// Переключение панели USDT/RUB
function toggleUsdtRubPanel() {
    if (usdtRubOpen) {
        usdtRubSubButtons.style.display = 'none';
        usdtRubOpen = false;
    } else {
        usdtRubSubButtons.style.display = 'flex';
        otherAssetsPanel.style.display = 'none';
        usdtRubOpen = true;
        otherAssetsOpen = false;
    }
    
    // Обновляем стрелочки
    updateArrows();
}

// Переключение панели других активов
function toggleOtherAssetsPanel() {
    if (otherAssetsOpen) {
        otherAssetsPanel.style.display = 'none';
        otherAssetsOpen = false;
    } else {
        otherAssetsPanel.style.display = 'block';
        usdtRubSubButtons.style.display = 'none';
        otherAssetsOpen = true;
        usdtRubOpen = false;
    }
    
    // Обновляем стрелочки
    updateArrows();
}

// Обновление стрелочек на кнопках
function updateArrows() {
    const usdtArrow = usdtRubOption.querySelector('.option-arrow i');
    const otherArrow = otherAssetsOption.querySelector('.option-arrow i');
    
    usdtArrow.className = usdtRubOpen ? 'fas fa-chevron-up' : 'fas fa-chevron-down';
    otherArrow.className = otherAssetsOpen ? 'fas fa-chevron-up' : 'fas fa-chevron-down';
}

// Обработчики событий для главной страницы
exchangeBtn.addEventListener('click', function() {
    animateButton(this);
    goToExchangePage();
});

navigationBtn.addEventListener('click', function() {
    animateButton(this);
    showNotification('Навигация по обменным пунктам... В разработке');
});

accountBtn.addEventListener('click', function() {
    animateButton(this);
    showNotification('Личный кабинет... В разработке');
});

premiumBtn.addEventListener('click', function() {
    animateButton(this);
    showNotification('Премиум подписка... В разработке');
});

supportBtn.addEventListener('click', function() {
    animateButton(this);
    showNotification('Связь с поддержкой... В разработке');
});

// Обработчики событий для страницы обменника
backBtn.addEventListener('click', goToMainPage);
usdtRubOption.addEventListener('click', toggleUsdtRubPanel);
otherAssetsOption.addEventListener('click', toggleOtherAssetsPanel);

// Обработчики для подкнопок (заглушки)
buyUsdtBtn.addEventListener('click', function() {
    animateButton(this);
    showNotification('Функция "Купить USDT" в разработке. Скоро!');
});

sellUsdtBtn.addEventListener('click', function() {
    animateButton(this);
    showNotification('Функция "Продать USDT" в разработке. Скоро!');
});

// Обработка кнопки "Назад" в Telegram
tg.BackButton.onClick(goToMainPage);
tg.BackButton.hide();

// Плавное появление элементов при загрузке
document.addEventListener('DOMContentLoaded', function() {
    const elements = document.querySelectorAll('.nav-btn, .welcome-section');
    
    elements.forEach((element, index) => {
        setTimeout(() => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, 10);
        }, index * 100);
    });
});

// Инициализация приложения
tg.ready();
