let tratorX = 0;  // Posição inicial do trator
let tratorSpeed = 3;  // Velocidade do trator
let sementes = [];
let plantas = [];

function setup() {
  createCanvas(800, 400);
}

function draw() {
  background(220);
  
  // Céu e solo
  noStroke();
  fill(135, 206, 250);  // cor do céu
  rect(0, 0, width, height / 2);  // céu
  
  fill(34, 139, 34);  // cor do campo
  rect(0, height / 2, width, height / 2);  // campo
  
  // Desenhar o campo
  drawCampo();
  
  // Desenhar a cidade
  drawCidade();
  
  // Desenhar o trator
  drawTrator();
  
  // Gerar sementes
  generateSementes();
  
  // Desenhar as sementes e as plantas
  drawSementes();
  drawPlantas();
  
  // Mover o trator com o mouse
  tratorX = mouseX - 30;  // Fazendo o trator seguir o movimento do mouse
  
  // Garantir que o trator não saia da tela
  tratorX = constrain(tratorX, 0, width - 60);
}

function drawCampo() {
  // Árvores no campo
  fill(34, 139, 34);
  ellipse(100, height / 1.6, 100, 100);  // árvore 1
  ellipse(200, height / 1.8, 100, 100);  // árvore 2
  fill(139, 69, 19);
  rect(90, height / 1.5, 20, 50);  // tronco da árvore 1
  rect(190, height / 1.7, 20, 50);  // tronco da árvore 2

  // Fazenda
  fill(255, 0, 0);  // cor da fazenda
  rect(50, height / 1.2, 150, 80);  // corpo da fazenda
  fill(255, 255, 255);  // cor do telhado
  triangle(50, height / 1.2, 200, height / 1.2, 125, height / 1.4);  // telhado
}

function drawCidade() {
  // Prédios na cidade
  fill(169, 169, 169);  // cor dos prédios
  rect(600, height / 2 - 120, 100, 120);  // prédio 1
  rect(700, height / 2 - 150, 80, 150);  // prédio 2
  
  // Carros na rua
  fill(255, 0, 0);
  rect(580, height / 1.5, 40, 20);  // carro 1
  fill(0, 0, 255);
  rect(650, height / 1.5, 40, 20);  // carro 2
  
  // Luzes da cidade
  fill(255, 255, 0);
  ellipse(650, height / 3, 10, 10);  // farol 1
  ellipse(750, height / 3, 10, 10);  // farol 2
}

function drawTrator() {
  // Corpo do trator
  fill(255, 165, 0);  // cor do trator (laranja)
  rect(tratorX, height / 1.5, 60, 30);  // base do trator
  
  // Rodas do trator
  fill(0);
  ellipse(tratorX + 15, height / 1.5 + 30, 20, 20);  // roda 1
  ellipse(tratorX + 45, height / 1.5 + 30, 20, 20);  // roda 2
  
  // Cabine do trator
  fill(100, 100, 255);
  rect(tratorX + 20, height / 1.6 - 20, 30, 20);  // cabine
}

function generateSementes() {
  // Gerar sementes com base na posição do trator
  if (frameCount % 5 === 0) {
    sementes.push({
      x: tratorX + 30,  // Posição do trator
      y: height / 1.5,  // Posição do solo
      size: 8,
      color: color(255, 223, 0), // cor da semente
      speed: random(1, 3)
    });
  }
}

function drawSementes() {
  for (let i = sementes.length - 1; i >= 0; i--) {
    let semente = sementes[i];
    fill(semente.color);
    noStroke();
    ellipse(semente.x, semente.y, semente.size, semente.size);
    
    // Movimentar sementes para baixo
    semente.y += semente.speed;
    
    // Remover sementes que saem da tela
    if (semente.y > height) {
      sementes.splice(i, 1);
      // Quando a semente atinge o solo, ela se transforma em uma planta
      plantas.push({
        x: semente.x,
        y: height / 2,
        size: 0, // Tamanho inicial da planta
        growth: random(2, 3)  // Taxa de crescimento
      });
    }
  }
}

function drawPlantas() {
  for (let i = plantas.length - 1; i >= 0; i--) {
    let planta = plantas[i];
    
    // Crescimento da planta
    planta.size += planta.growth;
    fill(0, 255, 0);  // cor da planta (verde)
    noStroke();
    
    // Desenho da planta
    ellipse(planta.x, planta.y, planta.size, planta.size / 2);
    
    // Se a planta atingir um tamanho grande, ela "fica fixa"
    if (planta.size > 50) {
      plantas.splice(i, 1);
    }
  }
}