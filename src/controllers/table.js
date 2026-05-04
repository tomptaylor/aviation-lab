export const TableController = {
  getMockData() {
    return {
      title: "ACTIVE AIRSPACE DISPATCH",
      headers: [
        "Name",
        "Type",
        "Min",
        "Max",
        "Gen Type",
        "Gen",
        "Constraint",
        "Unique",
        "Not Null",
      ],
      rows: [
        {
          id: "Name",
          type: "Text",
          min: "",
          max: "",
          gentype: "",
          gen: "",
          constr: "",
          unique: true,
          notnull: false,
        },
        {
          id: "Age",
          type: "Boeing 737",
          min: "",
          max: "",
          gentype: "",
          gen: "",
          constr: "",
          unique: true,
          notnull: false,
        },
        {
          id: "Active",
          type: "Airbus A320",
          min: "",
          max: "",
          gentype: "",
          gen: "",
          constr: "",
          unique: false,
          notnull: false,
        },
      ],
    };
  },
};
