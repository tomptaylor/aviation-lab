import "./style.css";
import { TableController } from "./controllers/table.js";
import { TableView } from "./views/table.js";

const app = document.querySelector("#app");

// 1. Setup Gallery Layout
app.innerHTML = `
    <div class="gallery">
        <aside class="sidebar">
            <h3>Component Gallery</h3>
            <button id="load-dispatch">Dispatch Table</button>
            <button disabled>Weather Map (Soon)</button>
        </aside>
        <main id="stage">
            <div class="placeholder">Select a component to instantiate</div>
        </main>
    </div>
`;

// 2. Component Instantiation Logic
document.querySelector("#load-dispatch").addEventListener("click", () => {
    const stage = document.querySelector("#stage");
    stage.innerHTML = ""; // Clear stage
    
    // Get data from Controller
    const data = TableController.getMockData();
    
    // Render via View
    const tableComponent = TableView.renderTable(data);
    
    stage.appendChild(tableComponent);
});
