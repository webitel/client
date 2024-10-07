import isEmpty from "@webitel/ui-sdk/src/scripts/isEmpty";

/**
 *
 * @param data
 * @param mappings
 *
 * Data format: {
 * [colName]: [value]
 * }
 *
 * Mappings format: {
 * name: string, // webitel field name
 * csv: string | string[], // csv column name
 * required: boolean, // is this webitel field required?
 * locale: string, // ui
 * }
 */
const normalizeCSVData = ({ data, mappings }) => {
  const nonEmptyMappingFields = mappings.filter((field) => !isEmpty(field.csv));
  return data.map((dataItem, index) => {
    const normalized = nonEmptyMappingFields.reduce((normalizedItem, { name, csv, required }) => {
      return {
        ...normalizedItem,
        [name]: {
          required,
          value: Array.isArray(csv) ? csv.map((csv) => dataItem[csv]) : dataItem[csv],
        },
      };
    }, {});

    // We need to filter empty values and check required fields for validation purposes
    const filteredEmptyValues = Object.entries(normalized).reduce(
      (filtered, [name, { required, value }]) => {
        let filteredValue; // Filter empty values in validation purposes
        if (Array.isArray(value)) {
          // Becouse required field can be combined from many fields in multipple select, so we need to check all values.
          // For example, if we have 3 fields and they are empty, we will get empty array.
          filteredValue = value.filter((item) => !isEmpty(item));
        } else {
          filteredValue = value;
        }

        const isValueEmpty = isEmpty(filteredValue);
        // This check is only for required fields
        if (required && isValueEmpty) {
          throw new Error(`Required field is empty: ${name} on row ${index + 1}`);
        }

        return isValueEmpty
          ? filtered
          : {
              ...filtered,
              [name]: value, // Need to return value, not filteredValue for proper maping (for example variables in members)
            };
      },
      {}
    );

    return filteredEmptyValues;
  });
};

export default normalizeCSVData;
