let groupsData = [];
let currentGroup = 0;
let viewMode = 'students'; // 'students' или 'labs'

// Данные лабораторных работ
const labsData = [
    {
        number: 1,
        title: "Лабораторная работа №1",
        description: "Введение в HTML и CSS. Создание базовой структуры веб-страницы.",
        available: true,
        downloadUrl: "files/lab1.pdf" // Замените на реальный URL файла
    },
    {
        number: 2,
        title: "Лабораторная работа №2",
        description: "Семантическая вёрстка, Flex/Grid, адаптивность с медиазапросами.",
        available: true,
        downloadUrl: "files/lab2.pdf"
    },
    {
        number: 3,
        title: "Лабораторная работа №3",
        description: "CSS-препроцессоры: LESS и SASS",
        available: true,
        downloadUrl: "files/lab3.pdf"
    },
    {
        number: 4,
        title: "Лабораторная работа №4",
        description: "CSS-библиотеки: Bootstrap & Tailwind",
        available: true,
        downloadUrl: "files/lab4.pdf"
    },
    {
        number: 5,
        title: "Лабораторная работа №5",
        description: "Введение в JavaScript",
        available: true,
        downloadUrl: "files/lab5.pdf"
    },
    {
        number: 6,
        title: "Лабораторная работа №6",
        description: "Асинхронный JavaScript — API и хранилище",
        available: true,
        downloadUrl: "files/lab6.pdf"
    },
    {
        number: 7,
        title: "Лабораторная работа №7",
        description: "jQuery: зачем и почему меньше актуально",
        available: false
    },
    {
        number: 8,
        title: "Лабораторная работа №8",
        description: "Введение в React + JSX",
        available: false
    },
    {
        number: 9,
        title: "Лабораторная работа №9",
        description: "Работа с данными (API + React Hooks)",
        available: false
    },
    {
        number: 10,
        title: "Лабораторная работа №10",
        description: "Мини-проект: «AI-powered веб-приложение»",
        available: false
    }
];

// Данные для fallback (когда файл открыт локально через file://)
const fallbackData = {
  "groups": [
    {
      "name": "24ИС",
      "students": [
        {
          "id": 1,
          "name": "Иванов Иван Иванович",
          "labs": [10, 10, 8, 10, 6, 10, 10, 4, 0, 0]
        },
        {
          "id": 2,
          "name": "Петрова Мария Сергеевна",
          "labs": [10, 10, 10, 10, 10, 10, 10, 10, 10, 8]
        },
        {
          "id": 3,
          "name": "Сидоров Алексей Дмитриевич",
          "labs": [8, 6, 10, 8, 10, 6, 8, 4, 0, 0]
        },
        {
          "id": 4,
          "name": "Козлова Анна Владимировна",
          "labs": [10, 10, 10, 10, 10, 10, 10, 10, 6, 0]
        },
        {
          "id": 5,
          "name": "Морозов Дмитрий Андреевич",
          "labs": [6, 8, 6, 4, 8, 6, 0, 0, 0, 0]
        }
      ]
    },
    {
      "name": "24ИВ",
      "students": [
        {
          "id": 6,
          "name": "Смирнова Екатерина Игоревна",
          "labs": [10, 10, 10, 10, 10, 10, 10, 10, 10, 10]
        },
        {
          "id": 7,
          "name": "Новиков Павел Олегович",
          "labs": [10, 8, 10, 10, 8, 10, 6, 4, 0, 0]
        },
        {
          "id": 8,
          "name": "Волкова Ольга Михайловна",
          "labs": [8, 10, 8, 10, 10, 8, 10, 8, 6, 0]
        },
        {
          "id": 9,
          "name": "Соколов Артём Васильевич",
          "labs": [10, 10, 10, 10, 10, 10, 10, 8, 0, 0]
        },
        {
          "id": 10,
          "name": "Лебедева Виктория Андреевна",
          "labs": [6, 8, 6, 8, 6, 4, 6, 0, 0, 0]
        }
      ]
    },
    {
      "name": "24ПИ",
      "students": [
        {
          "id": 11,
          "name": "Федоров Максим Николаевич",
          "labs": [10, 10, 10, 10, 10, 10, 10, 10, 10, 6]
        },
        {
          "id": 12,
          "name": "Егорова София Александровна",
          "labs": [8, 10, 8, 6, 10, 8, 6, 4, 0, 0]
        },
        {
          "id": 13,
          "name": "Павлов Кирилл Сергеевич",
          "labs": [10, 10, 10, 10, 10, 10, 10, 10, 8, 0]
        },
        {
          "id": 14,
          "name": "Романова Дарья Игоревна",
          "labs": [6, 6, 8, 6, 4, 6, 4, 0, 0, 0]
        },
        {
          "id": 15,
          "name": "Васильев Никита Дмитриевич",
          "labs": [10, 10, 10, 10, 10, 10, 8, 6, 4, 0]
        }
      ]
    }
  ]
};

// Загрузка данных из JSON (с fallback для локальной работы)
async function loadData() {
    try {
        const response = await fetch('data/students.json');
        const data = await response.json();
        groupsData = data.groups;
        
        console.log('✅ Данные загружены с сервера');
    } catch (error) {
        // Если ошибка CORS (локальное открытие файла), используем fallback
        console.warn('⚠️ Не удалось загрузить данные с сервера, используются встроенные данные');
        console.log('💡 Для работы с внешним JSON запустите локальный веб-сервер');
        groupsData = fallbackData.groups;
    }
    
    // Инициализация после загрузки данных
    initTabs();
    displayStudents(currentGroup);
}

// Вычисление цвета прогресс-бара на основе процента
function getProgressColor(percentage) {
    if (percentage >= 80) {
        return '#10b981'; // Зелёный для автозачёта
    } else if (percentage >= 60) {
        return '#f59e0b'; // Оранжевый
    } else if (percentage >= 40) {
        return '#ef4444'; // Красный
    } else if (percentage >= 20) {
        return '#dc2626'; // Темно-красный
    } else {
        return '#991b1b'; // Очень темно-красный
    }
}

// Отображение студентов выбранной группы
function displayStudents(groupIndex) {
    const container = document.getElementById('students-container');
    const group = groupsData[groupIndex];
    
    if (!group) {
        container.innerHTML = '<p style="color: white; text-align: center;">Группа не найдена</p>';
        return;
    }

    container.innerHTML = '';

    group.students.forEach(student => {
        const totalScore = student.labs.reduce((sum, score) => sum + score, 0);
        const percentage = totalScore; // Из 100 баллов
        const completedLabs = student.labs.filter(score => score > 0).length;
        const allLabsCompleted = student.labs.every(score => score > 0);
        
        const studentCard = document.createElement('div');
        studentCard.className = 'student-card';
        
        const progressColor = getProgressColor(percentage);
        
        studentCard.innerHTML = `
            <div class="student-header">
                <div class="student-name">${student.name}</div>
                <div class="student-score">
                    <span class="score-value" style="color: ${progressColor}">${totalScore}/100</span>
                    ${percentage >= 80 && allLabsCompleted ? '<span class="auto-pass">Автозачёт</span>' : ''}
                </div>
            </div>
            
            <div class="progress-container">
                <div class="progress-bar-wrapper">
                    <div class="progress-bar" style="width: ${percentage}%; background-color: ${progressColor}">
                        ${percentage}%
                    </div>
                </div>
            </div>
            
            <div class="labs-title">Лабораторные работы (${completedLabs}/10)</div>
            <div class="labs-grid">
                ${student.labs.map((score, index) => {
                    let labClass = 'empty';
                    if (score === 10) {
                        labClass = 'complete';
                    } else if (score > 0) {
                        labClass = 'partial';
                    }
                    
                    return `
                        <div class="lab-item ${labClass}">
                            <div class="lab-number">ЛР ${index + 1}</div>
                            <div class="lab-score">${score}/10</div>
                        </div>
                    `;
                }).join('')}
            </div>
        `;
        
        container.appendChild(studentCard);
    });
}

// Обработка переключения вкладок
function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Убираем активный класс со всех кнопок
            tabButtons.forEach(btn => btn.classList.remove('active'));
            
            // Добавляем активный класс к нажатой кнопке
            button.classList.add('active');
            
            // Получаем индекс группы и отображаем студентов
            currentGroup = parseInt(button.dataset.group);
            displayStudents(currentGroup);
        });
    });
}

// Отображение лабораторных работ
function displayLabs() {
    viewMode = 'labs';
    const container = document.getElementById('students-container');
    const tabsContainer = document.querySelector('.tabs');
    
    // Скрываем вкладки групп
    tabsContainer.style.display = 'none';
    
    container.innerHTML = '<button class="back-button" id="backButton">← Вернуться к студентам</button>';
    
    const labsContainer = document.createElement('div');
    labsContainer.id = 'labs-container';
    
    labsData.forEach(lab => {
        const labCard = document.createElement('div');
        labCard.className = `lab-card ${lab.available ? 'active' : 'inactive'}`;
        
        labCard.innerHTML = `
            <div class="lab-header">
                <div class="lab-number-badge">ЛР ${lab.number}</div>
                <div class="lab-status ${lab.available ? 'available' : 'in-development'}">
                    ${lab.available ? 'Доступна' : 'В разработке'}
                </div>
            </div>
            <div class="lab-title">${lab.title}</div>
            <div class="lab-description">${lab.description}</div>
            <button class="lab-download-btn ${lab.available ? 'active' : 'inactive'}" 
                    ${lab.available ? '' : 'disabled'}
                    data-url="${lab.downloadUrl || ''}">
                ${lab.available ? '📥 Скачать задание' : '🔒 В разработке'}
            </button>
        `;
        
        labsContainer.appendChild(labCard);
    });
    
    container.appendChild(labsContainer);
    
    // Обработчик кнопки "Назад"
    document.getElementById('backButton').addEventListener('click', () => {
        viewMode = 'students';
        tabsContainer.style.display = 'flex';
        displayStudents(currentGroup);
    });
    
    // Обработчики кнопок скачивания
    document.querySelectorAll('.lab-download-btn.active').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const url = e.target.dataset.url;
            if (url && url !== '#') {
                window.location.href = url;
            } else {
                alert('Файл для скачивания будет доступен позже');
            }
        });
    });
}

// Управление модальным окном с правилами
function initModal() {
    const modal = document.getElementById('rulesModal');
    const rulesButton = document.getElementById('rulesButton');
    const closeButton = document.getElementById('closeModal');

    // Открытие модального окна
    rulesButton.addEventListener('click', () => {
        modal.classList.add('show');
    });

    // Закрытие по клику на крестик
    closeButton.addEventListener('click', () => {
        modal.classList.remove('show');
    });

    // Закрытие по клику вне окна
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('show');
        }
    });

    // Закрытие по клавише Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            modal.classList.remove('show');
        }
    });
}

// Управление переключением между студентами и лабораторными
function initLabsCard() {
    const labsCard = document.getElementById('labsCard');
    
    labsCard.addEventListener('click', () => {
        displayLabs();
    });
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    loadData();
    initModal();
    initLabsCard();
});

