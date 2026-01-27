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

// Элементы DOM - Страницы
const mainPage = document.getElementById('mainPage');
const exchangePage = document.getElementById('exchangePage');
const buyUsdtPage = document.getElementById('buyUsdtPage');
const sellUsdtPage = document.getElementById('sellUsdtPage');

// Элементы DOM - Кнопки навигации
const backBtn = document.getElementById('backBtn');
const backFromBuyBtn = document.getElementById('backFromBuyBtn');
const backFromSellBtn = document.getElementById('backFromSellBtn');
const usdtRubOption = document.getElementById('usdtRubOption');
const otherAssetsOption = document.getElementById('otherAssetsOption');
const usdtRubSubButtons = document.getElementById('usdtRubSubButtons');
const otherAssetsPanel = document.getElementById('otherAssetsPanel');
const buyUsdtBtn = document.getElementById('buyUsdtBtn');
const sellUsdtBtn = document.getElementById('sellUsdtBtn');

// Элементы DOM - Сортировка
const buySortOptions = document.getElementById('buySortOptions');
const sellSortOptions = document.getElementById('sellSortOptions');

// Элементы DOM - Контейнеры заявок
const buyOrdersContainer = document.getElementById('buyOrdersContainer');
const sellOrdersContainer = document.getElementById('sellOrdersContainer');

// ============================================
// МАССИВ ЗАЯВОК - ВОТ ЭТО МЕСТО МОЖНО РЕДАКТИРОВАТЬ!
// ============================================

// Массив заявок на ПОКУПКУ USDT (пользователь покупает USDT за RUB)
const buyOrders = [
    {
        id: "BUY-001",
        type: "buy",
        volume: 500,
        rate: 92.5,
        rubAmount: 46250,
        counterparty: "Иван Петров",
        exchange: "Binance",
        status: "active"
    },
    {
        id: "BUY-002",
        type: "buy",
        volume: 1000,
        rate: 91.8,
        rubAmount: 91800,
        counterparty: "Анна Сидорова",
        exchange: "Bybit",
        status: "active"
    },
    {
        id: "BUY-003",
        type: "buy",
        volume: 250,
        rate: 93.2,
        rubAmount: 23300,
        counterparty: "Петр Иванов",
        exchange: "Huobi",
        status: "active"
    },
    {
        id: "BUY-004",
        type: "buy",
        volume: 750,
        rate: 90.5,
        rubAmount: 67875,
        counterparty: "Мария Козлова",
        exchange: "OKX",
        status: "active"
    },
    {
        id: "BUY-005",
        type: "buy",
        volume: 1200,
        rate: 92.0,
        rubAmount: 110400,
        counterparty: "Сергей Смирнов",
        exchange: "Binance",
        status: "active"
    }
];

// Массив заявок на ПРОДАЖУ USDT (пользователь продает USDT за RUB)
const sellOrders = [
    {
        id: "SELL-001",
        type: "sell",
        volume: 300,
        rate: 89.5,
        rubAmount: 26850,
        counterparty: "Алексей Волков",
        exchange: "Bybit",
        status: "active"
    },
    {
        id: "SELL-002",
        type: "sell",
        volume: 800,
        rate: 88.7,
        rubAmount: 70960,
        counterparty: "Елена Новикова",
        exchange: "Binance",
        status: "active"
    },
    {
        id: "SELL-003",
        type: "sell",
        volume: 450,
        rate: 90.1,
        rubAmount: 40545,
        counterparty: "Дмитрий Федоров",
        exchange: "Huobi",
        status: "active"
    },
    {
        id: "SELL-004",
        type: "sell",
        volume: 600,
        rate: 89.0,
        rubAmount: 53400,
        counterparty: "Ольга Морозова",
        exchange: "OKX",
        status: "active"
    },
    {
        id: "SELL-005",
        type: "sell",
        volume: 950,
        rate: 88.2,
        rubAmount: 83790,
        counterparty: "Николай Павлов",
        exchange: "Bybit",
        status: "active"
    }
];

// ============================================
// КОНЕЦ РЕДАКТИРУЕМОЙ ЧАСТИ
// ============================================

// Текущая сортировка
let currentBuySort = 'rate-asc';
let currentSellSort = 'rate-asc';

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

// Навигация между страницами
function goToMainPage() {
    hideAllPages();
    mainPage.style.display = 'flex';
    tg.BackButton.hide();
}

function goToExchangePage() {
    hideAllPages();
    exchangePage.style.display = 'flex';
    tg.BackButton.show();
}

function goToBuyUsdtPage() {
    hideAllPages();
    buyUsdtPage.style.display = 'flex';
    tg.BackButton.show();
    renderBuyOrders();
}

function goToSellUsdtPage() {
    hideAllPages();
    sellUsdtPage.style.display = 'flex';
    tg.BackButton.show();
    renderSellOrders();
}

function hideAllPages() {
    mainPage.style.display = 'none';
    exchangePage.style.display = 'none';
    buyUsdtPage.style.display = 'none';
    sellUsdtPage.style.display = 'none';
    usdtRubSubButtons.style.display = 'none';
    otherAssetsPanel.style.display = 'none';
    usdtRubOpen = false;
    otherAssetsOpen = false;
}

// Переключение панелей на странице обменника
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
    updateArrows();
}

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
    updateArrows();
}

function updateArrows() {
    const usdtArrow = usdtRubOption.querySelector('.option-arrow i');
    const otherArrow = otherAssetsOption.querySelector('.option-arrow i');
    
    usdtArrow.className = usdtRubOpen ? 'fas fa-chevron-up' : 'fas fa-chevron-down';
    otherArrow.className = otherAssetsOpen ? 'fas fa-chevron-up' : 'fas fa-chevron-down';
}

// Функция для создания HTML заявки
function createOrderCard(order, isBuyPage) {
    const card = document.createElement('div');
    card.className = `order-card ${isBuyPage ? 'buy-card' : 'sell-card'}`;
    
    const typeText = isBuyPage ? 'ПОКУПКА USDT' : 'ПРОДАЖА USDT';
    const typeClass = isBuyPage ? 'buy' : 'sell';
    
    card.innerHTML = `
        <div class="order-header">
            <div class="order-id">ID: ${order.id}</div>
            <div class="order-type ${typeClass}">${typeText}</div>
        </div>
        
        <div class="order-details">
            <div class="order-detail">
                <div class="detail-label">Объем USDT</div>
                <div class="detail-value volume">${order.volume.toLocaleString('ru-RU')} USDT</div>
            </div>
            <div class="order-detail">
                <div class="detail-label">Курс обмена</div>
                <div class="detail-value highlight">${order.rate} RUB/USDT</div>
            </div>
            <div class="order-detail">
                <div class="detail-label">Сумма в рублях</div>
                <div class="detail-value amount">${order.rubAmount.toLocaleString('ru-RU')} ₽</div>
            </div>
            <div class="order-detail">
                <div class="detail-label">Статус заявки</div>
                <div class="detail-value">${order.status === 'active' ? 'Активна' : 'Забронирована'}</div>
            </div>
        </div>
        
        <div class="order-info-row">
            <div class="info-item">
                <div class="info-icon">
                    <i class="fas fa-user"></i>
                </div>
                <div class="info-text">
                    <h4>Контрагент</h4>
                    <p>${order.counterparty}</p>
                </div>
            </div>
            
            <div class="info-item">
                <div class="info-icon">
                    <i class="fas fa-exchange-alt"></i>
                </div>
                <div class="info-text">
                    <h4>Биржа</h4>
                    <p>${order.exchange}</p>
                </div>
            </div>
        </div>
        
        <button class="copy-id-btn" data-order-id="${order.id}">
            <i class="fas fa-copy"></i>
            Скопировать ID
        </button>
    `;
    
    return card;
}

// Сортировка заявок
function sortOrders(orders, sortType) {
    const sortedOrders = [...orders];
    
    switch(sortType) {
        case 'rate-asc':
            return sortedOrders.sort((a, b) => a.rate - b.rate);
        case 'rate-desc':
            return sortedOrders.sort((a, b) => b.rate - a.rate);
        case 'volume-asc':
            return sortedOrders.sort((a, b) => a.volume - b.volume);
        case 'volume-desc':
            return sortedOrders.sort((a, b) => b.volume - a.volume);
        default:
            return sortedOrders;
    }
}

// Обновление активных кнопок сортировки
function updateSortButtons(container, activeSort) {
    const buttons = container.querySelectorAll('.sort-btn');
    buttons.forEach(btn => {
        const sortType = btn.getAttribute('data-sort');
        if (sortType === activeSort) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

// Копирование ID в буфер обмена
function copyToClipboard(text) {
    // Создаем временный элемент textarea
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    
    // Выделяем и копируем текст
    textarea.select();
    textarea.setSelectionRange(0, 99999); // Для мобильных устройств
    
    try {
        document.execCommand('copy');
        return true;
    } catch (err) {
        console.error('Ошибка копирования:', err);
        return false;
    } finally {
        document.body.removeChild(textarea);
    }
}

// Рендеринг заявок на покупку
function renderBuyOrders() {
    buyOrdersContainer.innerHTML = '';
    
    // Сортировка заявок
    const sortedOrders = sortOrders(buyOrders, currentBuySort);
    
    sortedOrders.forEach(order => {
        if (order.status === 'active') {
            const card = createOrderCard(order, true);
            buyOrdersContainer.appendChild(card);
        }
    });
    
    // Обновляем активную кнопку сортировки
    updateSortButtons(buySortOptions, currentBuySort);
    
    // Добавляем обработчики для кнопок копирования ID
    document.querySelectorAll('#buyOrdersContainer .copy-id-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const orderId = this.getAttribute('data-order-id');
            
            // Копируем ID в буфер обмена
            if (copyToClipboard(orderId)) {
                // Меняем стиль кнопки на короткое время
                this.innerHTML = '<i class="fas fa-check"></i> ID скопирован';
                this.classList.add('copied');
                
                showNotification(`ID заявки "${orderId}" скопирован! Отправьте его в техническую поддержку.`);
                
                // Возвращаем исходный вид кнопки через 2 секунды
                setTimeout(() => {
                    this.innerHTML = '<i class="fas fa-copy"></i> Скопировать ID';
                    this.classList.remove('copied');
                }, 2000);
            } else {
                showNotification('Не удалось скопировать ID. Попробуйте еще раз.');
            }
        });
    });
}

// Рендеринг заявок на продажу
function renderSellOrders() {
    sellOrdersContainer.innerHTML = '';
    
    // Сортировка заявок
    const sortedOrders = sortOrders(sellOrders, currentSellSort);
    
    sortedOrders.forEach(order => {
        if (order.status === 'active') {
            const card = createOrderCard(order, false);
            sellOrdersContainer.appendChild(card);
        }
    });
    
    // Обновляем активную кнопку сортировки
    updateSortButtons(sellSortOptions, currentSellSort);
    
    // Добавляем обработчики для кнопок копирования ID
    document.querySelectorAll('#sellOrdersContainer .copy-id-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const orderId = this.getAttribute('data-order-id');
            
            // Копируем ID в буфер обмена
            if (copyToClipboard(orderId)) {
                // Меняем стиль кнопки на короткое время
                this.innerHTML = '<i class="fas fa-check"></i> ID скопирован';
                this.classList.add('copied');
                
                showNotification(`ID заявки "${orderId}" скопирован! Отправьте его в техническую поддержку.`);
                
                // Возвращаем исходный вид кнопки через 2 секунды
                setTimeout(() => {
                    this.innerHTML = '<i class="fas fa-copy"></i> Скопировать ID';
                    this.classList.remove('copied');
                }, 2000);
            } else {
                showNotification('Не удалось скопировать ID. Попробуйте еще раз.');
            }
        });
    });
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
backFromBuyBtn.addEventListener('click', goToExchangePage);
backFromSellBtn.addEventListener('click', goToExchangePage);

usdtRubOption.addEventListener('click', toggleUsdtRubPanel);
otherAssetsOption.addEventListener('click', toggleOtherAssetsPanel);

// Обработчики для перехода на страницы заявок
buyUsdtBtn.addEventListener('click', function() {
    animateButton(this);
    goToBuyUsdtPage();
});

sellUsdtBtn.addEventListener('click', function() {
    animateButton(this);
    goToSellUsdtPage();
});

// Обработчики для сортировки на странице покупки
buySortOptions.addEventListener('click', function(e) {
    if (e.target.classList.contains('sort-btn')) {
        const sortType = e.target.getAttribute('data-sort');
        currentBuySort = sortType;
        renderBuyOrders();
    }
});

// Обработчики для сортировки на странице продажи
sellSortOptions.addEventListener('click', function(e) {
    if (e.target.classList.contains('sort-btn')) {
        const sortType = e.target.getAttribute('data-sort');
        currentSellSort = sortType;
        renderSellOrders();
    }
});

// Обработка кнопки "Назад" в Telegram
tg.BackButton.onClick(() => {
    if (buyUsdtPage.style.display === 'flex') {
        goToExchangePage();
    } else if (sellUsdtPage.style.display === 'flex') {
        goToExchangePage();
    } else if (exchangePage.style.display === 'flex') {
        goToMainPage();
    }
});

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
