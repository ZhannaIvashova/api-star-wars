const btnStart = document.getElementById('btn-start');
const result = document.querySelector('.result');

function validation() {
    result.textContent = 'Введите число';
}

btnStart.addEventListener('click', function() {
    const selectedObj = document.getElementById('selection');
    const number = document.getElementById('number');
    const resultFinally = document.querySelector('.resultFinally')
    const loader = document.querySelector('.loader');
    const mainContent = document.querySelector('main');

    result.textContent = '';
    resultFinally.textContent = '';

    if (number.value === '') return validation();

    mainContent.classList.add('main-hidden');
    loader.classList.remove('loader-hidden');

    fetch('https://swapi.py4e.com/api/' + selectedObj.value + '/' + number.value)
        .then(response => (response.ok) 
            ? response.json() 
            : Promise.reject('Запрос не найден. Статус код ' + response.status)
        )
        .then(data => {
            result.textContent = 'Name: ' + (data.name || data.title);
        })
        .catch((error) => {
            result.textContent = (
                error.name === undefined ? error : 'Ошибка ' + error.name + '. Проверьте url'
            )
        })
        .finally(() => {
            loader.classList.add('loader-hidden');
            mainContent.classList.remove('main-hidden');
            
            resultFinally.textContent = 'Запрос завершен';
        })
})
