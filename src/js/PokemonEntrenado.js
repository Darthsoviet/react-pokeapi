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
    generarAtk() {
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
        if (suerteShiny <= 2) {
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

    atacar(adversario,movimiento){
        let n=this.nivel;
        let a;
        
        if(movimiento.damage_class.name==="special"){
            a=this.specialAtk;
        }else if(movimiento.damage_class.name==="physical"){
            a=this.atk;
        }else{
            a=0;
        }
        let p = movimiento.power;
        let d=adversario.def;
        
        let b=movimiento.type.name===this.types[0].type.name?1.5:1;
        let e=1;//TODO
        
        let v=100-Math.round(Math.random()*15)
        console.log("a "+a+" b "+b+" p "+p+"d "+d+" v "+v+" n "+n+" e"+e);
        

        let daño=0.01*b*e*v*((((0.2*n+1)*a*p)/(25*d))+2);
        return daño
        
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




