//получаем доступ к голове змейки
var snakeHead = document.getElementById('snakeHead');

//создаем массив с коордиинатами тела змейки
var snake = [];

//кооринаты головый змейки
var horizontalCordinat;
var verticalCordinat ;

//координты головы змейки для запоминания в буфер
var buffHorizontalCordinat;
var buffVerticalCordinat;

//получаем доступ к игровому полю и табло
var canvas = document.getElementById('canvas');
var score = document.getElementById("score");

//переменная флаг
var game;

//ширина квадратика
var grid = 25;

//направление движения
var dir = 'right';

//функция старта/рестарта игры
function gameStart(){
  //удаляем все элементы змейки
  for (let i = 0; i < snake.length; i++){
    let delElem = document.getElementById(i);
    delElem.remove();
  }
  //выключаем флаг
  game = false;
  //задаем координаты трех начальных элементов змейки
  snake = [{hor:8,ver:8},{hor:7,ver:8},{hor:6,ver:8}];
  //обнуляем табло
  score.innerHTML = snake.length-3;
  //задаем начальные координаты головы
  horizontalCordinat = 9;
  verticalCordinat = 8;
  //задаем начальные координаты в буфер
  buffHorizontalCordinat = 9;
  buffVerticalCordinat = 8;
  //направление
  dir = 'right';
  //помещаем голову змейки в начальные координаты
  snakeHead.style.left = `${horizontalCordinat*grid}px`;
  snakeHead.style.top = `${verticalCordinat*grid}px`;
  
  //отдельно создаем начальные 3 элемента змейки
  for (let i = 0; i < snake.length; i++){
    var snElem = document.createElement("div");
    snElem.classList.add('snakeElem');
    snElem.setAttribute('id',i)
    canvas.appendChild(snElem);
    snElem.style.left = `${snake[i].hor*grid}px`;
    snElem.style.top = `${snake[i].ver*grid}px`  
  }

}
//запускаем игру
gameStart();


//получаем доступ к кнопкам
var restart = document.getElementById("restart");
var start = document.getElementById("start");
var pause = document.getElementById("pause");

pause.style.display = "none";

//вешаем на кнопки слушатели
start.addEventListener('click',() => {
  game = true;
  requestAnimationFrame(loop);
  start.style.display = "none";
  pause.style.display = "block";
});
restart.addEventListener('click',() =>  {
  gameStart();
  pause.style.display = "none";
  start.style.display = "block";
});
pause.addEventListener('click',() => {
  game = false;
  pause.style.display = "none";
  start.style.display = "block";
});




//начальные координаты еды

var foodHor;
var foodVer;

//обьявлем переменную отвественную за блок еды
var foodelem = document.getElementById('foodElem');


//рандомайзер
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

//функция создания элемента еды
function createFoodElement(){
  //перемещаем еду в рандомные координаты которые не совпадают с координатами тела змейки или прошлыми координатами еды 
  do{
    foodHor = getRandomInt(0,24);
    foodVer = getRandomInt(0,16);
    
    var chek = snake.reduce((acc,item) => ((item.hor == foodHor && item.ver == foodVer) ? acc+1 : acc),0);
    var chek2 = 0;
    if(foodHor == horizontalCordinat && foodVer == verticalCordinat){
      chek2 = 1;
    };
  } while(chek != 0 || chek2 != 0 );   
  foodelem.style.left = `${foodHor*grid}px`;
  foodelem.style.top = `${foodVer*grid}px`;
}
//сразу вызываем
createFoodElement();

//функция создает элемент тела змейки в соответствии с координатами в буфере 
function createSnakeElement(){
  
  snake.unshift({hor: buffHorizontalCordinat,ver: buffVerticalCordinat});

  var snElem = document.createElement("div");

  snElem.classList.add('snakeElem');
  snElem.setAttribute('id',snake.length-1)
  canvas.appendChild(snElem);
  let snakeElement = document.getElementById(snake.length-1);
  snakeElement.style.left = `${snake[0].hor*grid}px`;
  snakeElement.style.top = `${snake[0].ver*grid}px`

}

//слушатели кнопок
document.addEventListener('keydown', function (e) {
  //так же не позволяем идти змейке в обратном направлении или работать во время паузы
  // Стрелка влево
  if (e.keyCode === 37 && dir != 'right' && game == true ) {
    dir = 'left';
    count = 11;
  }
  // Стрелка вверх
  else if (e.keyCode === 38 && dir != 'top' && game == true) {
    dir = 'bot';
    count = 11;
  }
  // Стрелка вправо
  else if (e.keyCode === 39 && dir != 'left' && game == true) {
    dir = 'right';
    count = 11;
  }
  // Стрелка вниз
  else if (e.keyCode === 40 && dir != 'bot' && game == true) {
    dir = 'top';
    count = 11;
  }
});

//счетчик
var count = 0;

function loop() {
  //если флаг активирован
  if (game == true ){
  
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

  //проверка не врезалась ли змейка в себя(пробегает по координатам массива и сравнивает их с координатами головы)
  let chek3 = snake.reduce((acc,item) => ((item.hor == horizontalCordinat && item.ver == verticalCordinat) ? acc+1 : acc),0);
  //проверка не вышла ли змейка за границы поля
  let chek4 = (horizontalCordinat < 0 || horizontalCordinat > 23 || verticalCordinat < 0 || verticalCordinat > 15);
  if (chek3 || chek4){ 
    console.log('you lose');
    game = false;
    return;
  }

  //двигаем голову змейки согласно координатам
  snakeHead.style.left = `${horizontalCordinat*grid}px`;
  snakeHead.style.top = `${verticalCordinat*grid}px`;

  //если голова сьедает еду добавляем элемент и создаем новыую еду(новые координаты)
  if(horizontalCordinat == foodHor && verticalCordinat == foodVer){
    createSnakeElement();
    createFoodElement();
    score.innerHTML = snake.length-3;
  }

  //массив элементов пополняем прошлыми координатами головы змейки из буфера
  snake.unshift( { hor: buffHorizontalCordinat, ver: buffVerticalCordinat } );
  //удаляем последний элемент
  snake.pop();

  ////перемещаем тело змейки согласно координатам
  for (let i = 0; i< snake.length;i++){
    let snakeElement = document.getElementById(i);
    snakeElement.style.left = `${snake[i].hor*grid}px`;
    snakeElement.style.top = `${snake[i].ver*grid}px`
  }
  
  //запоминаем в буфер текущее положение головы змейки
  buffHorizontalCordinat = horizontalCordinat;
  buffVerticalCordinat = verticalCordinat;
  }
}
