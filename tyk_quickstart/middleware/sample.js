// Create your middleware object
var sampleMiddleware = new TykJS.TykMiddleware.NewMiddleware({});

// Initialise it with your functionality by passing a closure that accepts two objects
// into the NewProcessRequest() function:
sampleMiddleware.NewProcessRequest(function(request, session) {

    log("This middleware does nothing, but will print this to your terminal. OK.")

    ip = request['Headers']['X-Remote-Addr']['0']
    
    var url = "http://172.23.254.137:4000/"
    var priv_url = url+"privilege/check?param="+JSON.stringify(request.Params)+"&url="+request.URL+"&X-Remote-Addr="+ip
    var cust_url = url+"customer?token="+request.Params.token

    log("[Middleware Test] Making Upstream Batch Request")
    log("Privilege uel : "+priv_url)

    var newBody = TykBatchRequest(JSON.stringify({
        "requests": [
            {
                "method": "GET",
                "headers": { "header" : JSON.stringify(request.Headers)},
                "body": "",
                "relative_url": priv_url
            }
        ],
        "suppress_parallel_execution": false
    }))

    var asJS = JSON.parse(newBody)
    log("Response from privilege : "+newBody)

    for (var i in asJS) {
        asJS[i].body = JSON.parse(asJS[i].body)
    }

    // var timestamp = asJS[0].body.timestamp
    log("Return from privilege : "+asJS[0].body.allow)
    var allow = asJS[0].body.allow

    if( allow == "reject" ) {
        request.ReturnOverrides.ResponseCode = 401
        request.ReturnOverrides.ResponseError = 'Permission denied'

        return sampleMiddleware.ReturnData(request, {});
    } else {
        log("permit")
    }


    // Resolved customer from token
    log("Customer URL : "+cust_url)

    var authBody = TykBatchRequest(JSON.stringify({
        "requests": [
            {
                "method": "GET",
                "headers": { "header" : JSON.stringify(request.Headers)},
                "body": "",
                "relative_url": cust_url
            }
        ],
        "suppress_parallel_execution": false
    }))
    
    log("Response from cust : "+authBody)
    var cusJS = JSON.parse(authBody)

    for (var i in cusJS) {
        cusJS[i].body = JSON.parse(cusJS[i].body)
    }

    // var timestamp = asJS[0].body.timestamp
    log("Return from auth : "+cusJS[0].body.customer_id)

    request.AddParams["apiKey"] = "j9928493";

    if(cusJS[0].body.customer_id != "0"){
        log("valid customer")
        request.AddParams["customer_id"] = cusJS[0].body.customer_id;
    } else {
        log("invalid customer")
        request.DeleteParams.push("customer_id");
    }

    // log("This middleware does nothing, but will print this to your terminal.")

    return sampleMiddleware.ReturnData(request, session.meta_data);
});