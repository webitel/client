define(['app', 'modules/callflows/editor', 'modules/callflows/callflowUtils', 'modules/callflows/extension/extensionModel', 'modules/callflows/diagram/diagram', 'css!modules/callflows/diagram/diagram.css'], function (app, aceEditor, callflowUtils) {

    app.controller('CallflowExtensionCtrl', ['$scope', 'webitel', '$rootScope', 'notifi', 'CallflowExtensionModel',
        '$location', '$route', '$routeParams', '$confirm', '$window', 'TableSearch', '$timeout', 'cfpLoadingBar',
        function ($scope, webitel, $rootScope, notifi, CallflowExtensionModel, $location, $route, $routeParams, $confirm
            ,$window, TableSearch, $timeout, cfpLoadingBar) {
            $scope.domain = webitel.domain();
            $scope.cf = aceEditor.getStrFromJson([]);
            $scope.cfOnDisconnect = aceEditor.getStrFromJson([]);
            $scope.rowCollection = [];
            $scope.extension = {};
            $scope.isLoading = false;
            $scope.diagramOpened = false;
            $scope.cfDiagram = {};
            $scope.cfOnDisconnectDiagram = {};
            $scope.isCf = true;

            $scope.$watch('isLoading', function (val) {
                if (val) {
                    cfpLoadingBar.start()
                } else {
                    cfpLoadingBar.complete()
                }
            });

            $scope.canDelete = webitel.connection.session.checkResource('rotes/extension', 'd');
            $scope.canUpdate = webitel.connection.session.checkResource('rotes/extension', 'u');
            $scope.canCreate = webitel.connection.session.checkResource('rotes/extension', 'c');

            $scope.viewMode = !$scope.canUpdate;
            
            $scope.view = function () {
                var id = $routeParams.id;
                var domain = $routeParams.domain;
                CallflowExtensionModel.item(id, domain, function (err, res) {
                    if (err)
                        return notifi.error(err);
                    $scope.extension = res;
                    var cf = callflowUtils.replaceExpression(res.callflow);
                    var cfOnDisconnect = callflowUtils.replaceExpression(res.onDisconnect);
                    $scope.cf = aceEditor.getStrFromJson(cf);
                    $scope.cfOnDisconnect = aceEditor.getStrFromJson(cfOnDisconnect);
                    disableEditMode();
                });
            };

            $scope.changeTab = function(tab) {
                $scope.isCf = tab;
            };

            $scope.query = TableSearch.get('extensions');

            $scope.$watch("query", function (newVal) {
                TableSearch.set(newVal, 'extensions')
            });

            function initPage () {
                $scope.timeZones = callflowUtils.timeZones;
            };

            $scope.aceLoaded = aceEditor.init;

            $scope.canUpdate = webitel.connection.session.checkResource('rotes/default', 'u');

            $scope.closePage = closePage;
            $scope.edit = edit;
            $scope.save = save;
            $scope.reloadData = reloadData;
            $scope.openDiagram = openDiagram;
            $scope.saveDiagram = saveDiagram;
            $scope.disableVisual = disableVisual;

            function disableVisual() {
                if($scope.isCf){
                    $scope.visualCfEnabled = false;
                    $scope.cfDiagram = null;
                }
                else{
                    $scope.cfOnDisconnectDiagram = null;
                    $scope.visualOnDiscEnabled = false;
                }
            }

            function saveDiagram() {
                var cfGetter = getCallflowJSON();
                $scope.diagramOpened = false;
                if($scope.isCf){
                    $scope.cf = aceEditor.getStrFromJson(cfGetter.callflowJson);
                    $scope.cfDiagram = cfGetter.callflowModel;
                    $scope.visualCfEnabled = true;
                }
                else{
                    $scope.cfOnDisconnect = aceEditor.getStrFromJson(cfGetter.callflowJson);
                    $scope.cfOnDisconnectDiagram = cfGetter.callflowModel;
                    $scope.visualOnDiscEnabled = true;
                }
                CallflowDiagram.clearReducer();
                DiagramDesigner.removeDesigner();
            }

            function openDiagram(value) {
                $scope.diagramOpened = value;
                var diagram = $scope.isCf ? $scope.cfDiagram : $scope.cfOnDisconnectDiagram;
                if(value) {
                    DiagramDesigner.init();
                    setTimeout(function(){
                        if(!!diagram)CallflowDiagram.updateModel(diagram, {selectedNode: null});
                        else CallflowDiagram.updateModel({
                            id: webitel.guid(),
                            offsetX: 0,
                            offsetY: 0,
                            zoom: 100,
                            links: [],
                            nodes: []
                        });
                    }, 100);
                }
                else{
                    CallflowDiagram.updateModel();
                    CallflowDiagram.clearReducer();
                    DiagramDesigner.removeDesigner();
                }
            }


            $scope.$watch('[extension,cf,cfOnDisconnect]', function(newValue, oldValue) {
                return $scope.isEdit = !!oldValue[0]._id;
            }, true);

            $scope.cancel = function () {
                $scope.extension = angular.copy($scope.oldExtension);
                $scope.cf = angular.copy($scope.oldCf);
                $scope.cfDiagram = angular.copy($scope.oldCfDiagram);
                $scope.cfOnDisconnect = angular.copy($scope.oldCfOnDisconnect);
                $scope.cfOnDisconnectDiagram = angular.copy($scope.oldCfOnDisconnectDiagram);
                if(!!$scope.cfDiagram)$scope.visualEnabled = true;
                if(!!$scope.cfOnDisconnectDiagram)$scope.visualOnDiscEnabled = true;
                disableEditMode();
            };

            function disableEditMode () {
                $timeout(function () {
                    $scope.isEdit = false;
                }, 0);
            };


            function edit() {
                var id = $routeParams.id;
                var domain = $routeParams.domain;
                CallflowExtensionModel.item(id, domain, function (err, res) {
                    if (err)
                        return notifi.error(err);
                    $scope.extension = res;
                    $scope.oldExtension = angular.copy(res);
                    var cf = callflowUtils.replaceExpression(res.callflow);
                    var cfOnDisconnect = callflowUtils.replaceExpression(res.onDisconnect);
                    $scope.cf = aceEditor.getStrFromJson(cf);
                    $scope.cfDiagram = res.cfDiagram;
                    $scope.cfOnDisconnectDiagram = res.cfOnDisconnectDiagram;
                    $scope.cfOnDisconnect = aceEditor.getStrFromJson(cfOnDisconnect);
                    $scope.oldCf = angular.copy($scope.cf);
                    $scope.oldCfDiagram = angular.copy($scope.cfDiagram);
                    $scope.oldCfOnDisconnect = angular.copy($scope.cfOnDisconnect);
                    $scope.oldCfOnDisconnectDiagram = angular.copy($scope.cfOnDisconnectDiagram);
                    if(!!$scope.cfDiagram)$scope.visualCfEnabled = true;
                    if(!!$scope.cfOnDisconnectDiagram)$scope.visualOnDiscEnabled = true;
                    disableEditMode();
                });
            };

            function save() {
                try {
                    function cb (err, res) {
                        if (err)
                            return notifi.error(err);

                        $scope.extension.__time = Date.now();
                        return edit();
                    };
                    $scope.extension.cfDiagram = $scope.cfDiagram;
                    $scope.extension.cfOnDisconnectDiagram = $scope.cfOnDisconnectDiagram;
                    $scope.extension.callflow = JSON.parse($scope.cf);
                    if ($scope.cfOnDisconnect) {
                        $scope.extension.onDisconnect = JSON.parse($scope.cfOnDisconnect);
                    } else {
                        $scope.extension.onDisconnect = [];
                    }

                    CallflowExtensionModel.update($scope.extension, $scope.domain, cb)
                } catch (e) {
                    notifi.error(e, 3000);
                }
            };

            var changeDomainEvent = $rootScope.$on('webitel:changeDomain', function (e, domainName) {
                $scope.domain = domainName;
                closePage();
            });

            $scope.removeItem = function (row) {
                $confirm({text: 'Are you sure you want to delete ' + row.name + ' ?'},  { templateUrl: 'views/confirm.html' })
                    .then(function() {
                        CallflowExtensionModel.remove(row._id, $scope.domain, function (err) {
                            if (err)
                                return notifi.error(err, 5000);
                            reloadData()
                        })
                    });
            }

            $scope.$on('$destroy', function () {
                changeDomainEvent();
            });

            $scope.$watch('domain', function(domainName) {
                $scope.domain = domainName;
                reloadData();
            });


            function reloadData () {
                if ($location.$$path != '/callflows/extension')
                    return $scope.domain && initPage();

                if (!$scope.domain)
                    return $scope.rowCollection = [];

                $scope.isLoading = true;
                CallflowExtensionModel.list($scope.domain, function (err, res) {
                    $scope.isLoading = false;
                    if (err)
                        return notifi.error(err);
                    var arr = [];
                    angular.forEach(res, function(item) {
                        arr.push(item);
                    });
                    $scope.rowCollection = arr;
                });
            };

            function closePage () {
                $location.path('/callflows/extension');
                //$window.history.back();
            };

            $scope.init = function init () {
                if (!!$route.current.method) {
                    return $scope[$route.current.method]();
                };
            }();
        }])
});