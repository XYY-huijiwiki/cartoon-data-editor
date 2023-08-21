# cartoon-data-editor

用于编辑羊羊百科的剧集数据，而不需要编辑者了解 json 文件。

## 测试

输入以下命令，打开测试页面。

```cmd
npm i
npm run dev
```

测试期间，所有消息提示都改为在控制台显示日志（因为消息提示用的是灰机 wiki 的接口，测试期间无法使用）。

## 构建

输入以下命令，构建常规网页代码，放在 dist 文件夹内。

```cmd
npm i
npm run build
```

对于本项目，单独构建并没有什么用。在 Github 更新代码后，会自动构建并把常规网页代码放在 dist 分支中。一段时间后 JsDeliver 会同步 dist 分支中的代码，羊羊百科上也会同步更新。

## 更新记录

未来不再更新此列表，新的更新记录详见[commits](https://github.com/XYY-huijiwiki/cartoon-data-editor/commits/main)。

- 2023-01-28：更换 cdn 至 jsDeliver，加载速度应该会快一点。
- 2023-01-13：修复了特殊情况下无法打开界面的问题。

### 计划更新

- 支持多语言。
