import { Component } from "react";
import { withRouter } from "react-router-dom";

class Prompt extends Component {
  static defaultProps = {
    when: false, // when为ture时，设置阻塞
    message: "", // 阻塞弹窗显示的消息
  };

  componentDidMount() {
    this.handleBlock();
  }
  componentDidUpdate() {
    this.handleBlock();
  }
  componentWillUnmount() {
    // 取消阻塞
    if (this.unBlock) {
      this.unBlock();
    }
  }
  handleBlock = () => {
    if (this.props.when && !this.unBlock) {
      // 如果文本内容有值且当前没有阻塞，添加阻塞
      this.unBlock = this.props.history.block(() => {
        return this.props.message;
      });
    } else if (!this.props.when && this.unBlock) {
      // 取消阻塞
      this.unBlock();
      this.unBlock = null;
    }
  };
  render() {
    return null;
  }
}
export default withRouter(Prompt);
