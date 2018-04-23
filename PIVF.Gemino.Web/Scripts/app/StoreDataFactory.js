//This are common Factory use for when Redirct page store the previous nessariy data
PIVF.factory("DataFactory", function () {
    var SavedData = {};
    function setObj(data) {
        SavedData = data;
    }
    function getObj() {
        return SavedData;
    }
    function clearObj() {
        SavedData = {};
    };
    return {
        setObj: setObj,
        getObj: getObj,
        clearObj: clearObj
    }
})