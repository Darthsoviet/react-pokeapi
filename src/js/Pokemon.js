export class Pokemon{
    constructor( name= "", id= "", types= [], sprites= {}, abilities= [], moves= [], weight= "", height= "" ,stats=[]) {
        this.name=name;
        this.id=id;
        this.types=types;
        this.sprites=sprites;
        this.abilities=abilities;
        this.moves=moves;
        this.weight=weight;
        this.height=height;
        this.stats=stats;
    }
}