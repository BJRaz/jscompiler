
const parser = require('../js/recursive_descent_parser');


test('parse and evaluate 2+2', () => {
    expect(parser.parse("2+2")).toBe(4);
});

test('parse and evaluate 3*2+2', () => {
    expect(parser.parse("3*2+2")).toBe(8);
});

test('parse and evaluate 2*2-1', () => {
    expect(parser.parse("2*2-1")).toBe(3);
});

test('parse and evaluate 2-2', () => {
    expect(parser.parse("2-2")).toBe(0);
});

test('parse and evaluate 2/2', () => {
    expect(parser.parse("2/2")).toBe(1);
});

test('parse and evaluate 2*2', () => {
    expect(parser.parse("2*2")).toBe(4);
});

test('parse and evaluate .5*.5', () => {
    expect(parser.parse(".5*.5")).toBe(.25);
});

test('parse and evaluate .5/.5', () => {
    expect(parser.parse(".5/.5")).toBe(1);
});

test('parse and evaluate .2+2', () => {
    expect(parser.parse(".2+2")).toBe(2.2);
});

test('parse and evaluate 2+.4', () => {
    expect(parser.parse("2+.4")).toBe(2.4);
});

test('parse and evaluate 2*(2*5)', () => {
    expect(parser.parse("2*(2*5)")).toBe(20);
});

test('parse and evaluate (2*2)-1', () => {
    expect(parser.parse("(2*2)-1")).toBe(3);
});

test('parse and evaluate 2*(2-1)', () => {
    expect(parser.parse("2*(2-1)")).toBe(2);
});

test('parse and evaluate 2+(-10.5-4)', () => {
    expect(parser.parse("2+(-10.5-4)")).toBe(-12.5);
});

test('parse and evaluate 2+(-.5-4)', () => {
    expect(parser.parse("2+(-.5-4)")).toBe(-2.5);
});

test('parse and evaluate 5-(18/(9-3))', () => {
    expect(parser.parse("5-(18/(9-3))")).toBe(2);
});

test('parse and evaluate -3+4*21', () => {
    expect(parser.parse("-3+4*21")).toBe(81);
});

test('parse and evaluate -2+(4*10+3)/2', () => {
    expect(parser.parse("-2+(4*10+3)/2")).toBe(19.5);
});

test('parse and evaluate -2+(4*10)/2', () => {
    expect(parser.parse("-2+(4*10)/2")).toBe(18);
});

test('parse and evaluate 2+3', () => {
    expect(parser.parse("2+3")).toBe(5);
});

test('parse and evaluate 2-3', () => {
    expect(parser.parse("2-3")).toBe(-1);
});

test('parse and evaluate 2-3+3', () => {
    expect(parser.parse("2-3+3")).toBe(2);
});

test('parse and evaluate 2*2', () => {
    expect(parser.parse("2*2")).toBe(4);
});

test('parse and evaluate 2/2', () => {
    expect(parser.parse("2/2")).toBe(1);
});

test('parse and evaluate 1+2/2', () => {
    expect(parser.parse("1+2/2")).toBe(2);
});

test('parse and evaluate 2*2-1', () => {
    expect(parser.parse("2*2-1")).toBe(3);
});

test('parse and evaluate (2*2)-1', () => {
    expect(parser.parse("(2*2)-1")).toBe(3);
});

test('parse and evaluate 4-(2*2)', () => {
    expect(parser.parse("4-(2*2)")).toBe(0);
});

test('parse and evaluate 4-(2*2)', () => {
    expect(parser.parse("4-(2*2)")).toBe(0);
});

test('parse and evaluate 1+1;2+2)', () => {
    expect(parser.parse("1+1;2+2")).toEqual([2,4]);
});