function pageLoaded() {
    const resultNode = document.querySelector('.j-result');
    // Ищем кнопку, по нажатии на которую будет запрос
    const btnNode = document.querySelector('.j-btn-request');
    let input1;
    let input2;
    
    const useRequest = () => {
      return fetch('https://picsum.photos/${input1}/${input2}')
        .then((response) => {
          console.log('response', response);
          return response.url;
        })
        .then((url) => { 
          let cardBlock = `<div class="card">
              <img
               src='https://picsum.photos/${input1}/${input2}'
               class="card-image"/>
           </div>`;
        console.log('cardBlock', cardBlock);
        resultNode.innerHTML = cardBlock;
      })
      .catch(() => { console.log('Ошибка!') });  
    };
    
    //обработчик события 
    btnNode.addEventListener('click', () => {
      input1 = document.querySelector('.num1').value;
      input2 = document.querySelector('.num2').value;
     if(input1 >= 100 && input1 <= 300 && input2 >= 100 && input2 <= 300) {
       let url = (`https://picsum.photos/${input1}/${input2}`);
       useRequest(url);
      } 
      else {
        const error = `<p>Число вне диапазона от 100 до 300</p>`;
         //вставка контента напрямую
        resultNode.innerHTML = error;
      }
    });
    }
    document.addEventListener("DOMContentLoaded", pageLoaded);
    
    
    