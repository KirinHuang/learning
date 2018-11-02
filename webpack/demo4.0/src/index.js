import { cube } from './math'
import './style.css'

__webpack_nonce__ = 'c29tZSBjb29sIHN0cmluZyB3aWxsIHBvcCB1cCAxMjM=';

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js').then(registration => {
      console.log('WS registed: ', registration)
    }).catch(registrationError => {
      console.log('WS failed ', registrationError)
    })
  })
}

let element

function getComponent() {
  return import(/* webpackChunkName: "lodash" */ 'lodash').then(({ default:_ }) => {
    let element = document.createElement('pre');

    element.innerHTML = [
      'webpack',
      '5 cubed is equal ' + cube(5)
    ].join('\n\n');
    element.classList.add('hello')

    let button = document.createElement('button')
    button.innerHTML = 'click the button and check the console'
    button.onclick = () => import(/* webpackChunkName: "print" */'./print').then(({default: printMe}) => {
      printMe()
    })
    element.appendChild(button)

    return element;
  }).catch(error => console.log('An error occurred whil loading the component'))
}

getComponent().then(ele => {
  element = ele
  document.body.appendChild(ele);
})

if (module.hot) {
  module.hot.accept('./print.js', function () {
    console.log('the print.js change is detected', printMe)
    document.body.removeChild(element)
    document.body.appendChild(component())
  })
}