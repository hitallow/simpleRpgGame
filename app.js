new Vue({
    el: "#app",
    data: {
        playerLife: 100,
        monsterLife: 100,
        running: false,
        logs: []

    },
    methods: {
        startGame() {
            this.playerLife = 100;
            this.monsterLife = 100;
            this.running = true;
        },
        attack(especial) {
            this.hurt('monsterLife', 7, 12, especial, 'Monstro', 'Jogador', 'monster');
            if (this.monsterLife > 0) {
                this.hurt('playerLife', 7, 12, false, 'Jogador', 'Monstro', 'player');
            }
        },
        hurt(props, min, max, especial, source, target, cls) {
            const plus = especial ? 5 : 0;
            const hurt = this.getRandom(min + plus, max + plus);
            this[props] = Math.max(this[props] - hurt, 0);
            this.registerLog(`${source} atingiu o ${target} com ${hurt}.`, cls);
        },
        registerLog(text, cls) {
            this.logs.unshift({text, cls});

        },
        hearAndHurt() {
            this.heal(10, 15);
            this.hurt('playerLife', 7, 12, false, 'Monstro','Jogador','monster');
        }
        ,
        heal(min, max) {
            const heal = this.getRandom(min, max);
            this.playerLife = Math.min(this.playerLife + heal, 100);
            this.registerLog(`O Jogador ganhou força de ${heal}.`,'player');

        },
        getRandom(min, max) {
            const value = Math.random() * (max - min) + min;

            return Math.round(value);
        }
    },
    computed: {
        hasResult() {
            return this.playerLife === 0 || this.monsterLife === 0;
        }
    },
    watch: {
        hasResult(finish) {
            if (finish)
                this.running = false;
        }
    },

})