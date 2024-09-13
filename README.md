# 交互式日历应用

这是一个使用 Flask、JavaScript、HTML 和 CSS 构建的交互式日历应用。它提供了一个美观的用户界面，允许用户浏览不同的月份和年份，并具有平滑的翻页动画效果。

## 功能

- 显示当前月份的日历
- 允许用户通过下拉菜单选择特定的年份和月份
- 提供上一月和下一月的导航按钮
- 突出显示当前日期
- 允许用户选择特定日期
- 平滑的日历翻页动画

## 技术栈

- 后端：Python Flask
- 前端：HTML, CSS, JavaScript
- 日期处理：Python `calendar` 模块

## 文件结构

- `app.py`: Flask 应用主文件
- `templates/calendar.html`: 日历的 HTML 模板
- `static/css/style.css`: 日历的样式文件
- `static/js/calendar.js`: 处理日历交互的 JavaScript 文件

## 安装

1. 确保您已安装 Python 和 pip。
2. 克隆此仓库：
   ```
   git clone <repository-url>
   ```
3. 进入项目目录：
   ```
   cd interactive-calendar
   ```
4. 安装所需的 Python 包：
   ```
   pip install flask
   ```

## 运行应用

1. 在命令行中运行：
   ```
   python app.py
   ```
2. 在浏览器中打开 `http://localhost:5000`

## 自定义

- 要修改日历的外观，编辑 `static/css/style.css` 文件。
- 要更改日历的行为或添加新功能，编辑 `static/js/calendar.js` 文件。
- 要修改后端逻辑或添加新的路由，编辑 `app.py` 文件。

## 贡献

欢迎提交 pull requests。对于重大更改，请先开 issue 讨论您想要改变的内容。

## 许可

[MIT](https://choosealicense.com/licenses/mit/)
