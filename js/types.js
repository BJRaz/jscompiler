const tTokens = {
	'NUMBER': 1,
	'OPERATOR': 2,
	'PARASTART': 4,
	'PARAEND': 8
};

class Token 
{
	constructor(tokentype, value) {
		this.value = value;
		this.tokentype = tokentype;
	}
	token() { 
		return this.tokentype;
	}
	getValue() {
		return this.value;
	}	

    toString() {
        return ("'" + this.getValue() + "'" + " type: " + this.token() + " ").toString()
    }
};

module.exports = {
    Token: Token,
    tTokens: tTokens
}