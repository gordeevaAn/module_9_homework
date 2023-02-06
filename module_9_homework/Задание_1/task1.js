/*Задание 1
Вам дана заготовка и результат, который вы должны получить. Ваша задача — написать код,
который будет преобразовывать XML в JS-объект и выводить его в консоль.

XML:

<list>
  <student>
    <name lang="en">
      <first>Ivan</first>
      <second>Ivanov</second>
    </name>
    <age>35</age>
    <prof>teacher</prof>
  </student>
  <student>
    <name lang="ru">
      <first>Петр</first>
      <second>Петров</second>
    </name>
    <age>58</age>
    <prof>driver</prof>
  </student>
</list>

JS-объект:

{
  list: [
    { name: 'Ivan Ivanov', age: 35, prof: 'teacher', lang: 'en' },
    { name: 'Петр Петров', age: 58, prof: 'driver', lang: 'ru' },
  ]
}
*/

//XML, который мы будем парсить
const xmlString = `
<list>
  <student>
    <name lang="en">
      <first>Ivan</first>
      <second>Ivanov</second>
    </name>
    <age>35</age>
    <prof>teacher</prof>
  </student>
  <student>
    <name lang="ru">
      <first>Петр</first>
      <second>Петров</second>
    </name>
    <age>58</age>
    <prof>driver</prof>
  </student>
</list>
`;

function xmlParser(xmlString) {
const parser = new DOMParser(); // Создание экземпляра класса DOMParser

const xmlDOM = parser.parseFromString(xmlString, "text/xml"); //Парсинг XML

const listNode = xmlDOM.querySelector("list"); //Получение данных
const studentsNode = listNode.querySelectorAll("student"); //Получение данных

let result = {list: []}; //Создание переменной объекта с массивом

studentsNode.forEach((item) => {
    let student = new Object(); //Создаем объект
         //Получение всех свойств
        let firstName = item.querySelector("first");
        let secondName = item.querySelector("second");
        let age = item.querySelector("age");
        let prof = item.querySelector("prof");
        let nameNode = item.querySelector("name"); //создаем, чтобы получить атрибут
        let nameLang = nameNode.getAttribute("lang");
      /* Запись данных в объект */  
    student.name = firstName.textContent + ' ' + secondName.textContent;
    student.age = age.textContent;
    student.prof = prof.textContent;
	  student.lang = nameLang;

    result.list.push(student);
});

console.log(result)
};

xmlParser(xmlString);