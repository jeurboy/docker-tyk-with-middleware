class User {
    __constructor(){ 
        console.log("User was loaded")
    }

	privilege(req, res, next){
		console.log("req.query.param")
		console.log(req.query.param)

		console.log("req.body")
		console.log(req.body)

		console.log("req.params")
		console.log(req.params)

		console.log("req.query")
		console.log(req.query)

		console.log("req.headers")
		console.log(req.headers)

		var regex = [
			/^\/makro\/$/ ,
			/^\/makro\/get$/ ,
		];
		var return_value = null

		regex.forEach(function(regex) {
			if(req.query.url.match(regex)){
				return_value = true
		    }
		})

		if(return_value) {
			console.log("Permit : "+req.query.url)
	        return res.send({"allow" : "permit"})
	    }

		console.log("Not permit : "+req.query.url)
        return res.send({"allow" : "reject"})
	}
}

module.exports = User