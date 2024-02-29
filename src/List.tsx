import React, { useState } from 'react';
import Listitem from "./listitem";
import listaelem from "./Listaelemek";

const List: React.FC = () =>{
    let actualteme = "";
    const tipusok = ['etel','elektronika','haztartasi'];
    const [list  ,setList] = useState(()=> [new listaelem('1','krumpli','etel')]);
    const [hozzadaslap, sethozzadaslap] = useState(false);
    const [selecteditemToDeleete, setSelecteditemToDelete] = useState<listaelem>()
    const [toggleconf, setToggleConf] = useState(false);

    const [fillteredlist, setfillteredlist]= useState(list);

    function hozzadmod(){
        sethozzadaslap(!hozzadaslap)
    }
    function hozzadas(){
        let nev = (document.getElementById('nev') as HTMLInputElement)!.value;
        let tipus = (document.getElementById('tipus') as HTMLInputElement)!.value;
        for(let item of tipusok){
            if(item === tipus){
                let index: listaelem = {id: Math.random().toString(),nev,tipus};
                list.push(index);
                hozzadmod();
            }
        }
    }
    function handleRemove(item:listaelem){
        setToggleConf(true);
        setSelecteditemToDelete(item);
    }
    function cancelremove(){
        setToggleConf(false);
    }
    function  confirmDelete(){
        const item = selecteditemToDeleete;
        const updatedlist = list.filter(it => it !==item);
        setList(updatedlist);
        setSelecteditemToDelete(undefined);
        setToggleConf(false);
    }
    function sort(tema:string){
        actualteme=tema;
        if (actualteme===""){
            setfillteredlist(list)
        }
        else{
            const updatedlist = list.filter(tipus=>tipus.tipus===tema);
            setfillteredlist(updatedlist)
        }
    }
    function kereses(){
        const kereset= (document.getElementById("kereset") as HTMLInputElement).value;
        if(kereset===""){
            sort(actualteme);
        }
        else{
            const fillter = fillteredlist.filter(nev => nev.nev===kereset);
            setfillteredlist(fillter)
        }
    }

    return(
        <div className="lista-site">
            <button onClick={hozzadmod}>New</button>
            {!hozzadaslap &&
                <div className="megjelenites">
                    <h1>Fő oldal</h1>
                    <div className="tipusok">
                        <button onClick={() => sort("")}>Ősszes</button>
                        <button onClick={() => sort("etel")}>Étel</button>
                        <button onClick={() => sort("elektronika")}>Elektronikai eszköz</button>
                        <button onClick={() => sort("haztartasi")}>Haztartasi gép</button>
                    </div>
                    <div>
                        <input id="kereset"/>
                        <button onClick={kereses}>Keresés</button>
                    </div>
                    <ul>
                        {fillteredlist.map((elem: listaelem, i) => (
                            <Listitem key={i} listitem={elem} torles={() => handleRemove(elem)}/>))}
                        {toggleconf &&
                            <div>
                                <button onClick={confirmDelete}>Yes</button>
                                <button onClick={cancelremove}>No</button>
                            </div>
                        }
                    </ul>
                </div>
            }
            {hozzadaslap &&
                <div className="hozzadas">
                    <h1>Elem hozzáadása</h1>
                    <input id="nev"/>
                    <input id="tipus"/>
                    <button onClick={hozzadas}>Hozzáadás</button>
                </div>
            }
        </div>
    )
}
export default List;