'use strict';

var request = require('sync-request');
var mcache  = require('memory-cache');
var crypto  = require('crypto');

module.exports = class RestHelper {
  _callRest(method, baseUrl, param, option){
    let return_response
    let cacheKey   = method+":"+baseUrl+":"+JSON.stringify(param)+":"+option
    let cachedBody = mcache.get(cacheKey)

    cacheKey = crypto.createHash('md5').update(cacheKey).digest("hex");

    if (cachedBody) {
      return cachedBody
    } else {
      let response

      // console.log(baseUrl)
      // console.log(option)

      if(method == 'GET'){
        baseUrl += '?' + param
        
        response = request(method, baseUrl, option)
        
      } else {
        option.body = param
        option.headers['content-type'] = 'application/x-www-form-urlencoded'

        response = request(method, baseUrl, option)
      }

      // console.log("Response :"+response.getBody())
      return_response = JSON.parse(response.getBody('utf-8'))

      if (return_response)
        mcache.put(cacheKey, return_response, 3000);
    }

    return return_response
  }
}