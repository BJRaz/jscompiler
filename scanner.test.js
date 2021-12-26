const scanner = require('./js/scanner');

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
