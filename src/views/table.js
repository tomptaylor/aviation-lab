import "@ui5/webcomponents/dist/Table.js";
import "@ui5/webcomponents/dist/TableHeaderRow.js";
import "@ui5/webcomponents/dist/TableHeaderCell.js";
import "@ui5/webcomponents/dist/TableRow.js";
import "@ui5/webcomponents/dist/TableCell.js";
import "@ui5/webcomponents/dist/Select.js";
import "@ui5/webcomponents/dist/Option.js";

export const TableView = {
    renderTable(data) {
        const table = document.createElement("ui5-table");
        
        // 1. Dynamic Header Generation
        const headerRow = document.createElement("ui5-table-header-row");
        headerRow.slot = "headerRow";
        
        data.headers.forEach(text => {
            const cell = document.createElement("ui5-table-header-cell");
            cell.textContent = text;
            headerRow.appendChild(cell);
        });
        table.appendChild(headerRow);

        // 2. Dynamic Row Generation
        data.rows.forEach(item => {
            const row = document.createElement("ui5-table-row");
            
            // Generate cells based on data keys
            Object.values(item).forEach((val, index) => {
                const cell = document.createElement("ui5-table-cell");
                
                // If it's the 'status' column, insert the Dropdown
                if (data.headers[index] === "Status") {
                    cell.innerHTML = `
                        <ui5-select>
                            <ui5-option value="Active" ${val === 'Active' ? 'selected' : ''}>Active</ui5-option>
                            <ui5-option value="Maintenance" ${val === 'Maintenance' ? 'selected' : ''}>Maintenance</ui5-option>
                            <ui5-option value="Grounded" ${val === 'Grounded' ? 'selected' : ''}>Grounded</ui5-option>
                        </ui5-select>
                    `;
                } else {
                    cell.textContent = val;
                }
                row.appendChild(cell);
            });
            table.appendChild(row);
        });

        return table;
    }
};
