## 1.0.2

- 移除 `Dictionary` 中 `remove` 方法的返回对象
- 修正 `array` 中 `f_last` 的定义
- 添加 `CHANGELOG.md`
- 添加 `eslint` 支持

## 1.0.3

- 修复导入 `exception` 时无法识别的问题。

## 1.0.4

- `Dictionary` 添加 `forEach` 方法。

## 1.1.0

- 调整目录结构，移除大写的 `Index.ts` 聚合文件。
- 调整 `git` 分支与 `tags` 标签的使用方式，后期固化版本将以 `tags` 形式存在。

## 1.1.1

- 添加 `Number` 扩展的支持。
- `Convert` 添加转换为 DateTime、Date 两种时间类型的支持。

## 1.1.5

- `Array` 扩展添加 `f_insert`。

## 1.1.6

- `Array` 扩展 `f_first`、`f_last` 中表达式如果不传递，则返回第一个或最后一个。

## 1.1.7

- 修复 `Array` 扩展 `f_skip` 时会多跳过一位的问题。

## 1.1.8

- `Array` 添加 `f_page` 分页查找。

## 1.1.9

- 修复 `Array` 扩展 `f_skip` 时，当跳过的数量大于数组最大长度时，则返回空数组。

## 1.1.10

- `Array` 扩展 `f_select` 添加 `T` 类型限制。

## 1.1.11

- 修复 `Array` 扩展 `f_select` 的 `T` 类型限制。

## 1.1.12

- 添加 `Array` 静态扩展 `f_isNullOrEmpty` 空检测，如：`Array.f_isNullOrEmpty([])` => `true`。
- 添加 `String` 静态扩展 `f_isNullOrEmpty` 空检测，如：`String.f_isNullOrEmpty('')` => `true`。

## 1.1.13

- 添加 `Number` 静态扩展 `f_hasValue` 空检测、 `f_equals` 值判断，如：`Number.f_hasValue(undefined)` 、 `Number.f_equals(null, 0)`。
- 添加 `Boolean` 静态扩展 `f_hasValue` 空检测，如：`Boolean.f_hasValue(null)`。

## 1.1.14

- 修改 `Array` 扩展 `f_first` ，如果条件无法被配时返回空对象 `{}`
- 添加 `Array` 扩展 `f_firstOrDefault` ，当条件无法被匹配时，返回 `null`

## 1.1.15

- 添加 `Array` 扩展 `f_getRange`。

## 1.1.16

- 修复 `Array` 扩展中异常没有被抛出的问题。
- 修复 `Array` 扩展 `f_first`、`f_firstOrDefault`、`f_last` 必须传递表达式的问题。
- 添加 `Array` 扩展 `f_insertRange` ，向指定下标处插入数组。
- 移除 `Array` 扩展 `f_convert` 方法，可以使用 `f_select` 替代。

## 1.1.17

- 添加 `String` 扩展 `f_toCamelCase`。

## 1.1.18

- 添加 `Array` 扩展 `f_add`、`f_addRange`。

## 1.1.19

- 修改 `Array` 扩展 `f_groupBy` 回值为 `Dictionary<any, Array<T>>`
- 添加 `Dictionary` 方法 `getValue` 用于在部分无法进行非空断言的场景，如：`template` 模板中。

## 1.1.20

- 修复 `Dictionary` 方法 `getValue` 中返回时没有使用非空断言，导致的报错。
