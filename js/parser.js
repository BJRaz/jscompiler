var c = null;
	
	// statement 	:= 	exp 
	// exp			:= 	factor operator factor
	// factor		:=	( exp ) | NUMBER
	// operator		:=  + | - | * | /
	

	var expr = "1000*4";
	var debth = 0;
	var stack = [];
	
	var tokenlist = [];

	var currenttoken = null;
	var currentindex = 0;
	var next = null;

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
	};
	// jquery
	
	

	
	function statement() {
		exp();
	}

	function exp() {
		factor();
		operator();
		
	}

	function factor() {
		if(currentToken().token() == 1)
		stack.push(currentToken().getValue());
		console.log("'" + currentToken().getValue() + "'" + " type: " + currentToken().token() + " ");
		nextToken();
		if(currentToken().token() == tTokens.PARASTART)
			{
				advance();
				exp();
			}
		advance();
	}

	function operator() {
		var tokenValue = currentToken();
		//stack.push(tokenValue.getValue());
		advance();
		factor();
		
		
		switch(tokenValue.getValue())
		{
			case '+':
				console.log("PLUS");
				var num = stack.pop();
				stack.push(stack.pop() + num);
				break;
			case '-':
				console.log("MINUS");
				var num = stack.pop();
				stack.push(stack.pop() - num);
				break;
			case '*':
				console.log("MULTIPLY");
				stack.push(stack.pop() * stack.pop());
				break;
			case '/':
				console.log("DIVISION");
				var divisor = stack.pop();
				stack.push(stack.pop() / divisor);
				break;
			default:
				throw new Error("Unknown operator " + tokenValue.token());
		}
		
	}

	// *******

	function nextToken() {
		if(tokenlist.length == currentindex)
			throw Error('Index out of bounds');
		next = tokenlist[currentindex + 1];
	}

	function advance() {
		currenttoken = tokenlist[++currentindex];
	}

	function currentToken() {
		return tokenlist[currentindex];
	}

	function beginEvaluate(exp) {
		$("#log").html("Starting to Evaluate: " + exp + "<br>");
		exp = exp.trim();
		stack.push(debth);
		var result = evaluate(exp);
		stack.pop();
		return result;
	}

	function evaluate(exp)
	{
		var debth = stack[stack.length-1] + 1;
		stack.push(debth);
		$("#log").html("(debth: " + (debth) + ") Evaluerer: " + exp + "<br>" + $("#log").html());
		
		var len = exp.length;
		for(i=0;i<len;i++)
		{
			var c = exp.charAt(i);
			// if(c == '(') {
			// 	var left = evaluate(exp.substring(i+1, len));
			// 	console.log(left);
			// 	stack.pop();
			// 	return left;
			// }
			// if(c == ')') {
			// 	var right = evaluate(exp.substring(0, i));
			// 	console.log(right);
			// 	stack.pop();
			// 	return right;
			// }
			if(c == '+' || c == '-' || c == '*' || c == '/')
			{
				var left = evaluate(exp.substring(0,i));
				
				var right = evaluate(exp.substring(i+1, len));
				
				var result = 0;
				switch(c)
				{
					case '+':
						result = left + right;
						break;
					case '-':
						result = left - right;
						break;
					case '*':
						result = left * right;
						break;
					case '/':
						result = left / right;
						break;
				}
				// console.log("result: " + result);
				stack.pop();
				return result;

			}
		}
		stack.pop();
		return exp;
	}
	
    function test() {
        // var result = evaluate(expr);
		
		// $("#clock").text(result);
		
		//tokenlist[tokenlist.length] = new Token(PARASTART, null);
		/*tokenlist[tokenlist.length] = new Token(tTokens.PARASTART, '(');
		tokenlist[tokenlist.length] = new Token(tTokens.NUMBER, 200);
		tokenlist[tokenlist.length] = new Token(tTokens.OPERATOR, '*');
		tokenlist[tokenlist.length] = new Token(tTokens.NUMBER, 4);
		tokenlist[tokenlist.length] = new Token(tTokens.PARAEND, ')');
		tokenlist[tokenlist.length] = new Token(tTokens.OPER, '+');
		tokenlist[tokenlist.length] = new Token(tTokens.PARASTART, '(');
		tokenlist[tokenlist.length] = new Token(tTokens.NUMBER, 4);
		tokenlist[tokenlist.length] = new Token(tTokens.OPERATOR, '/');
		tokenlist[tokenlist.length] = new Token(tTokens.NUMBER, 2);
		tokenlist[tokenlist.length] = new Token(tTokens.PARAEND, ')');*/
		//tokenlist[tokenlist.length] = new Token(tTokens.NUMBER, 1000);
		
		//tokenlist[tokenlist.length] = new Token(PARAEND, null);
		// svarer til 1000+(200*4)
		

		statement();
		console.log(stack.pop());
		//console.log(beginEvaluate(expr));
    }