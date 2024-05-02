
const parser = require('./js/parser');

test('parse and evaluate .2+2', () => {
    expect(parser.parse(".2+2")).toBe(2.2);
});

test('parse and evaluate 2+.4', () => {
    expect(parser.parse("2+.4")).toBe(2.4);
});

test('parse and evaluate 5-(18/(9-3))', () => {
    expect(parser.parse("5-(18/(9-3))")).toBe(2);
});

test('parse and evaluate 2+2', () => {
    expect(parser.parse("2+2")).toBe(4);
});

test('parse and evaluate 2*(2*5)', () => {
    expect(parser.parse("2*(2*5)")).toBe(20);
});

test('parse and evaluate (2*2)-1', () => {
    expect(parser.parse("(2*2)-1")).toBe(3);
});

test('parse and evaluate 2*2-1', () => {
    expect(() => {
        parser.parse("2*2-1")
    }).toThrow("Unexpected token '-' type: 2");
});

test('parse and evaluate 2*(2-1)', () => {
    expect(parser.parse("2*(2-1)")).toBe(2);
});