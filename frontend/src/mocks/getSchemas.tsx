export const getSchemas = () => {
  return [
    {
      id: "repair-schema-001",
      name: "Vehicle Repair Schema",
      fields: [
        {
          name: "id",
          type: "string",
          isArray: false,
          description: "Unique identifier of the attestation.",
        },
        {
          name: "vin",
          type: "string",
          isArray: false,
          description: "Vehicle Identification Number (VIN).",
        },
        {
          name: "make",
          type: "string",
          isArray: false,
          description: "Vehicle manufacturer.",
        },
        {
          name: "model",
          type: "string",
          isArray: false,
          description: "Vehicle model.",
        },
        {
          name: "year",
          type: "number",
          isArray: false,
          description: "Manufacturing year of the vehicle.",
        },
        {
          name: "repair_date",
          type: "string",
          format: "date",
          isArray: false,
          description: "Date of the repair.",
        },
        {
          name: "repair_details",
          type: "string",
          isArray: true,
          description: "Details of the repairs performed.",
        },
        {
          name: "repair_cost",
          type: "number",
          isArray: false,
          description: "Total cost of the repair in USD.",
        },
      ],
      resolverAddress: "0x0000000000000000000000000000000000000000",
      isRevocable: true,
    },
    {
      id: "property-certification-001",
      name: "Property Certification Schema",
      fields: [
        {
          name: "id",
          type: "string",
          isArray: false,
          description: "Unique identifier of the property attestation.",
        },
        {
          name: "property_address",
          type: "string",
          isArray: false,
          description: "The full address of the property being certified.",
        },
        {
          name: "owner_name",
          type: "string",
          isArray: false,
          description: "Name of the property owner.",
        },
        {
          name: "certification_date",
          type: "string",
          format: "date",
          isArray: false,
          description: "Date when the certification was issued.",
        },
        {
          name: "property_size",
          type: "number",
          isArray: false,
          description: "Total size of the property in square meters.",
        },
        {
          name: "property_value",
          type: "number",
          isArray: false,
          description: "Market value of the property in USD.",
        },
        {
          name: "certifier_name",
          type: "string",
          isArray: false,
          description:
            "Name of the person or organization issuing the certification.",
        },
      ],
      resolverAddress: "0x1111111111111111111111111111111111111111",
      isRevocable: false,
    },
    {
      id: "employee-evaluation-001",
      name: "Employee Evaluation Schema",
      fields: [
        {
          name: "id",
          type: "string",
          isArray: false,
          description: "Unique identifier of the evaluation.",
        },
        {
          name: "employee_name",
          type: "string",
          isArray: false,
          description: "Name of the employee being evaluated.",
        },
        {
          name: "position",
          type: "string",
          isArray: false,
          description: "Job position of the employee.",
        },
        {
          name: "evaluation_date",
          type: "string",
          format: "date",
          isArray: false,
          description: "Date when the evaluation took place.",
        },
        {
          name: "evaluation_score",
          type: "number",
          isArray: false,
          description:
            "Score of the employee's performance, on a scale of 1 to 10.",
        },
        {
          name: "comments",
          type: "string",
          isArray: true,
          description:
            "Additional comments and feedback on the employee's performance.",
        },
        {
          name: "evaluator_name",
          type: "string",
          isArray: false,
          description: "Name of the person conducting the evaluation.",
        },
      ],
      resolverAddress: "0x2222222222222222222222222222222222222222",
      isRevocable: true,
    },
  ];
};
