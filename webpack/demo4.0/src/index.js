import _ from 'lodash'
import printMe from './print'

function component() {
    let element = document.createElement('div');
  
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    element.classList.add('hello')

    let button = document.createElement('button')
    button.innerHTML = 'click the button and check the console'
    button.onclick = printMe
    element.appendChild(button)

    return element;
  }
  
  document.body.appendChild(component());