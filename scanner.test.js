const scanner = require('./js/scanner');
const parser = require('./js/parser');

test('scan -2+2', () => {
    let str = [];
    let tokenlist = scanner.scan("2+2")
    for(var i in tokenlist)
        str[str.length] = tokenlist[i].getValue() + ", ";
    str = str.join('');
    expect(str).toBe("2, +, 2, ");
});

test('scan -2+(-2)', () => {
    let str = [];
    let tokenlist = scanner.scan("-2+(-2)")
    for(var i in tokenlist)
        str[str.length] = tokenlist[i].getValue() + ", ";
    str = str.join('');
    expect(str).toBe("-2, +, (, -2, ), ");
});

test('scan (-2)+(2)', () => {
    let str = [];
    let tokenlist = scanner.scan("(-2)+(2)")
    for(var i in tokenlist)
        str[str.length] = tokenlist[i].getValue() + ", ";
    str = str.join('');
    expect(str).toBe("(, -2, ), +, (, 2, ), ");
});

test('scan (-2)+(-2)', () => {
    let str = [];
    let tokenlist = scanner.scan("(-2)+(-2)")
    for(var i in tokenlist)
        str[str.length] = tokenlist[i].getValue() + ", ";
    str = str.join('');
    expect(str).toBe("(, -2, ), +, (, -2, ), ");
});

test('scan -2*(-2/-100)-100', () => {
    let str = [];
    let tokenlist = scanner.scan("-2*(-2/-100)-100")
    for(var i in tokenlist)
        str[str.length] = tokenlist[i].getValue() + ", ";
    str = str.join('');
    expect(str).toBe("-2, *, (, -2, /, -100, ), -, 100, ");
});

test('scan 5-(18/(9-3))', () => {
    let str = [];
    let tokenlist = scanner.scan("5-(18/(9-3))")
    for(var i in tokenlist)
        str[str.length] = tokenlist[i].getValue() + ", ";
    str = str.join('');
    expect(str).toBe("5, -, (, 18, /, (, 9, -, 3, ), ), ");
});

test('parse and evaluate 5-(18/(9-3))', () => {
    let result = parser.parse("5-(18/(9-3))");
    
    expect(result).toBe(2);
});

test('parse and evaluate 2*2', () => {
    let result = parser.parse("2*(2*5)");
    
    expect(result).toBe(20);
});

test('parse and evaluate (2*2)-1', () => {
    let result = parser.parse("(2*2)-1");
    
    expect(result).toBe(3);
});

// test('parse and evaluate 2*2-1', () => {
//     let result = parser.parse("2*2-1");
    
//     expect(result).toBe(3);
// });

test('parse and evaluate 2*(2-1)', () => {
    let result = parser.parse("2*(2-1)");
    
    expect(result).toBe(2);
});