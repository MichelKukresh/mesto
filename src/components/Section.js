export default class Section {
    constructor({renderer}, selector) {        
        this._renderer = renderer;//берется из метода индекс(мягкая связь)
        this._container = document.querySelector(selector); //selector это класс куда нужно вставлять
    }

    renderItems(item) {
        item.forEach(item => this._renderer(item))
      }
    
    setItem(element) {
        this._container.prepend(element);
      }
    
}
    

