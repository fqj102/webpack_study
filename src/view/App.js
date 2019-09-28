import img from 'img/logo.png';
import 'css/test.css';
import 'css/main.scss';
class App {
    constructor() {
        document.body.appendChild(this.element());
    }

    element() {
        let element = document.createElement('div');
        element.innerHTML = 'new App';

        let imgElement = document.createElement('img');
        imgElement.src = img;

        element.appendChild(imgElement);

        return element;
    }
}

export default App;
