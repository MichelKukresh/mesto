
class Card {
    // в конструкторе будут динамические данные,
    // для каждого экземпляра свои
    constructor(name, link) {
        this._name = name;
        this._link = link;
    }

    // здесь выполним все необходимые операции, чтобы вернуть разметку
    _getTemplate() {
        // забираем разметку из HTML и клонируем элемент
        const itemTemplate = document
        .querySelector("#card-template") //ищет сам темпл
        .content
        .cloneNode(true);
        
        // вернём DOM-элемент карточки
        return itemTemplate;
    }
    
    generateCard() {
        // Запишем разметку в приватное поле _element. 
        // Так у других элементов появится доступ к ней.
        this._element = this._getTemplate();

        this._setEventListeners();//привязываем слушатель, а что и как описано ниже

        this._element.querySelector(".elements__cut-text").textContent = this._name;
        //11.2. Заменять в разметке текст
        this._element.querySelector(".elements__image").src = this._link;
        //11.2.1 добавить ALT
        this._element.querySelector(".elements__image").alt = this._name;

        // Вернём элемент наружу
        return this._element;
    }

    //1.1 функционал обработки событий
    _handleMessegeClick(evt) { //описываем что будем и где делать
        //this._element.querySelector(".elements__hart").
        
        evt.target.classList.toggle("elements__hart_activ");
    }

    //Реализация удаления
    _elementDelete(event) {
        event.target.closest(".elements__item-list").remove(); //найти элемент ближайщий и закрыть его
    }

    //1.1 функционал обработки событий - метод добавления события на кнопку(нужен для добавления нескольких слушателей)
    _setEventListeners() { //навешиваем само событие
        this._element.querySelector(".elements__hart").addEventListener('click', (evt) => {
            this._handleMessegeClick(evt);
        });

        this._element.querySelector(".elements__dell").addEventListener('click', (event) => {
            this._elementDelete(event);
        })



    }


}




// Создайте класс Card, который создаёт карточку с текстом и ссылкой на изображение:
// принимает в конструктор её данные и селектор её template-элемента;
// содержит приватные методы, которые работают с разметкой, устанавливают слушателей событий;
// содержит приватные методы для каждого обработчика;
// содержит один публичный метод, который возвращает полностью работоспособный и наполненный данными элемент карточки.
// Для каждой карточки создайте экземпляр класса Card.


export {Card};


