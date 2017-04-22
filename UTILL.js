/**
 * Created by dllo on 17/4/21.
 */


const util = require('util');

//1.util.debuglog() 方法用于创建一个函数，基于 NODE_DEBUG 环境变量的存在与否有条件地写入调试信息到 stderr。 如果 section 名称在环境变量的值中，则返回的函数类似于 console.error()。 否则，返回的函数是一个空操作。

var debuglog = util.debuglog('foo');
var bar = 123;
debuglog('hello from foo [%d]', bar);
//如果程序在环境中运行时带上 NODE_DEBUG=foo，则输出类似如下：
// FOO 3245: hello from foo [123]

//2.util.deprecate(function, string)


//util.deprecate() 方法会包装给定的 function 或类，并标记为废弃的。
exports.puts = util.deprecate(function() {
    for (var i = 0, len = arguments.length; i < len; ++i) {
        process.stdout.write(arguments[i] + '\n');
    }
}, 'util.puts: 使用 console.log 代替');
//当被调用时，util.deprecate() 会返回一个函数，这个函数会使用 process.on('warning') 事件触发一个 DeprecationWarning。 默认情况下，警告只在首次被调用时才会被触发并打印到 stderr。 警告被触发之后，被包装的 function 会被调用。



//3.util.format(format[, ...args])
//第一个参数是一个字符串，包含零个或多个占位符。 每个占位符会被对应参数转换后的值所替换。 支持的占位符有：

// %s - 字符串。
// %d - 数值（包括整数和浮点数）。
// %j - JSON。如果参数包含循环引用，则用字符串 '[Circular]' 替换。
// %% - 单个百分号（'%'）。不消耗参数。
// 如果占位符没有对应的参数，则占位符不被替换。
util.format('%s:%s', 'foo');
// 返回: 'foo:%s'
// 如果传入 util.format() 方法的参数比占位符的数量多，则多出的参数会被强制转换为字符串（对于对象和符号，使用 util.inspect()），然后拼接到返回的字符串，参数之间用一个空格分隔。
util.format('%s:%s', 'foo', 'bar', 'baz'); // 'foo:bar baz'
// 如果第一个参数不是一个格式字符串，则 util.format() 返回一个所有参数用空格分隔并连在一起的字符串。 每个参数都使用 util.inspect() 转换为一个字符串。
util.format(1, 2, 3); // '1 2 3'

// 4.util.inherits(constructor, superConstructor)
//从一个构造函数中继承原型方法到另一个。 constructor 的原型会被设置到一个从 superConstructor 创建的新对象上。
const EventEmitter = require('events');

function MyStream() {
    EventEmitter.call(this);
}

util.inherits(MyStream, EventEmitter);

MyStream.prototype.write = function(data) {
    this.emit('data', data);
};

const stream = new MyStream();

console.log(stream instanceof EventEmitter); // true
console.log(MyStream.super_ === EventEmitter); // true

stream.on('data', (data) => {
    console.log(`接收的数据："${data}"`);
});
stream.write('运作良好！'); // 接收的数据："运作良好！"
// 5.util.inspect(object[, options])
//showHidden <boolean> 如果为 true，则 object 的不可枚举的符号与属性也会被包括在格式化后的结果中。 默认为 false。
// depth <number> 指定格式化 object 时递归的次数。 这对查看大型复杂对象很有用。 默认为 2。 若要无限地递归则传入 null。
// colors <boolean> 如果为 true，则输出样式使用 ANSI 颜色代码。 默认为 false。 颜色可自定义，详见自定义 util.inspect 颜色。
// customInspect <boolean> 如果为 false，则 object 上自定义的 inspect(depth, opts) 函数不会被调用。 默认为 true。
// showProxy <boolean> 如果为 true，则 Proxy 对象的对象和函数会展示它们的 target 和 handler 对象。 默认为 false。
// maxArrayLength <number> 指定格式化时数组和 TypedArray 元素能包含的最大数量。 默认为 100。 设为 null 则显式全部数组元素。 设为 0 或负数则不显式数组元素。
// breakLength <number> 一个对象的键被拆分成多行的长度。 设为 Infinity 则格式化一个对象为单行。 默认为 60。

console.log(util.inspect(util, { showHidden: true, depth: null }));

// 6.自定义 util.inspect 颜色
// 可以通过 util.inspect.styles 和 util.inspect.colors 属性全局地自定义 util.inspect 的颜色输出（如果已启用）。
//
// util.inspect.styles 是一个映射，关联一个样式名到一个 util.inspect.colors 颜色。

// 默认的样式与关联的颜色有：
//
// number - yellow
// boolean - yellow
// string - green
// date - magenta
// regexp - red
// null - bold
// undefined - grey
// special - cyan （暂时只用于函数）
// name - （无样式）
// 预定义的颜色代码有：white、grey、black、blue、cyan、green、magenta``red 和 yellow。 还有 bold、italic、underline 和 inverse 代码。
//
// 颜色样式使用 ANSI 控制码，可能不是所有终端都支持。


class Box {
    constructor(value) {
        this.value = value;
    }

    inspect(depth, options) {
        if (depth < 0) {
            return options.stylize('[Box]', 'special');
        }

        const newOptions = Object.assign({}, options, {
            depth: options.depth === null ? null : options.depth - 1
        });

        // 五个空格的填充，因为那是 "Box< " 的大小。
        const padding = ' '.repeat(5);
        const inner = util.inspect(this.value, newOptions).replace(/\n/g, '\n' + padding);
        return options.stylize('Box', 'special') + '< ' + inner + ' >';
    }
}

const box = new Box(true);

util.inspect(box);
// 返回: "Box< true >"


// 7.util.inspect.defaultOptions
//defaultOptions 值允许对被 util.inspect 使用的默认选项进行自定义。 这对 console.log 或 util.format 等显式调用 util.inspect 的函数很有用。 它需被设为一个对象，包含一个或多个有效的 util.inspect() 选项。 也支持直接设置选项的属性。
const arr = Array(101);

console.log(arr); // 打印截断的数组
util.inspect.defaultOptions.maxArrayLength = null;
console.log(arr); // 打印完整的数组

// 8.util.inspect.custom
//一个符号，可被用于声明自定义的查看函数，详见自定义对象的查看函数。



