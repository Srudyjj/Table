class Table {
    constructor(schema, data) {
        this.schema = schema;
        this.data = data;
        this._buildHTML = this._buildHTML.bind(this);
        this._createTable = this._createTable.bind(this);
        this._createTHeader = this._createTHeader.bind(this);
        this._createTBody = this._createTBody.bind(this);
        this._createTableWrapper = this._createTableWrapper.bind(this);
        this._createFloatTHeader =  this._createFloatTHeader.bind(this);
        this._onTableScroll = this._onTableScroll.bind(this);
        this._connectHeaders = this._connectHeaders.bind(this);

    }

    static createTable(schema, data) {
        return new Table(schema, data)._buildHTML();
    }

    _buildHTML() {
        
        // Creating table header
        this.tHead = this._createTHeader(this.schema);
        
        // Creating floating table header
        this.floatTHead = this._createFloatTHeader(this.schema);
        
        // Creating table body
        this.tBody = this._createTBody(this.schema, this.data)
        
        // Creating main table
        this.table = this._createTable();
        this.table.appendChild(this.tHead);
        this.table.appendChild(this.tBody);

        // Creating table-wrapper
        this.tableWrapper = this._createTableWrapper();
        this.tableWrapper.appendChild(this.floatTHead);
        this.tableWrapper.appendChild(this.table);

        this.tableWrapper.addEventListener('scroll', this._onTableScroll);
        
        return this.tableWrapper
    }

    _createTable() {
        const table = document.createElement('table');
        table.classList.add("scrolled_table");
        
        return table
    }

    _createTableWrapper() {
        const tableWrapper = document.createElement('div');
        tableWrapper.classList.add("table_wrapper");

        return tableWrapper
    }
    
    _createTHeader(schema) {
        const thead = document.createElement("thead");
        const tr = document.createElement("tr");
        schema.forEach(col => {
            const th = document.createElement("th");
            th.innerText = col.headerName;
            th.style.width = col.width;
            tr.appendChild(th);         
        });
        thead.appendChild(tr);

        return thead;
    }

    _createFloatTHeader(schema) {
        const table = document.createElement('table');
        table.classList.add("table_float_header");
        const thead = document.createElement("thead");
        const tr = document.createElement("tr");
        schema.forEach(col => {
            const separator = this._createTableSeparator();
            const th = document.createElement("th");
            th.innerText = col.headerName;
            th.style.width = col.width;
            th.appendChild(separator);
            tr.appendChild(th);        
        });

        thead.appendChild(tr);
        table.appendChild(thead);

        return table
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

    _onTableScroll(e) {
        // Emulation fixed position for floating table header
        let top = e.target.scrollTop;
        this.floatTHead.style.top = top + "px";
    }

    _createTableSeparator(){
        const div = document.createElement('div');
        div.classList.add("separator");

        setTimeout(() => {
            div.style.height = this.tableWrapper.clientHeight + 'px';
        }, 0);

        let targetCol, nextColumn, pageX, targetColWidth, nextColumnWidth;

        div.addEventListener('mousedown', e => {
            targetCol = e.target.parentElement;
            nextColumn = targetCol.nextElementSibling;
            pageX = e.pageX;
            targetColWidth = targetCol.offsetWidth;
            nextColumnWidth = nextColumn ? nextColumn.offsetWidth : undefined;
        });

        document.addEventListener('mousemove', e => {

            if (targetCol) {
                let diff = e.pageX - pageX;
                
                if (nextColumn) {
                    nextColumn.style.width = (nextColumnWidth - diff) + 'px';
                };

                targetCol.style.width = (targetColWidth + diff) + 'px';

                this._connectHeaders(this.tHead, this.floatTHead);
            }
        });

        document.addEventListener('mouseup', e => {

            targetCol = undefined;
            nextColumn = undefined;
            pageX = undefined;
            targetColWidth = undefined;
            nextColumnWidth = undefined
        });

        return div;
    }

    _connectHeaders(mainHeader, floatHeader) {
        const mainHeaderTh = mainHeader.children[0].cells;
        const floatHeaderTh = floatHeader.children[0].children[0].cells;
        for (let i = 0; i < mainHeaderTh.length; i++) {
            mainHeaderTh[i].style.width = floatHeaderTh[i].style.width;
        }      
    }
}

export default Table;