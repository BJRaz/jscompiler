const scanner = require('../js/scanner2');

function helper(tokenlist) {
    return tokenlist.map((e) => e.getValue() + ", ").join('');
}

function scantokens(exp) {
    let tokenlist = [];
    let currentToken = null;
    scanner.scan(exp);
    currentToken = scanner.nextToken();
    while(currentToken != null)
    {
        tokenlist.push(currentToken);
        currentToken = scanner.nextToken();
    }
    return tokenlist;
}

test('scan 2+2', () => {
    expect(helper(scantokens("2+2"))).toBe("2, +, 2, ");
});

// test('scan ..2+2', () => {
//     expect(() => scanner.scan("..2+2")).toThrow("Unaccepted character: '.', at index: 1");
// });

// test('scan -..1+2', () => {
//     expect(() => scanner.scan("-..1+2")).toThrow("Unaccepted character: '.', at index: 2");
// });

// test('scan 2+2..0', () => {
//     expect(() => scanner.scan("2+2..0")).toThrow("Unaccepted character: '.', at index: 4");
// });

test('scan 2+2', () => {
    expect(helper(scantokens("2+2"))).toBe("2, +, 2, ");
});

test('scan .0+2', () => {
    expect(helper(scantokens(".0+2"))).toBe(".0, +, 2, ");
});

test('scan 2.0+2', () => {
    expect(helper(scantokens("2.0+2"))).toBe("2.0, +, 2, ");
});

test('scan -2+2', () => {
    expect(helper(scantokens("-2+2"))).toBe("-2, +, 2, ");
});

test('scan -2+(-2)', () => {
    expect(helper(scantokens("-2+(-2)"))).toBe("-2, +, (, -2, ), ");
});

test('scan (-2)+(2)', () => {
    expect(helper(scantokens("(-2)+(2)"))).toBe("(, -2, ), +, (, 2, ), ");
});

test('scan (-2)+(-2)', () => {
    expect(helper(scantokens("(-2)+(-2)"))).toBe("(, -2, ), +, (, -2, ), ");
});

test('scan -2*(-2/-100)-100', () => {
    expect(helper(scantokens("-2*(-2/-100)-100"))).toBe("-2, *, (, -2, /, -100, ), -, 100, ");
});

test('scan 5-(18/(9-3))', () => {
    expect(helper(scantokens("5-(18/(9-3))"))).toBe("5, -, (, 18, /, (, 9, -, 3, ), ), ");
});

test('scan 2+(-10.5-4)', () => {
    expect(helper(scantokens("2+(-10.5-4)"))).toBe("2, +, (, -10.5, -, 4, ), ");
});

test('scan 2+(-10.5-4)', () => {
    expect(helper(scantokens("2+(-.5-4)"))).toBe("2, +, (, -.5, -, 4, ), ");
});

test('scan 1-a', () => {
    scanner.scan("1-a")
    expect(() => scantokens("1-a")).toThrow();
});

