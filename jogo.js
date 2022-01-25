console.log('[Dev Lucas Furquim] Flappy Bird')

const hit = new Audio();
hit.src = 'efeitos/efeitos_hit.wav';

let frames = 0;
const sprites = new Image();
sprites.src = 'sprites/sprites.png';

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');

//tela de fundo
const planoFundo = {
    spriteX: 386,
    spriteY: 4,
    largura: 279,
    altura: 201,
    x: -10,
    y: canvas.height - 201,
    desenhar(){
        contexto.fillStyle = '#70c5ce';
        contexto.fillRect(0,0, canvas.width, canvas.height)

        contexto.drawImage(
            sprites,
            planoFundo.spriteX, planoFundo.spriteY, //sprite X e Y
            planoFundo.largura, planoFundo.altura, //tamanho do recorte no sprite
            planoFundo.x,planoFundo.y, //posição X e X
            planoFundo.largura,planoFundo.altura  //tamanho do sprite 
        );
        contexto.drawImage(
            sprites,
            planoFundo.spriteX, planoFundo.spriteY, //sprite X e Y
            planoFundo.largura, planoFundo.altura, //tamanho do recorte no sprite
            planoFundo.x + planoFundo.largura - 70,planoFundo.y, //posição X e X
            planoFundo.largura,planoFundo.altura  //tamanho do sprite 
        );
    }
}


//chão

function criaChao(){
const chao = {
    spriteX: 1,
    spriteY:605,
    largura:226,
    altura:144,
    x: 0,
    y: canvas.height - 115,
    atualiza(){
        const movimentoChao = 2;
        const repete = chao.largura / 2;
        const movimentacao = chao.x - movimentoChao;

        chao.x = movimentacao % repete;
    },
    desenhar(){
        contexto.drawImage(
            sprites,
            chao.spriteX, chao.spriteY, //sprite X e Y
            chao.largura, chao.altura, //tamanho do recorte no sprite
            chao.x,chao.y, //posição X e X
            chao.largura,chao.altura  //tamanho do sprite 
        );
        contexto.drawImage(
            sprites,
            chao.spriteX, chao.spriteY, //sprite X e Y
            chao.largura, chao.altura, //tamanho do recorte no sprite
            chao.x + chao.largura - 16.5,chao.y, //posição X e X
            chao.largura,chao.altura  //tamanho do sprite 
        );
    },
};
return chao;
}

function fazcolisao(flappyBird, chao){
    const flappyBirdY = flappyBird.y + flappyBird.altura;
    const chaoY = chao.y;

    if(flappyBirdY >= chaoY){
        return true;
    }
    return false;
}

//passaro

function criaflappyBird(){

const flappyBird = {
    spriteX: 1,
    spriteY: 1,
    largura: 33,
    altura: 22,
    x: 10,
    y: 50,
    pulo: 4.6,
    pula(){
        console.log('devo pular');
        console.log('[antes]', flappyBird.velocidade);
        flappyBird.velocidade = - flappyBird.pulo;
        console.log('[depois]', flappyBird.velocidade);
    },
    gravidade: 0.25,
    velocidade: 0,
    atualiza(){
        if(fazcolisao(flappyBird, globais.chao)){
            hit.play();

            setTimeout(() => {
                mudaDeTela(tela.inicio);
            }, 500);
            mudaDeTela(tela.inicio);
            return;
        }

        flappyBird.velocidade = flappyBird.velocidade + flappyBird.gravidade;
        flappyBird.y = flappyBird.y +  flappyBird.velocidade;
    },

    movimentos: [
        {spriteX: 1, spriteY: 1,},
        {spriteX: 2, spriteY: 26,},
        {spriteX: 1, spriteY: 52,},
        {spriteX: 2, spriteY: 26,},
    ],

    frameAtual: 0,
    atualizaFrame(){
        const intervaloFrames = 10;
        const passouIntervalo = frames % intervaloFrames === 0;
        if (passouIntervalo){

       
            //contar alguns segundos
         const baseIncremento = 1;
         const incremento = baseIncremento + flappyBird.frameAtual;
         const baseRepete = flappyBird.movimentos.length;
         flappyBird.frameAtual = incremento % baseRepete
        }
    },

    desenhar(){
        flappyBird.atualizaFrame();
        const { spriteX, spriteY } = flappyBird.movimentos[flappyBird.frameAtual];
        contexto.drawImage(
            sprites,
            spriteX, spriteY, //sprite X e Y
            flappyBird.largura, flappyBird.altura, //tamanho do recorte no sprite
            flappyBird.x,flappyBird.y, //posição X e X
            flappyBird.largura,flappyBird.altura  //tamanho do sprite 
        );
    },
};
return flappyBird;
};

//tela de inicio
const começo = {
    spriteX: 130,
    spriteY:2,
    largura:177,
    altura:149,
    x: 64,
    y: 120,
    desenhar(){
        contexto.drawImage(
            sprites,
            começo.spriteX, começo.spriteY, //sprite X e Y
            começo.largura, começo.altura, //tamanho do recorte no sprite
            começo.x,começo.y, //posição X e X
            começo.largura,começo.altura  //tamanho do sprite 
        );
    }
};

//cano
function criaCano(){
    const cano = {
        largura: 52,
        altura: 399,
        chao: {
            spriteX: 0,
            spriteY: 169,
        },
        ceu: {
            spriteX: 53,
            spriteY: 169, 
        },
        espaco: 88,
        desenha(){

            cano.pares.forEach(function(par){
            const Yrandom = par.y;
            const espacamentoCanos = 100;

            const canoCeuX = par.x;
            const canoCeuY = Yrandom;


            //cano do ceu
            contexto.drawImage(
                sprites,
                cano.ceu.spriteX, cano.ceu.spriteY,
                cano.largura, cano.altura,
                canoCeuX, canoCeuY,
                cano.largura, cano.altura,         
            )
            //cano chão
            const canoChaoX = par.x;
            const canoChaoY = cano.altura + espacamentoCanos + Yrandom;
            contexto.drawImage(
                sprites,
                cano.chao.spriteX, cano.chao.spriteY,
                cano.largura, cano.altura,
                canoChaoX, canoChaoY,
                cano.largura, cano.altura,
            )

        })
    },
    TemColisaoFlappyBird(par){
        if(globais.flappyBird.x >= par.x){
            console.log('voce invadiu a area')
        }
        return true;

        return false;
    },
    pares: [],
    atualiza(){
        const passou100frames = frames % 100 === 0;
        if(passou100frames) {
        cano.pares.push({
                x: canvas.width,
                y: -300,
                //y: -150 * (Math.random() + 1),
        });
        }

        cano.pares.forEach(function(par){
            par.x = par.x - 2;

            if(cano.TemColisaoFlappyBird(par)){
                console.log('você perdeu');
            };

            if(par.x + cano.largura <= 0){
                cano.pares.shift();
            }
        })
    }
    

    }
    return cano;
};


//
//tela
//
const globais = {};
let telaAtiva = {};
function mudaDeTela(novaTela){
    telaAtiva = novaTela;

    if(telaAtiva.inicializa){
        telaAtiva.inicializa()

    }
};
const tela = {
    inicio: {
        inicializa(){
           globais.flappyBird = criaflappyBird();
           globais.chao = criaChao();
           globais.cano = criaCano();
        },
        desenha(){
            planoFundo.desenhar()
            globais.flappyBird.desenhar();
            globais.cano.desenha();
            globais.chao.desenhar();
            começo.desenhar();
        },

        click(){
            mudaDeTela(tela.jogo);
        },
        atualiza(){
            globais.chao.atualiza();
            globais.cano.atualiza();
        },
    }
}

tela.jogo = {
    desenha(){
        planoFundo.desenhar()
        globais.chao.desenhar();
        globais.flappyBird.desenhar();
    },
    click(){
        globais.flappyBird.pula();
    },
    atualiza(){
        globais.flappyBird.atualiza();
    },
}

function loop(){
    telaAtiva.desenha();
    telaAtiva.atualiza();
    requestAnimationFrame(loop);
    frames = frames + 1;
}

window.addEventListener('click', function(){
   if(telaAtiva.click){
       telaAtiva.click();
   };
});

mudaDeTela(tela.inicio);
loop();