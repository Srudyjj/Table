import schema from './scheme';
import Table from './Table';

fetch('build/action.json')
    .then(res => res.json())
    .then(result => {
        const data = dataCleaner(result);
        const table = Table.createTable(schema, data);
        const app = document.getElementById('app');
        app.appendChild(table);
    });

function dataCleaner(data) {
    return data.result.items
}