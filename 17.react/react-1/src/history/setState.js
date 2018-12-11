let isBatchingUpdate = true; // 默认是批量更新
let transcation = (component) => {
  component.state = component.pendingState;
  component.render();
  isBatchingUpdate = false;
}
class My {
  constructor() {
    this.state = { number: 0 }; // 自己的状态
    this.pendingState = { ...this.state };
  }
  setState(obj) {
    if (isBatchingUpdate) {
      this.pendingState = { ... this.pendingState, ...obj };
    } else {
      this.pendingState = { ... this.pendingState, ...obj };
      transcation(this);
    }
  }
  update() {
    setTimeout(() => {
      this.setState({ number: this.state.number + 1 });
      this.setState({ number: this.state.number + 3 });
      this.setState({ number: this.state.number + 2 });
    }, 0);
    transcation(this);
  }
  render() {
    console.log(this.state.number);
  }
}

let my = new My();
// 内部会先调用更新方法
my.update();