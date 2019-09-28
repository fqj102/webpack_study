class App {
    constructor() {
        document.body.appendChild(this.element());
    }

    element() {
        let element = document.createElement('div');
        element.innerHTML = 'new App';
        return element;
    }
}

export default App;
