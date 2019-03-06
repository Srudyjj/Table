import scheme from './scheme';
import Table from './Table';

fetch('build/action.json')
    .then(res => res.json())
    .then(result => {
        const data = dataCleaner(result);
        const table = Table.createTable(scheme, data);
        const app = document.getElementById('app');
        app.appendChild(table);
    });

function dataCleaner(data) {
    return data.result.items
}



// function createTable(result) {
//     const data = dataCleaner(result)
//     const app = document.getElementById('app');
//     const table = document.createElement('table');
//     const thead = createTHeader(scheme);
//     const tbody = createTBody(scheme, data)
//     table.appendChild(thead);
//     table.appendChild(tbody);
//     app.appendChild(table);
// }

// function createTHeader(scheme) {
//     const thead = document.createElement("thead");
//     const tr = document.createElement("tr");
//     scheme.forEach(text => {
//         const th = document.createElement("th");
//         th.innerText = text;
//         tr.appendChild(th);        
//     });
//     thead.appendChild(tr);
//     return thead;
// }

// function createTBody(scheme, data) {
//     const tbody = document.createElement("tbody");
//     data.forEach(row => {
//         const tr = document.createElement("tr");
//         for (const key of scheme.keys()) {
//             const td = document.createElement("td");
//             const tdValue = row[key];
//             td.innerHTML = tdValue;
//             tr.appendChild(td);
//         }
//         tbody.appendChild(tr);
//     });
//     return tbody
// }
