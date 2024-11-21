var Stars = function(args) {
    if (args === undefined) args = {};
    var _scope = this;

    this.stars = [];
    this.vel = args.vel || 0.5; // Ajuste a velocidade conforme necessário
    this.radius = args.radius || 1;
    this.alpha = 0.5;
    this.starsCounter = args.stars || 300;
    var center = {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2
    };

    var canvas = document.getElementById("background"); // Obtém o canvas do HTML
    var context = canvas.getContext("2d");

    this.init = function() {
        context.lineCap = "round";
        this.resize();
        window.addEventListener("resize", this.resize.bind(this));
        this.start(); // Move o start aqui para que as estrelas sejam criadas imediatamente
    }

    this.start = function() {
        this.stars = []; // Reinicializa a matriz de estrelas
        for (var i = 0; i < this.starsCounter; i++) {
            this.stars.push(new Star()); // Adiciona a estrela imediatamente
        }
    }

    this.resize = function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        center.x = canvas.width / 2;
        center.y = canvas.height / 2;
    }

    this.animate = function() {
        window.requestAnimationFrame(this.animate.bind(this));
        this.render();
    }

    this.render = function() {
        context.fillStyle = 'rgba(0, 0, 0, 1)'; // Cor de fundo alterada para preto
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.strokeStyle = "white";
        for (var i = 0; i < this.stars.length; i++) this.stars[i].update();
    }

    var Star = function() {
        this.x = Math.random() * canvas.width; // Posição X aleatória
        this.y = Math.random() * canvas.height; // Posição Y aleatória

        this.init = function() {
            this.radius = Math.random() * _scope.radius;
            this.lineWidth = 0;
            this.vel = {
                x: Math.random() * 1 - 0.5, // Velocidade reduzida
                y: Math.random() * 1 - 0.5  // Velocidade reduzida
            }
        }

        this.update = function() {
            this.vel.x *= 1.01; // Aumenta lentamente a velocidade
            this.vel.y *= 1.01; // Aumenta lentamente a velocidade
            this.lineWidth += 0.035;
            this.x0 = this.x;
            this.y0 = this.y;
            this.x += this.vel.x;
            this.y += this.vel.y;
            this.draw();
            if (this.isDead()) this.init();
        }

        this.draw = function() {
            context.beginPath();
            context.moveTo(this.x0, this.y0);
            context.lineTo(this.x, this.y);
            context.lineWidth = this.lineWidth;
            context.stroke();
        }

        this.isDead = function() {
            return (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height);
        }

        this.init();
        return this;
    }

    this.init();
    this.animate();
}

var _stars = new Stars();