//функция-обёртка
function useRequest(url, callback) {
    //новый экземпляр
    var xhr = new XMLHttpRequest();
    //инициализация запроса
    xhr.open('GET', url, true);
    //свойство, которому можно присвоить callback-функцию,
    //которая сработает если запрос успешно отработал
    xhr.onload = function() {
      if (xhr.status != 200) {
        console.log('Статус ответа: ', xhr.status);
      } else {
        //парсим и выводим результат
        const result = JSON.parse(xhr.response);
        if (callback) {
          callback(result);
        }
      }
    };
    //свойство, которому можно присвоить callback-функцию, 
    //которая сработает, если запрос завершился ошибкой;
    xhr.onerror = function() {
      console.log('Ошибка! Статус ответа: ', xhr.status);
    };
    //отправка запроса
    xhr.send();
  };
  
  // Ищем ноду для вставки результата запроса
  const resultNode = document.querySelector('.j-result');
  // Ищем кнопку, по нажатии на которую будет запрос
  const btnNode = document.querySelector('.j-btn-request');
  //сборка и отображение результата
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
  //обработчик события 
  btnNode.addEventListener('click', () => {
    let value = document.querySelector('input').value;
   if(value >= 1 && value <= 10) {
      useRequest(`https://picsum.photos/v2/list?limit=${value}`, displayResult);
    } 
    else {
      const error = `<div class = "card"><p>Число вне диапазона от 1 до 10</p></div>`;
       //вставка контента напрямую
      resultNode.innerHTML = error;
    }
  });
  
  
  