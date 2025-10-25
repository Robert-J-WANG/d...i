interface Callback<T, U> {
  (k: T, v: U): void;
}

export class Dictionary<K, V> {
  // 保存字典类中所以的键 ["a", "b", "c"]
  private keys: K[] = [];
  // 保存字典类中所以的值 [1,2,3]
  private vals: V[] = [];

  /**
   * 重新设置某个键对应的值，如果不存在，则添加
   * @param key
   * @param val
   */
  set(key: K, val: V) {
    const index = this.keys.indexOf(key);
    if (index < 0) {
      this.keys.push(key);
      this.vals.push(val);
    } else {
      this.vals[index] = val;
    }
  }

  /**
   * 循环每一个键值对,并把键值对数据传递给一个回到函数
   * @param callback
   */
  forEach(callback: Callback<K, V>) {
    this.keys.forEach((k, i) => {
      const v = this.vals[i];
      callback(k, v);
    });
  }

  /**
   * 判断某个键是否存在
   * @param key
   * @returns boolean
   */
  has(key: K) {
    return this.keys.includes(key);
  }

  /**
   * 按照键，删除对应的键值对
   * @param key
   * @returns
   */
  delete(key: K) {
    const i = this.keys.indexOf(key);
    if (i < 0) {
      return;
    } else {
      this.keys.splice(i, 1);
      this, this.vals.splice(i, 1);
    }
  }

  /**
   * 得到当前键值对的数量
   */
  get size() {
    return this.keys.length;
  }
}
