import listaelem from "./Listaelemek";

interface ListItemProps{
    listitem: listaelem,
    torles: ()=> void;
}
function  ListItem(props: ListItemProps){
    return(
        <li>
            <p>{props.listitem.nev}</p>
            <button onClick={props.torles}>X</button>
        </li>
    );
}
export  default ListItem;