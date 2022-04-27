export default class Section {
    constructor({items, renderer}, selector) {
        this._renderedItems = items;
        this._renderer = renderer;//берется из метода индекс(мягкая связь)
        this._container = document.querySelector(selector); //selector это класс куда нужно вставлять
    }

    renderItems() {
        this._renderedItems.forEach(item => this._renderer(item))
      }
    
    setItem(element) {
        this._container.append(element);
      }
    
}
    

