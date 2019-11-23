function dv_rolloutManager(handlersDefsArray, baseHandler) {
    this.handle = function () {
        var errorsArr = [];

        var handler = chooseEvaluationHandler(handlersDefsArray);
        if (handler) {
            var errorObj = handleSpecificHandler(handler);
            if (errorObj === null) {
                return errorsArr;
            }
            else {
                var debugInfo = handler.onFailure();
                if (debugInfo) {
                    for (var key in debugInfo) {
                        if (debugInfo.hasOwnProperty(key)) {
                            if (debugInfo[key] !== undefined || debugInfo[key] !== null) {
                                errorObj[key] = encodeURIComponent(debugInfo[key]);
                            }
                        }
                    }
                }
                errorsArr.push(errorObj);
            }
        }

        var errorObjHandler = handleSpecificHandler(baseHandler);
        if (errorObjHandler) {
            errorObjHandler['dvp_isLostImp'] = 1;
            errorsArr.push(errorObjHandler);
        }
        return errorsArr;
    };

    function handleSpecificHandler(handler) {
        var url;
        var errorObj = null;

        try {
            url = handler.createRequest();
            if (url) {
                if (!handler.sendRequest(url)) {
                    errorObj = createAndGetError('sendRequest failed.',
                        url,
                        handler.getVersion(),
                        handler.getVersionParamName(),
                        handler.dv_script);
                }
            } else {
                errorObj = createAndGetError('createRequest failed.',
                    url,
                    handler.getVersion(),
                    handler.getVersionParamName(),
                    handler.dv_script,
                    handler.dvScripts,
                    handler.dvStep,
                    handler.dvOther
                );
            }
        }
        catch (e) {
            errorObj = createAndGetError(e.name + ': ' + e.message, url, handler.getVersion(), handler.getVersionParamName(), (handler ? handler.dv_script : null));
        }

        return errorObj;
    }

    function createAndGetError(error, url, ver, versionParamName, dv_script, dvScripts, dvStep, dvOther) {
        var errorObj = {};
        errorObj[versionParamName] = ver;
        errorObj['dvp_jsErrMsg'] = encodeURIComponent(error);
        if (dv_script && dv_script.parentElement && dv_script.parentElement.tagName && dv_script.parentElement.tagName == 'HEAD') {
            errorObj['dvp_isOnHead'] = '1';
        }
        if (url) {
            errorObj['dvp_jsErrUrl'] = url;
        }
        if (dvScripts) {
            var dvScriptsResult = '';
            for (var id in dvScripts) {
                if (dvScripts[id] && dvScripts[id].src) {
                    dvScriptsResult += encodeURIComponent(dvScripts[id].src) + ":" + dvScripts[id].isContain + ",";
                }
            }
            
           
           
        }
        return errorObj;
    }

    function chooseEvaluationHandler(handlersArray) {
        var config = window._dv_win.dv_config;
        var index = 0;
        var isEvaluationVersionChosen = false;
        if (config.handlerVersionSpecific) {
            for (var i = 0; i < handlersArray.length; i++) {
                if (handlersArray[i].handler.getVersion() == config.handlerVersionSpecific) {
                    isEvaluationVersionChosen = true;
                    index = i;
                    break;
                }
            }
        }
        else if (config.handlerVersionByTimeIntervalMinutes) {
            var date = config.handlerVersionByTimeInputDate || new Date();
            var hour = date.getUTCHours();
            var minutes = date.getUTCMinutes();
            index = Math.floor(((hour * 60) + minutes) / config.handlerVersionByTimeIntervalMinutes) % (handlersArray.length + 1);
            if (index != handlersArray.length) { 
                isEvaluationVersionChosen = true;
            }
        }
        else {
            var rand = config.handlerVersionRandom || (Math.random() * 100);
            for (var i = 0; i < handlersArray.length; i++) {
                if (rand >= handlersArray[i].minRate && rand < handlersArray[i].maxRate) {
                    isEvaluationVersionChosen = true;
                    index = i;
                    break;
                }
            }
        }

        if (isEvaluationVersionChosen == true && handlersArray[index].handler.isApplicable()) {
            return handlersArray[index].handler;
        }
        else {
            return null;
        }
    }    
}

function getCurrentTime() {
    "use strict";
    if (Date.now) {
        return Date.now();
    }
    return (new Date()).getTime();
}

function doesBrowserSupportHTML5Push() {
    "use strict";
    return typeof window.parent.postMessage === 'function' && window.JSON;
}

function dv_GetParam(url, name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS, 'i');
    var results = regex.exec(url);
    if (results == null) {
        return null;
    }
    else {
        return results[1];
    }
}

function dv_GetKeyValue(url) {
    var keyReg = new RegExp(".*=");
    var keyRet = url.match(keyReg)[0];
    keyRet = keyRet.replace("=", "");

    var valReg = new RegExp("=.*");
    var valRet = url.match(valReg)[0];
    valRet = valRet.replace("=", "");

    return {key: keyRet, value: valRet};
}

function dv_Contains(array, obj) {
    var i = array.length;
    while (i--) {
        if (array[i] === obj) {
            return true;
        }
    }
    return false;
}

function dv_GetDynamicParams(url, prefix) {
    try {
        prefix = (prefix != undefined && prefix != null) ? prefix : 'dvp';
        var regex = new RegExp("[\\?&](" + prefix + "_[^&]*=[^&#]*)", "gi");
        var dvParams = regex.exec(url);

        var results = [];
        while (dvParams != null) {
            results.push(dvParams[1]);
            dvParams = regex.exec(url);
        }
        return results;
    }
    catch (e) {
        return [];
    }
}

function dv_createIframe() {
    var iframe;
    if (document.createElement && (iframe = document.createElement('iframe'))) {
        iframe.name = iframe.id = 'iframe_' + Math.floor((Math.random() + "") * 1000000000000);
        iframe.width = 0;
        iframe.height = 0;
        iframe.style.display = 'none';
        iframe.src = 'about:blank';
    }

    return iframe;
}

function dv_GetRnd() {
    return ((new Date()).getTime() + "" + Math.floor(Math.random() * 1000000)).substr(0, 16);
}

function dv_SendErrorImp(serverUrl, errorsArr) {

    for (var j = 0; j < errorsArr.length; j++) {
        var errorObj = errorsArr[j];
        var errorImp = dv_CreateAndGetErrorImp(serverUrl, errorObj);
        dv_sendImgImp(errorImp);
    }
}

function dv_CreateAndGetErrorImp(serverUrl, errorObj) {
    var errorQueryString = '';
    for (var key in errorObj) {
        if (errorObj.hasOwnProperty(key)) {
            if (key.indexOf('dvp_jsErrUrl') == -1) {
                errorQueryString += '&' + key + '=' + errorObj[key];
            } else {
                var params = ['ctx', 'cmp', 'plc', 'sid'];
                for (var i = 0; i < params.length; i++) {
                    var pvalue = dv_GetParam(errorObj[key], params[i]);
                    if (pvalue) {
                        errorQueryString += '&dvp_js' + params[i] + '=' + pvalue;
                    }
                }
            }
        }
    }

    var windowProtocol = 'https:';
    var sslFlag = '&ssl=1';

    var errorImp = windowProtocol + '//' + serverUrl + sslFlag + errorQueryString;
    return errorImp;
}

function dv_sendImgImp(url) {
    (new Image()).src = url;
}

function dv_getPropSafe(obj, propName) {
    try {
        if (obj) {
            return obj[propName];
        }
    } catch (e) {
    }
}

function dvType() {
    var that = this;
    var eventsForDispatch = {};
    this.t2tEventDataZombie = {};

    this.processT2TEvent = function (data, tag) {
        try {
            if (tag.ServerPublicDns) {
                var tpsServerUrl = tag.dv_protocol + '//' + tag.ServerPublicDns + '/event.gif?impid=' + tag.uid;

                if (!tag.uniquePageViewId) {
                    tag.uniquePageViewId = data.uniquePageViewId;
                }

                tpsServerUrl += '&upvid=' + tag.uniquePageViewId;
                $dv.domUtilities.addImage(tpsServerUrl, tag.tagElement.parentElement);
            }
        } catch (e) {
            try {
                dv_SendErrorImp(window._dv_win.dv_config.tpsErrAddress + '/visit.jpg?ctx=818052&cmp=1619415&dvtagver=6.1.src&jsver=0&dvp_ist2tProcess=1', {dvp_jsErrMsg: encodeURIComponent(e)});
            } catch (ex) {
            }
        }
    };

    this.processTagToTagCollision = function (collision, tag) {
        var i;
        for (i = 0; i < collision.eventsToFire.length; i++) {
            this.pubSub.publish(collision.eventsToFire[i], tag.uid);
        }
        var tpsServerUrl = tag.dv_protocol + '//' + tag.ServerPublicDns + '/event.gif?impid=' + tag.uid;
        tpsServerUrl += '&colltid=' + collision.allReasonsForTagBitFlag;

        for (i = 0; i < collision.reasons.length; i++) {
            var reason = collision.reasons[i];
            tpsServerUrl += '&' + reason.name + "ms=" + reason.milliseconds;
        }

        if (collision.thisTag) {
            tpsServerUrl += '&tlts=' + collision.thisTag.t2tLoadTime;
        }
        if (tag.uniquePageViewId) {
            tpsServerUrl += '&upvid=' + tag.uniquePageViewId;
        }
        $dv.domUtilities.addImage(tpsServerUrl, tag.tagElement.parentElement);
    };

    this.processBSIdFound = function (bsID, tag) {
        var tpsServerUrl = tag.dv_protocol + '//' + tag.ServerPublicDns + '/event.gif?impid=' + tag.uid;
        tpsServerUrl += '&bsimpid=' + bsID;
        if (tag.uniquePageViewId) {
            tpsServerUrl += '&upvid=' + tag.uniquePageViewId;
        }
        $dv.domUtilities.addImage(tpsServerUrl, tag.tagElement.parentElement);
    };

    this.processBABSVerbose = function (verboseReportingValues, tag) {
        var queryString = "";
        


        var dvpPrepend = "&dvp_BABS_";
        queryString += dvpPrepend + 'NumBS=' + verboseReportingValues.bsTags.length;

        for (var i = 0; i < verboseReportingValues.bsTags.length; i++) {
            var thisFrame = verboseReportingValues.bsTags[i];

            queryString += dvpPrepend + 'GotCB' + i + '=' + thisFrame.callbackReceived;
            queryString += dvpPrepend + 'Depth' + i + '=' + thisFrame.depth;

            if (thisFrame.callbackReceived) {
                if (thisFrame.bsAdEntityInfo && thisFrame.bsAdEntityInfo.comparisonItems) {
                    for (var itemIndex = 0; itemIndex < thisFrame.bsAdEntityInfo.comparisonItems.length; itemIndex++) {
                        var compItem = thisFrame.bsAdEntityInfo.comparisonItems[itemIndex];
                        queryString += dvpPrepend + "tag" + i + "_" + compItem.name + '=' + compItem.value;
                    }
                }
            }
        }

        if (queryString.length > 0) {
            var tpsServerUrl = '';
            if (tag) {
                var tpsServerUrl = tag.dv_protocol + '//' + tag.ServerPublicDns + '/event.gif?impid=' + tag.uid;
            }
            var requestString = tpsServerUrl + queryString;
            $dv.domUtilities.addImage(requestString, tag.tagElement.parentElement);
        }
    };

    var messageEventListener = function (event) {
        try {
            var timeCalled = getCurrentTime();
            var data = window.JSON.parse(event.data);
            if (!data.action) {
                data = window.JSON.parse(data);
            }
            var myUID;
            var visitJSHasBeenCalledForThisTag = false;
            if ($dv.tags) {
                for (var uid in $dv.tags) {
                    if ($dv.tags.hasOwnProperty(uid) && $dv.tags[uid] && $dv.tags[uid].t2tIframeId === data.iFrameId) {
                        myUID = uid;
                        visitJSHasBeenCalledForThisTag = true;
                        break;
                    }
                }
            }

            var tag;
            switch (data.action) {
                case 'uniquePageViewIdDetermination':
                    if (visitJSHasBeenCalledForThisTag) {
                        $dv.processT2TEvent(data, $dv.tags[myUID]);
                        $dv.t2tEventDataZombie[data.iFrameId] = undefined;
                    }
                    else {
                        data.wasZombie = 1;
                        $dv.t2tEventDataZombie[data.iFrameId] = data;
                    }
                    break;
                case 'maColl':
                    tag = $dv.tags[myUID];
                    if (!tag.uniquePageViewId) {
                        tag.uniquePageViewId = data.uniquePageViewId;
                    }
                    data.collision.commonRecievedTS = timeCalled;
                    $dv.processTagToTagCollision(data.collision, tag);
                    break;
                case 'bsIdFound':
                    tag = $dv.tags[myUID];
                    if (!tag.uniquePageViewId) {
                        tag.uniquePageViewId = data.uniquePageViewId;
                    }
                    $dv.processBSIdFound(data.id, tag);
                    break;
                case 'babsVerbose':
                    try {
                        tag = $dv.tags[myUID];
                        $dv.processBABSVerbose(data, tag);
                    } catch (err) {
                    }
                    break;
            }

        } catch (e) {
            try {
                dv_SendErrorImp(window._dv_win.dv_config.tpsErrAddress + '/visit.jpg?ctx=818052&cmp=1619415&dvtagver=6.1.src&jsver=0&dvp_ist2tListener=1', {dvp_jsErrMsg: encodeURIComponent(e)});
            } catch (ex) {
            }
        }
    };

    if (window.addEventListener) {
        addEventListener("message", messageEventListener, false);
    }
    else {
        attachEvent("onmessage", messageEventListener);
    }

    this.pubSub = (function () {
        var previousEventsCapacity = 1000;
        var subscribers = {};       
        var eventsHistory = {};     
        var prerenderHistory = {};  
        return {
            subscribe: function (eventName, id, actionName, func, errFunc) {
                that.isPubSubEval = true;
                    handleHistoryEvents(eventName, id, func, errFunc);
                    if (!subscribers[eventName + id]) {
                        subscribers[eventName + id] = [];
                    }
                    subscribers[eventName + id].push({Func: func, ErrFunc: errFunc, ActionName: actionName});
            },

            publish: function (eventName, id, args) {
                var actionsResults = [];
                try {
                    if (eventName && id) {
                        if ($dv && $dv.tags[id] && $dv.tags[id].prndr) {
                            prerenderHistory[id] = prerenderHistory[id] || [];
                            prerenderHistory[id].push({eventName: eventName, args: args});
                        }
                        else {
                            actionsResults.push.apply(actionsResults, publishEvent(eventName, id, args));
                        }
                    }
                } catch (e) {
                }
                return actionsResults.join('&');
            },

            publishHistoryRtnEvent: function (id) {
                var actionsResults = [];
                if (prerenderHistory[id] instanceof Array) {
                    for (var i = 0; i < prerenderHistory[id].length; i++) {
                        var eventName = prerenderHistory[id][i].eventName;
                        var args = prerenderHistory[id][i].args;
                        if (eventName) {
                            actionsResults.push.apply(actionsResults, publishEvent(eventName, id, args));
                        }
                    }
                }

                prerenderHistory[id] = [];

                return actionsResults;
            }
        };

        function publishEvent(eventName, id, args) {
            var actionsResults = [];
            if (!eventsHistory[id]) {
                eventsHistory[id] = [];
            }
            if (eventsHistory[id].length < previousEventsCapacity) {
                eventsHistory[id].push({eventName: eventName, args: args});
            }

            if (subscribers[eventName + id] instanceof Array) {
                for (var i = 0; i < subscribers[eventName + id].length; i++) {
                    var funcObject = subscribers[eventName + id][i];
                    if (funcObject && funcObject.Func && typeof funcObject.Func == "function" && funcObject.ActionName) {
                        var isSucceeded = true;
                        try {
                            funcObject.Func(id, args);
                        } catch (e) {
                            isSucceeded = false;
                            if (typeof funcObject.ErrFunc == "function") {
                                runSafely(function () {
                                    funcObject.ErrFunc(e);
                                });
                            }
                        }
                        actionsResults.push(encodeURIComponent(funcObject.ActionName) + '=' + (isSucceeded ? '1' : '0'));
                    }
                }
            }

            return actionsResults;
        }

        function handleHistoryEvents(eventName, id, func, errFunc) {
            try {
                if (eventsHistory[id] instanceof Array) {
                    for (var i = 0; i < eventsHistory[id].length; i++) {
                        if (eventsHistory[id][i] && eventsHistory[id][i].eventName === eventName) {
                            func(id, eventsHistory[id][i].args);
                        }
                    }
                }
            } catch (e) {
                if (typeof errFunc == "function") {
                    runSafely(function () {
                        errFunc(e);
                    });
                }
            }
        }
    })();

    this.domUtilities = new function () {
        function getDefaultParent() {
            return document.body || document.head || document.documentElement;
        }

        this.createImage = function (parentElement) {
            parentElement = parentElement || getDefaultParent();
            var image = parentElement.ownerDocument.createElement("img");
            image.width = 0;
            image.height = 0;
            image.style.display = 'none';
            image.src = '';
            parentElement.insertBefore(image, parentElement.firstChild);
            return image;
        };

        var imgArr = [];
        var nextImg = 0;
        var imgArrCreated = false;
        if (!navigator.sendBeacon) {
            imgArr[0] = this.createImage();
            imgArr[1] = this.createImage();
            imgArrCreated = true;
        }

        this.addImage = function (url, parentElement, useGET, usePrerenderedImage) {
            parentElement = parentElement || getDefaultParent();
            if (!useGET && navigator.sendBeacon) {
                var message = appendCacheBuster(url);
                navigator.sendBeacon(message, {});
            } else {
                var image;
                if (usePrerenderedImage && imgArrCreated) {
                    image = imgArr[nextImg];
                    image.src = appendCacheBuster(url);
                    nextImg = (nextImg + 1) % imgArr.length;
                } else {
                    image = this.createImage(parentElement);
                    image.src = appendCacheBuster(url);
                    parentElement.insertBefore(image, parentElement.firstChild);
                }
            }
        };


        this.addScriptResource = function (url, parentElement) {
            parentElement = parentElement || getDefaultParent();
            var scriptElem = parentElement.ownerDocument.createElement("script");
            scriptElem.type = 'text/javascript';
            scriptElem.src = appendCacheBuster(url);
            parentElement.insertBefore(scriptElem, parentElement.firstChild);
        };

        this.addScriptCode = function (srcCode, parentElement) {
            parentElement = parentElement || getDefaultParent();
            var scriptElem = parentElement.ownerDocument.createElement("script");
            scriptElem.type = 'text/javascript';
            scriptElem.innerHTML = srcCode;
            parentElement.insertBefore(scriptElem, parentElement.firstChild);
        };

        this.addHtml = function (srcHtml, parentElement) {
            parentElement = parentElement || getDefaultParent();
            var divElem = parentElement.ownerDocument.createElement("div");
            divElem.style = "display: inline";
            divElem.innerHTML = srcHtml;
            parentElement.insertBefore(divElem, parentElement.firstChild);
        };
    };

    this.resolveMacros = function (str, tag) {
        var viewabilityData = tag.getViewabilityData();
        var viewabilityBuckets = viewabilityData && viewabilityData.buckets ? viewabilityData.buckets : {};
        var upperCaseObj = objectsToUpperCase(tag, viewabilityData, viewabilityBuckets);
        var newStr = str.replace('[DV_PROTOCOL]', upperCaseObj.DV_PROTOCOL);
        newStr = newStr.replace('[PROTOCOL]', upperCaseObj.PROTOCOL);
        newStr = newStr.replace(/\[(.*?)\]/g, function (match, p1) {
            var value = upperCaseObj[p1];
            if (value === undefined || value === null) {
                value = '[' + p1 + ']';
            }
            return encodeURIComponent(value);
        });
        return newStr;
    };

    this.settings = new function () {
    };

    this.tagsType = function () {
    };

    this.tagsPrototype = function () {
        this.add = function (tagKey, obj) {
            if (!that.tags[tagKey]) {
                that.tags[tagKey] = new that.tag();
            }
            for (var key in obj) {
                that.tags[tagKey][key] = obj[key];
            }
        };
    };

    this.tagsType.prototype = new this.tagsPrototype();
    this.tagsType.prototype.constructor = this.tags;
    this.tags = new this.tagsType();

    this.tag = function () {
    };

    this.tagPrototype = function () {
        this.set = function (obj) {
            for (var key in obj) {
                this[key] = obj[key];
            }
        };

        this.getViewabilityData = function () {
        };
    };

    this.tag.prototype = new this.tagPrototype();
    this.tag.prototype.constructor = this.tag;

    
    this.eventBus = (function () {
        var getRandomActionName = function () {
            return 'EventBus_' + Math.random().toString(36) + Math.random().toString(36);
        };
        return {
            addEventListener: function (dvFrame, eventName, func, errFunc) {
                that.pubSub.subscribe(eventName, dvFrame.$frmId, getRandomActionName(), func, errFunc);
            },
            dispatchEvent: function (dvFrame, eventName, data) {
                that.pubSub.publish(eventName, dvFrame.$frmId, data);
            }
        };
    })();

    
    var messagesClass = function () {
        var waitingMessages = [];

        this.registerMsg = function (dvFrame, data) {
            if (!waitingMessages[dvFrame.$frmId]) {
                waitingMessages[dvFrame.$frmId] = [];
            }

            waitingMessages[dvFrame.$frmId].push(data);

            if (dvFrame.$uid) {
                sendWaitingEventsForFrame(dvFrame, dvFrame.$uid);
            }
        };

        this.startSendingEvents = function (dvFrame, impID) {
            sendWaitingEventsForFrame(dvFrame, impID);
            
        };

        function sendWaitingEventsForFrame(dvFrame, impID) {
            if (waitingMessages[dvFrame.$frmId]) {
                var eventObject = {};
                while (waitingMessages[dvFrame.$frmId].length) {
                    var obj = waitingMessages[dvFrame.$frmId].shift();
                    for (var key in obj) {
                        if (typeof obj[key] !== 'function' && obj.hasOwnProperty(key)) {
                            eventObject[key] = obj[key];
                        }
                    }
                }
                that.registerEventCall(impID, eventObject);
            }
        }

        function startMessageManager() {
            for (var frm in waitingMessages) {
                if (frm && frm.$uid) {
                    sendWaitingEventsForFrame(frm, frm.$uid);
                }
            }
            setTimeout(startMessageManager, 10);
        }
    };
    this.messages = new messagesClass();

    var MAX_EVENTS_THRESHOLD = 100;
    window.eventsCounter = window.eventsCounter || {};
    var getImpressionIdToCall = function (impressionId) {
        return window.eventsCounter[impressionId] < MAX_EVENTS_THRESHOLD ? impressionId : 'tme-' + impressionId;
    };

    this.registerEventCall = function (impressionId, eventObject, timeoutMs, isRegisterEnabled, usePrerenderedImage) {

        window.eventsCounter[impressionId] =
            window.eventsCounter[impressionId] ? window.eventsCounter[impressionId] + 1 : 1;


        var avoTimeout = 0;
        if (this.tags[impressionId] && this.tags[impressionId].AVO
            && this.tags[impressionId].AVO['cto'] && !isNaN(this.tags[impressionId].AVO['cto'])) {
            avoTimeout = window._dv_win.$dv.tags[impressionId].AVO['cto'];
        }

        if (isRegisterEnabled !== false && avoTimeout) {
            addEventCallForDispatch(impressionId, eventObject);

            if (!timeoutMs || isNaN(timeoutMs)) {
                timeoutMs = avoTimeout;
            }

            var localThat = this;
            setTimeout(
                function () {
                    localThat.dispatchEventCalls(impressionId);
                }, timeoutMs);

        } else {
            this.dispatchEventImmediate(impressionId, eventObject);
        }
    };

    this.dispatchEventImmediate = function (impressionId, eventObject, timeoutMs, isRegisterEnabled, usePrerenderedImage) {
        var url = this.tags[impressionId].protocol + '//' + this.tags[impressionId].ServerPublicDns + "/event.gif?impid=" +impressionId + '&' + createQueryStringParams(eventObject);

        this.domUtilities.addImage(url, this.tags[impressionId].tagElement.parentNode, false, usePrerenderedImage);
    };

    var mraidObjectCache;
    this.getMraid = function () {
        var context = window._dv_win || window;
        var iterationCounter = 0;
        var maxIterations = 20;

        function getMraidRec(context) {
            iterationCounter++;
            var isTopWindow = context.parent == context;
            if (context.mraid || isTopWindow) {
                return context.mraid;
            } else {
                return ( iterationCounter <= maxIterations ) && getMraidRec(context.parent);
            }
        }

        try {
            return mraidObjectCache = mraidObjectCache || getMraidRec(context);
        } catch (e) {
        }
    };

    var dispatchEventCallsNow = function (impressionId, eventObject) {
        addEventCallForDispatch(impressionId, eventObject);
        dispatchEventCalls(impressionId);
    };

    var addEventCallForDispatch = function (impressionId, eventObject) {
        for (var key in eventObject) {
            if (typeof eventObject[key] !== 'function' && eventObject.hasOwnProperty(key)) {
                if (!eventsForDispatch[impressionId]) {
                    eventsForDispatch[impressionId] = {};
                }
                eventsForDispatch[impressionId][key] = eventObject[key];
            }
        }
    };

    this.dispatchRegisteredEventsFromAllTags = function () {
        for (var impressionId in this.tags) {
            if (typeof this.tags[impressionId] !== 'function' && typeof this.tags[impressionId] !== 'undefined') {
                this.dispatchEventCalls(impressionId);
            }
        }

        
        this.registerEventCall = this.dispatchEventImmediate;
    };

    this.dispatchEventCalls = function (impressionId) {
        if (typeof eventsForDispatch[impressionId] !== 'undefined' && eventsForDispatch[impressionId] != null) {
            var url = this.tags[impressionId].protocol + '//' + this.tags[impressionId].ServerPublicDns +
                "/event.gif?impid=" + impressionId+ '&' + createQueryStringParams(eventsForDispatch[impressionId]);
            this.domUtilities.addImage(url, this.tags[impressionId].tagElement.parentElement);
            eventsForDispatch[impressionId] = null;
        }
    };

    if (window.addEventListener) {
        window.addEventListener('unload', function () {
            that.dispatchRegisteredEventsFromAllTags();
        }, false);
        window.addEventListener('beforeunload', function () {
            that.dispatchRegisteredEventsFromAllTags();
        }, false);
    }
    else if (window.attachEvent) {
        window.attachEvent('onunload', function () {
            that.dispatchRegisteredEventsFromAllTags();
        }, false);
        window.attachEvent('onbeforeunload', function () {
            that.dispatchRegisteredEventsFromAllTags();
        }, false);
    }
    else {
        window.document.body.onunload = function () {
            that.dispatchRegisteredEventsFromAllTags();
        };
        window.document.body.onbeforeunload = function () {
            that.dispatchRegisteredEventsFromAllTags();
        };
    }

    var createQueryStringParams = function (values) {
        var params = '';
        for (var key in values) {
            if (typeof values[key] !== 'function') {
                var value = encodeURIComponent(values[key]);
                if (params === '') {
                    params += key + '=' + value;
                }
                else {
                    params += '&' + key + '=' + value;
                }
            }
        }

        return params;
    };

    this.Enums = {
        BrowserId: {Others: 0, IE: 1, Firefox: 2, Chrome: 3, Opera: 4,
            Safari: 5, ChromeWebView: 6, SafariWebView: 7, PhantomJS: 99},
        TrafficScenario: {OnPage: 1, SameDomain: 2, CrossDomain: 128}
    };

    this.CommonData = {};

    var runSafely = function (action) {
        try {
            var ret = action();
            return ret !== undefined ? ret : true;
        } catch (e) {
            return false;
        }
    };

    var objectsToUpperCase = function () {
        var upperCaseObj = {};
        for (var i = 0; i < arguments.length; i++) {
            var obj = arguments[i];
            for (var key in obj) {
                if (obj.hasOwnProperty(key)) {
                    upperCaseObj[key.toUpperCase()] = obj[key];
                }
            }
        }
        return upperCaseObj;
    };

    var appendCacheBuster = function (url) {
        if (url !== undefined && url !== null && url.match("^http") == "http") {
            if (url.indexOf('?') !== -1) {
                if (url.slice(-1) == '&') {
                    url += 'cbust=' + dv_GetRnd();
                }
                else {
                    url += '&cbust=' + dv_GetRnd();
                }
            }
            else {
                url += '?cbust=' + dv_GetRnd();
            }
        }
        return url;
    };
}

var BrowserDetector = function () {
    var DetectionAreaEnum = {
        USER_AGENT_ONLY: 0,
        PROPERTIES_ONLY: 1,
        USER_AGENT_AND_PROPERTIES: 2
    };
    var BrowserTypeEnum = {
        Other: 0,
        IE: 1,
        Firefox: 2,
        Chrome: 3,
        Opera: 4,
        Safari: 5,
        ChromeWebView: 6,
        SafariWebView: 7,
        PhantomJS: 99
    };

    var Browser = function (browserID, detectionArea, browserDetectorRegexStr, browserVersionRegexStr, propertiesRuleFunc) {
        return {
            browserID: browserID,
            version: '',
            detectionArea: detectionArea,
            userAgentRules: {
                browserTypeRegexStr: browserDetectorRegexStr,
                browserVersionRegexStr: browserVersionRegexStr,
                passed: false
            },
            propertiesRules: {
                evaluatePropertiesRule: propertiesRuleFunc,
                passed: false
            }
        }
    };

    
    var BrowsersData = [

        
        Browser(
            BrowserTypeEnum.ChromeWebView,
            DetectionAreaEnum.USER_AGENT_ONLY,
            '(?:wv(.*?))version\/[0-9]+(?:.[0-9]+)* chrome\/[0-9]+(?:.[0-9]+)* mobile|version\/[0-9]+(?:.[0-9]+)* chrome\/[0-9]+(?:.[0-9]+)* mobile', 'chrome\/',
            null),
        Browser(
            BrowserTypeEnum.SafariWebView,
            DetectionAreaEnum.USER_AGENT_AND_PROPERTIES,
            '(?=.*(iphone|ipod|ipad))(?=^(?:(?!safari).)*$).*$', '',
            function () {
                return !window.navigator.standalone;
            }
        ),
        Browser(
            BrowserTypeEnum.IE,
            DetectionAreaEnum.PROPERTIES_ONLY,
            'msie|trident/7.*rv:11|rv:11.*trident/7|edge/', '(msie |rv:| edge/)',
            function () {
                return document.uniqueID != undefined &&
                    typeof document.uniqueID == 'string' &&
                    ((document.documentMode != undefined && document.documentMode >= 0) ||
                    (document.all != undefined && typeof document.all == 'object') ||
                    (window.ActiveXObject != undefined && typeof window.ActiveXObject == "function")) ||
                    (window.document && window.document.updateSettings && typeof window.document.updateSettings == "function");
            }),
        Browser(
            BrowserTypeEnum.Firefox,
            DetectionAreaEnum.PROPERTIES_ONLY,
            'firefox', 'firefox\/',
            function () {
                return window.mozInnerScreenY != undefined &&
                    typeof window.mozInnerScreenY == 'number' &&
                    window.mozPaintCount != undefined &&
                    window.mozPaintCount >= 0 &&
                    window.InstallTrigger != undefined &&
                    window.InstallTrigger.install != undefined;
            }),
        Browser(
            BrowserTypeEnum.Opera,
            DetectionAreaEnum.PROPERTIES_ONLY,
            'opr|opera', 'opr\/|version\/',
            function () {
                return (window.opera != undefined && window.history.navigationMode != undefined) ||
                    (window.opr != undefined && window.opr.addons != undefined
                    && typeof window.opr.addons.installExtension == 'function');
            }),
        Browser(
            BrowserTypeEnum.Chrome,
            DetectionAreaEnum.PROPERTIES_ONLY,
            'chrome', 'chrome\/',
            function () {
                return window.chrome != undefined &&
                    typeof window.chrome.csi == 'function' &&
                    typeof window.chrome.loadTimes == 'function' &&
                    document.webkitHidden != undefined &&
                    (document.webkitHidden == true || document.webkitHidden == false);
            }),
        Browser(
            BrowserTypeEnum.Safari,
            DetectionAreaEnum.PROPERTIES_ONLY,
            'safari|(os |os x )[0-9].*applewebkit', 'version\/',
            function () {
                var p = document.createElement('p');
                p.innerText = '.';
                p.style = 'text-shadow: rgb(99, 116, 171) 20px -12px 2px';

                return ((Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0) ||
                    (window.webkitAudioPannerNode && window.webkitConvertPointFromNodeToPage)) &&
                    window.innerWidth != undefined && window.innerHeight != undefined && p.style.textShadow != undefined;
            }),
        Browser(
            BrowserTypeEnum.PhantomJS,
            DetectionAreaEnum.PROPERTIES_ONLY,
            '',
            '',
            function () {
                return typeof window.callPhantom === 'function';
            }),
        Browser(
            BrowserTypeEnum.Other,
            DetectionAreaEnum.USER_AGENT_ONLY,
            'mozilla.*android.*applewebkit(?!.*chrome.*)|linux.*android.*applewebkit.* version/.*chrome',
            '',
            null),
        Browser(
            BrowserTypeEnum.Other,
            DetectionAreaEnum.USER_AGENT_ONLY,
            'aol/.*aolbuild/|aolbuild/.*aol/|puffin|maxthon|valve|silk|playstation|playstation|nintendo|wosbrowser',
            '',
            null)
    ];

    var getBrowserVersion = function (browserVersionRegexStr, useragent) {
        var browserVersionRegex;
        var browserVersion = '';

        if (browserVersionRegexStr.length > 0) {
            browserVersionRegex = new RegExp(browserVersionRegexStr + '[0-9]+(?:.[0-9]+)*');
            var match = useragent.match(browserVersionRegex);
            if (match != null && match[0] != null) {
                browserVersion = match[0].replace(useragent.match(new RegExp(browserVersionRegexStr))[0], '');
            }
        }

        return browserVersion;
    };
    
    var isBrowserType = function (browserTypeRegexStr, useragent) {

        var browserTypeRegExp;
        if (browserTypeRegexStr.length > 0) {
            browserTypeRegExp = new RegExp(browserTypeRegexStr);
            return browserTypeRegExp.test(useragent);
        }
    };

    var fillBrowserDetailsByUserAgent = function (ua) {
        var useragent_lowerCase = ua.toLowerCase();
        for (var i = 0; i < BrowsersData.length; i++) {

            if (isBrowserType(BrowsersData[i].userAgentRules.browserTypeRegexStr ,useragent_lowerCase)) {
                BrowsersData[i].userAgentRules.passed = true;
                BrowsersData[i].version = getBrowserVersion(BrowsersData[i].userAgentRules.browserVersionRegexStr, useragent_lowerCase);
            }
        }
    };

    var fillBrowserDetailsByProperties = function () {
        for (var i = 0; i < BrowsersData.length; i++) {
            if (BrowsersData[i].propertiesRules.evaluatePropertiesRule) {
                try {
                    BrowsersData[i].propertiesRules.passed = BrowsersData[i].propertiesRules.evaluatePropertiesRule();
                }
                catch (e) {}
            }
        }
    };

    this.getBrowsersData = function () {
      return BrowsersData;
    };

    this.getBrowserIdAndVersion = function (ua) {
        var browserIdByUserAgent;
        var browserIdByProperties;
        var browserVersion;

        fillBrowserDetailsByUserAgent(ua);
        fillBrowserDetailsByProperties();

        for (var i = 0; i < BrowsersData.length; i++) {

            if (BrowsersData[i].detectionArea == DetectionAreaEnum.USER_AGENT_AND_PROPERTIES) {
                if (BrowsersData[i].userAgentRules.passed == true &&
                    BrowsersData[i].propertiesRules.passed == true) {
                    browserIdByUserAgent = BrowsersData[i].browserID;
                    browserIdByProperties = BrowsersData[i].browserID;
                }
            }
            else if (BrowsersData[i].detectionArea == DetectionAreaEnum.USER_AGENT_ONLY) {
                if (BrowsersData[i].userAgentRules.passed == true) {
                    
                    browserIdByUserAgent = BrowsersData[i].browserID;
                    browserIdByProperties = BrowsersData[i].browserID;
                }
            }
            else {
                if (browserIdByUserAgent == undefined && BrowsersData[i].userAgentRules.passed == true) {
                    browserIdByUserAgent = BrowsersData[i].browserID;
                }
                if (browserIdByProperties == undefined && BrowsersData[i].propertiesRules.passed == true) {
                    browserIdByProperties = BrowsersData[i].browserID;
                }
            }

            if (browserIdByProperties != undefined && browserIdByUserAgent != undefined) {
                break;
            }
        }

        browserVersion = browserIdByProperties === browserIdByUserAgent ? BrowsersData[i].version : '';
        return {
            ID: browserIdByProperties,
            version: browserVersion,
            ID_UA: browserIdByUserAgent
        };
    };
};

function dv_handler145(){function Z(b){var c=window._dv_win,e=0;try{for(;10>e;){if(c[b]&&"object"===typeof c[b])return!0;if(c==c.parent)break;e++;c=c.parent}}catch(d){}return!1}function aa(){var b="http:";"http:"!=window._dv_win.location.protocol&&(b="https:");return b}function ba(b){var c="http:";"https"!=b.match("^https")||"http"==window._dv_win.location.toString().match("^http")&&"https"!=window._dv_win.location.toString().match("^https")||(c="https:");return c}function ca(){var b="";try{var c=
eval(function(b,c,g,k,p,n){p=function(b){return(b<c?"":p(parseInt(b/c)))+(35<(b%=c)?String.fromCharCode(b+29):b.toString(36))};if(!"".replace(/^/,String)){for(;g--;)n[p(g)]=k[g]||p(g);k=[function(b){return n[b]}];p=function(){return"\\w+"};g=1}for(;g--;)k[g]&&(b=b.replace(new RegExp("\\b"+p(g)+"\\b","g"),k[g]));return b}("(13(){1C{1C{2m('1a?1x:1Y')}1v(e){y{m:\"-99\"}}13 3r(21,2J,1V){10(d 1S 3T 21){G(1S.3u(2J)>-1&&(!1V||1V(21[1S])))y 1x}y 1Y}13 g(s){d h=\"\",t=\"6s.;j&6w}6u/0:6l'6d=B(6c-5E!,5c)5r\\\\{ >4Y+4W\\\"5w<\";10(i=0;i<s.1c;i++)f=s.3l(i),e=t.3u(f),0<=e&&(f=t.3l((e+41)%82)),h+=f;y h}13 1X(34,1m){1C{G(34())m.1B((1a==1a.2z?-1:1)*1m)}1v(e){m.1B(-5z*1m);V.1B(1m+\"=\"+(e.5A||\"5s\"))}}d c=['5q\"1u-5f\"5o\"2O','p','l','60&p','p','{','\\\\<}4\\\\5n-5S<\"5m\\\\<}4\\\\5p<Z?\"6','e','5l','-5,!u<}\"5k}\"','p','J','-5g}\"<5h','p','=o','\\\\<}4\\\\35\"2f\"w\\\\<}4\\\\35\"2f\"5i}2\"<,u\"<5}?\"6','e','J=',':<5j}T}<\"','p','h','\\\\<}4\\\\8-2}\"E(n\"18}9?\\\\<}4\\\\8-2}\"E(n\"2p<N\"[1p*1t\\\\\\\\2V-5B<25\"24\"5C]1i}C\"12','e','5D','\\\\<}4\\\\5y;5u||\\\\<}4\\\\5t?\"6','e','+o','\"1l\\\\<}4\\\\3w\"I<-5v\"2h\"5\"5x}2k<}5e\"1l\\\\<}4\\\\1D}1Q>1I-1N}2}\"2h\"5\"5d}2k<}4V','e','=J','17}U\"<5}4X\"7}F\\\\<}4\\\\[4Z}4U:4T]k}b\\\\<}4\\\\[t:33\"4P]k}b\\\\<}4\\\\[4O})5-u<}t]k}b\\\\<}4\\\\[4Q]k}b\\\\<}4\\\\[4R}4S]k}50','e','51',':59}<\"K-1J/2M','p','5a','\\\\<}4\\\\1d<U/1s}b\\\\<}4\\\\1d<U/!k}9','e','=l','14\\\\<}4\\\\5b}/58}U\"<5}57\"7}53<2n}52\\\\54\"55}/k}2o','e','=S=','\\\\<}4\\\\E-56\\\\<}4\\\\E-5F\"5\\\\U?\"6','e','+J','\\\\<}4\\\\22!6g\\\\<}4\\\\22!6h)p?\"6','e','6i','-}\"6j','p','x{','\\\\<}4\\\\E<23-6f}6e\\\\<}4\\\\6a\"69-6b\\\\<}4\\\\6k.42-2}\"6t\\\\<}4\\\\6v<N\"K}6r?\"6','e','+S','17}U\"<5}Q\"1g\"7}F\\\\<}4\\\\v<1E\"1l\\\\<}4\\\\v<2t}U\"<5}1j\\\\<}4\\\\1o-2.42-2}\"w\\\\<}4\\\\1o-2.42-2}\"1q\"L\"\"M<38\"39\"3a<\"<5}2X\"3h\\\\<Z\"3z<X\"3y{3B:3s\\\\36<1r}3v-3x<}3g\"2Y\"1w%3f<X\"1w%3e?\"3d\"16\"7}2W','e','6n','6m:,','p','6o','\\\\<}4\\\\6p\\\\<}4\\\\2I\"2H\\\\<}4\\\\2I\"2G,T}2R+++++1j\\\\<}4\\\\6q\\\\<}4\\\\2q\"2H\\\\<}4\\\\2q\"2G,T}2R+++++t','e','68','\\\\<}4\\\\67\"1J\"5P}b\\\\<}4\\\\E\\\\5O<M?\"6','e','5Q','17}U\"<5}Q:5R\\\\<}4\\\\8-2}\"1q\".42-2}\"4N-5N<N\"5L<5H<5G}C\"3H<5I<5J[<]E\"27\"1u}\"2}\"5K[<]E\"27\"1u}\"2}\"E<}1h&5T\"1\\\\<}4\\\\2u\\\\5U\\\\<}4\\\\2u\\\\1D}1Q>1I-1N}2}\"z<63-2}\"64\"2.42-2}\"65=66\"7}62\"7}P=61','e','x','5W)','p','+','\\\\<}4\\\\2B:5V<5}5X\\\\<}4\\\\2B\"5Y?\"6','e','5Z','L!!6x.3Q.K 3R','p','x=','\\\\<}4\\\\3O}3N)u\"3K\\\\<}4\\\\3Z-2?\"6','e','+=','\\\\<}4\\\\2r\"40\\\\<}4\\\\2r\"3Y--3X<\"2f?\"6','e','x+','\\\\<}4\\\\8-2}\"2v}\"2w<N\"w\\\\<}4\\\\8-2}\"2v}\"2w<N\"3U\")3V\"<:3W\"44}9?\"6','e','+x','\\\\<}4\\\\2F)u\"3C\\\\<}4\\\\2F)u\"3I?\"6','e','3G','\\\\<}4\\\\2P}s<3F\\\\<}4\\\\2P}s<3D\" 4M-4z?\"6','e','4B','\\\\<}4\\\\E\"4y-2}\"E(n\"4x<N\"[1p*45\"4t<4u]4v?\"6','e','+e','\\\\<}4\\\\8-2}\"E(n\"18}9?\\\\<}4\\\\8-2}\"E(n\"4w<:[\\\\4C}}2M][\\\\4D,5}2]4J}C\"12','e','4K','14\\\\<}4\\\\4L}4H\\\\<}4\\\\4F$4G','e','4s',':4r<Z','p','4c','\\\\<}4\\\\E-4d\\\\<}4\\\\E-4e}4b\\\\<}4\\\\E-47<48?\"6','e','49','$K:4g}Z!4h','p','+h','\\\\<}4\\\\E\"1K\\\\<}4\\\\E\"1O-4o?\"6','e','4p','14\\\\<}4\\\\4q:,2j}U\"<5}1A\"7}4n<4m<2n}2o','e','4j','\\\\<}4\\\\1d<U/4k&2i\"E/30\\\\<}4\\\\1d<U/4l}C\"3b\\\\<}4\\\\1d<U/f[&2i\"E/30\\\\<}4\\\\1d<U/4i[S]]3w\"46}9?\"6','e','4a','4E}4I}4A>2s','p','3E','\\\\<}4\\\\1e:<1G}s<3J}b\\\\<}4\\\\1e:<1G}s<43<}f\"u}2g\\\\<}4\\\\2e\\\\<}4\\\\1e:<1G}s<C[S]E:33\"1s}9','e','l{','3S\\'<}4\\\\T}3M','p','==','\\\\<}4\\\\v<1E\\\\<}4\\\\v<2C\\\\<Z\"2y\\\\<}4\\\\v<2x<X\"?\"6','e','3L','\\\\<}4\\\\3k}3j-3p\"}2b<3P\\\\<}4\\\\3k}3j-3p\"}2b/2Q?\"6','e','=8q','\\\\<}4\\\\E\"2f\"8r\\\\<}4\\\\8s<8p?\"6','e','o{','\\\\<}4\\\\8o-)2\"2U\"w\\\\<}4\\\\1e-8k\\\\1u}s<C?\"6','e','+l','\\\\<}4\\\\31-2\"8l\\\\<}4\\\\31-2\"8m<Z?\"6','e','+{','\\\\<}4\\\\E:8n}b\\\\<}4\\\\8t-8u}b\\\\<}4\\\\E:8B\"<8C\\\\}k}9?\"6','e','{S','\\\\<}4\\\\1f}\"11}8D\"-8A\"2f\"q\\\\<}4\\\\r\"<5}8z?\"6','e','o+',' &K)&8v','p','8w','\\\\<}4\\\\E.:2}\"c\"<8x}b\\\\<}4\\\\8y}b\\\\<}4\\\\8j<}f\"u}2g\\\\<}4\\\\2e\\\\<}4\\\\1D:}\"k}9','e','8i','83\"5-\\'2d:2M','p','J{','\\\\<}4\\\\85\"5-\\'2d:86}81=80:D|q=2l|7W-5|7X--1J/2\"|2N-2l|7Z\"=87\"2f\"q\\\\<}4\\\\1R\"2c:2a<1r}D?\"6','e','=88','\\\\<}4\\\\8-2}\"E(n\"18}9?\\\\<}4\\\\8-2}\"E(n\"2p<N\"[1p*1t\\\\\\\\2V-25\"24/8f<8g]1i}C\"12','e','8h',')8e!8d}s<C','p','8F','\\\\<}4\\\\26<<8a\\\\<}4\\\\26<<8b<}f\"u}8c?\"6','e','{l','\\\\<}4\\\\28.L>g;K\\'T)Y.8E\\\\<}4\\\\28.L>g;6y&&92>K\\'T)Y.I?\"6','e','l=','14\\\\<}4\\\\8X\\\\95>8Z}U\"<5}1A\"7}F\"2T}U\"<5}94\\\\<}4\\\\9a<23-20\"u\"97}U\"<5}1A\"7}F\"2T}U\"<5}96','e','{J','K:<Z<:5','p','8W','\\\\<}4\\\\k\\\\<}4\\\\E\"8V\\\\<}4\\\\r\"<5}3A\"3c}/1j\\\\<}4\\\\8-2}\"37<}1h&8L\\\\<}4\\\\r\"<5}1k\"}u-8K=?17}U\"<5}Q\"8J:8H\\\\<}4\\\\1f}\"r\"<5}8N\"7}8O\"16\"7}F\"8U','e','8S','\\\\<}4\\\\1L-U\\\\w\\\\<}4\\\\1L-8R\\\\<}4\\\\1L-\\\\<}?\"6','e','8P','8Q-N:8T','p','8G','\\\\<}4\\\\1M\"8M\\\\<}4\\\\1M\"98\"<5}8Y\\\\<}4\\\\1M\"90||\\\\<}4\\\\91?\"6','e','h+','89<u-7U/','p','{=','\\\\<}4\\\\r\"<5}1k\"}u-70\\\\<}4\\\\1D}1Q>1I-1N}2}\"q\\\\<}4\\\\r\"<5}1k\"}u-2D','e','=S','\\\\<}4\\\\71\"1l\\\\<}4\\\\72}U\"<5}1j\\\\<}4\\\\6Z?\"6','e','{o','\\\\<}4\\\\7V}<6Y\\\\<}4\\\\6U}?\"6','e','=6W','\\\\<}4\\\\v<1E\\\\<}4\\\\v<2C\\\\<Z\"2y\\\\<}4\\\\v<2x<X\"w\"1l\\\\<}4\\\\v<2t}U\"<5}t?\"6','e','J+','c>A','p','=','17}U\"<5}Q\"1g\"7}F\\\\<}4\\\\E\"73\"74:7a}7b^[7c,][79+]78\\'<}4\\\\75\"2f\"q\\\\<}4\\\\E}u-77\"16\"7}6T=6S','e','6F','\\\\<}4\\\\1P:!32\\\\<}4\\\\8-2}\"E(n\"18}9?\\\\<}4\\\\8-2}\"E(n\"1H<:[f\"2O*6G<X\"6H]6E<:[<Z*1t:Z,1F]1i}C\"12','e','=6D','\\\\<}4\\\\2S\"<2L-2K-u}6z\\\\<}4\\\\2S\"<2L-2K-u}6A?\"6','e','{x','6B}7K','p','6C','\\\\<}4\\\\8-2}\"E(n\"18}9?\\\\<}4\\\\8-2}\"E(n\"1H<:[<Z*1t:Z,1F]F:<6J[<Z*6P]1i}C\"12','e','h=','6Q-2}\"r\"<5}k}9','e','6R','\\\\<}4\\\\8-2}\"E(n\"18}9?\\\\<}4\\\\8-2}\"E(n\"1H<:[<Z*6O}1F]R<-C[1p*6K]1i}C\"12','e','6L','14\\\\<}4\\\\29\"\\\\6M\\\\<}4\\\\29\"\\\\7d','e','7e','\\\\<}4\\\\1R\"w\\\\<}4\\\\1R\"2c:2a<1r}?\"6','e','{e','\\\\<}4\\\\7G}Z<}7H}b\\\\<}4\\\\7I<f\"k}b\\\\<}4\\\\7F/<}C!!7E<\"42.42-2}\"1s}b\\\\<}4\\\\7A\"<5}k}9?\"6','e','7B','T>;7C\"<4f','p','h{','\\\\<}4\\\\7J<u-7L\\\\7R}b\\\\<}4\\\\1e<}7S}9?\"6','e','7T','\\\\<}4\\\\E\"1K\\\\<}4\\\\E\"1O-3o}U\"<5}Q\"1g\"7}F\\\\<}4\\\\1f}\"r\"<5}1k\"E<}1h&3n}3m=w\\\\<}4\\\\1f}\"8-2}\"1q\".42-2}\"7Q}\"u<}7P}7M\"16\"7}F\"3t?\"6','e','{h','\\\\<}4\\\\7N\\\\<}4\\\\7O}<(7z?\"6','e','7y','\\\\<}4\\\\7l<U-2Z<7m&p?14\\\\<}4\\\\7n<U-2Z<7k/2j}U\"<5}1A\"7}F\"7j','e','=7f','7g\\'<7h\"','p','{{','\\\\<}4\\\\E\"1K\\\\<}4\\\\E\"1O-3o}U\"<5}Q\"1g\"7}F\\\\<}4\\\\1f}\"r\"<5}1k\"E<}1h&3n}3m=7i\"16\"7}F\"3t?\"6','e','7o','17}U\"<5}Q\"1g\"7}F\\\\<}4\\\\1P:!32\\\\<}4\\\\1o-2.42-2}\"w\\\\<}4\\\\1o-2.42-2}\"1q\"L\"\"M<38\"39\"3a<\"<5}2X\"3h\\\\<Z\"3z<X\"3y{3B:3s\\\\36<1r}3v-3x<}3g\"2Y\"1w%3f<X\"1w%3e?\"3d\"16\"7}2W','e','{+','\\\\<}4\\\\7t<7q a}7s}b\\\\<}4\\\\E}7r\"7u 7x- 1s}9','e','7w','7v\\\\<}4\\\\r\"<5}1P}7p\"5M&M<C<}7D}C\"3b\\\\<}4\\\\r\"<5}3A\"3c}/1j\\\\<}4\\\\8-2}\"6N\\\\<}4\\\\8-2}\"37<}1h&6I[S]76=?\"6','e','l+'];d 1y='(13(){d m=[],V=[];'+3r.3q()+1X.3q()+'';10(d j=0;j<c.1c;j+=3){1y+='1X(13(){y '+(c[j+1]=='p'?'1a[\"'+g(c[j])+'\"]!=6X':g(c[j]))+'}, '+6V(g(c[j+2]))+');'}1y+='y {m:m,V:V}})();';d H=[];d 1W=[];d 1b=1a;10(d i=0;i<93;i++){d O=1b.2m(1y);G(O.V.1c>15){y{m:O.V[0]}}10(d 19=0;19<O.m.1c;19++){d 1z=1Y;10(d W=0;W<H.1c;W++){G(H[W]==O.m[19]){1z=1x;1n}2A G(1Z.1T(H[W])==1Z.1T(O.m[19])){H[W]=1Z.1T(H[W]);1z=1x;1n}}G(!1z)H.1B(O.m[19])}G(1b==1a.2z){1n}2A{1C{G(1b.2E.7Y.84)1b=1b.2E}1v(e){1n}}}d 1U={m:H.3i(\",\")};G(1W.1c>0)1U.V=1W.3i(\"&\");y 1U}1v(e){y{m:\"-8I\"}}})()",
62,569,"    Z5  Ma2vsu4f2 aM EZ5Ua a44  a44OO  var       P1  res a2MQ0242U    E45Uu    E3 OO  return        if results   _    currentResults  qD8     err ri C3   for  3RSvsu4f2 function U5q  U3q2D8M2 qsa 5ML44P1 cri window currWindow length EBM E_ ENuM2 MQ8M2 Z27 WDE42 tOO E35f QN25sF ci break EsMu fMU EC2 ZZ2 fP1  g5 catch vFoS true fc exists q5D8M2 push try E2 M5OO _t ZU5 5ML44qWZ Tg5 uM UIuCTZOO Euf EuZ N5 UT Eu U5Z2c EfaNN_uZf_35f prop abs response func errors ei false Math  wnd E_Y sMu MuU kN7 E__  EcIT_0 zt__ 2MM 2M_ _5 ALZ02M ELMMuQOO  U25sF ENM5 BV2U tzsa Z2s uZf eval ZP1 a44nD 5ML44qWfUM EuZ_lEf EU  M511tsa z5 E_UaMM2 0UM M5E32 3OO top else E27 M5E  parent EufB Q42E Q42OO EuZ_hEf str fC_ _7Z   Q42 ELZg5  Z2711t Ea QN25sF511tsa  BuZfEU5 Fsu4f2HnnDqD vFuBf54a vFmheSN7HF42s  2Qfq E__N 4uQ2MOO uf fu Ef35M vF3 EM2s2MM2ME Ba 2qtf Q42tD11tN5f 3RSOO vB4u Ma2vsu4f2nUu Ht HFM m42s 2HFB5MZ2MvFSN7HF join 5Mu ENu charAt uNfQftD11m sqtfQ NTZOOqsa _NuM toString co 2Ms45 Ma2HnnDqD indexOf HF Ef2 uMC vFl 3vFJlSN7HF32 E3M2sP1tuB5a SN7HF5 u_Z2U5Z2OO CEC2 hx COO oo  ujuM CP1 uOO Jh s5 Z42 EA5Cba ZOO A_pLr cAA_cg UufUuZ2 in EZ5p5 2s2MI5pu 2r2 MU0 7__E2U EuZZTsMu 7__OO   CF 35ZP1 1tk27 aNP1 2MUaMQE NLZZM2ff Je ox sOO hJ 2MUaMQOO 2MUaMQEU5  V0 7A5C fD lJ fOO fDE42 f32M_faB F5ENaB4 NTZ oJ zt_M u_faB Jl kC5 UEVft WD 5ML44qtZ 5MqWfUM uCUuZ2OOZ5Ua 2cM4 fY45 JJ UmBu Um M2 zt_ _tD f_tDOOU5q 5IMu tDE42 eS zt__uZ_M Mu fbQIuCpu tUZ r5Z2t tUBt tB LMMt 24t ZA2 2Zt lkSvfxWX qD8M2 NhCZ tf5a a44nDqD ee a44OO5BVEu445 F5BVEa IuMC2 b4u UCMOO q5BVD8M2 Mtzsa u_a ho zt_4 LnG QN2P1ta 2ZtOO Na fgM2Z2 u4f r5 ZBu g5a xh QOO ENaBf_uZ_uZ 2Z0 ENaBf_uZ_faB C2  unknown E7GXLss0aBTZIuC 24N2MTZ 25a 1bqyJIma QN211ta E7LZfKrA 1000 message kUM EVft eo uic2EHVO UCME i2E42 1SH 99D sq2 OO2 tDHs5Mq  2qtfUM 2BfM2Z aM4P1 xo uMF21 5Zu4 sqt E2fUuN2z21 2Mf Ld0 _V5V5OO IQN2 xJ  HnDqD PSHM2 1Z5Ua EUM2u tDRm DM2 Ef xl 2TsMu EaNZu 2OO Q6T Kt U2OO 2_M2s2M2 AOO AEBuf2g lS M__ EuZZ s7 _M xx he EuZ_hOO EuZ_lOO 5Z2f Ue I5b5ZQOO YDoMw8FRp3gd94 EfUM PzA _ALb _I uC2MOO uC2MEUB B24 xS So FZ xe 1t32 vFSN7t squ Z25 1tNk4CEN3Nt oe B__tDOOU5q EM2s2MM2MOO 1tB2uU5 1tfMmN4uQ2Mt Z5Ua eh HnnDqD FP EuZfBQuZf parseInt Sh null N2MOO E5U4U5qDEN4uQ 2P1 E5U4U5OO E5U4U511tsa 5NENM5U2ff_ uC_ kE D11m 2DnUu 8lzn Sm uMfP1 a44OOk um B_UB_tD lh Sl LZZ035NN2Mf ZC2 HnUu Ma2nDvsu4f2 ubuf2b45U EIMuss u60 ztIMuss Jx U2f 4Zf _f UP1 EUuU 5M2f u1 lx M5 ol a2TZ Eu445Uu lo _c fzuOOuE42 gI ENuM E4u CcM4P1 Ef2A ENM  bM5 a44HnUu E_NUCOO E_NUCEYp_c 2MtD11 bQTZqtMffmU5 f2MP1 N4uU2_faUU2ffP1 Jo _uZB45U ELZ0 UUUN 2N5 location uZf35f zlnuZf2M wZ8  gaf href Egaf 2MOOkq DkE SS _NM ZfOO ZfF U25sFLMMuQ 4Qg5 2u4 kZ fN4uQLZfEVft eJ ll ErF fN uCOO uCEa u_uZ_M2saf2_M2sM2f3P1 E_Vu u4buf2Jl Se fNNOO E0N2U ENuMu fC532M2P1 rLTp hl 4P1 ErP1 E3M2sD 4kE u_ 2M_f35 a44OOkuZwkwZ8ezhn7wZ8ezhnwE3 IOO oh le uMFN1 999 MQ8 2DRm sq CfOO E3M2sHM2 Fsu4f2nUu JS ___U M2sOO oS _ZBf Ma2nnDqDvsu4f2 5NOO hh ztBM5 OOq A_tzsa CfE35aMfUuN E35aMfUuND AbL 100 tnDOOU5q f2Mc tnD af_tzsa CfEf2U  zt".split(" "),
0,{}));c.hasOwnProperty("err")&&(b=c.err);return{vdcv:26,vdcd:c.res,err:b}}catch(e){return{vdcv:26,vdcd:"0",err:b}}}function da(b){for(var c="auctionid vermemid source buymemid anadvid ioid cpgid cpid sellerid pubid advcode iocode cpgcode cpcode pubcode prcpaid auip auua".split(" "),e=[],d=0;d<c.length;d++){var g=dv_GetParam(b,c[d]);null!=g&&(e.push("dvp_"+c[d]+"="+g),e.push(c[d]+"="+g))}return e.join("&")}function ea(b,c){c=dv_GetParam(c,"sup")||"";try{var e=!1,d=!1;try{var g=window.document.getElementById("aolVideoContainer")||
window.MmJsBridge&&window.MmJsBridge.vpaid;e=null!=window.mmSdkVersion;d=null!=g}catch(k){}e||d?c="mm":(g=!1,null!=b&&"function"===typeof b.getVendor&&"function"===typeof b.getVendorVersion&&"AdMarvel"==b.getVendor()&&(g=!0),g&&(c="opm"))}catch(k){}return c}function fa(){var b="";try{var c=window._dv_win;b+="&chro="+(void 0===c.chrome?"0":"1");b+="&hist="+(c.history?c.history.length:"");b+="&winh="+c.innerHeight;b+="&winw="+c.innerWidth;b+="&wouh="+c.outerHeight;b+="&wouw="+c.outerWidth;c.screen&&
(b+="&scah="+c.screen.availHeight,b+="&scaw="+c.screen.availWidth)}catch(e){}return b||""}function Q(b,c,e){e=e||150;var d=window._dv_win||window;if(d.document&&d.document.body)return c&&c.parentNode?c.parentNode.insertBefore(b,c):d.document.body.insertBefore(b,d.document.body.firstChild),!0;if(0<e)setTimeout(function(){Q(b,c,--e)},20);else return!1}function R(b){var c=null;try{if(c=b&&b.contentDocument)return c}catch(e){}try{if(c=b.contentWindow&&b.contentWindow.document)return c}catch(e){}try{if(c=
window._dv_win.frames&&window._dv_win.frames[b.name]&&window._dv_win.frames[b.name].document)return c}catch(e){}return null}function V(b){var c=document.createElement("iframe");c.name=c.id=window._dv_win.dv_config.emptyIframeID||"iframe_"+Math.floor(1E12*(Math.random()+""));c.width=0;c.height=0;c.style.display="none";c.src=b;return c}function ha(b,c,e,d,g,k,p){var n=window._dv_win.dv_config=window._dv_win.dv_config||{};n.tpsErrAddress=n.tpsAddress||"tps30.doubleverify.com";n.cdnAddress=n.cdnAddress||
"cdn.doubleverify.com";var h={};h[b]=c;h.dvp_jsErrUrl=e;h.dvp_jsErrMsg=encodeURIComponent("Error loading visit.js");b=dv_CreateAndGetErrorImp(n.tpsErrAddress+"/visit.jpg?ctx=818052&cmp=1619415&dvtagver=6.1.src&dvp_isLostImp=1",h);d=d||"function() {}";n=c="";h=function(b){result="";for(i=0;i<b.length;i+=2)result+=b[i];return result}("c377ba824");p&&(h=dv_GetParam(k,"dvp_evl")?p.eval?p.eval:p.main:dv_GetParam(e,"ctx")==parseInt(h,16)?0:p.eval&&p.rate&&100*Math.random()<p.rate?p.eval:p.main)&&(c='<script type="text/javascript" id="TPSCall" src="'+
g+"/"+p.src+h+'.js">\x3c/script>',n=dv_GetParam(k,"dvp_evl")?"":"&dvp_evl=1");return'<html><head><script type="text/javascript">('+function(b){try{window.dvSrc=b,window.$dv=window.$dv||parent.$dv,window.$dv.dvObjType="dv",window.$frmId=Math.random().toString(36)+Math.random().toString(36)}catch(u){}}.toString()+')("'+k+'");\x3c/script></head><body>'+c+'<script type="text/javascript">('+d+')("'+g+'");\x3c/script><script type="text/javascript" id="TPSCall" src="'+e+n+'">\x3c/script><script type="text/javascript">('+
function(b){var c=document.getElementById("TPSCall");try{c.onerror=function(){try{(new Image).src=b}catch(r){}}}catch(r){}c&&c.readyState?(c.onreadystatechange=function(){"complete"==c.readyState&&document.close()},"complete"==c.readyState&&document.close()):document.close()}.toString()+')("'+b+'");\x3c/script></body></html>'}function W(b){var c={};try{for(var e=/[\?&]([^&]*)=([^&#]*)/gi,d=e.exec(b);null!=d;)"eparams"!==d[1]&&(c[d[1]]=d[2]),d=e.exec(b);return c}catch(g){return c}}function ia(b){for(var c=
0;10>c&&b!=window._dv_win.top;)c++,b=b.parent;return c}function ja(b){try{if(1>=b.depth)return{url:"",depth:""};var c=[];c.push({win:window._dv_win.top,depth:0});for(var e,d=1,g=0;0<d&&100>g;){try{if(g++,e=c.shift(),d--,0<e.win.location.toString().length&&e.win!=b)return 0==e.win.document.referrer.length||0==e.depth?{url:e.win.location,depth:e.depth}:{url:e.win.document.referrer,depth:e.depth-1}}catch(n){}var k=e.win.frames.length;for(var p=0;p<k;p++)c.push({win:e.win.frames[p],depth:e.depth+1}),
d++}return{url:"",depth:""}}catch(n){return{url:"",depth:""}}}function ka(){var b=window._dv_win[S("=@42E:@?")][S("2?46DE@C~C:8:?D")];if(b&&0<b.length){var c=[];c[0]=window._dv_win.location.protocol+"//"+window._dv_win.location.hostname;for(var e=0;e<b.length;e++)c[e+1]=b[e];return c.reverse().join(",")}return null}function S(b){var c=String(),e;for(e=0;e<b.length;e++){var d=b.charAt(e);var g="!\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~".indexOf(d);
0<=g&&(d="!\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~".charAt((g+47)%94));c+=d}return c}function la(){try{var b=0,c=function(c,e){e&&32>c&&(b=(b|1<<c)>>>0)},e=function(b,c){return function(){return b.apply(c,arguments)}},d="svg"===document.documentElement.nodeName.toLowerCase(),g=function(){return"function"!==typeof document.createElement?document.createElement(arguments[0]):d?document.createElementNS.call(document,"http://www.w3.org/2000/svg",
arguments[0]):document.createElement.apply(document,arguments)},k=["Moz","O","ms","Webkit"],p=["moz","o","ms","webkit"],n={style:g("modernizr").style},h=function(b,c,e,d){function k(){p&&(delete n.style,delete n.modElem)}d="undefined"===typeof d?!1:d;if("undefined"!==typeof e){var h=nativeTestProps(b,e);if("undefined"!==typeof h)return h}for(h=["modernizr","tspan","samp"];!n.style&&h.length;){var p=!0;n.modElem=g(h.shift());n.style=n.modElem.style}var l=b.length;for(h=0;h<l;h++){var f=b[h];var u=
n.style[f];~(""+f).indexOf("-")&&(f=cssToDOM(f));if(void 0!==n.style[f]){if(d||"undefined"===typeof e)return k(),"pfx"==c?f:!0;try{n.style[f]=e}catch(A){}if(n.style[f]!=u)return k(),"pfx"==c?f:!0}}k();return!1},l=function(b,c,d,g,l){var n=b.charAt(0).toUpperCase()+b.slice(1),m=(b+" "+k.join(n+" ")+n).split(" ");if("string"===typeof c||"undefined"===typeof c)return h(m,c,g,l);m=(b+" "+p.join(n+" ")+n).split(" ");for(var u in m)if(m[u]in c){if(!1===d)return m[u];b=c[m[u]];return"function"===typeof b?
e(b,d||c):b}return!1};c(0,!0);c(1,!!function(b,c,e){if(0===b.indexOf("@"))return atRule(b);-1!=b.indexOf("-")&&(b=cssToDOM(b));return c?l(b,c,e):l(b,"pfx")}("requestFileSystem",window));c(2,window.CSS?"function"==typeof window.CSS.escape:!1);c(3,l("shapeOutside","content-box",!0));return b}catch(u){return 0}}function ma(){try{var b=window,c=0;try{for(;b.parent&&b!=b.parent&&b.parent.document&&!(b=b.parent,10<c++););}catch(g){}var e=0;c=function(b,c){c&&(e=(e|1<<b)>>>0)};var d=b.document;c(14,b.playerInstance&&
d.querySelector('script[src*="ads-player.com"]'));c(14,(b.CustomWLAdServer||b.DbcbdConfig)&&(a=d.querySelector('p[class="footerCopyright"]'),a&&a.textContent.match(/ MangaLife 2016/)));c(15,b.zpz&&b.zpz.createPlayer);c(15,b.vdApp&&b.vdApp.createPlayer);c(15,d.querySelector('body>div[class="z-z-z"]'));c(16,b.xy_checksum&&b.place_player&&(b.logjwonready&&b.logContentPauseRequested||b.jwplayer));c(17,b==b.top&&""==d.title?(a=d.querySelector('body>object[id="player"]'),a&&a.data&&1<a.data.indexOf("jwplayer")&&
"visibility: visible;"==a.getAttribute("style")):!1);c(17,d.querySelector('script[src*="sitewebvideo.com"]'));c(17,b.InitPage&&b.cef&&b.InitAd);c(17,b==b.top&&""==d.title?(a=d.querySelector("body>#player"),null!=a&&null!=(null!=a.querySelector('div[id*="opti-ad"]')||a.querySelector('iframe[src="about:blank"]'))):!1);c(17,b==b.top&&""==d.title&&b.InitAdPlayer?(a=d.querySelector('body>div[id="kt_player"]'),null!=a&&null!=a.querySelector('div[class="flash-blocker"]')):!1);c(17,null!=b.clickplayer&&null!=
b.checkRdy2);return e}catch(g){return 0}}function na(){function b(b){if(null==b||""==b)return"";var c=function(b,c){return b<<c|b>>>32-c},e=function(b){for(var c="",e,d=7;0<=d;d--)e=b>>>4*d&15,c+=e.toString(16);return c},d=[1518500249,1859775393,2400959708,3395469782];b+=String.fromCharCode(128);for(var g=Math.ceil((b.length/4+2)/16),k=Array(g),r=0;r<g;r++){k[r]=Array(16);for(var v=0;16>v;v++)k[r][v]=b.charCodeAt(64*r+4*v)<<24|b.charCodeAt(64*r+4*v+1)<<16|b.charCodeAt(64*r+4*v+2)<<8|b.charCodeAt(64*
r+4*v+3)}k[g-1][14]=8*(b.length-1)/Math.pow(2,32);k[g-1][14]=Math.floor(k[g-1][14]);k[g-1][15]=8*(b.length-1)&4294967295;b=1732584193;v=4023233417;var m=2562383102,K=271733878,I=3285377520,D=Array(80);for(r=0;r<g;r++){for(var t=0;16>t;t++)D[t]=k[r][t];for(t=16;80>t;t++)D[t]=c(D[t-3]^D[t-8]^D[t-14]^D[t-16],1);var f=b;var z=v;var A=m;var y=K;var F=I;for(t=0;80>t;t++){var B=Math.floor(t/20),L=c(f,5);a:{switch(B){case 0:var M=z&A^~z&y;break a;case 1:M=z^A^y;break a;case 2:M=z&A^z&y^A&y;break a;case 3:M=
z^A^y;break a}M=void 0}B=L+M+F+d[B]+D[t]&4294967295;F=y;y=A;A=c(z,30);z=f;f=B}b=b+f&4294967295;v=v+z&4294967295;m=m+A&4294967295;K=K+y&4294967295;I=I+F&4294967295}return e(b)+e(v)+e(m)+e(K)+e(I)}function c(){try{return!!window.sessionStorage}catch(k){return!0}}function e(){try{return!!window.localStorage}catch(k){return!0}}function d(){var b=document.createElement("canvas");if(b.getContext&&b.getContext("2d")){var c=b.getContext("2d");c.textBaseline="top";c.font="14px 'Arial'";c.textBaseline="alphabetic";
c.fillStyle="#f60";c.fillRect(0,0,62,20);c.fillStyle="#069";c.fillText("!image!",2,15);c.fillStyle="rgba(102, 204, 0, 0.7)";c.fillText("!image!",4,17);return b.toDataURL()}return null}try{var g=[];g.push(["lang",navigator.language||navigator.browserLanguage]);g.push(["tz",(new Date).getTimezoneOffset()]);g.push(["hss",c()?"1":"0"]);g.push(["hls",e()?"1":"0"]);g.push(["odb",typeof window.openDatabase||""]);g.push(["cpu",navigator.cpuClass||""]);g.push(["pf",navigator.platform||""]);g.push(["dnt",navigator.doNotTrack||
""]);g.push(["canv",d()]);return b(g.join("=!!!="))}catch(k){return null}}this.createRequest=function(){function b(b,c){var d={};try{if(b.performance&&b.performance.getEntries){var f=b.performance.getEntries();for(b=0;b<f.length;b++){var H=f[b],g=H.name.match(/.*\/(.+?)\./);if(g&&g[1]){var h=g[1].replace(/\d+$/,""),k=c[h];if(k){for(var m=0;m<k.stats.length;m++){var l=k.stats[m];d[k.prefix+l.prefix]=Math.round(H[l.name])}delete c[h];if(!e(c))break}}}}return d}catch(qa){}}function c(c,d){var f;if(c.frames)for(var g=
0;g<c.frames.length;g++)if((f=b(c.frames[g],d))&&e(f))return f}function e(b){var c=0,e;for(e in b)b.hasOwnProperty(e)&&++c;return c}function d(b){if(b&&e(b))for(var c in b)b.hasOwnProperty(c)&&C.push(c+"="+b[c]);else C.push("dvp_noperf=1")}window._dv_win.$dv.isEval=1;window._dv_win.$dv.DebugInfo={};var g=!1,k=!1,p,n,h=!1,l=window._dv_win,u=0,r=!1,v=getCurrentTime();window._dv_win.t2tTimestampData=[{dvTagCreated:v}];var m;try{for(m=0;10>=m;m++)if(null!=l.parent&&l.parent!=l)if(0<l.parent.location.toString().length)l=
l.parent,u++,h=!0;else{h=!1;break}else{0==m&&(h=!0);break}}catch(H){h=!1}0==l.document.referrer.length?m=l.location:h?m=l.location:(m=l.document.referrer,r=!0);var K="",I=null,D=null;try{window._dv_win.external&&(I=void 0!=window._dv_win.external.QueuePageID?window._dv_win.external.QueuePageID:null,D=void 0!=window._dv_win.external.CrawlerUrl?window._dv_win.external.CrawlerUrl:null)}catch(H){K="&dvp_extErr=1"}if(!window._dv_win._dvScriptsInternal||!window._dv_win.dvProcessed||0==window._dv_win._dvScriptsInternal.length)return null;
h=window._dv_win._dvScriptsInternal.pop();var t=h.script;this.dv_script_obj=h;this.dv_script=t;window._dv_win.t2tTimestampData[0].dvWrapperLoadTime=h.loadtime;window._dv_win.dvProcessed.push(h);var f=t.src;this.dv_script_obj.dvSrc=f;void 0!=window._dv_win.$dv.CommonData.BrowserId&&void 0!=window._dv_win.$dv.CommonData.BrowserVersion&&void 0!=window._dv_win.$dv.CommonData.BrowserIdFromUserAgent?h={ID:window._dv_win.$dv.CommonData.BrowserId,version:window._dv_win.$dv.CommonData.BrowserVersion,ID_UA:window._dv_win.$dv.CommonData.BrowserIdFromUserAgent}:
(h=dv_GetParam(f,"useragent"),h=(new BrowserDetector).getBrowserIdAndVersion(h?decodeURIComponent(h):navigator.userAgent),window._dv_win.$dv.CommonData.BrowserId=h.ID,window._dv_win.$dv.CommonData.BrowserVersion=h.version,window._dv_win.$dv.CommonData.BrowserIdFromUserAgent=h.ID_UA);var z=!0,A=window.parent.postMessage&&window.JSON,y=!1;if("0"==dv_GetParam(f,"t2te")||window._dv_win.dv_config&&!0===window._dv_win.dv_config.supressT2T)y=!0;if(A&&!1===y&&5!=window._dv_win.$dv.CommonData.BrowserId)try{var F=
V(window._dv_win.dv_config.t2turl||"https://cdn3.doubleverify.com/t2tv7.html");z=Q(F)}catch(H){}window._dv_win.$dv.DebugInfo.dvp_HTML5=A?"1":"0";var B=dv_GetParam(f,"region")||"",L=(/iPhone|iPad|iPod|\(Apple TV|iOS|Coremedia|CFNetwork\/.*Darwin/i.test(navigator.userAgent)||navigator.vendor&&"apple, inc."===navigator.vendor.toLowerCase())&&!window.MSStream,M=L?"https:":aa(),N=L?"https:":ba(f);y="0";"https:"===N&&(y="1");try{l.depth=ia(l);var w=ja(l);dv_aUrlParam="&aUrl="+encodeURIComponent(w.url);
dv_aUrlDepth="&aUrlD="+w.depth;dv_referrerDepth=l.depth+u;r&&l.depth--}catch(H){dv_aUrlDepth=dv_aUrlParam=dv_referrerDepth=l.depth=""}u=dv_GetDynamicParams(f,"dvp");r=dv_GetDynamicParams(f,"dvpx");for(w=0;w<r.length;w++){var q=dv_GetKeyValue(r[w]);r[w]=q.key+"="+encodeURIComponent(q.value)}"41"==B&&(B=50>100*Math.random()?"41":"8",u.push("dvp_region="+B));u=u.join("&");r=r.join("&");B=window._dv_win.dv_config.tpsAddress||"tps"+B+".doubleverify.com";w="visit.js";switch(dv_GetParam(f,"dvapi")){case "1":w=
"dvvisit.js";break;case "5":w="query.js";break;default:w="visit.js"}window._dv_win.$dv.DebugInfo.dvp_API=w;var x="ctx cmp ipos sid plc adid crt btreg btadsrv adsrv advid num pid crtname unit chnl uid scusrid tagtype sr dt dup app dvvidver".split(" "),C=[];for(q=0;q<x.length;q++){var J=dv_GetParam(f,x[q])||"";C.push(x[q]+"="+J);""!==J&&(window._dv_win.$dv.DebugInfo["dvp_"+x[q]]=J)}x="turl icall dv_callback useragent xff timecheck seltag sadv ord litm scrt invs splc adu native gmnpo".split(" ");for(q=
0;q<x.length;q++)J=dv_GetParam(f,x[q]),null!=J&&C.push(x[q]+"="+(J||""));(q=dv_GetParam(f,"isdvvid")||"")&&C.push("isdvvid=1");x=dv_GetParam(f,"tagtype")||"";var G=window._dv_win.$dv.getMraid();a:{try{if("object"==typeof window.$ovv||"object"==typeof window.parent.$ovv){var E=!0;break a}}catch(H){}E=!1}J=ea(G,f);C.push("sup="+J);1==q||G||"video"!=x&&"1"!=x||(q=dv_GetParam(f,"adid")||"","function"===typeof _dv_win[q]&&(C.push("prplyd=1"),C.push("DVP_GVACB="+q),C.push("isdvvid=1")),q="AICB_"+(window._dv_win.dv_config&&
window._dv_win.dv_config.dv_GetRnd?window._dv_win.dv_config.dv_GetRnd():dv_GetRnd()),window._dv_win[q]=function(b){g=!0;p=b;window._dv_win.$dv&&1==k&&window._dv_win.$dv.registerEventCall(n,{prplyd:0,dvvidver:b})},C.push("AICB="+q),q=C.join("&"),x=window._dv_win.document.createElement("script"),x.src=N+"//cdn.doubleverify.com/dvvid_src.js?"+q,window._dv_win.document.body.appendChild(x));try{var T=b(window,{dvtp_src:{prefix:"d",stats:[{name:"fetchStart",prefix:"fs"},{name:"duration",prefix:"dur"}]},
dvtp_src_internal:{prefix:"dv",stats:[{name:"duration",prefix:"dur"}]}});d(T)}catch(H){}T=C.join("&");q=na();q=null!=q?"&aadid="+q:"";var X=f;B=window._dv_win.dv_config.visitJSURL||N+"//"+B+"/"+w;L=L?"&dvf=0":"";w=Z("maple")?"&dvf=1":"";f=B+"?"+T+"&dvtagver=6.1.src&srcurlD="+l.depth+"&curl="+(null==D?"":encodeURIComponent(D))+"&qpgid="+(null==I?"":I)+"&ssl="+y+L+w+"&refD="+dv_referrerDepth+"&htmlmsging="+(A?"1":"0")+q+K;G&&(f+="&ismraid=1");E&&(f+="&isovv=1");f+=fa();"http:"==f.match("^http:")&&"https"==
window._dv_win.location.toString().match("^https")&&(f+="&dvp_diffSSL=1");l=t&&t.parentElement&&t.parentElement.tagName&&"HEAD"===t.parentElement.tagName;if(!1===z||l)f+="&dvp_isBodyExistOnLoad="+(z?"1":"0"),f+="&dvp_isOnHead="+(l?"1":"0");u&&(f+="&"+u);r&&(f+="&"+r);l="srcurl="+encodeURIComponent(m);window._dv_win.$dv.DebugInfo.srcurl=m;(m=ka())&&(l+="&ancChain="+encodeURIComponent(m));m=dv_GetParam(f,"uid");null==m?(m=dv_GetRnd(),f+="&uid="+m):(m=dv_GetRnd(),f=f.replace(/([?&]uid=)(?:[^&])*/i,"$1"+
m));m=4E3;/MSIE (\d+\.\d+);/.test(navigator.userAgent)&&7>=new Number(RegExp.$1)&&(m=2E3);E=navigator.userAgent.toLowerCase();if(-1<E.indexOf("webkit")||-1<E.indexOf("chrome"))E="&referrer="+encodeURIComponent(window._dv_win.location),f.length+E.length<=m&&(f+=E);navigator&&navigator.userAgent&&(E="&navUa="+encodeURIComponent(navigator.userAgent),f.length+E.length<=m&&(f+=E));dv_aUrlParam.length+dv_aUrlDepth.length+f.length<=m&&(f+=dv_aUrlDepth,l+=dv_aUrlParam);m=ca();f+="&vavbkt="+m.vdcd;f+="&lvvn="+
m.vdcv;f+="&"+this.getVersionParamName()+"="+this.getVersion();f+="&eparams="+encodeURIComponent(S(l));""!=m.err&&(f+="&dvp_idcerr="+encodeURIComponent(m.err));h.ID&&(f+="&brid="+h.ID+"&brver="+h.version+"&bridua="+h.ID_UA+"&bds=1",window._dv_win.$dv.DebugInfo.dvp_BRID=h.ID,window._dv_win.$dv.DebugInfo.dvp_BRVR=h.version,window._dv_win.$dv.DebugInfo.dvp_BRIDUA=h.ID_UA);void 0!=window._dv_win.$dv.CommonData.Scenario?h=window._dv_win.$dv.CommonData.Scenario:(h=this.getTrafficScenarioType(window._dv_win),
window._dv_win.$dv.CommonData.Scenario=h);f+="&tstype="+h;window._dv_win.$dv.DebugInfo.dvp_TS=h;var O="";try{window.top==window?O="1":window.top.location.host==window.location.host&&(O="2")}catch(H){O="3"}var P=window._dv_win.document.visibilityState,Y=function(){var b=!1;try{b=G&&"function"===typeof G.getState&&"loading"===G.getState()}catch(pa){f+="&dvp_mrgsf=1"}return b},U=Y();if("prerender"===P||U)f+="&prndr=1",U&&(f+="&dvp_mrprndr=1");h="dvCallback_"+(window._dv_win.dv_config&&window._dv_win.dv_config.dv_GetRnd?
window._dv_win.dv_config.dv_GetRnd():dv_GetRnd());var R=this.dv_script;window._dv_win[h]=function(b,e,d,h){var m=getCurrentTime();k=!0;n=d;e.$uid=d;var l=W(X);b.tags.add(d,l);l=W(f);b.tags[d].set(l);b.tags[d].beginVisitCallbackTS=m;b.tags[d].set({tagElement:R,dv_protocol:N,protocol:M,uid:d});b.tags[d].ImpressionServedTime=getCurrentTime();b.tags[d].getTimeDiff=function(){return(new Date).getTime()-this.ImpressionServedTime};try{"undefined"!=typeof h&&null!==h&&(b.tags[d].ServerPublicDns=h),b.tags[d].adServingScenario=
O,b.tags[d].t2tIframeCreationTime=v,b.tags[d].t2tProcessed=!1,b.tags[d].t2tIframeId=F.id,b.tags[d].t2tIframeWindow=F.contentWindow,$dv.t2tEventDataZombie[F.id]&&(b.tags[d].uniquePageViewId=$dv.t2tEventDataZombie[F.id].uniquePageViewId,$dv.processT2TEvent($dv.t2tEventDataZombie[F.id],b.tags[d]))}catch(oa){}b.messages&&b.messages.startSendingEvents&&b.messages.startSendingEvents(e,d);1==g&&b.registerEventCall(d,{prplyd:0,dvvidver:p});(function(){function c(){var e=window._dv_win.document.visibilityState;
"prerender"===P&&"prerender"!==e&&"unloaded"!==e&&(P=e,b.tags[d].set({prndr:0}),b.registerEventCall(d,{prndr:0}),b&&b.pubSub&&b.pubSub.publishHistoryRtnEvent(d),window._dv_win.document.removeEventListener(g,c))}function e(){"function"===typeof G.removeEventListener&&G.removeEventListener("ready",e);b.tags[d].set({prndr:0});b.registerEventCall(d,{prndr:0});b&&b.pubSub&&b.pubSub.publishHistoryRtnEvent(d)}if("prerender"===P){var f=window._dv_win.document.visibilityState;if("prerender"!==f&&"unloaded"!==
f)b.tags[d].set({prndr:0}),b.registerEventCall(d,{prndr:0}),b&&b.pubSub&&b.pubSub.publishHistoryRtnEvent(d);else{var g;"undefined"!==typeof window._dv_win.document.hidden?g="visibilitychange":"undefined"!==typeof window._dv_win.document.mozHidden?g="mozvisibilitychange":"undefined"!==typeof window._dv_win.document.msHidden?g="msvisibilitychange":"undefined"!==typeof window._dv_win.document.webkitHidden&&(g="webkitvisibilitychange");window._dv_win.document.addEventListener(g,c,!1)}}else U&&(Y()?"function"===
typeof G.addEventListener&&G.addEventListener("ready",e):(b.tags[d].set({prndr:0}),b.registerEventCall(d,{prndr:0}),b&&b.pubSub&&b.pubSub.publishHistoryRtnEvent(d)))})();try{var q=c(window,{visit:{prefix:"v",stats:[{name:"duration",prefix:"dur"}]}});q&&$dv.registerEventCall(d,q)}catch(oa){}};(l=la())&&(f+="&m1="+l);(l=ma())&&(f+="&bsig="+l);(l=da(X))&&(f+="&"+l);return f+"&jsCallback="+h};this.sendRequest=function(b){window._dv_win.t2tTimestampData.push({beforeVisitCall:getCurrentTime()});var c=this.dv_script_obj&&
this.dv_script_obj.injScripts,e=this.dv_script_obj&&this.dv_script_obj.injDvms,d=this.dv_script_obj&&this.dv_script_obj.srcLocation,g=this.dv_script_obj&&this.dv_script_obj.dvSrc;c=ha(this.getVersionParamName(),this.getVersion(),b,c,d,g,e);b=V("about:blank");e=b.id.replace("iframe_","");b.setAttribute&&b.setAttribute("data-dv-frm",e);Q(b,this.dv_script);if(this.dv_script){this.dv_script.id="script_"+e;e=this.dv_script;a:{d=null;try{if(d=b.contentWindow){var k=d;break a}}catch(p){}try{if(d=window._dv_win.frames&&
window._dv_win.frames[b.name]){k=d;break a}}catch(p){}k=null}e.dvFrmWin=k}if(k=R(b))k.open(),k.write(c);else{try{document.domain=document.domain}catch(p){}k=encodeURIComponent(c.replace(/'/g,"\\'").replace(/\n|\r\n|\r/g,""));b.src='javascript: (function(){document.open();document.domain="'+window.document.domain+"\";document.write('"+k+"');})()"}return!0};this.isApplicable=function(){return!0};this.onFailure=function(){window._dv_win._dvScriptsInternal.unshift(this.dv_script_obj);var b=window._dv_win.dvProcessed,
c=this.dv_script_obj;null!=b&&void 0!=b&&c&&(c=b.indexOf(c),-1!=c&&b.splice(c,1));return window._dv_win.$dv.DebugInfo};this.getTrafficScenarioType=function(b){b=b||window;var c=b._dv_win.$dv.Enums.TrafficScenario;try{if(b.top==b)return c.OnPage;for(var e=0;b.parent!=b&&1E3>e;){if(b.parent.document.domain!=b.document.domain)return c.CrossDomain;b=b.parent;e++}return c.SameDomain}catch(d){}return c.CrossDomain};this.getVersionParamName=function(){return"jsver"};this.getVersion=function(){return"145"}}
;
function dv_baseHandler(){function Z(b){var c=window._dv_win,e=0;try{for(;10>e;){if(c[b]&&"object"===typeof c[b])return!0;if(c==c.parent)break;e++;c=c.parent}}catch(d){}return!1}function aa(){var b="http:";"http:"!=window._dv_win.location.protocol&&(b="https:");return b}function ba(b){var c="http:";"https"!=b.match("^https")||"http"==window._dv_win.location.toString().match("^http")&&"https"!=window._dv_win.location.toString().match("^https")||(c="https:");return c}function ca(){var b="";try{var c=
eval(function(b,c,g,k,n,p){n=function(b){return(b<c?"":n(parseInt(b/c)))+(35<(b%=c)?String.fromCharCode(b+29):b.toString(36))};if(!"".replace(/^/,String)){for(;g--;)p[n(g)]=k[g]||n(g);k=[function(b){return p[b]}];n=function(){return"\\w+"};g=1}for(;g--;)k[g]&&(b=b.replace(new RegExp("\\b"+n(g)+"\\b","g"),k[g]));return b}("(19(){1n{1n{3i('1a?1y:1F')}1q(e){v{m:\"-5z\"}}19 3q(1H,2v,21){18(d 1N 5A 1H){w(1N.2u(2v)>-1&&(!21||21(1H[1N])))v 1y}v 1F}19 g(s){d h=\"\",t=\"5B.;j&5C}5y/0:5x'5t=B(5u-5v!,5w)5r\\\\{ >5D+5E\\\"5L<\";18(i=0;i<s.1e;i++)f=s.2t(i),e=t.2u(f),0<=e&&(f=t.2t((e+41)%82)),h+=f;v h}19 1R(2r,1x){1n{w(2r())m.1C((1a==1a.3m?-1:1)*1x)}1q(e){m.1C(-5P*1x);X.1C(1x+\"=\"+(e.5K||\"5J\"))}}d c=['5F\"1r-5G\"5H\"29','p','l','60&p','p','{','\\\\<}4\\\\5I-5s<\"5q\\\\<}4\\\\5a<Z?\"6','e','5b','-5,!u<}\"5c}\"','p','J','-5d}\"<59','p','=o','\\\\<}4\\\\2w\"2f\"y\\\\<}4\\\\2w\"2f\"58}2\"<,u\"<5}?\"6','e','J=',':<54}T}<\"','p','h','\\\\<}4\\\\8-2}\"E(n\"16}b?\\\\<}4\\\\8-2}\"E(n\"2E<N\"[1A*1t\\\\\\\\2I-55<2J\"2O\"56]1i}C\"13','e','57','\\\\<}4\\\\5e;5f||\\\\<}4\\\\5m?\"6','e','+o','\"1f\\\\<}4\\\\2S\"I<-5n\"2x\"5\"5o}2A<}5p\"1f\\\\<}4\\\\1o}1M>1I-1U}2}\"2x\"5\"5l}2A<}5k','e','=J','10}U\"<5}5g\"7}F\\\\<}4\\\\[5h}5i:5j]k}9\\\\<}4\\\\[t:2W\"5Q]k}9\\\\<}4\\\\[5R})5-u<}t]k}9\\\\<}4\\\\[6n]k}9\\\\<}4\\\\[6o}6p]k}6q','e','6m',':6l}<\"H-1L/2M','p','6h','\\\\<}4\\\\12<U/1p}9\\\\<}4\\\\12<U/!k}b','e','=l','1d\\\\<}4\\\\6i}/6j}U\"<5}6k\"7}6r<2B}6s\\\\6z\"6A}/k}2C','e','=S=','\\\\<}4\\\\E-6B\\\\<}4\\\\E-6C\"5\\\\U?\"6','e','+J','\\\\<}4\\\\2z!6y\\\\<}4\\\\2z!6t)p?\"6','e','6u','-}\"6v','p','x{','\\\\<}4\\\\E<2K-6w}6g\\\\<}4\\\\6f\"5Y-5Z\\\\<}4\\\\61.42-2}\"62\\\\<}4\\\\5X<N\"H}5W?\"6','e','+S','10}U\"<5}O\"17\"7}F\\\\<}4\\\\G<1J\"1f\\\\<}4\\\\G<2c}U\"<5}1j\\\\<}4\\\\1m-2.42-2}\"y\\\\<}4\\\\1m-2.42-2}\"1u\"L\"\"M<3y\"3t\"3u<\"<5}3f\"3e\\\\<Z\"3l<W\"3k{3d:3c\\\\3b<1D}3n-3a<}39\"3s\"1v%3z<W\"1v%3r?\"38\"14\"7}34','e','5S','5T:,','p','5U','\\\\<}4\\\\5V\\\\<}4\\\\2y\"2q\\\\<}4\\\\2y\"2j,T}2i+++++1j\\\\<}4\\\\63\\\\<}4\\\\2p\"2q\\\\<}4\\\\2p\"2j,T}2i+++++t','e','6b','\\\\<}4\\\\6c\"1L\"6d}9\\\\<}4\\\\E\\\\6e<M?\"6','e','6a','10}U\"<5}O:69\\\\<}4\\\\8-2}\"1u\".42-2}\"65-66<N\"67<68<6D}C\"3H<4J<3W[<]E\"27\"1r}\"2}\"3X[<]E\"27\"1r}\"2}\"E<}1g&3Y\"1\\\\<}4\\\\2h\\\\3V\\\\<}4\\\\2h\\\\1o}1M>1I-1U}2}\"z<3R-2}\"3S\"2.42-2}\"3T=3Z\"7}40\"7}P=48','e','x','49)','p','+','\\\\<}4\\\\2g:4a<5}47\\\\<}4\\\\2g\"46?\"6','e','3Q','L!!44.45.H 4b','p','x=','\\\\<}4\\\\3I}3D)u\"3E\\\\<}4\\\\3M-2?\"6','e','+=','\\\\<}4\\\\2k\"3N\\\\<}4\\\\2k\"3O--3L<\"2f?\"6','e','x+','\\\\<}4\\\\8-2}\"2l}\"2o<N\"y\\\\<}4\\\\8-2}\"2l}\"2o<N\"3G\")3J\"<:3F\"3K}b?\"6','e','+x','\\\\<}4\\\\2n)u\"3P\\\\<}4\\\\2n)u\"3C?\"6','e','43','\\\\<}4\\\\2m}s<52\\\\<}4\\\\2m}s<4L\" 4M-4N?\"6','e','4O','\\\\<}4\\\\E\"4K-2}\"E(n\"4c<N\"[1A*4F\"4E<4G]4H?\"6','e','+e','\\\\<}4\\\\8-2}\"E(n\"16}b?\\\\<}4\\\\8-2}\"E(n\"4I<:[\\\\4P}}2M][\\\\4Q,5}2]4Y}C\"13','e','4Z','1d\\\\<}4\\\\50}51\\\\<}4\\\\4X$4W','e','4S',':4R<Z','p','4T','\\\\<}4\\\\E-4U\\\\<}4\\\\E-4V}4D\\\\<}4\\\\E-4C<4l?\"6','e','4m','$H:4n}Z!4o','p','+h','\\\\<}4\\\\E\"1T\\\\<}4\\\\E\"1P-4k?\"6','e','4j','1d\\\\<}4\\\\4e:,31}U\"<5}1B\"7}4d<4g<2B}2C','e','4i','\\\\<}4\\\\12<U/4p&2V\"E/2T\\\\<}4\\\\12<U/4q}C\"3o\\\\<}4\\\\12<U/f[&2V\"E/2T\\\\<}4\\\\12<U/4A[S]]2S\"4B}b?\"6','e','4x','4w}4s}4r>2s','p','4t','\\\\<}4\\\\1h:<1Y}s<4u}9\\\\<}4\\\\1h:<1Y}s<4v<}f\"u}2P\\\\<}4\\\\2H\\\\<}4\\\\1h:<1Y}s<C[S]E:2W\"1p}b','e','l{','64\\'<}4\\\\T}6E','p','==','\\\\<}4\\\\G<1J\\\\<}4\\\\G<2d\\\\<Z\"2a\\\\<}4\\\\G<2b<W\"?\"6','e','8A','\\\\<}4\\\\2X}2e-30\"}2Y<8B\\\\<}4\\\\2X}2e-30\"}2Y/2Q?\"6','e','=8x','\\\\<}4\\\\E\"2f\"8t\\\\<}4\\\\8u<8v?\"6','e','o{','\\\\<}4\\\\8w-)2\"2U\"y\\\\<}4\\\\1h-8C\\\\1r}s<C?\"6','e','+l','\\\\<}4\\\\2R-2\"8D\\\\<}4\\\\2R-2\"8L<Z?\"6','e','+{','\\\\<}4\\\\E:8M}9\\\\<}4\\\\8J-8I}9\\\\<}4\\\\E:8E\"<8F\\\\}k}b?\"6','e','{S','\\\\<}4\\\\1l}\"11}8G\"-8H\"2f\"q\\\\<}4\\\\r\"<5}8s?\"6','e','o+',' &H)&8r','p','8d','\\\\<}4\\\\E.:2}\"c\"<8e}9\\\\<}4\\\\8f}9\\\\<}4\\\\8c<}f\"u}2P\\\\<}4\\\\2H\\\\<}4\\\\1o:}\"k}b','e','88','89\"5-\\'2G:2M','p','J{','\\\\<}4\\\\8a\"5-\\'2G:8O}8h=8o:D|q=2F|8p-5|8q--1L/2\"|2N-2F|8i\"=8j\"2f\"q\\\\<}4\\\\1V\"25:24<1D}D?\"6','e','=8k','\\\\<}4\\\\8-2}\"E(n\"16}b?\\\\<}4\\\\8-2}\"E(n\"2E<N\"[1A*1t\\\\\\\\2I-2J\"2O/95<97]1i}C\"13','e','98',')96!93}s<C','p','8T','\\\\<}4\\\\2L<<8U\\\\<}4\\\\2L<<8R<}f\"u}94?\"6','e','{l','\\\\<}4\\\\33.L>g;H\\'T)Y.8P\\\\<}4\\\\33.L>g;8V&&8W>H\\'T)Y.I?\"6','e','l=','1d\\\\<}4\\\\91\\\\92>90}U\"<5}1B\"7}F\"32}U\"<5}8Z\\\\<}4\\\\8X<2K-20\"u\"8Y}U\"<5}1B\"7}F\"32}U\"<5}85','e','{J','H:<Z<:5','p','77','\\\\<}4\\\\k\\\\<}4\\\\E\"78\\\\<}4\\\\r\"<5}3x\"3p}/1j\\\\<}4\\\\8-2}\"3w<}1g&79\\\\<}4\\\\r\"<5}1k\"}u-76=?10}U\"<5}O\"17\"7}75\\\\<}4\\\\1l}\"r\"<5}71\"14\"7}F\"72','e','73','\\\\<}4\\\\1S-U\\\\y\\\\<}4\\\\1S-74\\\\<}4\\\\1S-\\\\<}?\"6','e','7a','7b-N:7i','p','7j','\\\\<}4\\\\1X\"7k\\\\<}4\\\\1X\"86\"<5}7h\\\\<}4\\\\1X\"7g||\\\\<}4\\\\7c?\"6','e','h+','7d<u-7e/','p','{=','\\\\<}4\\\\r\"<5}1k\"}u-7f\\\\<}4\\\\1o}1M>1I-1U}2}\"q\\\\<}4\\\\r\"<5}1k\"}u-2D','e','=S','\\\\<}4\\\\70\"1f\\\\<}4\\\\6Z}U\"<5}1j\\\\<}4\\\\6L?\"6','e','{o','\\\\<}4\\\\6M}<6N\\\\<}4\\\\6K}?\"6','e','=6J','\\\\<}4\\\\G<1J\\\\<}4\\\\G<2d\\\\<Z\"2a\\\\<}4\\\\G<2b<W\"y\"1f\\\\<}4\\\\G<2c}U\"<5}t?\"6','e','J+','c>A','p','=','10}U\"<5}O\"17\"7}F\\\\<}4\\\\E\"6F\"6G:6H}6I^[6O,][6P+]6W\\'<}4\\\\6X\"2f\"q\\\\<}4\\\\E}u-6Y\"14\"7}6V=6U','e','6Q','\\\\<}4\\\\1G:!3g\\\\<}4\\\\8-2}\"E(n\"16}b?\\\\<}4\\\\8-2}\"E(n\"1O<:[f\"29*6R<W\"6S]6T<:[<Z*1t:Z,1Q]1i}C\"13','e','=7l','\\\\<}4\\\\28\"<22-23-u}7m\\\\<}4\\\\28\"<22-23-u}7Q?\"6','e','{x','7R}7K','p','7S','\\\\<}4\\\\8-2}\"E(n\"16}b?\\\\<}4\\\\8-2}\"E(n\"1O<:[<Z*1t:Z,1Q]F:<7P[<Z*7O]1i}C\"13','e','h=','7J-2}\"r\"<5}k}b','e','7L','\\\\<}4\\\\8-2}\"E(n\"16}b?\\\\<}4\\\\8-2}\"E(n\"1O<:[<Z*7M}1Q]R<-C[1A*7T]1i}C\"13','e','81','1d\\\\<}4\\\\26\"\\\\83\\\\<}4\\\\26\"\\\\84','e','80','\\\\<}4\\\\1V\"y\\\\<}4\\\\1V\"25:24<1D}?\"6','e','{e','\\\\<}4\\\\7V}Z<}7W}9\\\\<}4\\\\7X<f\"k}9\\\\<}4\\\\7Y/<}C!!7I<\"42.42-2}\"1p}9\\\\<}4\\\\7H\"<5}k}b?\"6','e','7u','T>;7v\"<4f','p','h{','\\\\<}4\\\\7s<u-7r\\\\7n}9\\\\<}4\\\\1h<}7p}b?\"6','e','7q','\\\\<}4\\\\E\"1T\\\\<}4\\\\E\"1P-35}U\"<5}O\"17\"7}F\\\\<}4\\\\1l}\"r\"<5}1k\"E<}1g&36}3j=y\\\\<}4\\\\1l}\"8-2}\"1u\".42-2}\"7w}\"u<}7x}7E\"14\"7}F\"3h?\"6','e','{h','\\\\<}4\\\\7F\\\\<}4\\\\7G}<(7D?\"6','e','7C','\\\\<}4\\\\7y<U-2Z<7z&p?1d\\\\<}4\\\\7B<U-2Z<8z/31}U\"<5}1B\"7}F\"7A','e','=7o','7t\\'<7Z\"','p','{{','\\\\<}4\\\\E\"1T\\\\<}4\\\\E\"1P-35}U\"<5}O\"17\"7}F\\\\<}4\\\\1l}\"r\"<5}1k\"E<}1g&36}3j=7U\"14\"7}F\"3h?\"6','e','7N','10}U\"<5}O\"17\"7}F\\\\<}4\\\\1G:!3g\\\\<}4\\\\1m-2.42-2}\"y\\\\<}4\\\\1m-2.42-2}\"1u\"L\"\"M<3y\"3t\"3u<\"<5}3f\"3e\\\\<Z\"3l<W\"3k{3d:3c\\\\3b<1D}3n-3a<}39\"3s\"1v%3z<W\"1v%3r?\"38\"14\"7}34','e','{+','\\\\<}4\\\\8S<8N a}8l}9\\\\<}4\\\\E}8m\"8n 8g- 1p}b','e','87','8b\\\\<}4\\\\r\"<5}1G}8K\"5M&M<C<}8y}C\"3o\\\\<}4\\\\r\"<5}3x\"3p}/1j\\\\<}4\\\\8-2}\"4z\\\\<}4\\\\8-2}\"3w<}1g&4y[S]4h=?\"6','e','l+'];d 1w='(19(){d m=[],X=[];'+3q.37()+1R.37()+'';18(d j=0;j<c.1e;j+=3){1w+='1R(19(){v '+(c[j+1]=='p'?'1a[\"'+g(c[j])+'\"]!=3U':g(c[j]))+'}, '+53(g(c[j+2]))+');'}1w+='v {m:m,X:X}})();';d K=[];d 1K=[];d 1c=1a;18(d i=0;i<6x;i++){d V=1c.3i(1w);w(V.X.1e>15){v{m:V.X[0]}}18(d 1b=0;1b<V.m.1e;1b++){d 1z=1F;18(d Q=0;Q<K.1e;Q++){w(K[Q]==V.m[1b]){1z=1y;1s}3B w(1Z.1E(K[Q])==1Z.1E(V.m[1b])){K[Q]=1Z.1E(K[Q]);1z=1y;1s}}w(!1z)K.1C(V.m[1b])}w(1c==1a.3m){1s}3B{1n{w(1c.3v.5O.5N)1c=1c.3v}1q(e){1s}}}d 1W={m:K.3A(\",\")};w(1K.1e>0)1W.X=1K.3A(\"&\");v 1W}1q(e){v{m:\"-8Q\"}}})();",
62,567,"    Z5  Ma2vsu4f2 aM EZ5Ua a44OO  a44  var       P1  res a2MQ0242U    E45Uu    return if  OO        E3 _   results    qD8  ri     currentResults C3 err   qsa  EBM 3RSvsu4f2 U3q2D8M2  5ML44P1 MQ8M2 for function window cri currWindow U5q length QN25sF Z27 E_ WDE42 tOO E35f ENuM2 EsMu try E2 fP1 catch g5 break  EC2 vFoS fc ci true exists fMU q5D8M2 push ZZ2 abs false Eu wnd Tg5 M5OO errors uM U5Z2c prop 5ML44qWZ UT _t ei Euf UIuCTZOO N5 EfaNN_uZf_35f response EuZ ZU5 Math  func _7Z fC_ 2MM _5 zt__  Ea Q42 3OO M5E32 M511tsa M5E 5Mu  E27 z5 Z2711t Q42E EU E_UaMM2 ELZg5 EufB 0UM EuZ_lEf Q42OO fu  charAt indexOf str Ef35M ENM5 EuZ_hEf E_Y Z2s ZP1 a44nD  5ML44qWfUM uZf ALZ02M ELMMuQOO BuZfEU5 kN7 sMu E__   MuU U25sF  E__N Ef2 2Qfq  BV2U uf ENu 2M_  _NuM tzsa QN25sF511tsa EcIT_0 Fsu4f2HnnDqD NTZOOqsa sqtfQ toString Ma2vsu4f2nUu m42s uMC vF3 2Ms45 SN7HF5 2HFB5MZ2MvFSN7HF vFuBf54a 4uQ2MOO Ma2HnnDqD eval uNfQftD11m vFl 3vFJlSN7HF32 top HF 3RSOO vB4u co Ht vFmheSN7HF42s 2qtf Q42tD11tN5f parent EM2s2MM2ME E3M2sP1tuB5a Ba HFM join else ujuM Z42 uOO 2r2 EZ5p5  EA5Cba 2s2MI5pu 35ZP1 MU0 EuZZTsMu 7__OO 7__E2U u_Z2U5Z2OO xJ 1Z5Ua EUM2u tDRm null E2fUuN2z21 sq2 OO2 sqt DM2 PSHM2   oo _ALb A_pLr IQN2 _V5V5OO HnDqD Ld0 2Mf cAA_cg 5MqWfUM F5ENaB4 zt_M  f32M_faB D11m lJ oJ NTZ NLZZM2ff Je V0 7A5C fOO fDE42 fY45 5IMu hx CP1 CF M2 ox squ EM2s2MM2MOO fD aNP1 2MUaMQE sOO kC5 1tk27 UEVft WD 5ML44qtZ 99D uCUuZ2OOZ5Ua CEC2 Mu 2cM4 JJ UmBu Um u_faB Jl hJ 2MUaMQOO 2MUaMQEU5 _tD zt_ tDE42 eS zt__uZ_M f_tDOOU5q COO parseInt ZBu kUM EVft eo r5 u4f ENaBf_uZ_faB xh g5a fgM2Z2 E7LZfKrA 24N2MTZ qD8M2 tf5a ZA2 24t 2Zt QN2P1ta E7GXLss0aBTZIuC 25a QN211ta 2ZtOO QOO  5Zu4 Kt Q6T uic2EHVO LnG s7 YDoMw8FRp3gd94 99 in Ue PzA NhCZ lkSvfxWX C2 Na 2Z0 ENaBf_uZ_uZ unknown message 1bqyJIma  href location 1000 r5Z2t tUZ xx _M he EuZ_hOO 5Z2f EfUM 2TsMu 2OO  EuZZ I5b5ZQOO EuZ_lOO UufUuZ2 fbQIuCpu 2qtfUM tDHs5Mq 1SH uMF21 xo xl Ef aM4P1 2BfM2Z EaNZu U2OO ho zt_4 Mtzsa q5BVD8M2 u_a ee tUBt tB LMMt a44nDqD F5BVEa a44OO5BVEu445 AEBuf2g lS M__ 2_M2s2M2 100 AOO IuMC2 b4u UCMOO UCME i2E42 s5 5NENM5U2ff_ uC_ uMfP1 a44OOk Sh EuZfBQuZf E5U4U5qDEN4uQ ELZ0 N2MOO um Sm xe 1t32 vFSN7t FZ HnnDqD FP 8lzn kE 2DnUu E5U4U511tsa E5U4U5OO E3M2szsu4f2nUu Ma2nnDqDvsu4f2 oS M2sOO FN1 2DRm hh 5NOO sq JS ___U E35aMfUuND _NM _uZB45U 2P1 CfE35aMfUuN OOq _ZBf le CfOO So uC2MOO f2MP1 Sl N4uU2_faUU2ffP1 Jo bM5 ENM LZZ035NN2Mf lo _c bQTZqtMffmU5 2MtD11 EIMuss u60 Ma2nDvsu4f2 ztIMuss ol a2TZ a44HnUu E_NUCOO E_NUCEYp_c Eu445Uu gI Z5Ua  eh 1tB2uU5 Jx 1tfMmN4uQ2Mt Z25 uC2MEUB B24 xS 1tNk4CEN3Nt HnUu E4u CcM4P1 Ef2A ENuM ZC2 lh oe  B__tDOOU5q B_UB_tD tnD CfEf2U lx ll gaf Egaf u1 ErF hl 4P1 ErP1 M5 wZ8 uZf35f DkE SS UP1 _f 5M2f zlnuZf2M UUUN 2N5 rLTp E3M2sD fNNOO E0N2U u4buf2Jl E_Vu Se fzuOOuE42 ubuf2b45U Jh ZOO fN uCOO u_ 2M_f35 a44OOkuZwkwZ8ezhn7wZ8ezhnwE3 4kE fC532M2P1 ENuMu U2f uCEa u_uZ_M2saf2_M2sM2f3P1 4Zf 2MOOkq IOO 999 ZfF EUuU oh ZfOO _I AbL zt af_tzsa tnDOOU5q A_tzsa ztBM5 f2Mc 4Qg5 U25sFLMMuQ kZ 2u4 fN4uQLZfEVft eJ".split(" "),
0,{}));c.hasOwnProperty("err")&&(b=c.err);return{vdcv:25,vdcd:c.res,err:b}}catch(e){return{vdcv:25,vdcd:"0",err:b}}}function da(b){for(var c="auctionid vermemid source buymemid anadvid ioid cpgid cpid sellerid pubid advcode iocode cpgcode cpcode pubcode prcpaid auip auua".split(" "),e=[],d=0;d<c.length;d++){var g=dv_GetParam(b,c[d]);null!=g&&(e.push("dvp_"+c[d]+"="+g),e.push(c[d]+"="+g))}return e.join("&")}function ea(b,c){c=dv_GetParam(c,"sup")||"";try{var e=!1,d=!1;try{var g=window.document.getElementById("aolVideoContainer")||
window.MmJsBridge&&window.MmJsBridge.vpaid;e=null!=window.mmSdkVersion;d=null!=g}catch(k){}e||d?c="mm":(g=!1,null!=b&&"function"===typeof b.getVendor&&"function"===typeof b.getVendorVersion&&"AdMarvel"==b.getVendor()&&(g=!0),g&&(c="opm"))}catch(k){}return c}function fa(){var b="";try{var c=window._dv_win;b+="&chro="+(void 0===c.chrome?"0":"1");b+="&hist="+(c.history?c.history.length:"");b+="&winh="+c.innerHeight;b+="&winw="+c.innerWidth;b+="&wouh="+c.outerHeight;b+="&wouw="+c.outerWidth;c.screen&&
(b+="&scah="+c.screen.availHeight,b+="&scaw="+c.screen.availWidth)}catch(e){}return b||""}function Q(b,c,e){e=e||150;var d=window._dv_win||window;if(d.document&&d.document.body)return c&&c.parentNode?c.parentNode.insertBefore(b,c):d.document.body.insertBefore(b,d.document.body.firstChild),!0;if(0<e)setTimeout(function(){Q(b,c,--e)},20);else return!1}function R(b){var c=null;try{if(c=b&&b.contentDocument)return c}catch(e){}try{if(c=b.contentWindow&&b.contentWindow.document)return c}catch(e){}try{if(c=
window._dv_win.frames&&window._dv_win.frames[b.name]&&window._dv_win.frames[b.name].document)return c}catch(e){}return null}function V(b){var c=document.createElement("iframe");c.name=c.id=window._dv_win.dv_config.emptyIframeID||"iframe_"+Math.floor(1E12*(Math.random()+""));c.width=0;c.height=0;c.style.display="none";c.src=b;return c}function ha(b,c,e,d,g,k,n){var p=window._dv_win.dv_config=window._dv_win.dv_config||{};p.tpsErrAddress=p.tpsAddress||"tps30.doubleverify.com";p.cdnAddress=p.cdnAddress||
"cdn.doubleverify.com";var h={};h[b]=c;h.dvp_jsErrUrl=e;h.dvp_jsErrMsg=encodeURIComponent("Error loading visit.js");b=dv_CreateAndGetErrorImp(p.tpsErrAddress+"/visit.jpg?ctx=818052&cmp=1619415&dvtagver=6.1.src&dvp_isLostImp=1",h);d=d||"function() {}";p=c="";h=function(b){result="";for(i=0;i<b.length;i+=2)result+=b[i];return result}("c377ba824");n&&(h=dv_GetParam(k,"dvp_evl")?n.eval?n.eval:n.main:dv_GetParam(e,"ctx")==parseInt(h,16)?n.main:n.eval&&n.rate&&100*Math.random()<n.rate?n.eval:n.main)&&(c=
'<script type="text/javascript" id="TPSCall" src="'+g+"/"+n.src+h+'.js">\x3c/script>',p=dv_GetParam(k,"dvp_evl")?"":"&dvp_evl=1");return'<html><head><script type="text/javascript">('+function(b){try{window.dvSrc=b,window.$dv=window.$dv||parent.$dv,window.$dv.dvObjType="dv",window.$frmId=Math.random().toString(36)+Math.random().toString(36)}catch(u){}}.toString()+')("'+k+'");\x3c/script></head><body>'+c+'<script type="text/javascript">('+d+')("'+g+'");\x3c/script><script type="text/javascript" id="TPSCall" src="'+
e+p+'">\x3c/script><script type="text/javascript">('+function(b){var c=document.getElementById("TPSCall");try{c.onerror=function(){try{(new Image).src=b}catch(r){}}}catch(r){}c&&c.readyState?(c.onreadystatechange=function(){"complete"==c.readyState&&document.close()},"complete"==c.readyState&&document.close()):document.close()}.toString()+')("'+b+'");\x3c/script></body></html>'}function W(b){var c={};try{for(var e=/[\?&]([^&]*)=([^&#]*)/gi,d=e.exec(b);null!=d;)"eparams"!==d[1]&&(c[d[1]]=d[2]),d=e.exec(b);
return c}catch(g){return c}}function ia(b){for(var c=0;10>c&&b!=window._dv_win.top;)c++,b=b.parent;return c}function ja(b){try{if(1>=b.depth)return{url:"",depth:""};var c=[];c.push({win:window._dv_win.top,depth:0});for(var e,d=1,g=0;0<d&&100>g;){try{if(g++,e=c.shift(),d--,0<e.win.location.toString().length&&e.win!=b)return 0==e.win.document.referrer.length||0==e.depth?{url:e.win.location,depth:e.depth}:{url:e.win.document.referrer,depth:e.depth-1}}catch(p){}var k=e.win.frames.length;for(var n=0;n<
k;n++)c.push({win:e.win.frames[n],depth:e.depth+1}),d++}return{url:"",depth:""}}catch(p){return{url:"",depth:""}}}function ka(){var b=window._dv_win[S("=@42E:@?")][S("2?46DE@C~C:8:?D")];if(b&&0<b.length){var c=[];c[0]=window._dv_win.location.protocol+"//"+window._dv_win.location.hostname;for(var e=0;e<b.length;e++)c[e+1]=b[e];return c.reverse().join(",")}return null}function S(b){var c=String(),e;for(e=0;e<b.length;e++){var d=b.charAt(e);var g="!\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~".indexOf(d);
0<=g&&(d="!\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~".charAt((g+47)%94));c+=d}return c}function la(){try{var b=0,c=function(c,e){e&&32>c&&(b=(b|1<<c)>>>0)},e=function(b,c){return function(){return b.apply(c,arguments)}},d="svg"===document.documentElement.nodeName.toLowerCase(),g=function(){return"function"!==typeof document.createElement?document.createElement(arguments[0]):d?document.createElementNS.call(document,"http://www.w3.org/2000/svg",
arguments[0]):document.createElement.apply(document,arguments)},k=["Moz","O","ms","Webkit"],n=["moz","o","ms","webkit"],p={style:g("modernizr").style},h=function(b,c,e,d){function k(){n&&(delete p.style,delete p.modElem)}d="undefined"===typeof d?!1:d;if("undefined"!==typeof e){var h=nativeTestProps(b,e);if("undefined"!==typeof h)return h}for(h=["modernizr","tspan","samp"];!p.style&&h.length;){var n=!0;p.modElem=g(h.shift());p.style=p.modElem.style}var l=b.length;for(h=0;h<l;h++){var f=b[h];var u=
p.style[f];~(""+f).indexOf("-")&&(f=cssToDOM(f));if(void 0!==p.style[f]){if(d||"undefined"===typeof e)return k(),"pfx"==c?f:!0;try{p.style[f]=e}catch(A){}if(p.style[f]!=u)return k(),"pfx"==c?f:!0}}k();return!1},l=function(b,c,d,g,l){var p=b.charAt(0).toUpperCase()+b.slice(1),m=(b+" "+k.join(p+" ")+p).split(" ");if("string"===typeof c||"undefined"===typeof c)return h(m,c,g,l);m=(b+" "+n.join(p+" ")+p).split(" ");for(var u in m)if(m[u]in c){if(!1===d)return m[u];b=c[m[u]];return"function"===typeof b?
e(b,d||c):b}return!1};c(0,!0);c(1,!!function(b,c,e){if(0===b.indexOf("@"))return atRule(b);-1!=b.indexOf("-")&&(b=cssToDOM(b));return c?l(b,c,e):l(b,"pfx")}("requestFileSystem",window));c(2,window.CSS?"function"==typeof window.CSS.escape:!1);c(3,l("shapeOutside","content-box",!0));return b}catch(u){return 0}}function ma(){try{var b=window,c=0;try{for(;b.parent&&b!=b.parent&&b.parent.document&&!(b=b.parent,10<c++););}catch(g){}var e=0;c=function(b,c){c&&(e=(e|1<<b)>>>0)};var d=b.document;c(14,b.playerInstance&&
d.querySelector('script[src*="ads-player.com"]'));c(14,(b.CustomWLAdServer||b.DbcbdConfig)&&(a=d.querySelector('p[class="footerCopyright"]'),a&&a.textContent.match(/ MangaLife 2016/)));c(15,b.zpz&&b.zpz.createPlayer);c(15,b.vdApp&&b.vdApp.createPlayer);c(15,d.querySelector('body>div[class="z-z-z"]'));c(16,b.xy_checksum&&b.place_player&&(b.logjwonready&&b.logContentPauseRequested||b.jwplayer));c(17,b==b.top&&""==d.title?(a=d.querySelector('body>object[id="player"]'),a&&a.data&&1<a.data.indexOf("jwplayer")&&
"visibility: visible;"==a.getAttribute("style")):!1);c(17,d.querySelector('script[src*="sitewebvideo.com"]'));c(17,b.InitPage&&b.cef&&b.InitAd);c(17,b==b.top&&""==d.title?(a=d.querySelector("body>#player"),null!=a&&null!=(null!=a.querySelector('div[id*="opti-ad"]')||a.querySelector('iframe[src="about:blank"]'))):!1);c(17,b==b.top&&""==d.title&&b.InitAdPlayer?(a=d.querySelector('body>div[id="kt_player"]'),null!=a&&null!=a.querySelector('div[class="flash-blocker"]')):!1);c(17,null!=b.clickplayer&&null!=
b.checkRdy2);return e}catch(g){return 0}}function na(){function b(b){if(null==b||""==b)return"";var c=function(b,c){return b<<c|b>>>32-c},e=function(b){for(var c="",e,d=7;0<=d;d--)e=b>>>4*d&15,c+=e.toString(16);return c},d=[1518500249,1859775393,2400959708,3395469782];b+=String.fromCharCode(128);for(var g=Math.ceil((b.length/4+2)/16),k=Array(g),r=0;r<g;r++){k[r]=Array(16);for(var v=0;16>v;v++)k[r][v]=b.charCodeAt(64*r+4*v)<<24|b.charCodeAt(64*r+4*v+1)<<16|b.charCodeAt(64*r+4*v+2)<<8|b.charCodeAt(64*
r+4*v+3)}k[g-1][14]=8*(b.length-1)/Math.pow(2,32);k[g-1][14]=Math.floor(k[g-1][14]);k[g-1][15]=8*(b.length-1)&4294967295;b=1732584193;v=4023233417;var m=2562383102,K=271733878,I=3285377520,D=Array(80);for(r=0;r<g;r++){for(var t=0;16>t;t++)D[t]=k[r][t];for(t=16;80>t;t++)D[t]=c(D[t-3]^D[t-8]^D[t-14]^D[t-16],1);var f=b;var z=v;var A=m;var y=K;var F=I;for(t=0;80>t;t++){var B=Math.floor(t/20),L=c(f,5);a:{switch(B){case 0:var M=z&A^~z&y;break a;case 1:M=z^A^y;break a;case 2:M=z&A^z&y^A&y;break a;case 3:M=
z^A^y;break a}M=void 0}B=L+M+F+d[B]+D[t]&4294967295;F=y;y=A;A=c(z,30);z=f;f=B}b=b+f&4294967295;v=v+z&4294967295;m=m+A&4294967295;K=K+y&4294967295;I=I+F&4294967295}return e(b)+e(v)+e(m)+e(K)+e(I)}function c(){try{return!!window.sessionStorage}catch(k){return!0}}function e(){try{return!!window.localStorage}catch(k){return!0}}function d(){var b=document.createElement("canvas");if(b.getContext&&b.getContext("2d")){var c=b.getContext("2d");c.textBaseline="top";c.font="14px 'Arial'";c.textBaseline="alphabetic";
c.fillStyle="#f60";c.fillRect(0,0,62,20);c.fillStyle="#069";c.fillText("!image!",2,15);c.fillStyle="rgba(102, 204, 0, 0.7)";c.fillText("!image!",4,17);return b.toDataURL()}return null}try{var g=[];g.push(["lang",navigator.language||navigator.browserLanguage]);g.push(["tz",(new Date).getTimezoneOffset()]);g.push(["hss",c()?"1":"0"]);g.push(["hls",e()?"1":"0"]);g.push(["odb",typeof window.openDatabase||""]);g.push(["cpu",navigator.cpuClass||""]);g.push(["pf",navigator.platform||""]);g.push(["dnt",navigator.doNotTrack||
""]);g.push(["canv",d()]);return b(g.join("=!!!="))}catch(k){return null}}this.createRequest=function(){function b(b,c){var d={};try{if(b.performance&&b.performance.getEntries){var f=b.performance.getEntries();for(b=0;b<f.length;b++){var H=f[b],g=H.name.match(/.*\/(.+?)\./);if(g&&g[1]){var h=g[1].replace(/\d+$/,""),k=c[h];if(k){for(var m=0;m<k.stats.length;m++){var l=k.stats[m];d[k.prefix+l.prefix]=Math.round(H[l.name])}delete c[h];if(!e(c))break}}}}return d}catch(qa){}}function c(c,d){var f;if(c.frames)for(var g=
0;g<c.frames.length;g++)if((f=b(c.frames[g],d))&&e(f))return f}function e(b){var c=0,e;for(e in b)b.hasOwnProperty(e)&&++c;return c}function d(b){if(b&&e(b))for(var c in b)b.hasOwnProperty(c)&&C.push(c+"="+b[c]);else C.push("dvp_noperf=1")}window._dv_win.$dv.isEval=0;window._dv_win.$dv.DebugInfo={};var g=!1,k=!1,n,p,h=!1,l=window._dv_win,u=0,r=!1,v=getCurrentTime();window._dv_win.t2tTimestampData=[{dvTagCreated:v}];var m;try{for(m=0;10>=m;m++)if(null!=l.parent&&l.parent!=l)if(0<l.parent.location.toString().length)l=
l.parent,u++,h=!0;else{h=!1;break}else{0==m&&(h=!0);break}}catch(H){h=!1}0==l.document.referrer.length?m=l.location:h?m=l.location:(m=l.document.referrer,r=!0);var K="",I=null,D=null;try{window._dv_win.external&&(I=void 0!=window._dv_win.external.QueuePageID?window._dv_win.external.QueuePageID:null,D=void 0!=window._dv_win.external.CrawlerUrl?window._dv_win.external.CrawlerUrl:null)}catch(H){K="&dvp_extErr=1"}if(!window._dv_win._dvScriptsInternal||!window._dv_win.dvProcessed||0==window._dv_win._dvScriptsInternal.length)return null;
h=window._dv_win._dvScriptsInternal.pop();var t=h.script;this.dv_script_obj=h;this.dv_script=t;window._dv_win.t2tTimestampData[0].dvWrapperLoadTime=h.loadtime;window._dv_win.dvProcessed.push(h);var f=t.src;this.dv_script_obj.dvSrc=f;void 0!=window._dv_win.$dv.CommonData.BrowserId&&void 0!=window._dv_win.$dv.CommonData.BrowserVersion&&void 0!=window._dv_win.$dv.CommonData.BrowserIdFromUserAgent?h={ID:window._dv_win.$dv.CommonData.BrowserId,version:window._dv_win.$dv.CommonData.BrowserVersion,ID_UA:window._dv_win.$dv.CommonData.BrowserIdFromUserAgent}:
(h=dv_GetParam(f,"useragent"),h=(new BrowserDetector).getBrowserIdAndVersion(h?decodeURIComponent(h):navigator.userAgent),window._dv_win.$dv.CommonData.BrowserId=h.ID,window._dv_win.$dv.CommonData.BrowserVersion=h.version,window._dv_win.$dv.CommonData.BrowserIdFromUserAgent=h.ID_UA);var z=!0,A=window.parent.postMessage&&window.JSON,y=!1;if("0"==dv_GetParam(f,"t2te")||window._dv_win.dv_config&&!0===window._dv_win.dv_config.supressT2T)y=!0;if(A&&!1===y&&5!=window._dv_win.$dv.CommonData.BrowserId)try{var F=
V(window._dv_win.dv_config.t2turl||"https://cdn3.doubleverify.com/t2tv7.html");z=Q(F)}catch(H){}window._dv_win.$dv.DebugInfo.dvp_HTML5=A?"1":"0";var B=dv_GetParam(f,"region")||"",L=(/iPhone|iPad|iPod|\(Apple TV|iOS|Coremedia|CFNetwork\/.*Darwin/i.test(navigator.userAgent)||navigator.vendor&&"apple, inc."===navigator.vendor.toLowerCase())&&!window.MSStream,M=L?"https:":aa(),N=L?"https:":ba(f);y="0";"https:"===N&&(y="1");try{l.depth=ia(l);var w=ja(l);dv_aUrlParam="&aUrl="+encodeURIComponent(w.url);
dv_aUrlDepth="&aUrlD="+w.depth;dv_referrerDepth=l.depth+u;r&&l.depth--}catch(H){dv_aUrlDepth=dv_aUrlParam=dv_referrerDepth=l.depth=""}u=dv_GetDynamicParams(f,"dvp");r=dv_GetDynamicParams(f,"dvpx");for(w=0;w<r.length;w++){var q=dv_GetKeyValue(r[w]);r[w]=q.key+"="+encodeURIComponent(q.value)}"41"==B&&(B=50>100*Math.random()?"41":"8",u.push("dvp_region="+B));u=u.join("&");r=r.join("&");B=window._dv_win.dv_config.tpsAddress||"tps"+B+".doubleverify.com";w="visit.js";switch(dv_GetParam(f,"dvapi")){case "1":w=
"dvvisit.js";break;case "5":w="query.js";break;default:w="visit.js"}window._dv_win.$dv.DebugInfo.dvp_API=w;var x="ctx cmp ipos sid plc adid crt btreg btadsrv adsrv advid num pid crtname unit chnl uid scusrid tagtype sr dt dup app dvvidver".split(" "),C=[];for(q=0;q<x.length;q++){var J=dv_GetParam(f,x[q])||"";C.push(x[q]+"="+J);""!==J&&(window._dv_win.$dv.DebugInfo["dvp_"+x[q]]=J)}x="turl icall dv_callback useragent xff timecheck seltag sadv ord litm scrt invs splc adu native gmnpo".split(" ");for(q=
0;q<x.length;q++)J=dv_GetParam(f,x[q]),null!=J&&C.push(x[q]+"="+(J||""));(q=dv_GetParam(f,"isdvvid")||"")&&C.push("isdvvid=1");x=dv_GetParam(f,"tagtype")||"";var G=window._dv_win.$dv.getMraid();a:{try{if("object"==typeof window.$ovv||"object"==typeof window.parent.$ovv){var E=!0;break a}}catch(H){}E=!1}J=ea(G,f);C.push("sup="+J);1==q||G||"video"!=x&&"1"!=x||(q=dv_GetParam(f,"adid")||"","function"===typeof _dv_win[q]&&(C.push("prplyd=1"),C.push("DVP_GVACB="+q),C.push("isdvvid=1")),q="AICB_"+(window._dv_win.dv_config&&
window._dv_win.dv_config.dv_GetRnd?window._dv_win.dv_config.dv_GetRnd():dv_GetRnd()),window._dv_win[q]=function(b){g=!0;n=b;window._dv_win.$dv&&1==k&&window._dv_win.$dv.registerEventCall(p,{prplyd:0,dvvidver:b})},C.push("AICB="+q),q=C.join("&"),x=window._dv_win.document.createElement("script"),x.src=N+"//cdn.doubleverify.com/dvvid_src.js?"+q,window._dv_win.document.body.appendChild(x));try{var T=b(window,{dvtp_src:{prefix:"d",stats:[{name:"fetchStart",prefix:"fs"},{name:"duration",prefix:"dur"}]},
dvtp_src_internal:{prefix:"dv",stats:[{name:"duration",prefix:"dur"}]}});d(T)}catch(H){}T=C.join("&");q=na();q=null!=q?"&aadid="+q:"";var X=f;B=window._dv_win.dv_config.visitJSURL||N+"//"+B+"/"+w;L=L?"&dvf=0":"";w=Z("maple")?"&dvf=1":"";f=B+"?"+T+"&dvtagver=6.1.src&srcurlD="+l.depth+"&curl="+(null==D?"":encodeURIComponent(D))+"&qpgid="+(null==I?"":I)+"&ssl="+y+L+w+"&refD="+dv_referrerDepth+"&htmlmsging="+(A?"1":"0")+q+K;G&&(f+="&ismraid=1");E&&(f+="&isovv=1");f+=fa();"http:"==f.match("^http:")&&"https"==
window._dv_win.location.toString().match("^https")&&(f+="&dvp_diffSSL=1");l=t&&t.parentElement&&t.parentElement.tagName&&"HEAD"===t.parentElement.tagName;if(!1===z||l)f+="&dvp_isBodyExistOnLoad="+(z?"1":"0"),f+="&dvp_isOnHead="+(l?"1":"0");u&&(f+="&"+u);r&&(f+="&"+r);l="srcurl="+encodeURIComponent(m);window._dv_win.$dv.DebugInfo.srcurl=m;(m=ka())&&(l+="&ancChain="+encodeURIComponent(m));m=dv_GetParam(f,"uid");null==m?(m=dv_GetRnd(),f+="&uid="+m):(m=dv_GetRnd(),f=f.replace(/([?&]uid=)(?:[^&])*/i,"$1"+
m));m=4E3;/MSIE (\d+\.\d+);/.test(navigator.userAgent)&&7>=new Number(RegExp.$1)&&(m=2E3);E=navigator.userAgent.toLowerCase();if(-1<E.indexOf("webkit")||-1<E.indexOf("chrome"))E="&referrer="+encodeURIComponent(window._dv_win.location),f.length+E.length<=m&&(f+=E);navigator&&navigator.userAgent&&(E="&navUa="+encodeURIComponent(navigator.userAgent),f.length+E.length<=m&&(f+=E));dv_aUrlParam.length+dv_aUrlDepth.length+f.length<=m&&(f+=dv_aUrlDepth,l+=dv_aUrlParam);m=ca();f+="&vavbkt="+m.vdcd;f+="&lvvn="+
m.vdcv;f+="&"+this.getVersionParamName()+"="+this.getVersion();f+="&eparams="+encodeURIComponent(S(l));""!=m.err&&(f+="&dvp_idcerr="+encodeURIComponent(m.err));h.ID&&(f+="&brid="+h.ID+"&brver="+h.version+"&bridua="+h.ID_UA+"&bds=1",window._dv_win.$dv.DebugInfo.dvp_BRID=h.ID,window._dv_win.$dv.DebugInfo.dvp_BRVR=h.version,window._dv_win.$dv.DebugInfo.dvp_BRIDUA=h.ID_UA);void 0!=window._dv_win.$dv.CommonData.Scenario?h=window._dv_win.$dv.CommonData.Scenario:(h=this.getTrafficScenarioType(window._dv_win),
window._dv_win.$dv.CommonData.Scenario=h);f+="&tstype="+h;window._dv_win.$dv.DebugInfo.dvp_TS=h;var O="";try{window.top==window?O="1":window.top.location.host==window.location.host&&(O="2")}catch(H){O="3"}var P=window._dv_win.document.visibilityState,Y=function(){var b=!1;try{b=G&&"function"===typeof G.getState&&"loading"===G.getState()}catch(pa){f+="&dvp_mrgsf=1"}return b},U=Y();if("prerender"===P||U)f+="&prndr=1",U&&(f+="&dvp_mrprndr=1");h="dvCallback_"+(window._dv_win.dv_config&&window._dv_win.dv_config.dv_GetRnd?
window._dv_win.dv_config.dv_GetRnd():dv_GetRnd());var R=this.dv_script;window._dv_win[h]=function(b,e,d,h){var m=getCurrentTime();k=!0;p=d;e.$uid=d;var l=W(X);b.tags.add(d,l);l=W(f);b.tags[d].set(l);b.tags[d].beginVisitCallbackTS=m;b.tags[d].set({tagElement:R,dv_protocol:N,protocol:M,uid:d});b.tags[d].ImpressionServedTime=getCurrentTime();b.tags[d].getTimeDiff=function(){return(new Date).getTime()-this.ImpressionServedTime};try{"undefined"!=typeof h&&null!==h&&(b.tags[d].ServerPublicDns=h),b.tags[d].adServingScenario=
O,b.tags[d].t2tIframeCreationTime=v,b.tags[d].t2tProcessed=!1,b.tags[d].t2tIframeId=F.id,b.tags[d].t2tIframeWindow=F.contentWindow,$dv.t2tEventDataZombie[F.id]&&(b.tags[d].uniquePageViewId=$dv.t2tEventDataZombie[F.id].uniquePageViewId,$dv.processT2TEvent($dv.t2tEventDataZombie[F.id],b.tags[d]))}catch(oa){}b.messages&&b.messages.startSendingEvents&&b.messages.startSendingEvents(e,d);1==g&&b.registerEventCall(d,{prplyd:0,dvvidver:n});(function(){function c(){var e=window._dv_win.document.visibilityState;
"prerender"===P&&"prerender"!==e&&"unloaded"!==e&&(P=e,b.tags[d].set({prndr:0}),b.registerEventCall(d,{prndr:0}),b&&b.pubSub&&b.pubSub.publishHistoryRtnEvent(d),window._dv_win.document.removeEventListener(g,c))}function e(){"function"===typeof G.removeEventListener&&G.removeEventListener("ready",e);b.tags[d].set({prndr:0});b.registerEventCall(d,{prndr:0});b&&b.pubSub&&b.pubSub.publishHistoryRtnEvent(d)}if("prerender"===P){var f=window._dv_win.document.visibilityState;if("prerender"!==f&&"unloaded"!==
f)b.tags[d].set({prndr:0}),b.registerEventCall(d,{prndr:0}),b&&b.pubSub&&b.pubSub.publishHistoryRtnEvent(d);else{var g;"undefined"!==typeof window._dv_win.document.hidden?g="visibilitychange":"undefined"!==typeof window._dv_win.document.mozHidden?g="mozvisibilitychange":"undefined"!==typeof window._dv_win.document.msHidden?g="msvisibilitychange":"undefined"!==typeof window._dv_win.document.webkitHidden&&(g="webkitvisibilitychange");window._dv_win.document.addEventListener(g,c,!1)}}else U&&(Y()?"function"===
typeof G.addEventListener&&G.addEventListener("ready",e):(b.tags[d].set({prndr:0}),b.registerEventCall(d,{prndr:0}),b&&b.pubSub&&b.pubSub.publishHistoryRtnEvent(d)))})();try{var q=c(window,{visit:{prefix:"v",stats:[{name:"duration",prefix:"dur"}]}});q&&$dv.registerEventCall(d,q)}catch(oa){}};(l=la())&&(f+="&m1="+l);(l=ma())&&(f+="&bsig="+l);(l=da(X))&&(f+="&"+l);return f+"&jsCallback="+h};this.sendRequest=function(b){window._dv_win.t2tTimestampData.push({beforeVisitCall:getCurrentTime()});var c=this.dv_script_obj&&
this.dv_script_obj.injScripts,e=this.dv_script_obj&&this.dv_script_obj.injDvms,d=this.dv_script_obj&&this.dv_script_obj.srcLocation,g=this.dv_script_obj&&this.dv_script_obj.dvSrc;c=ha(this.getVersionParamName(),this.getVersion(),b,c,d,g,e);b=V("about:blank");e=b.id.replace("iframe_","");b.setAttribute&&b.setAttribute("data-dv-frm",e);Q(b,this.dv_script);if(this.dv_script){this.dv_script.id="script_"+e;e=this.dv_script;a:{d=null;try{if(d=b.contentWindow){var k=d;break a}}catch(n){}try{if(d=window._dv_win.frames&&
window._dv_win.frames[b.name]){k=d;break a}}catch(n){}k=null}e.dvFrmWin=k}if(k=R(b))k.open(),k.write(c);else{try{document.domain=document.domain}catch(n){}k=encodeURIComponent(c.replace(/'/g,"\\'").replace(/\n|\r\n|\r/g,""));b.src='javascript: (function(){document.open();document.domain="'+window.document.domain+"\";document.write('"+k+"');})()"}return!0};this.isApplicable=function(){return!0};this.onFailure=function(){window._dv_win._dvScriptsInternal.unshift(this.dv_script_obj);var b=window._dv_win.dvProcessed,
c=this.dv_script_obj;null!=b&&void 0!=b&&c&&(c=b.indexOf(c),-1!=c&&b.splice(c,1));return window._dv_win.$dv.DebugInfo};this.getTrafficScenarioType=function(b){b=b||window;var c=b._dv_win.$dv.Enums.TrafficScenario;try{if(b.top==b)return c.OnPage;for(var e=0;b.parent!=b&&1E3>e;){if(b.parent.document.domain!=b.document.domain)return c.CrossDomain;b=b.parent;e++}return c.SameDomain}catch(d){}return c.CrossDomain};this.getVersionParamName=function(){return"jsver"};this.getVersion=function(){return"144"}}
;


function dv_src_main(dv_baseHandlerIns, dv_handlersDefs) {

    this.baseHandlerIns = dv_baseHandlerIns;
    this.handlersDefs = dv_handlersDefs;

    this.exec = function () {
        try {
            window._dv_win = (window._dv_win || window);
            window._dv_win.$dv = (window._dv_win.$dv || new dvType());

            window._dv_win.dv_config = window._dv_win.dv_config || {};
            window._dv_win.dv_config.tpsErrAddress = window._dv_win.dv_config.tpsAddress || 'tps30.doubleverify.com';

            var errorsArr = (new dv_rolloutManager(this.handlersDefs, this.baseHandlerIns)).handle();
            if (errorsArr && errorsArr.length > 0) {
                dv_SendErrorImp(window._dv_win.dv_config.tpsErrAddress + '/visit.jpg?ctx=818052&cmp=1619415&dvtagver=6.1.src', errorsArr);
            }
        }
        catch (e) {
            try {
                dv_SendErrorImp(window._dv_win.dv_config.tpsErrAddress + '/visit.jpg?ctx=818052&cmp=1619415&dvtagver=6.1.src&jsver=0&dvp_isLostImp=1', {dvp_jsErrMsg: encodeURIComponent(e)});
            } catch (e) { }
        }
    };
}

try {
    window._dv_win = window._dv_win || window;
    var dv_baseHandlerIns = new dv_baseHandler();
	dv_handler145.prototype = dv_baseHandlerIns;
dv_handler145.prototype.constructor = dv_handler145;

    var dv_handlersDefs = [{handler: new dv_handler145(), minRate: 0, maxRate: 90}];
    (new dv_src_main(dv_baseHandlerIns, dv_handlersDefs)).exec();
} catch (e) { }