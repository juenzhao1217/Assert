/**
 * Created by dllo on 17/4/20.
 */
const assert = require('assert');
// 1.assert(value[, message])
// 测试结果是否为真（true），相当于assert.equal(true, !!value, message);

assert(true);
// 通过
assert(1);
// 通过
assert(false);
// 抛出 "AssertionError: false == true"
assert(0);
// 抛出 "AssertionError: 0 == true"
assert(false, '不是真值');
// 抛出 "AssertionError: 不是真值"

// 2.assert.deepEqual(actual, expected[, message])
// 执行深度比较，判断实际值 actual 和期望值 expected 是否相等。
// 注意：这不会抛出 AssertionError！
assert.deepEqual(Error('a'), Error('b'));


const obj1 = {
    a: {
        b: 1
    }
};
const obj2 = {
    a: {
        b: 2
    }
};
const obj3 = {
    a: {
        b: 1
    }
};
const obj4 = Object.create(obj1);

assert.deepEqual(obj1, obj1);
// 通过，对象与自身相等

assert.deepEqual(obj1, obj2);
// 抛出 AssertionError: { a: { b: 1 } } deepEqual { a: { b: 2 } }
// b 的值不同

assert.deepEqual(obj1, obj3);
// 通过，两个对象相等

assert.deepEqual(obj1, obj4);
// 抛出 AssertionError: { a: { b: 1 } } deepEqual {}
// 原型会被忽略

// 如果两个值不相等，则抛出一个带有 message 属性的 AssertionError，其中 message 属性的值等于传入的 message 参数的值。 如果 message 参数为 undefined，则赋予默认的错误信息。


//3.assert.deepStrictEqual(actual, expected[, message])
//大多数情况下与 assert.deepEqual() 一样，但有两个例外。 首先，原始值使用全等运算符（===）比较。 其次，对象的比较包括检查它们的原型是否全等。


assert.deepEqual({a: 1}, {a: '1'});
// 通过，因为 1 == '1'

assert.deepStrictEqual({a: 1}, {a: '1'});
// 抛出 AssertionError: { a: 1 } deepStrictEqual { a: '1' }
// 因为 1 !== '1' 使用全等运算符
//如果两个值不相等，则抛出一个带有 message 属性的 AssertionError，其中 message 属性的值等于传入的 message 参数的值。 如果 message 参数为 undefined，则赋予默认的错误信息。


//4.assert.doesNotThrow(block[, error][, message])
//断言 block 函数不会抛出错误。
//当 assert.doesNotThrow() 被调用时，它会立即调用 block 函数。

// 如果抛出错误且错误类型与 error 参数指定的相同，则抛出 AssertionError。 如果错误类型不相同，或 error 参数是 undefined，则错误会被抛回给调用者。


//5.assert.equal(actual, expected[, message])
//使用相等运算符（==）测试 actual 参数与 expected 参数是否相等。
assert.equal(1, 1);
// 通过，1 == 1
assert.equal(1, '1');
// 通过，1 == '1'

assert.equal(1, 2);
// 抛出 AssertionError: 1 == 2
assert.equal({a: {b: 1}}, {a: {b: 1}});
// 抛出 AssertionError: { a: { b: 1 } } == { a: { b: 1 } }
//如果两个值不相等，则抛出一个带有 message 属性的 AssertionError，其中 message 属性的值等于传入的 message 参数的值。 如果 message 参数为 undefined，则赋予默认的错误信息。

// 6.assert.fail(actual, expected, message, operator)
// 抛出 AssertionError。 如果 message 不存在，则错误信息会被设为 actual 的值加分隔符 operator 再加 expected 的值。 否则，错误信息为 message 的值。
assert.fail(1, 2, undefined, '>');
// 抛出 AssertionError: 1 > 2

assert.fail(1, 2, '错误信息', '>');
// 抛出 AssertionError: 错误信息

// 7.assert.ifError(value)
// 如果 value 为真，则抛出 value。 可用于测试回调函数的 error 参数。
assert.ifError(0);
// 通过
assert.ifError(1);
// 抛出 1
assert.ifError('error');
// 抛出 'error'
assert.ifError(new Error());
// 抛出 Error
// 8.assert.notDeepEqual(actual, expected[, message])
// 测试是否不深度相等。 与 assert.deepEqual() 相反。
const obj1 = {
    a : {
        b : 1
    }
};
const obj2 = {
    a : {
        b : 2
    }
};
const obj3 = {
    a : {
        b : 1
    }
};
const obj4 = Object.create(obj1);

assert.notDeepEqual(obj1, obj1);
// 抛出 AssertionError: { a: { b: 1 } } notDeepEqual { a: { b: 1 } }

assert.notDeepEqual(obj1, obj2);
// 通过，obj1 与 obj2 不深度相等

assert.notDeepEqual(obj1, obj3);
// 抛出 AssertionError: { a: { b: 1 } } notDeepEqual { a: { b: 1 } }

assert.notDeepEqual(obj1, obj4);
// 通过，obj1 与 obj4 不深度相等
//如果两个值深度相等，则抛出一个带有 message 属性的 AssertionError，其中 message 属性的值等于传入的 message 参数的值。 如果 message 参数为 undefined，则赋予默认的错误信息。

// 9.assert.notDeepStrictEqual(actual, expected[, message])
// 测试是否不深度全等。 与 assert.deepStrictEqual() 相反。
assert.notDeepEqual({a:1}, {a:'1'});
// 抛出 AssertionError: { a: 1 } notDeepEqual { a: '1' }

assert.notDeepStrictEqual({a:1}, {a:'1'});
// 通过
//如果两个值深度全等，则抛出一个带有 message 属性的 AssertionError，其中 message 属性的值等于传入的 message 参数的值。 如果 message 参数为 undefined，则赋予默认的错误信息。
// 10.assert.notEqual(actual, expected[, message])
//使用不等运算符（!=）测试是否不相等。
assert.notEqual(1, 2);
// 通过

assert.notEqual(1, 1);
// 抛出 AssertionError: 1 != 1

assert.notEqual(1, '1');
// 抛出 AssertionError: 1 != '1'
//如果两个值相等，则抛出一个带有 message 属性的 AssertionError，其中 message 属性的值等于传入的 message 参数的值。 如果 message 参数为 undefined，则赋予默认的错误信息。
//11.assert.notStrictEqual(actual, expected[, message])
//使用不全等运算符（!==）测试是否不全等。
assert.notStrictEqual(1, 2);
// 通过

assert.notStrictEqual(1, 1);
// 抛出 AssertionError: 1 !== 1

assert.notStrictEqual(1, '1');
// 通过
//如果两个值全等，则抛出一个带有 message 属性的 AssertionError，其中 message 属性的值等于传入的 message 参数的值。 如果 message 参数为 undefined，则赋予默认的错误信息。
// 12.assert.ok(value[, message])
// 测试 value 是否为真值。 相当于 assert.equal(!!value, true, message)。
//如果 value 不为真值，则抛出一个带有 message 属性的 AssertionError，其中 message 属性的值等于传入的 message 参数的值。 如果 message 参数为 undefined，则赋予默认的错误信息。
assert.ok(true);
// 通过
assert.ok(1);
// 通过
assert.ok(false);
// 抛出 "AssertionError: false == true"
assert.ok(0);
// 抛出 "AssertionError: 0 == true"
assert.ok(false, '不是真值');
// 抛出 "AssertionError: 不是真值"
// 13.assert.strictEqual(actual, expected[, message])
//使用全等运算符（===）测试是否全等。
assert.strictEqual(1, 2);
// 抛出 AssertionError: 1 === 2

assert.strictEqual(1, 1);
// 通过

assert.strictEqual(1, '1');
// 抛出 AssertionError: 1 === '1'
//如果两个值不全等，则抛出一个带有 message 属性的 AssertionError，其中 message 属性的值等于传入的 message 参数的值。 如果 message 参数为 undefined，则赋予默认的错误信息。
// 14.assert.throws(block[, error][, message])
//期望 block 函数抛出错误。

// 如果指定了 error，error 可以是构造函数、正则表达式、或自定义的验证函数。

// 如果指定了 message，则当 block 不抛出错误时，message 会作为 AssertionError 的错误信息。