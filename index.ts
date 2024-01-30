interface OptionsType {
  el: string | HTMLElement
}

interface VNodeType {
  tag: string
  text?: string
  children?: VNodeType[]
}

class Dom {
  // 创建节点
  createElement(el: string) {
    return document.createElement(el)
  }
  
  // 填充文本
  setText(el: HTMLElement, text: string) {
    el.textContent = text
  }
  
  // 渲染
  render(data: VNodeType) {
    const root = this.createElement(data.tag)
    
    if (data.children && Array.isArray(data.children)) {
      data.children.forEach(item => {
        const child = this.render(item)
        root.appendChild(child)
      })
    }
    else {
      this.setText(root, data.text!)
    }
    
    return root
  }
}

interface VueType {
  options: OptionsType
  init: () => void
}

// implements 约束 Class
class Vue extends Dom implements VueType {
  options: OptionsType
  
  constructor(options: OptionsType) {
    super()
    this.options = options
    this.init()
  }
  
  // 初始化
  init(): void {
    const data: VNodeType = {
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
    }
    
    const app = typeof this.options.el === "string"
      ? document.querySelector(this.options.el)!
      : this.options.el
    
    app.appendChild(this.render(data))
  }
}
