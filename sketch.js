let input;
let slider;
let button;
let dropdown;
let iframe;
let jump = false;
let offsets = [];

function setup() { //這是一個設定函數，只會執行一次
  //產生一個畫布，充滿整個畫布，背景顏色為fcf6bd(買回來的畫紙)
  createCanvas(windowWidth, windowHeight); 
  background('#fcf6bd');

  // 創建輸入文字框，並設置其位置和大小
  input = createInput();
  input.position(10, 10);
  input.size(300, 50);
  input.style('font-size', '24px'); // 設置文字大小
  input.style('background-color', '#dffdab9'); // 設置背景顏色
  input.value('🎷🎺📯🥁'); // 預設文字

  // 創建滑桿，並設置其位置和大小
  slider = createSlider(12, 40, 24);
  slider.position(450, 25);
  slider.style('width', '200px'); // 設置寬度

  // 創建按鈕，並設置其位置和文字
  button = createButton('跳動');
  button.position(700, 25);
  button.mousePressed(toggleJump);
  button.style('font-size', '20px'); // 設置文字大小
  button.style('background-color', '#f8ad9d'); // 設置背景顏色

  // 創建下拉式選單，並設置其位置和選項
  dropdown = createSelect();
  dropdown.position(800, 25);
  dropdown.size(500);
  dropdown.style('font-size', '24px'); // 設置文字大小
  dropdown.option('淡江大學');
  dropdown.option('教育科技學系');
  dropdown.option('教學平台');
  dropdown.changed(openWebsite);

  // 創建 iframe，並設置其位置和大小
  iframe = createElement('iframe');
  iframe.position(10, 70);
  iframe.size(windowWidth - 20, windowHeight - 80);

  // 初始化每行的偏移量
  for (let i = 0; i < height / 20; i++) {
    offsets.push([]);
    for (let j = 0; j < width / 20; j++) {
      offsets[i].push(random(-5, 5));
    }
  }
}

function draw() { //這是一個繪圖函數，會一直執行
  background('#fcf6bd'); // 確保每次繪圖前清除畫布
  fill('#b388eb'); // 設置滑桿顏色
  textSize(24); // 設置文字大小
  text("文字大小", 340, 25); // 顯示文字 "文字大小"，並設置位置
  let textSizeValue = slider.value(); // 獲取滑桿的值
  textSize(textSizeValue); // 設置文字大小
  textAlign(LEFT, TOP); //文字對齊方式
  fill('#d0f4de'); //文字顏色
  stroke('#e4c1f9'); //文字外框顏色
  strokeWeight(2); //文字外框寬度

  let textContent = input.value(); // 獲取輸入框中的文字
  let space = 10; // 設置字串與字串之間的間距為 10
  let textWidthContent = textWidth(textContent); // 計算文字的寬度
  let y = 100; // 從 y 座標 100 開始

  let lineIndex = 0;
  while (y < height) {
    let x = 0; // 從 x 座標 0 開始
    let charIndex = 0;
    while (x < width) {
      let offset = jump ? offsets[lineIndex][charIndex] : 0;
      text(textContent, x, y + offset);
      x += textWidthContent + space; // 每次移動文字寬度加上間距
      charIndex++;
    }
    y += textSizeValue + 20; // 每次移動文字高度加上行間距 20
    lineIndex++;
  }

  // 更新偏移量
  if (jump) {
    for (let i = 0; i < offsets.length; i++) {
      for (let j = 0; j < offsets[i].length; j++) {
        offsets[i][j] = random(-5, 5);
      }
    }
  }
}

function toggleJump() {
  jump = !jump;
}

function openWebsite() {
  let selected = dropdown.value();
  if (selected === '淡江大學') {
    iframe.attribute('src', 'https://www.tku.edu.tw/');
  } else if (selected === '教育科技學系') {
    iframe.attribute('src', 'https://www.et.tku.edu.tw/');
  } else if (selected === '教學平台') {
    iframe.attribute('src', 'https://hackmd.io/@YiowMjJRS_a3HLkDE8qVAQ/SyqxMW-h1g');
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  iframe.size(windowWidth - 20, windowHeight - 80);
  offsets = [];
  for (let i = 0; i < height / 20; i++) {
    offsets.push([]);
    for (let j = 0; j < width / 20; j++) {
      offsets[i].push(random(-5, 5));
    }
  }
}