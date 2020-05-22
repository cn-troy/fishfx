module.exports = {
  title: 'Fish Framework（简称：FishFX，中文名：鱼摆摆）',
  description: 'FishFX 框架是采用 TypeScript（version：3.8.3）现有体系标准，对平时编码时的一些常用功能进行封装。主要思想参考 CoreFX 进行构建，致力于让TypeScript拥有如同编写 .Net Core 应用般的丝滑。',
  themeConfig: {
    search: false,
    sidebar: [{
      title: "指南",
      collapsable: false,
      path: "/"
    }, {
      title: "system",
      collapsable: true,
      children: [{
        title: "String扩展",
        path: "/system/extensions/string"
      }, {
        title: "Array扩展",
        path: "/system/extensions/array"
      }, {
        title: "Date扩展",
        path: "/system/extensions/date"
      }, {
        title: "Convert",
        path: "/system/convert"
      }, {
        title: "DateTime",
        path: "/system/dateTime"
      }, {
        title: "Exception",
        path: "/system/exception"
      }, {
        title: "TimeSpan",
        path: "/system/timeSpan"
      }]
    }, {
      title: "collections",
      collapsable: true,
      children: [{
        title: "List<T>",
        path: "/collections/list"
      }, {
        title: "Dictionary<TKey, TValue>",
        path: "/collections/dictionary"
      }]
    }, {
      title: "threading",
      collapsable: true,
      children: [{
        title: "Thread",
        path: "/threading/thread"
      }, {
        title: "Task",
        path: "/threading/task"
      }]
    }]
  }
}