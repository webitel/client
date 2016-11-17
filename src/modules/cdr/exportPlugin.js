/**
 * Created by i.navrotskyj on 09.03.2016.
 */
'use strict';

define(['app', 'modules/cdr/libs/fileSaver', 'async', 'jsZIP-utils', 'jsZIP', 'modules/cdr/cdrModel'], function (app, fileSaver, async, jsZIPUtils, jsZIP) {
    // TODO
    app.directive('elasticExportExcel',function (CdrModel) {
        return {
            restrict: 'AE',
            scope: {
                cdrMapColumns: "=",
                cdrColumns: "=",
                cdrFilter: "=",
                cdrSort: "=",
                cdrProgressExport: "=",
                cdrCountExport: "=",
                cdrRunExport: "="
            },
            link: function (scope, el) {
                scope.cdrProgressExport = 0;
                el.bind('click', function() {
                    if (typeof scope.cdrRunExport == 'function') {
                        scope.cdrRunExport(cdrToExcel)
                    } else {
                        cdrToExcel(scope.cdrMapColumns, scope.cdrColumns, scope.cdrFilter, scope.cdrSort, function (err) {
                            if (err)
                                console.error(err);
                        });
                    }
                });

                var cdrToExcel = function (mapColumns, columns, filter, qs, sort, cb) {
                    var _page = 0,
                        maxNodes = 1000,
                        table = '<table>',
                        _map = [],
                        allCount = 0,
                        forceStop = false
                        ;

                    var progress = 0;

                    table = setHead(table, mapColumns);
                    table += '<tbody>';

                    function onData(err, res, allCount) {
                        if (err)
                            return cb(err);

                        if (angular.isArray(res)) {
                            progress += res.length;
                            scope.cdrProgressExport = Math.round(progress * 100 / allCount);
                            table = setRows(table, res);

                            if (allCount - progress < maxNodes) {
                               // maxNodes = allCount - progress;
                            }
                            if (progress == allCount || res.length < maxNodes) {
                                table = endTable(table);
                                tableToExcel(table, 'cdr_' + new Date().toLocaleDateString() + '.xls');
                                scope.cdrProgressExport = 0;
                                return cb();
                            }
                        }

                        CdrModel.getElasticData(++_page, maxNodes, columns, filter, qs, sort, onData);
                    }

                    onData();

                    function endTable (table) {
                        return table += '</tbody></table>'
                    }

                    function setRows (table, rows) {
                        angular.forEach(rows, function (value) {
                            table = setRow(table, value);
                        });
                        return table
                    }

                    function setRow (table, row) {
                        table += '<tr>';
                        angular.forEach(_map, function (col, key) {
                            if (col.value.noRender) return;
                            table += '<td>' + (col.value.type == 'timestamp' ? parseTimeStamp((row[col.id] || '')) : (row[col.id] || ''))+ '</td>';
                        });
                        table += '</tr>';
                        return table;
                    }

                    function parseTimeStamp (timestamp) {
                        // TODO
                        //return '=TEXT(DATE(1970;1;1)+' + timestamp + '/60/60/24/1000/1000;"yyyy-mm-dd hh:mm:ss")'; //
                        return timestamp ? new Date(timestamp).toLocaleString() : '-';
                    }
                    function setHead(table, columns) {
                        table += '<thead><tr>';
                        for (var key in columns) {
                            if (columns[key].noRender) continue;
                            _map.push({
                                id: key,
                                value: columns[key]
                            });
                            table += '<th>' + (columns[key].caption || '') + '</th>'
                        }
                        table += '</tr></thead>';
                        return table;
                    }
                };

                var tableToExcel = function(table, name){
                    var fullTemplate = "";
                    fullTemplate += '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><meta http-equiv="content-type" content="application/vnd.ms-excel; charset=UTF-8"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>Sheet0</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body>' + table + '</body></html>';

                    var blob = new Blob([fullTemplate], {
                        // https://github.com/faisalman/simple-excel-js/blob/master/src/simple-excel.js
                        type: "application/octet-stream"
                    });
                    fileSaver(blob, name)
                };
            }
        };
    });

    app.directive('cdrExportExcel',function (CdrModel) {
        return {
            restrict: 'AE',
            scope: {
                cdrMapColumns: "=",
                cdrColumns: "=",
                cdrFilter: "=",
                cdrSort: "=",
                cdrProgressExport: "=",
                cdrCountExport: "=",
                cdrRunExport: "="
            },
            link: function (scope, el) {
                scope.cdrProgressExport = 0;
                el.bind('click', function() {
                    if (typeof scope.cdrRunExport == 'function') {
                        scope.cdrRunExport(cdrToExcel)
                    } else {
                        cdrToExcel(scope.cdrMapColumns, scope.cdrColumns, scope.cdrFilter, scope.cdrSort, function (err) {
                            if (err)
                                console.error(err);
                        });
                    }
                });

                var cdrToExcel = function (mapColumns, columns, filter, sort, cb) {
                    var _page = 0,
                        maxNodes = 1000,
                        table = '<table>',
                        _map = [],
                        allCount = 0
                        ;

                    var progress = 0;

                    table = setHead(table, mapColumns);
                    table += '<tbody>';

                    function onData(err, res) {
                        if (err)
                            return cb(err);

                        if (angular.isArray(res)) {
                            progress += res.length;
                            scope.cdrProgressExport = Math.round(progress * 100 / allCount);
                            table = setRows(table, res);

                            if (allCount - progress < maxNodes) {
                                maxNodes = allCount - progress;
                            }
                            if (progress == allCount || res.length < maxNodes) {
                                table = endTable(table);
                                tableToExcel(table, 'cdr_' + new Date().toLocaleDateString() + '.xls');
                                scope.cdrProgressExport = 0;
                                return cb();
                            }
                        }

                        CdrModel.getData(_page++, maxNodes, columns, filter, sort, onData);
                    }


                    CdrModel.getCount(filter, function (err, count) {
                        if (err)
                            return cb(err);
                        allCount = +count;
                        scope.cdrCountExport = +count;
                        onData();
                    });

                    function endTable (table) {
                        return table += '</tbody></table>'
                    }

                    function setRows (table, rows) {
                        angular.forEach(rows, function (value) {
                            table = setRow(table, value);
                        });
                        return table
                    }

                    function setRow (table, row) {
                        table += '<tr>';
                        angular.forEach(_map, function (col, key) {
                            if (col.value.noRender) return;
                            table += '<td>' + (col.value.type == 'timestamp' ? parseTimeStamp((row[col.id] || '')) : (row[col.id] || ''))+ '</td>';
                        });
                        table += '</tr>';
                        return table;
                    }

                    function parseTimeStamp (timestamp) {
                        // TODO rus ms-office govno!!!
                        //return '=TEXT(DATE(1970;1;1)+' + timestamp + '/60/60/24/1000/1000;"yyyy-mm-dd hh:mm:ss")'; //
                        return timestamp ? new Date(timestamp / 1000).toLocaleString() : '-';
                    }
                    function setHead(table, columns) {
                        table += '<thead><tr>';
                        for (var key in columns) {
                            if (columns[key].noRender) continue;
                            _map.push({
                                id: key,
                                value: columns[key]
                            });
                            table += '<th>' + (columns[key].caption || '') + '</th>'
                        }
                        table += '</tr></thead>';
                        return table;
                    }
                };

                var tableToExcel = function(table, name){
                    var fullTemplate = "";
                    fullTemplate += '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><meta http-equiv="content-type" content="application/vnd.ms-excel; charset=UTF-8"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>Sheet0</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body>' + table + '</body></html>';

                    var blob = new Blob([fullTemplate], {
                        // https://github.com/faisalman/simple-excel-js/blob/master/src/simple-excel.js
                        type: "application/octet-stream"
                    });
                    fileSaver(blob, name)
                };
            }
        };
    });

    app.directive('elasticExportFiles', function (CdrModel, fileModel, notifi) {
        return {
            restrict: 'AE',
            scope: {
                cdrFilter: "=",
                cdrSort: "=",
                cdrProgressExport: "=",
                cdrCountExport: "=",
                cdrRunExport: "="
            },
            link: function (scope, el) {
                el.bind('click', function() {
                    if (typeof scope.cdrRunExport == 'function') {
                        scope.cdrRunExport(exportFiles)
                    } else {
                        exportFiles(scope.cdrFilter, scope.cdrSort, "", function (err) {
                            if (err)
                                console.error(err);
                        });
                    }
                });
                
                var exportFiles = function (_filter, qs, sort, cb) {
                    var _page = 0,
                        maxNodes = 100,
                        columns = {other: ["variables.uuid", "variables.record_seconds"]};

                    var filter = [_filter, {"range": {"variables.record_seconds": {"gt": 0}}}];

                    var progress = 0;
                    var errorFiles = [];
                    var zip = new jsZIP();

                    // TODO add filter variable exists webitel_record_file_name
                    
                    function loadFiles(arr, cb) {
                        async.eachSeries(
                            arr,
                            function (i, cb) {
                                if (!i["variables.record_seconds"])
                                    return cb();

                                fileModel.getFiles(i["variables.uuid"], function (err, files) {

                                    if (!files)
                                        return cb();

                                    async.eachSeries(
                                        files,
                                        function (file, cb) {
                                            var pref = file['content-type'] === "application/pdf" ? "pdf" :"mp3";
                                            var uri = fileModel.getUri(file.uuid, file.name, file["createdOn"], pref);
                                            jsZIPUtils.getBinaryContent(uri, function (e, data) {
                                                if (e) {
                                                    errorFiles.push(e.message);
                                                    return cb();
                                                }
                                                zip.file(file["createdOn"] + '_' + file.name + '.' + pref, data);
                                                cb();
                                            });
                                        },
                                        cb
                                    )

                                });
                            },
                            cb
                        );
                    }

                    function onData(err, res, allCount) {
                        if (err)
                            return cb(err);

                        if (angular.isArray(res)) {
                            progress += res.length;
                            scope.cdrProgressExport = Math.round(progress * 100 / allCount);


                            if (allCount - progress < maxNodes) {
                                // maxNodes = allCount - progress;
                            }
                            if (progress == allCount || res.length < maxNodes) {
                                // END
                                scope.cdrProgressExport = 0;
                                return loadFiles(res, function (e) {
                                    if (e)
                                        return cb(e);

                                    if (errorFiles.length > 0) {
                                        // TODO add show log
                                        notifi.error(new Error('Download files: error count ' + errorFiles.length));
                                    }
                                    zip.generateAsync({type:"blob"}).then(function(content) {
                                        fileSaver(content, "recordFiles.zip");
                                    });
                                    cb();
                                })
                            }

                            loadFiles(res, function (e) {
                                if (e)
                                    return cb(e);
                                CdrModel.getElasticData(++_page, maxNodes, columns, filter, qs, sort, onData);
                            });
                        } else {
                            CdrModel.getElasticData(++_page, maxNodes, columns, filter, qs, sort, onData);
                        }
                    }

                    onData();

                }
            }
        }
    });

    app.directive('ngJsonExportExcel', function () {
        return {
            restrict: 'AE',
            scope: {
                data : '=',
                filename: '=?',
                reportFields: '=',
                separator: '@'
            },
            link: function (scope, element) {
                scope.filename = !!scope.filename ? scope.filename : 'export-excel';

                var fields = [];
                var header = [];
                var separator = scope.separator || ';';

                angular.forEach(scope.reportFields, function(field, key) {
                    if(!field || !key) {
                        throw new Error('error json report fields');
                    }

                    fields.push(key);
                    header.push(field);
                });

                element.bind('click', function() {
                    var bodyData = _bodyData();
                    var strData = _convertToExcel(bodyData);

                    var blob = new Blob([strData], {type: "text/plain;charset=utf-8"});

                    return saveAs(blob, [scope.filename + '.csv']);
                });

                function _bodyData() {
                    var data = scope.data;
                    var body = "";
                    angular.forEach(data, function(dataItem) {
                        var rowItems = [];

                        angular.forEach(fields, function(field) {
                            if(field.indexOf('.')) {
                                field = field.split(".");
                                var curItem = dataItem;

                                // deep access to obect property
                                angular.forEach(field, function(prop){
                                    if (curItem !== null && curItem !== undefined) {
                                        curItem = curItem[prop];
                                    }
                                });

                                data = curItem;
                            }
                            else {
                                data = dataItem[field];
                            }

                            var fieldValue = data !== null ? data : ' ';

                            if (fieldValue !== undefined && angular.isObject(fieldValue)) {
                                fieldValue = _objectToString(fieldValue);
                            }

                            rowItems.push(fieldValue);
                        });

                        body += rowItems.join(separator) + '\n';
                    });

                    return body;
                }

                function _convertToExcel(body) {
                    return header.join(separator) + '\n' + body;
                }

                function _objectToString(object) {
                    var output = '';
                    angular.forEach(object, function(value, key) {
                        output += key + ':' + value + ' ';
                    });

                    return '"' + output + '"';
                }
            }
        };
    });
});