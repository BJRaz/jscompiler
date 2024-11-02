const tTokens = {
	'SEMI': 0,
	'NUMBER': 1,
	'PLUSOPERATOR': 2,
	'MINUSOPERATOR': 4,
	'TIMESOPERATOR': 8,
	'DIVISIONOPERATOR': 16,
	'LEFTP': 32,
	'RIGHTP': 64
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