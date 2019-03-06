class Table {
    constructor(schema, data) {
        this.schema = schema;
        this.data = data;
        this._createTHeader = this._createTHeader.bind(this);
        this._createTBody = this._createTBody.bind(this);
    }

    static createTable(schema, data) {
        const table = new Table(schema, data);
        return table._createTable();
    }

    _createTable() {
        const table = document.createElement('table');
        const thead = this._createTHeader(this.schema);
        const tbody = this._createTBody(this.schema, this.data)
        table.appendChild(thead);
        table.appendChild(tbody);
        return table
    }
    
    _createTHeader(schema) {
        const thead = document.createElement("thead");
        const tr = document.createElement("tr");
        schema.forEach(col => {
            const th = document.createElement("th");
            th.innerText = col.headerName;
            th.width = col.width;
            tr.appendChild(th);        
        });
        thead.appendChild(tr);
        return thead;
    }
    
    _createTBody(schema, data) {
        const tbody = document.createElement("tbody");
        data.forEach(row => {
            const tr = document.createElement("tr");
            schema.forEach(col => {
                const td = document.createElement("td");
                const colName = col.dataName;
                const tdValue = row[colName];
                td.innerHTML = tdValue;
                tr.appendChild(td);
            });
            tbody.appendChild(tr);
        });
        return tbody
    }
}

export default Table;