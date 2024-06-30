const scanner = require('../js/scanner');

function helper(tokenlist) {
    return tokenlist.map((e) => e.getValue() + ", ").join('');
}

test('scan ..2+2', () => {
    expect(() => scanner.scan("..2+2")).toThrow("Unaccepted character: '.', at index: 1");
});

test('scan -..1+2', () => {
    expect(() => scanner.scan("-..1+2")).toThrow("Unaccepted character: '.', at index: 2");
});

test('scan 2+2..0', () => {
    expect(() => scanner.scan("2+2..0")).toThrow("Unaccepted character: '.', at index: 4");
});

test('scan 2+2', () => {
    let tokenlist = scanner.scan("2+2");
    expect(helper(tokenlist)).toBe("2, +, 2, ");
});

test('scan .0+2', () => {
    let tokenlist = scanner.scan(".0+2");
    expect(helper(tokenlist)).toBe(".0, +, 2, ");
});

test('scan 2.0+2', () => {
    let tokenlist = scanner.scan("2.0+2");
    expect(helper(tokenlist)).toBe("2.0, +, 2, ");
});

test('scan -2+2', () => {
    let tokenlist = scanner.scan("-2+2");
    expect(helper(tokenlist)).toBe("-2, +, 2, ");
});

test('scan -2+(-2)', () => {
    let tokenlist = scanner.scan("-2+(-2)")
    expect(helper(tokenlist)).toBe("-2, +, (, -2, ), ");
});

test('scan (-2)+(2)', () => {
    let tokenlist = scanner.scan("(-2)+(2)")
    expect(helper(tokenlist)).toBe("(, -2, ), +, (, 2, ), ");
});

test('scan (-2)+(-2)', () => {
    let tokenlist = scanner.scan("(-2)+(-2)")
    expect(helper(tokenlist)).toBe("(, -2, ), +, (, -2, ), ");
});

test('scan -2*(-2/-100)-100', () => {
    let tokenlist = scanner.scan("-2*(-2/-100)-100")
    expect(helper(tokenlist)).toBe("-2, *, (, -2, /, -100, ), -, 100, ");
});

test('scan 5-(18/(9-3))', () => {
    let tokenlist = scanner.scan("5-(18/(9-3))")
    expect(helper(tokenlist)).toBe("5, -, (, 18, /, (, 9, -, 3, ), ), ");
});

test('scan 2+(-10.5-4)', () => {
    let tokenlist = scanner.scan("2+(-10.5-4)")
    expect(helper(tokenlist)).toBe("2, +, (, -10.5, -, 4, ), ");
});

test('scan 2+(-10.5-4)', () => {
    let tokenlist = scanner.scan("2+(-.5-4)")
    expect(helper(tokenlist)).toBe("2, +, (, -.5, -, 4, ), ");
});

test('scan 1-a', () => {
    expect(() => scanner.scan("1-a")).toThrow();
});
