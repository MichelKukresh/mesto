
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
        //.querySelector(".elements__item") //вставится в элемент с этим классом
        

        // вернём DOM-элемент карточки
        return itemTemplate;
    }
    
    generateCard() {
        // Запишем разметку в приватное поле _element. 
        // Так у других элементов появится доступ к ней.
        this._element = this._getTemplate();

        this._element.querySelector(".elements__cut-text").textContent = this._name;
        //11.2. Заменять в разметке текст
        this._element.querySelector(".elements__image").src = this._link;
        //11.2.1 добавить ALT
        this._element.querySelector(".elements__image").alt = this._name;

        // Вернём элемент наружу
        return this._element;


    }
    

}




// Создайте класс Card, который создаёт карточку с текстом и ссылкой на изображение:
// принимает в конструктор её данные и селектор её template-элемента;
// содержит приватные методы, которые работают с разметкой, устанавливают слушателей событий;
// содержит приватные методы для каждого обработчика;
// содержит один публичный метод, который возвращает полностью работоспособный и наполненный данными элемент карточки.
// Для каждой карточки создайте экземпляр класса Card.


export {Card};


