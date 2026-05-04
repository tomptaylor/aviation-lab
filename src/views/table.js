import "@ui5/webcomponents/dist/Table.js";
import "@ui5/webcomponents/dist/TableHeaderRow.js";
import "@ui5/webcomponents/dist/TableHeaderCell.js";
import "@ui5/webcomponents/dist/TableRow.js";
import "@ui5/webcomponents/dist/TableCell.js";
import "@ui5/webcomponents/dist/Select.js";
import "@ui5/webcomponents/dist/Option.js";
import "@ui5/webcomponents/dist/CheckBox.js";
import "@ui5/webcomponents/dist/Input.js";
import { faker } from "@faker-js/faker";

const LibraryScanner = {
  verifyPath(inputPath) {
    // Example inputPath: "perso.firstame"
    const parts = inputPath.split("."); // ['perso', 'firstame']
    let currentLevel = faker;
    let validPath = [];

    for (const part of parts) {
      if (currentLevel && part in currentLevel) {
        validPath.push(part);
        currentLevel = currentLevel[part];
      } else {
        // We found the typo!
        const suggestions = this.getSuggestions(part, currentLevel);
        return {
          isValid: false,
          errorAt: part,
          didYouMean: suggestions,
        };
      }
    }
    return { isValid: true, value: currentLevel() };
  },

  getSuggestions(typo, level) {
    if (!level) return [];
    const keys = Object.keys(level);

    // Simple filter: find keys that start with the same letter or are similar
    return keys.filter((key) =>
      key.toLowerCase().includes(typo.toLowerCase().substring(0, 2)),
    );
  },
};

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
                  choiceInput.addEventListener("input", (e) => {
                    const result = LibraryScanner.verifyPath(e.target.value);
                    console.log("here", result);
                    if (!result.isValid) {
                      input.valueState = "Error";
                      input.valueStateMessage = `Typo: "${result.errorAt}". Did you mean: ${result.didYouMean.join(", ")}?`;
                    } else {
                      input.valueState = "Success";
                      input.valueStateMessage = "Valid Faker Path!";
                    }
                  });
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
