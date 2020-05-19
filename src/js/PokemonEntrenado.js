import {
    Pokemon
} from "./Pokemon";


export class PokemonEntrenado extends Pokemon {

    constructor(name = "", id = "", types = [], sprites = {}, abilities = [], moves = [], weight = "", height = "", stats = []) {
        super(name, id, types, sprites, abilities, moves, weight, height, stats);
        this.nivel = this.generarNivel();
        this.iv = this.generarIv();
        this.movimientosAprendidos=[]
        this.shiny = this.generarShiny();
        this.hpMax = this.generarHP();
        this.hp = this.generarHP();
        this.atk =this.generarAtk()
        this.specialAtk = this.generarSpecialAtk();
        this.def = this.generarDef();
        this.specialDef = this.generarSpecialDefense();
        this.identificador=this.generarIdentificador()
       



    }
    generarIdentificador(){
        let idx=Math.round(Math.random()*10000);
        return idx;
    }
    generarAtk(stats) {
        let resultado;
        this.stats.forEach((objeto) => {


            if (objeto.stat.name === "attack") {
                resultado= objeto.base_stat;
            }
        })
        return resultado;
    }
    generarShiny() {
        let resultado=false;
        let suerteShiny = Math.random() * 100;
        if (suerteShiny <= 4) {
            resultado=true
            
        }
        return resultado;
    }

  

    generarSpecialAtk() {
        let resultado;

        this.stats.forEach((objeto) => {
            if (objeto.stat.name === "special-attack") {
                resultado= objeto.base_stat;


            }
        })
        return resultado;
    }
    generarSpecialDefense() {
        let resultado;
        this.stats.forEach((objeto) => {

            if (objeto.stat.name === "special-attack") {
                resultado= objeto.base_stat;
            }
        })
        return resultado;
    }
    generarDef() {
        let resultado;
        this.stats.forEach((objeto) => {
            if (objeto.stat.name === "special-attack") {
                resultado= objeto.base_stat;

            }
        })
        return resultado;
    }


    generarNivel() {
        let numeroNivel = Math.random() * 100 + 1;

        numeroNivel = Math.round(numeroNivel);
        return numeroNivel;

    }
    generarIv() {
        let iv = Math.random() * 45;
        iv = Math.round(iv);

        return iv;

    }

    generarHP() {
        let resultado;
        this.stats.forEach((objeto) => {


            if (objeto.stat.name === "hp") {

                resultado= objeto.base_stat;


            }
            
        })
        return resultado;
    }
    setNivel(nivel) {


        this.nivel = nivel;
    }


    setIv(iv) {
        this.iv = iv;

    }


    

    setHP() {
        this.stats.forEach((objeto) => {


            if (objeto.stat.name === "hp") {


                this.hpMax = objeto.base_stat;
                this.hp = this.hpMax;


            }
        })
    }
  
    setMovimientosAprendidos(movimientosAprendidos) {
        this.movimientosAprendidos = movimientosAprendidos;
    }
    // attack(contrincante,movimiento){

    //         if(movimiento.damage_class.name==="special"){
    //             return this.specialAtk;

    //         }else{
    //             return this.atk
    //         }



    //     let a=

    //     let daño=1*b*e*v*((((0.2*this.nivel+1)*a*p)/(25*d))+2);

    // }


}




