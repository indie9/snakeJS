//получаем доступ к голове змейки
var snakeHead = document.getElementById('snakeHead');
//создаем массив с коордиинатами тела змейки
var snake = [{hor:2,ver:0},{hor:1,ver:0},{hor:0,ver:0}];


var canvas = document.getElementById('canvas');



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
//начальные координаты еды
var foodHor;
var foodVer;

//создаем еду
var foodelem = document.getElementById('foodElem');

//помещаем голову змейки в начальные координаты
snakeHead.style.left = `${horizontalCordinat*25}px`;
snakeHead.style.top = `${verticalCordinat*25}px`;

//рандомайзер
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

//функция создания элемента еды
function createFoodElement(){

  do{
    foodHor = getRandomInt(0,5);
    foodVer = getRandomInt(0,5);
    var chek = snake.reduce((acc,item) => ((item.hor == foodHor && item.ver == foodVer) ? acc+1 : acc),0);
    var chek2 = 0;
    if(foodHor == horizontalCordinat && foodVer == verticalCordinat){
      chek2 = 1;
    };
  } while(chek != 0 || chek2 != 0 );
     
  foodelem.style.left = `${foodHor*25}px`;
  foodelem.style.top = `${foodVer*25}px`;
}
//сразу вызываем
createFoodElement();

//отдельно создаем начальные 3 элемента змейки
for (let i = 0; i < snake.length; i++){
  var snElem = document.createElement("div");
  snElem.classList.add('snakeElem');
  snElem.setAttribute('id',i)

  canvas.appendChild(snElem);
  
  snElem.style.left = `${snake[i].hor*25}px`;
  snElem.style.top = `${snake[i].ver*25}px`  
}

//функция создает элемент тела змейки в соответствии с координатами в буфере 
function createSnakeElement(){
  
  snake.unshift({hor: buffHorizontalCordinat,ver: buffVerticalCordinat});
  
  var snElem = document.createElement("div");
  snElem.classList.add('snakeElem');
  snElem.setAttribute('id',snake.length-1)
  canvas.appendChild(snElem);
  let snakeElement = document.getElementById(snake.length-1);

  snakeElement.style.left = `${snake[0].hor*25}px`;
  snakeElement.style.top = `${snake[0].ver*25}px`

}

//слушатели кнопок
document.addEventListener('keydown', function (e) {
  //так же не позволяем идти змейке в обратном направлении
  // Стрелка влево
  if (e.keyCode === 37 && dir != 'right' ) {
    dir = 'left';
  }
  // Стрелка вверх
  else if (e.keyCode === 38 && dir != 'top') {
    dir = 'bot';
  }
  // Стрелка вправо
  else if (e.keyCode === 39 && dir != 'left') {
    dir = 'right';
  }
  // Стрелка вниз
  else if (e.keyCode === 40 && dir != 'bot') {
    dir = 'top';
  }
});

//счетчик
var count = 0;

function loop() {
  if(r != true){
    return;
  }
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

  let chek3 = snake.reduce((acc,item) => ((item.hor == horizontalCordinat && item.ver == verticalCordinat) ? acc+1 : acc),0);
  let chek4 = (horizontalCordinat < 0 || horizontalCordinat > 15 || verticalCordinat < 0 || verticalCordinat > 15);
  if (chek3 || chek4){
    
    console.log('yu lose');
    r = false;
    return;
  }

  //двигаем голову змейки согласно координатам
  snakeHead.style.left = `${horizontalCordinat*25}px`;
  snakeHead.style.top = `${verticalCordinat*25}px`;

  //если голова сьедает еду добавляем элемент и создаем новыую еду(новые координаты)
  if(horizontalCordinat == foodHor && verticalCordinat == foodVer){
    createSnakeElement();
    createFoodElement();
  }

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
var  r = requestAnimationFrame(loop);