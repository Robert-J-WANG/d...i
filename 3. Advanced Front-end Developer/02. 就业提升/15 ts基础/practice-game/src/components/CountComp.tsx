import React from "react";

interface Iprops {
  num: number;
  onChange?: (n: number) => void;
}

/* export function CountComp(props: Iprops) {
  return (
    <div>
      <button
        onClick={() => {
          if (props.onChange) {
            props.onChange(props.num - 1);
          }
        }}
      >
        -
      </button>
      <span>{props.num}</span>
      <button
        onClick={() => {
          if (props.onChange) {
            props.onChange(props.num + 1);
          }
        }}
      >
        +
      </button>
    </div>
  );
} */

export const CountComp: React.FC<Iprops> = (props) => {
  return (
    <div>
      <button
        onClick={() => {
          if (props.onChange) {
            props.onChange(props.num - 1);
          }
        }}
      >
        -
      </button>
      <span>{props.num}</span>
      <button
        onClick={() => {
          if (props.onChange) {
            props.onChange(props.num + 1);
          }
        }}
      >
        +
      </button>
    </div>
  );
};

/* interface Istate {
  msg: string;
  desc: string;
}

export class CountComp extends React.Component<Iprops> {
  // 对状态初始化
  state: Istate = {
    msg: "",
    desc: "",
  };
  render() {
    return (
      <div>
        <button
          onClick={() => {
            if (this.props.onChange) {
              this.props.onChange(this.props.num - 1);
            }
          }}
        >
          -
        </button>
        <span>{this.props.num}</span>
        <button
          onClick={() => {
            if (this.props.onChange) {
              this.props.onChange(this.props.num + 1);
            }
          }}
        >
          +
        </button>
      </div>
    );
  }
}
 */
