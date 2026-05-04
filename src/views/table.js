import "@ui5/webcomponents/dist/Table.js";
import "@ui5/webcomponents/dist/TableHeaderRow.js";
import "@ui5/webcomponents/dist/TableHeaderCell.js";
import "@ui5/webcomponents/dist/TableRow.js";
import "@ui5/webcomponents/dist/TableCell.js";
import "@ui5/webcomponents/dist/Select.js";
import "@ui5/webcomponents/dist/Option.js";
import "@ui5/webcomponents/dist/CheckBox.js";
import "@ui5/webcomponents/dist/Input.js";

export const TableView = {
  renderTable(data) {
    const table = document.createElement("ui5-table");

    // 1. Dynamic Header Generation
    const headerRow = document.createElement("ui5-table-header-row");
    headerRow.slot = "headerRow";

    data.headers.forEach((text) => {
      const cell = document.createElement("ui5-table-header-cell");
      cell.textContent = text;
      headerRow.appendChild(cell);
    });
    table.appendChild(headerRow);

    // 2. Dynamic Row Generation
    data.rows.forEach((item) => {
      const row = document.createElement("ui5-table-row");

      // Generate cells based on data keys
      Object.values(item).forEach((val, index) => {
        const cell = document.createElement("ui5-table-cell");
        const checkbox = document.createElement("ui5-checkbox");
        const input = document.createElement("ui5-input");
        const select = document.createElement("ui5-select");
        // If it's the 'status' column, insert the Dropdown
        switch (data.headers[index]) {
          case "Type":
            ["Text", "Numeric", "Boolean"].forEach((type) => {
              const option = document.createElement("ui5-option");
              option.textContent = type;
              if (item.genType === type) option.selected = true;
              select.appendChild(option);
            });
            cell.appendChild(select);
            break;
          case "Gen Type":
            ["None", "Faker", "Pos Pattern"].forEach((type) => {
              const option = document.createElement("ui5-option");
              option.textContent = type;
              if (item.genType === type) option.selected = true;
              select.appendChild(option);
            });
            select.addEventListener("change", (e) => {
              const selectedText = e.detail.selectedOption.textContent;
              const nextCell = e.target.parentElement.nextElementSibling;
              if (nextCell) {
                const choiceInput = nextCell.querySelector("ui5-input");
                if (selectedText === "Faker") {
                  console.log("faker");
                  choiceInput.placeholder = "Enter in Faker choice";
                }
              }
            });
            cell.appendChild(select);
            break;
          case "Unique":
            if (val === true) checkbox.checked = true;
            cell.appendChild(checkbox);
            break;
          case "Not Null":
            if (val === true) checkbox.checked = true;
            cell.appendChild(checkbox);
            break;
          default:
            input.value = val;
            cell.appendChild(input);
            break;
        }

        row.appendChild(cell);
      });
      table.appendChild(row);
    });

    return table;
  },
};
