function MybatchTest(request, session, config) {
    log("Virtual Test running")

    log("Request Body: ")
    log(request.Body)

    log("Session: ")
    log(session)

    log("Config:")
    log(config)

    // log("param-1:")
    // log(request.Params["param1"])

    // var responseObject = {
    //     Body: "THIS IS A  VIRTUAL RESPONSE",
    //     Headers: {
    //         "test": "virtual",
    //         "test-2": "virtual"
    //     },
    //     Code: 200
    // }

	var responseObject = {
		"Body" : "THIS IS A  VIRTUAL RESPONSE",
		"Code" : 200
	}
    return TykJsResponse(responseObject, session.meta_data);
}

log("Jeur Virtual Test initialised")