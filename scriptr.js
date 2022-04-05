//получаем доступ к голове змейки
var snakeHead = document.getElementById('snakeHead');
//создаем массив с коордиинатами тела змейки
var snake = [{hor:2,ver:0},{hor:1,ver:0},{hor:0,ver:0}];

//кооринаты головый змейки
var horizontalCordinat = 3;
var verticalCordinat = 0;
//координты головы змейки для запоминания в буфер
var buffHorizontalCordinat = 3;
var buffVerticalCordinat = 0;
//направление движения
var dir = 'right';

//grid
var grid = 25;

//слушатели кнопок
document.addEventListener('keydown', function (e) {

  // Стрелка влево
 
  if (e.keyCode === 37 ) {
    dir = 'left';
  }
  // Стрелка вверх
  else if (e.keyCode === 38 ) {
    dir = 'bot';
  }
  // Стрелка вправо
  else if (e.keyCode === 39) {
    dir = 'right';
  }
  // Стрелка вниз
  else if (e.keyCode === 40 ) {
    dir = 'top';
  }
  console.log(e.keyCode)
});

//помещаем голову змейки в начальные координаты
snakeHead.style.left = `${horizontalCordinat*25}px`;
snakeHead.style.top = `${verticalCordinat*25}px`;
//создаем элементы тела змейки в соответствии с координатами и массива 


for (let i = 0; i < snake.length; i++){
  var snElem = document.createElement("div");
  snElem.classList.add('snakeElem');
  snElem.setAttribute('id',i)
  document.body.append(snElem);
  let snakeElement = document.getElementById(i);
  snakeElement.style.left = `${snake[i].hor*25}px`;
  snakeElement.style.top = `${snake[i].ver*25}px`
}

//счетчик
var count = 0;
function loop() {
  // функция замедляет скорость игры с 60 кадров в секунду до 6 (60/10 = 6)
  requestAnimationFrame(loop);
  if (++count < 10) {
    return;
  }
  // Обнуляем переменную скорости
  count = 0;
  // в зависимостимости от текущего направления меняем координаты головы
  switch (dir){
    case 'right':
      horizontalCordinat++;
      break;
    case 'left':
      horizontalCordinat--;
      break;
    case 'top':
      verticalCordinat++;
      break;
    case 'bot':
      verticalCordinat--;
      break;
  }
  //двигаем голову змейки согласно координатам
  snakeHead.style.left = `${horizontalCordinat*25}px`;
  snakeHead.style.top = `${verticalCordinat*25}px`;

  //массив элементов пополняем прошлыми координатами головы змейки из буфера
  snake.unshift( { hor: buffHorizontalCordinat, ver: buffVerticalCordinat } );
  //удаляем последний элемент
  snake.pop();

  ////перемещаем тело змейки согласно координатам
  for (let i = 0; i< snake.length;i++){
    let snakeElement = document.getElementById(i);
    snakeElement.style.left = `${snake[i].hor*25}px`;
    snakeElement.style.top = `${snake[i].ver*25}px`
  }

  //запоминаем в буфер текущее положение головы змейки
  buffHorizontalCordinat = horizontalCordinat;
  buffVerticalCordinat = verticalCordinat;
}
requestAnimationFrame(loop);