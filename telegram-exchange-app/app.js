// Инициализация Telegram Web App
const tg = window.Telegram.WebApp;
tg.expand(); // Развернуть приложение на весь экран
tg.setHeaderColor('#0088cc');
tg.setBackgroundColor('#f5f5f5');

// Элементы DOM
const buyBtn = document.getElementById('buyBtn');
const sellBtn = document.getElementById('sellBtn');
const exchangeForm = document.getElementById('exchangeForm');
const formTitle = document.getElementById('formTitle');
const closeFormBtn = document.getElementById('closeFormBtn');
const amountInput = document.getElementById('amount');
const currencySelect = document.getElementById('currency');
const currentRate = document.getElementById('currentRate');
const receiveAmount = document.getElementById('receiveAmount');
const submitBtn = document.getElementById('submitBtn');
const notification = document.getElementById('notification');
const notificationText = document.getElementById('notificationText');

// Курсы обмена (можно заменить на реальные данные с API)
const exchangeRates = {
    'RUB': { buy: 90.5, sell: 89.2 },
    'EUR': { buy: 0.92, sell: 0.90 },
    'KZT': { buy: 450.3, sell: 445.1 },
    'BYN': { buy: 3.2, sell: 3.15 }
};

let currentAction = 'buy'; // 'buy' или 'sell'

// Обновление отображаемого курса
function updateRateDisplay() {
    const currency = currencySelect.value;
    const rate = exchangeRates[currency][currentAction];
    
    if (currentAction === 'buy') {
        currentRate.textContent = `1 USD = ${rate} ${currency}`;
    } else {
        currentRate.textContent = `1 ${currency} = ${(1/rate).toFixed(4)} USD`;
    }
    
    calculateAmount();
}

// Расчет суммы для получения
function calculateAmount() {
    const amount = parseFloat(amountInput.value) || 0;
    const currency = currencySelect.value;
    const rate = exchangeRates[currency][currentAction];
    
    if (currentAction === 'buy') {
        // При покупке: USD -> Валюта
        const result = amount * rate;
        receiveAmount.textContent = `${result.toFixed(2)} ${currency}`;
    } else {
        // При продаже: Валюта -> USD
        const result = amount / rate;
        receiveAmount.textContent = `${result.toFixed(2)} USD`;
    }
}

// Показать форму обмена
function showForm(action) {
    currentAction = action;
    formTitle.textContent = action === 'buy' ? 'Купить' : 'Продать';
    
    // Обновляем цвет кнопки подтверждения в зависимости от действия
    if (action === 'buy') {
        submitBtn.style.background = 'linear-gradient(135deg, #00c853 0%, #64dd17 100%)';
    } else {
        submitBtn.style.background = 'linear-gradient(135deg, #ff3d00 0%, #ff9100 100%)';
    }
    
    updateRateDisplay();
    exchangeForm.style.display = 'block';
}

// Скрыть форму обмена
function hideForm() {
    exchangeForm.style.display = 'none';
    amountInput.value = '';
    calculateAmount();
}

// Показать уведомление
function showNotification(message, duration = 3000) {
    notificationText.textContent = message;
    notification.style.display = 'block';
    
    setTimeout(() => {
        notification.style.display = 'none';
    }, duration);
}

// Обработчики событий
buyBtn.addEventListener('click', () => showForm('buy'));
sellBtn.addEventListener('click', () => showForm('sell'));
closeFormBtn.addEventListener('click', hideForm);

amountInput.addEventListener('input', calculateAmount);
currencySelect.addEventListener('change', updateRateDisplay);

submitBtn.addEventListener('click', () => {
    const amount = parseFloat(amountInput.value);
    
    if (!amount || amount <= 0) {
        showNotification('Пожалуйста, введите корректную сумму');
        return;
    }
    
    const currency = currencySelect.value;
    const rate = exchangeRates[currency][currentAction];
    let message;
    
    if (currentAction === 'buy') {
        const result = amount * rate;
        message = `Вы покупаете ${result.toFixed(2)} ${currency} за ${amount} USD`;
    } else {
        const result = amount / rate;
        message = `Вы продаете ${amount} ${currency} за ${result.toFixed(2)} USD`;
    }
    
    showNotification(message);
    
    // В реальном приложении здесь будет отправка данных на сервер
    // tg.sendData(JSON.stringify({action: currentAction, amount, currency}));
    
    // Через 2 секунды закрываем форму
    setTimeout(hideForm, 2000);
});

// Инициализация при загрузке
updateRateDisplay();

// Обработка нажатия кнопки "Назад" в Telegram
tg.BackButton.onClick(hideForm);
tg.BackButton.hide();

// Показываем кнопку "Назад" когда форма открыта
const originalShowForm = showForm;
showForm = function(action) {
    originalShowForm(action);
    tg.BackButton.show();
};

const originalHideForm = hideForm;
hideForm = function() {
    originalHideForm();
    tg.BackButton.hide();
};