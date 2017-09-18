/**
 * Created by i.navrotskyj on 01.03.2016.
 */
define(["app", "config"], function(app, config) {
    app.factory("CdrModel", ["webitel", "$localStorage", function(webitel, $localStorage) {
        var useElastic = config.cdr.useElastic;
        function getMapColumns (reset) {
            // TODO API!!!
            if ($localStorage.cdrColumns && !reset)
                return $localStorage.cdrColumns;

            var mapColumn = {};

            if (useElastic) {
                mapColumn = {
                    "variables.outbound_caller_id_name": {
                        "type": "string",
                        "caption": "Caller name"
                    },
                    "CallerID number": {
                        "type": "string",
                        "caption": "Caller number"
                    },
                    "Destination number": {
                        "type": "string",
                        "caption": "Destination number"
                    },
                    "Call start time": {
                        "type": "timestamp",
                        "caption": "Call start time"
                    },
                    "variables.billsec": {
                        "type": "integer",
                        "caption": "Billsec"
                    },
                    "variables.duration": {
                        "type": "integer",
                        "caption": "Duration"
                    },
                    "variables.webitel_direction": {
                        "type": "string",
                        "caption": "Direction",
                    },
                    "variables.hangup_cause": {
                        "type": "string",
                        "caption": "Hangup cause"
                    },
                    "Call answer time": {
                        "type": "timestamp",
                        "caption": "Answered time",
                        "options": {
                            "detail": true
                        }
                    },
                    "Bridge time": {
                        "type": "timestamp",
                        "caption": "Bridge time",
                        "options": {
                            "detail": true
                        }
                    },
                    "variables.domain_name": {
                        "type": "string",
                        "caption": "Domain",
                    },
                    "Call end time": {
                        "type": "timestamp",
                        "caption": "Call end time",
                        "options": {
                            "detail": true
                        }
                    },
                    "Queue ID": {
                        "type": "string",
                        "caption": "Queue"

                    },
                    "variables.uuid": {
                        "type": "string",
                        "caption": "UUID",
                        "noRender": true
                    },
                    "variables.cc_member_uuid": {
                        "type": "string",
                        "caption": "cc_member_uuid",
                        "noRender": true
                    }
                }
            } else {
                mapColumn = {
                    "callflow.caller_profile.caller_id_name": {
                        "type": "string",
                        "caption": "Caller name"
                    },
                    "callflow.caller_profile.caller_id_number": {
                        "type": "string",
                        "caption": "Caller number"
                    },
                    "callflow.caller_profile.destination_number": {
                        "type": "string",
                        "caption": "Destination number"
                    },
                    "callflow.times.created_time": {
                        "type": "timestamp",
                        "caption": "Created time"
                    },
                    "variables.billsec": {
                        "type": "integer",
                        "caption": "Billsec"
                    },
                    "variables.duration": {
                        "type": "integer",
                        "caption": "Duration"
                    },
                    "variables.webitel_direction": {
                        "type": "select",
                        "caption": "Direction",
                        "options": {
                            "select": [
                                "inbound",
                                "outbound",
                                "conference",
                                "internal",
                                "eavesdrop"
                            ]
                        }
                    },
                    "variables.hangup_cause": {
                        "type": "select",
                        "caption": "Hangup cause",
                        "options": {
                            "select": [
                                "CALL_REJECTED",
                                "DESTINATION_OUT_OF_ORDER",
                                "NORMAL_CLEARING",
                                "RECOVERY_ON_TIMER_EXPIRE",
                                "ORIGINATOR_CANCEL",
                                "USER_NOT_REGISTERED",
                                "UNALLOCATED_NUMBER",
                                "MANAGER_REQUEST",
                                "INCOMPATIBLE_DESTINATION",
                                "SYSTEM_SHUTDOWN",
                                "USER_BUSY",
                                "NO_ANSWER",
                                "USER_CHALLENGE",
                                "NO_ROUTE_DESTINATION",
                                "EXCHANGE_ROUTING_ERROR",
                                "INVALID_GATEWAY",
                                "LOSE_RACE",
                                "CHAN_NOT_IMPLEMENTED",
                                "SUBSCRIBER_ABSENT",
                                "NORMAL_UNSPECIFIED",
                                "MEDIA_TIMEOUT",
                                "INCOMING_CALL_BARRED",
                                "NONE",
                                "NORMAL_TEMPORARY_FAILURE",
                                "MANDATORY_IE_MISSING",
                                "UNKNOWN",
                                "ATTENDED_TRANSFER",
                                "INVALID_NUMBER_FORMAT",
                                "SERVICE_NOT_IMPLEMENTED",
                                "ALLOTTED_TIMEOUT"
                            ]
                        }
                    },
                    "callflow.times.answered_time": {
                        "type": "timestamp",
                        "caption": "Answered time",
                        "options": {
                            "detail": true
                        }
                    },
                    "callflow.times.bridged_time": {
                        "type": "timestamp",
                        "caption": "Bridged time",
                        "options": {
                            "detail": true
                        }
                    },
                    "callflow.times.hangup_time": {
                        "type": "timestamp",
                        "caption": "Hangup",
                        "options": {
                            "detail": true
                        }
                    },
                    "variables.domain_name": {
                        "type": "string",
                        "caption": "Domain",
                    },
                    "variables.uuid": {
                        "type": "string",
                        "caption": "UUID",
                        "noRender": true
                    },
                };
            };

            $localStorage.cdrColumns = mapColumn;
            return mapColumn;
        };

        function setMapColumn (col) {
            var cols = $localStorage.cdrColumns;
            cols[col.id] = {
                type: col.type,
                caption: col.caption,
                options: col.options
            };
        };

        function getMapColumn(id) {
            var col = $localStorage.cdrColumns[id];
            if (!col)
                return null;
            col.id = id;
            return col;
        };

        function removeMapColumn (id) {
            if (!id || id == 'variables.uuid')
                throw "Bad id";
            delete $localStorage.cdrColumns[id];
        };

        var Column = function(id, type, caption, option) {
            if (!id || !type || !caption)
                throw "Bad column parameters";

            this.id = id;
            this.type = type;
            this.caption = caption;
            this.options = option;
        };

        Column.prototype.save = function () {
            setMapColumn(this);
        };
        
        Column.prototype.getJson = function () {
            var _ = {};
            _[this.id] = {};
        };

        var availableColumns = function () {
            var availableDefColumns = {};

            angular.forEach(getMapColumns(), function (item, key) {
                return availableDefColumns[key] = 1;
            });
            return availableDefColumns;
        };

        function getData(pageNumber, limit, columns, filter, sort, cb) {
            var body = {};
            body.columns = columns; //availableColumns();
            body.pageNumber = pageNumber;
            body.limit = limit;
            body.filter = filter;
            body.sort = sort;

            // TODO BUG!
            body = JSON.stringify(body);

            webitel.cdr("POST", "/api/v2/cdr/searches", body, function (err, res) {
                if (err)
                    return cb(err);
                return cb(null, parseResponse(res));
            });
        };
        function getElasticData(pageNumber, limit, columns, filter, qs, sort, scroll, cb) {
            var body = {};
            body.columns = columns.other; //availableColumns();
            body.columnsDate = columns.date;
            body.pageNumber = pageNumber;
            body.limit = limit;
            body.query = qs || "*";
            body.filter = filter || {};
            body.sort = sort;
            
            if (columns.domain)
                body.domain = columns.domain;

            if (scroll)
                body.scroll = scroll;

            // TODO BUG!
            body = JSON.stringify(body);

            webitel.cdr("POST", "/api/v2/cdr/text", body, function (err, res, statusCode) {
                if (err) {
                    err.statusCode = statusCode;
                    return cb(err);
                };
                return cb(null, parseElasticResponse(res.hits.hits), res.hits.total, res._scroll_id);
            });
        };

        function scrollElasticData(scroll, scrollId, cb) {
            var body = {
                scrollId: scrollId,
                scroll: scroll
            };

            webitel.cdr("POST", "/api/v2/cdr/text/scroll", body, function (err, res, statusCode) {
                if (err) {
                    err.statusCode = statusCode;
                    return cb(err);
                }
                return cb(null, parseElasticResponse(res.hits.hits), res.hits.total);
            });
        }

        function parseElasticResponse (res) {
            var data = [];
            var _st = Date.now();
            var t = {};
            angular.forEach(res, function (item) {
                t = {};
                angular.forEach(item.fields, function (val, key) {
                    t[key] = val[0];
                });
                data.push(t);
            });
            return data;
        }

        function convertResponseObject(data) {
            var result = {};
            doIt(data, "");
            return result;

            function doIt(data, s) {

                if (data && typeof data === "object") {
                    if (Array.isArray(data)) {
                        doIt(data[0], s);
                        //for (var i = 0; i < data.length; i++) {
                        //    doIt(data[i], s + "." + i);
                        //}
                    } else {
                        for (var p in data) {
                            doIt(data[p], s + "." + p);
                        }
                    }
                } else {
                    // todo
                    result[s.replace(/^./, '')] = data;
                }
            }
        };

        function parseResponse (res) {
            var data = [];
            var _st = Date.now();
            angular.forEach(res, function (item) {
                data.push(convertResponseObject(item))
            });

            console.debug('Parse response time: ', Date.now() - _st);
            return data;
        }

        function getCount(filter, cb) {

            var body = {};
            body.filter = filter;

            body = JSON.stringify(body);

            webitel.cdr("POST", "/api/v2/cdr/counts", body, cb);
        };


        function remove (id, domain, name, cb) {
            if (!id || !domain)
                return cb(new Error('Bad request parameters.'));

            webitel.cdr("DELETE", "/api/v2/files/" + id + "?db=true&domain=" + domain + "&name=" + name, cb);
        };
        
        function removeCdr(uuid, cb) {
            if (!uuid)
                return cb(new Error('Bad request parameters.'));

            webitel.cdr("DELETE", "/api/v2/cdr/" + uuid, cb);
        }

        function getStatistic(domain, body, cb){
            if (!domain)
                return cb(new Error('Bad request parameters.'));
            webitel.cdr("POST", "/api/v2/cdr/text?domain=" + domain, JSON.stringify(body), cb);
        }
        return {
            getStatistic: getStatistic,
            getData: getData,
            getElasticData: getElasticData,
            scrollElasticData: scrollElasticData,
            getCount: getCount,
            availableColumns: availableColumns,
            mapColumn: getMapColumns,
            remove: remove,
            Column: Column,
            setMapColumn: setMapColumn,
            removeMapColumn: removeMapColumn,
            getMapColumn: getMapColumn,
            removeCdr: removeCdr
        }
    }]);
});