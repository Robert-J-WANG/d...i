import "./Pages.css";
import React from "react";
import { NavLink, withRouter } from "react-router-dom";

export function NavBar() {
  return (
    <div className="header">
      <NavLink to="/" exact>
        首页
      </NavLink>
      <NavLink to="/news" exact>
        新闻页
      </NavLink>
    </div>
  );
}

function Home() {
  return (
    <div className="page home">
      <h1>首页</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempora,
        dignissimos tenetur. Reprehenderit eum quod itaque repudiandae,
        perspiciatis nam inventore asperiores.
      </p>
    </div>
  );
}

class News extends React.Component {
  state = {
    val: "",
  };

  componentWillUnmount() {
    // 取消阻塞
    if (this.unBlock) {
      this.unBlock();
    }
  }

  handleBlock = (value) => {
    console.log(value);
    if (value && !this.unBlock) {
      // 如果文本内容有值且当前没有阻塞，添加阻塞
      this.unBlock = this.props.history.block(() => {
        return "页面跳转，文本内容会消失，真的要调转吗？";
      });
    } else if (!value && this.unBlock) {
      // 取消阻塞
      this.unBlock();
      this.unBlock = null;
    }
  };

  render() {
    return (
      <div className="page news">
        <h1>新闻页</h1>
        <textarea
          value={this.state.val}
          onChange={(e) => {
            this.setState({
              ...this.state,
              val: e.target.value,
            });
            this.handleBlock(e.target.value);
          }}
        ></textarea>
      </div>
    );
  }
}

export const HomePage = Home;
export const NewsPage = withRouter(News);
