import schema from './scheme';
import Table from './Table';
import Dispatcher from './Dispatcher';

const store = {};
const dispatcher = new Dispatcher();
dispatcher.register(reducer);


fetch('build/action.json')
    .then(res => res.json())
    .then(result => {
        dispatcher.dispatch({type: "CREATE_TABLE", schema: schema, data: dataCleaner(result)})}
    );




function dataCleaner(data) {
    return data.result.items
}

function reducer(action) {
    switch (action.type) {
        case "CREATE_TABLE":
            console.log("Creating table");
            
            store.data = action.data;
            store.schema = action.schema;
            const table = Table.createTable(action.schema, action.data);
            const app = document.getElementById('app');
            app.appendChild(table);
            break;

        default:
            break;
    }    
}