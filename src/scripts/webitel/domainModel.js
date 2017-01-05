/**
 * Created by i.navrotskyj on 03.02.2016.
 */
'use strict';

define(['angular', 'scripts/webitel/utils', 'async', 'scripts/webitel/webitel', 'scripts/webitel/emailModel'], function (angular, utils, async) {

    var app = angular.module('app.domain', ['app.webitel', 'app.email']);

    app.factory("DomainModel", ['webitel', 'EmailModel', function DomainModel(webitel, EmailModel) {

        var cacheDomain = new utils.WebitelArrayCollection('name'),
            httpApi = webitel.api;

        webitel.$scope.$on('DOMAIN_CREATE', function (e, domainEvent) {
            if (cacheDomain.get(domainEvent["Domain-Name"]))
                return;
            var _domain = create();
            _domain.id =  _domain.name = domainEvent["Domain-Name"];
            _domain.customer_id = domainEvent["variable_customer_id"];
            _domain.default_language = domainEvent["variable_default_language"];
            _domain.user = 0;
            cacheDomain.add(_domain);
        });

        webitel.$scope.$on('DOMAIN_DESTROY', function (e, domainEvent) {
            if (cacheDomain.get(domainEvent))
                cacheDomain.remove(domainEvent["Domain-Name"]);
        });

        var initDomain = false;
        function getDomains(cb, hardReset) {
            if (initDomain && !hardReset) return cb(null, cacheDomain.getAll());

            cacheDomain.removeAll();

            httpApi('GET', '/api/v2/domains', function (err, res) {
                if (err)
                    return cb(err);
                initDomain = true;
                var  _tmp;
                angular.forEach(res.info, function(value, key){
                    _tmp = value;
                    _tmp.user = +value.user;
                    _tmp.name = key;
                    _tmp.id = key;
                    cacheDomain.add(_tmp)
                });
                cb(null, cacheDomain.getAll())
            });
        };

        function parseDomainObj(obj, id) {
            var domain = create();
            domain.id = domain.name = id;

            angular.forEach(obj, function(value, key) {
                if (/^variable_/.test(key)) {
                    if (key === "variable_customer_id") {
                        return domain.customer_id = value;
                    };
                    if (key === "variable_default_language") {
                        return domain.default_language = value.toLowerCase();
                    };
                    key = key.replace('variable_', '');

                    domain.variables.push({
                        "key": key,
                        "value": value
                    })
                } else {
                    domain.parameters.push({
                        "key": key,
                        "value": value
                    })
                };
            });
            return domain;
        };

        function create(id, name, customer_id, default_language) {
            return {
                "id": id ||  null,
                "name": name || "",
                "customer_id": customer_id || "",
                "default_language": default_language || "",
                "variables": [],
                "parameters": []
            };
        };

        function parseParamToRequest(arr, pref) {
            var resp = [],
                _p = pref || ''
                ;
            angular.forEach(arr, function(item) {
                resp.push(_p + item.key + '=\'' + item.value + '\'')
            });
            return resp;
        }

        function usedFileStorage(id, cb) {
            webitel.cdr('GET', '/api/v2/files/stats?domain=' + id, cb);
        }

        function getDomainSettings(domainName, cb) {
            webitel.api('GET', '/api/v2/domains/' + domainName + '/settings', cb);
        }

        function genToken(domainName, option, cb) {
            if (!domainName)
                return cb(new Error("Bad domain name"));

            if (!option)
                return cb(new Error("Bad options"));

            if (!option.expire || option.expire <= Date.now)
                return cb(new Error("Bad expire date"));

            webitel.api('POST', '/api/v2/domains/' + domainName + '/settings/token', option, cb);
        }

        function removeToken(domainName, uuid, cb) {
            if (!domainName)
                return cb(new Error("Bad domain name"));

            if (!uuid)
                return cb(new Error("Bad token id"));

            webitel.api('DELETE', '/api/v2/domains/' + domainName + '/settings/token/' + uuid, cb);
        }

        function setStateToken(domainName, uuid, state, cb) {
            if (!domainName)
                return cb(new Error("Bad domain name"));

            if (!uuid)
                return cb(new Error("Bad token id"));

            if (typeof state !== 'boolean')
                return cb(new Error("Bad state"));

            webitel.api('PATCH', '/api/v2/domains/' + domainName + '/settings/token/' + uuid, {state: state}, cb);
        }

        return {
            create: create,
            genToken: genToken,
            removeToken: removeToken,
            setStateToken: setStateToken,
            usedFileStorage: usedFileStorage,
            item: function (id, cb) {
                webitel.api('GET', '/api/v2/domains/' + id, function (err, res) {
                    if (err)
                        return cb(err);

                    var domain = parseDomainObj(res.info, id);
                    var tokens = [];

                    async.waterfall(
                        [
                            function (cb) {
                                getDomainSettings(id, function (err, result) {
                                    if (result && result.info) {
                                        domain.storage = result.info.storage;
                                        tokens = result.info.tokens || [];
                                    }
                                    cb();
                                });
                            },
                            function (cb) {
                                EmailModel.get(id, function (err, emailCOnfig) {
                                    domain.email = emailCOnfig;
                                    cb();
                                });
                            }
                        ],
                        function (err) {
                            return cb(null, domain, tokens);
                        }
                    );

                });
            },
            add: function (domain, cb) {

                if (domain.default_language) {
                    domain.variables.push({
                        key: "default_language",
                        value: domain.default_language
                    });
                }

                var requestData = {
                    "domain_name": domain.name,
                    "customer_id": domain.customer_id,
                    "parameters": parseParamToRequest(domain.parameters),
                    "variables": parseParamToRequest(domain.variables)
                };
                if (!requestData.domain_name)
                    return cb(new Error("Name is required"));

                if (!requestData.customer_id)
                    return cb(new Error("Customer is required"));

                webitel.api('POST', '/api/v2/domains', requestData, function(err, res) {
                    if (err)
                        return cb(err);
                    if (!cacheDomain.get(domain.name))
                        cacheDomain.add(create(domain.name, domain.name, domain.customer_id, domain.default_language));
                    return cb(null, res);
                })
            },
            update: function (domain, fields, remVar, cb) {
                // body...
                var requestData = [];
                angular.forEach(remVar, function (key) {
                    requestData.push(key + '=')
                });
                angular.forEach(fields, function (item, key) {
                    if (key === 'email' || key == 'storage' || key === 'apiToken') return;

                    if (key === "default_language") {
                        requestData.push("default_language=" + domain.default_language)
                    } else if (key === "customer_id") {
                        requestData.push("customer_id=" + domain.customer_id)
                    } else if (key === "variables") {
                        requestData = requestData.concat(parseParamToRequest(domain.variables))
                    }
                });

                if (requestData.length < 1 && !fields.hasOwnProperty('email') && !fields.hasOwnProperty('storage'))
                    return cb(new Error("Application parse variable error."));

                async.parallel(
                    [
                        function (cb) {
                            if (requestData.length > 0) {
                                webitel.api("PUT", "/api/v2/domains/" + domain.id + "/var", requestData, cb);
                            } else {
                                cb(null);
                            }
                        },

                        function (cb) {
                            if (fields.hasOwnProperty('storage')) {
                                webitel.api('PUT', '/api/v2/domains/' + domain.id + '/settings', {storage: domain.storage}, cb)
                            } else {
                                cb(null);
                            }
                        },

                        function (cb) {
                            if (fields.hasOwnProperty('email')) {
                                EmailModel.set(domain.id, domain.email, cb);
                            } else {
                                cb(null);
                            }
                        }
                    ],
                    cb
                );
            },
            remove: function (name, cb) {
                webitel.api("DELETE", "/api/v2/domains/" + name, function (err, res) {
                    if (err)
                        return cb(err);

                    if (cacheDomain.get(name))
                        cacheDomain.remove(name);
                    return cb(null, res);
                });
            },
            list: getDomains
        }
    }]);
})