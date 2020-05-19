import {
    MovimientoAprendido
} from "./MovimientoAprendido";

export class Pokemon {

    constructor(name = "", id = "", types = [], sprites = {}, abilities = [], moves = [], weight = "", height = "", stats = []) {
        this.name = name;
        this.id = id;
        this.types = types;
        this.sprites = sprites;
        this.abilities = abilities;
        this.moves = moves;
        this.weight = weight;
        this.height = height;
        this.stats = stats;

    }



}

export async function getPokemon(url, dataList, signal) {

    let data;
    if (dataList) {

        if (!dataList.current.get(url)) {

            let response = await fetch(url, {
                signal
            });

            response = await response.json();
            let {
                name,
                id,
                types,
                sprites,
                stats,
                abilities,
                height,
                weight,
                moves
            } = response;
            data = new Pokemon(name, id, types, sprites, abilities, moves, weight, height, stats);

            if (dataList.current.size > 2000) {


                dataList.current.clear();
            }

            dataList.current.set(url, data);

            return data

        } else {


            data = dataList.current.get(url);

            return data;
        }
    } else {

        let response = await fetch(url, {
            signal
        });

        response = await response.json();
        let {
            name,
            id,
            types,
            sprites,
            stats,
            abilities,
            height,
            weight,
            moves
        } = response;
        data = new Pokemon(name, id, types, sprites, abilities, moves, weight, height, stats);

        return data
    }
}





export async function escogerMoivmientos(moves, dataList) {
    let listaMovimientos = [];
    
    //hace ajax a url de pokemon
    async function getMovimientos(urlMovimientos, dataList, signal) {
        // verifica si ya se habia echo feth antes}
        if (dataList) {
            let data;
            if (!(dataList.current.get(urlMovimientos))) {

                let data = await fetch(urlMovimientos, {
                    signal
                });
                data = await data.json();
                dataList.current.set(urlMovimientos, data);

                return data;

            } else {
                data = dataList.current.get(urlMovimientos);
                return data;
            }
        } else {
            let data = await fetch(urlMovimientos, {
                signal
            });
            data = await data.json();
            return data;
        }
    }


    //verifica si el pokemon tiene mas de 5 habilidades disponibles para aprender
    if (moves.length >= 5) {
        //si tiene mas de 5 va a aprender las 5 primeras en la lista
        for (let i = 0; i <= 5; i++) {
            let abortController= new AbortController();
            let signal=abortController.signal;
            
            getMovimientos(moves[i].move.url, dataList, signal, listaMovimientos).then((mamada) => {
                let {
                    name,
                    power,
                    damage_class,
                    type
                } = mamada;

                listaMovimientos.push(new MovimientoAprendido(name, power, type, damage_class));
                abortController.abort();

            });
        }
    } else {
        //si el pokemon tiene menos de 5 habilidades aprende las mas que puede
        for (let i of moves) {
            let abortController= new AbortController();
            let signal=abortController.signal;
            getMovimientos(i.move.url, dataList, signal, listaMovimientos).then((mamada) => {
                let {
                    name,
                    power,
                    damage_class,
                    type
                } = mamada;


                listaMovimientos.push(new MovimientoAprendido(name, power, type, damage_class));
            });
        }

    }

    return listaMovimientos;

}