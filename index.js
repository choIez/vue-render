"use strict";
class Dom {
    // 创建节点
    createElement(el) {
        return document.createElement(el);
    }
    // 填充文本
    setText(el, text) {
        el.textContent = text;
    }
    // 渲染
    render(data) {
        const root = this.createElement(data.tag);
        if (data.children && Array.isArray(data.children)) {
            data.children.forEach(item => {
                const child = this.render(item);
                root.appendChild(child);
            });
        }
        else {
            this.setText(root, data.text);
        }
        return root;
    }
}
// implements 约束 Class
class Vue extends Dom {
    constructor(options) {
        super();
        this.options = options;
        this.init();
    }
    // 初始化
    init() {
        const data = {
            tag: "div",
            children: [
                {
                    tag: "section",
                    text: "子节点一"
                },
                {
                    tag: "section",
                    text: "子节点二"
                }
            ]
        };
        const app = typeof this.options.el === "string"
            ? document.querySelector(this.options.el)
            : this.options.el;
        app.appendChild(this.render(data));
    }
}
