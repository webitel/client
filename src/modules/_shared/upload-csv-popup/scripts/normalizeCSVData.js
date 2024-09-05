import isEmpty from '@webitel/ui-sdk/src/scripts/isEmpty';

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
          mappingIndexes: Array.isArray(csv) ? csv.map((csv, index) => !isEmpty(dataItem[csv]) ? index : null) : null,
        },
      };
    }, {});

    const filteredEmptyValues = Object.entries(normalized).reduce(
      (filtered, [name, { required, value, mappingIndexes }]) => {
        let filteredValue;
        if (Array.isArray(value)) {
          filteredValue = value.filter((item) => !isEmpty(item));
        } else {
          filteredValue = value;
        }

        const isValueEmpty = isEmpty(filteredValue);
        console.log('isValueEmpty', isValueEmpty);


        if (required && isValueEmpty) {
          throw new Error(`Required field is empty: ${name} on row ${index + 1}`);
        }

        return isValueEmpty
          ? filtered
          : {
              ...filtered,
              [name]: {
                value: filteredValue,
                mappingIndexes
               },
            };
      },
      {},
    );

    return filteredEmptyValues;
  });
};

export default normalizeCSVData;
