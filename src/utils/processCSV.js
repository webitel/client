export const processCSVFile = (csv, delimiter = ',') => {
    // console.log(csv);
    const pattern = new RegExp((
        `(\\${delimiter}|\\r?\\n|\\r|^)` // Delimiters.
        + '(?:"([^"]*(?:""[^"]*)*)"|' // Quoted fields.
        + `([^"\\${delimiter}\\r\\n]*))` // Standard fields.
    ), 'gi');

    // Create an array to hold our data. Give the array
    // a default empty first row.
    const arrData = [[]];

    // Create an array to hold our individual pattern
    // matching groups.
    let arrMatches = pattern.exec(csv);

    // Keep looping over the regular expression matches
    // until we can no longer find a match.
    while (arrMatches) {
        const matchedDelimiter = arrMatches[1];
        if (matchedDelimiter.length && matchedDelimiter !== delimiter) {
            // Since we have reached a new row of data,
            // add an empty row to our data array.
            arrData.push([]);
        }
        let strMatchedValue;
        // Now that we have our delimiter out of the way,
        // let's check to see which kind of value we
        // captured (quoted or unquoted).
        if (arrMatches[2]) {
            // We found a quoted value. When we capture
            // this value, unescape any double quotes.
            strMatchedValue = arrMatches[2].replace(new RegExp('""', 'g'), '"');
        } else {
            // We found a non-quoted value.
            strMatchedValue = arrMatches[3];
        }
        // Now that we have our value string, let's add
        // it to the data array.
        arrData[arrData.length - 1].push(strMatchedValue);

        // next loop step
        arrMatches = pattern.exec(csv);
    }
    // Return the parsed data.
    return arrData.slice(0, -1);
};

export const charsetOptions = [
    {
        value: 'utf-8',
        name: 'UTF-8',
    },
    {
        value: 'cp866',
        name: 'IBM866',
    },
    {
        value: 'iso-8859-2',
        name: 'ISO-8859-2',
    },
    {
        value: 'iso-8859-3',
        name: 'ISO-8859-3',
    },
    {
        value: 'iso-8859-4',
        name: 'ISO-8859-4',
    },
    {
        value: 'iso-8859-5',
        name: 'ISO-8859-5',
    },
    {
        value: 'iso-8859-6',
        name: 'ISO-8859-6',
    },
    {
        value: 'iso-8859-7',
        name: 'ISO-8859-7',
    },
    {
        value: 'iso-8859-8',
        name: 'ISO-8859-8',
    },
    {
        value: 'iso-8859-8-i',
        name: 'ISO-8859-8-I',
    },
    {
        value: 'iso8859-10',
        name: 'ISO-8859-10',
    },
    {
        value: 'iso-8859-13',
        name: 'ISO-8859-13',
    },
    {
        value: 'iso-8859-14',
        name: 'ISO-8859-14',
    },
    {
        value: 'iso-8859-15',
        name: 'ISO-8859-15',
    },
    {
        value: 'iso-8859-16',
        name: 'ISO-8859-16',
    },
    {
        value: 'koi8-r',
        name: 'KOI8-R',
    },
    {
        value: 'koi8-u',
        name: 'KOI8-U',
    },
    {
        value: 'macintosh',
        name: 'macintosh',
    },
    {
        value: 'windows-874',
        name: 'windows-874',
    },
    {
        value: 'windows-1250',
        name: 'windows-1250',
    },
    {
        value: 'windows-1251',
        name: 'windows-1251',
    },
    {
        value: 'windows-1252',
        name: 'windows-1252',
    },
    {
        value: 'windows-1253',
        name: 'windows-1253',
    },
    {
        value: 'windows-1254',
        name: 'windows-1254',
    },
    {
        value: 'windows-1255',
        name: 'windows-1255',
    },
    {
        value: 'windows-1256',
        name: 'windows-1256',
    },
    {
        value: 'windows-1257',
        name: 'windows-1257',
    },
    {
        value: 'windows-1258',
        name: 'windows-1258',
    },
    {
        value: 'x-mac-cyrillic',
        name: 'x-mac-cyrillic',
    },
    {
        value: 'gbk',
        name: 'GBK',
    },
    {
        value: 'gb18030',
        name: 'gb18030',
    },
    {
        value: 'big5',
        name: 'Big5',
    },
    {
        value: 'euc-jp',
        name: 'EUC-JP',
    },
    {
        value: 'iso-2022-jp',
        name: 'ISO-2022-JP',
    },
    {
        value: 'shift-jis',
        name: 'Shift_JIS',
    },
    {
        value: 'euc-kr',
        name: 'EUC-KR',
    },
    {
        value: 'replacement',
        name: 'replacement',
    },
    {
        value: 'utf-16be',
        name: 'UTF-16BE',
    },
    {
        value: 'utf-16le',
        name: 'UTF-16LE',
    },
    {
        value: 'x-user-defined',
        name: 'x-user-defined',
    },
];
