import fs from "fs";
import path from "path";

interface IProps {
  filename: string;
  name: string;
  ext: string;
  isFile: boolean;
  size: number;
  createTime: Date;
  updateTime: Date;
}

class File {
  constructor(private props: IProps) {}

  static async getFile(filename: string) {
    const name = path.basename(filename);
    const ext = path.extname(filename);
    const stat = await fs.promises.stat(filename);
    // console.log(stat);
    const isFile = stat.isFile();
    const size = stat.size;
    const createTime = stat.birthtime;
    const updateTime = stat.mtime;
    return new File({
      filename,
      name,
      ext,
      isFile,
      size,
      createTime,
      updateTime,
    });
  }

  async getContent(isBuffer: boolean = false) {
    if (this.props.isFile) {
      if (isBuffer) {
        return await fs.promises.readFile(this.props.filename);
      } else {
        return await fs.promises.readFile(this.props.filename, "utf-8");
      }
    }
    return null;
  }

  async getChildren() {
    if (this.props.isFile) {
      return [];
    } else {
      let children = await fs.promises.readdir(this.props.filename);
      const childrenFiles = children.map((name) => {
        const newfilename = path.resolve(this.props.filename, name);
        return File.getFile(newfilename);
      });
      return Promise.all(childrenFiles);
    }
  }
}

const readDir = async (filename) => {
  const file = await File.getFile(filename);
  return await file.getChildren();
};

const test = async () => {
  const filename = path.resolve(__dirname, "./myFiles");
  const res = await readDir(filename);
  console.log(res);
  console.log(await res[0].getChildren());
};

test();
