// Инициализация Telegram Web App
const tg = window.Telegram.WebApp;
tg.expand();
tg.setHeaderColor('#8a2be2');
tg.setBackgroundColor('#0a0a0a');

// Элементы DOM
const exchangeBtn = document.getElementById('exchangeBtn');
const navigationBtn = document.getElementById('navigationBtn');
const accountBtn = document.getElementById('accountBtn');
const premiumBtn = document.getElementById('premiumBtn');
const supportBtn = document.getElementById('supportBtn');
const notification = document.getElementById('notification');
const notificationText = document.getElementById('notificationText');

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

// Обработчики событий для кнопок
exchangeBtn.addEventListener('click', function() {
    animateButton(this);
    showNotification('Переход в обменник... В разработке');
    // Здесь будет переход на страницу обменника
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

// Плавное появление элементов при загрузке
document.addEventListener('DOMContentLoaded', function() {
    const elements = document.querySelectorAll('.nav-btn, .welcome-section, .stat-card');
    
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
