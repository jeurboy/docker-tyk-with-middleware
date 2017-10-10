class PrivilegeController {
    constructor(){
    	if(!global['rule']) global['rule'] = this._load_rule()
    }
    _load_rule(){
    	var allow_ip = [
    		'172.19.0.1' ,
    		'172.19.0.12'
    	]
    	return [
			{"auth_type" : "pattern", "pattern" : '\\/makro\\/'		, "rule"	: "permit" , "allow_ip" : allow_ip},
			{"auth_type" : "pattern", "pattern" : '\\/makro\\/\\d+'	, "rule"	: "permit" , "allow_ip" : allow_ip},
			{"auth_type" : "pattern", "pattern" : '\\/makro\\/get' 	, "rule"	: "reject" , "allow_ip" : allow_ip},

			{"auth_type" : "default", "rule"	: "reject" , "allow_ip" : allow_ip}
 		]
    }
    _get_rule(){
    	return global['rule']
    }
    _set_rule(rule) {
    	return global['rule'] = rule; 
    }
    _IsJsonString(str) {
	    try {
	        JSON.parse(str);
	    } catch (e) {
	        return false;
	    }

	    return true;
	}

    // Controller using for Express
	privilege_get(req, res, next) {
		var res_return = []
		var regex = new PrivilegeController()._get_rule()
		var rule_match = "reject"

		regex.forEach(function(regex_rule) {
			if(regex_rule["auth_type"] == "pattern") {
				res_return.push({
					"pattern" 	: regex_rule["pattern"], 
					"auth_type" : regex_rule["auth_type"],
					"rule" 		: regex_rule["rule"],
					"allow_ip"  : regex_rule["allow_ip"]
				})
			}
			if(regex_rule["auth_type"] == "default") {
				res_return.push({
					"auth_type" : regex_rule["auth_type"],
					"rule" 		: regex_rule["rule"],
					"allow_ip"  : regex_rule["allow_ip"]
				})
			}
		})

		res.send(JSON.stringify(res_return));
	}

	privilege_set(req, res, next) {
    	var rule =  [
			{ "auth_type" : "default", "rule"	: "reject" , "allow_ip" : [] }
 		]

  		// console.log(req.query)
    	// console.log(JSON.parse(req.body.privilege))
		// console.log(req.params)

		if(new PrivilegeController()._IsJsonString(req.body.privilege) == true ) {
			// console.log("Valid")
			// console.log(req.body.privilege)
	 		new PrivilegeController()._set_rule(JSON.parse(req.body.privilege))

	        return res.send({"status" : "success"})
	    } else {
	        return res.send({"status" : "fail"})
	    }
	}

	privilege_check(req, res, next){
		// console.log("req.query.param")
		// console.log(req.query.param)

		// console.log("req.body")
		// console.log(req.body)

		// console.log("req.params")
		// console.log(req.params)

		// console.log("req.query")
		// console.log(req.query)

		// console.log("req.headers")
		// console.log(req.headers)

		var regex = new PrivilegeController()._get_rule()
		var rule_match = '';
		var match_rule = '';

		regex.forEach(function(regex_rule) {
			if (rule_match != '') return;

			var regex_rule_pattern = "^"+regex_rule["pattern"]+"$"

			console.log(new RegExp(regex_rule_pattern).toString())

			if (regex_rule["auth_type"] == "pattern" && req.query.url.match(new RegExp(regex_rule_pattern))) {

				regex_rule["allow_ip"].forEach(function(allow_ip) {
					if (req.query['X-Remote-Addr'].match("^"+allow_ip+":")) {
						rule_match = regex_rule["rule"]
						match_rule = regex_rule_pattern
					}
				})

			}

			if(regex_rule["auth_type"] == "default" ) {
				regex_rule["allow_ip"].forEach(function(allow_ip) {
					if (req.query['X-Remote-Addr'].match("^"+allow_ip+":\\d*$")) {
						rule_match = regex_rule["rule"]
						match_rule = "default"
					}
				})
			}
		})

		console.log("X-Remote-Addr : "+req.query['X-Remote-Addr'])
		console.log("URL : "+req.query.url)
		console.log("Match rule : "+match_rule)

		if(rule_match == 'permit') {
			console.log("Validation result : Permit")
	        return res.send({"allow" : "permit"})
	    }

		console.log("Validation result : Not permit")
        return res.send({"allow" : "reject"})
	}
}

module.exports = PrivilegeController