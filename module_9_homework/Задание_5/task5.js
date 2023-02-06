function pageLoaded() {
    const resultNode = document.querySelector('.j-result');
    const btnNode = document.querySelector('.j-btn-request');
    const result = document.querySelector('#result');
    let input1;
    let input2;
    const storage = localStorage.getItem('data')
    if (storage)
        displayResult(JSON.parse(storage));

    btnNode.addEventListener("click", sendRequest);

    function sendRequest() {
        input1 = document.querySelector('.num1').value;
        input2 = document.querySelector('.num2').value;
        if (input1 >= 1 && input1 <= 10 && input2 >= 1 && input2 <= 10) {
            useRequest(`https://picsum.photos/v2/list?page=${input1}&limit=${input2}`, displayResult);
        } else if (input1 >= 1 && input1 <= 10 && (input2 < 1 || input2 > 10 || !isNaN(input2))) {
            writeOutput('Лимит страницы вне диапазона от 1 до 10');
        } else if ((input2 >= 1 && input2 <= 10) && (input1 < 1 || input1 > 10 || !isNaN(input1))) {
            writeOutput('Номер страницы вне диапазона от 1 до 10');
        } else {
            writeOutput('Номер страницы и лимит вне диапазона от 1 до 10')
        };
    };

    function writeOutput(message) {
        result.textContent = message;
    };
    function useRequest(url, callback) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true)
        xhr.onload = function () {
            if (xhr.status != 200) {
                console.log('Статус ответа: ', xhr.status);
            } else {
                localStorage.setItem('data', xhr.response);
                const result = JSON.parse(xhr.response);
                if (callback) {
                    callback(result);
                }
            }
        };
        xhr.onerror = function () {
            console.log('Ошибка! Статус ответа: ', xhr.status);
        };
        //отправка запроса
        xhr.send();
    };
    function displayResult(apiData) {
        let cards = '';
        apiData.forEach(item => {
            const cardBlock = `
          <div class="card">
            <img
              src="${item.download_url}"
              class="card-image"
            />
            <p>${item.author}</p>
          </div>
        `;
            cards = cards + cardBlock;
        });
        //вставка контента напрямую
        resultNode.innerHTML = cards;
    }
};
document.addEventListener("DOMContentLoaded", pageLoaded);

