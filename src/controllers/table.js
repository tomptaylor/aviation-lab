export const TableController = {
    getMockData() {
        return {
            title: "ACTIVE AIRSPACE DISPATCH",
            headers: ["Tail Number", "Type", "Status", "Hazmat"],
            rows: [
                { id: "N12345", type: "Cessna 172", status: "Active", hazmat: false },
                { id: "N8822A", type: "Boeing 737", status: "Maintenance", hazmat: true },
                { id: "N990WY", type: "Airbus A320", status: "Grounded", hazmat: false }
            ]
        };
    }
};
