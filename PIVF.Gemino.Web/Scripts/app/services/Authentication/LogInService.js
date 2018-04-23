PIVF.service('LogInServ', function ($http,API,$q) {

    var deferred = $q.defer();
    this.GetCurrentUser = function ()
    {
        return $http.get(API.url + 'GetCurrentUserPatientID')
        .then(function (resp) {
            deferred.resolve(resp.data);
            return resp.data;
        }, function (resp) {
            deferred.reject(resp);
            return deferred.promise;
        })
    }


})