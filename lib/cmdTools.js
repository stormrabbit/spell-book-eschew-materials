const exec = require('child_process').exec;
const co = require('co');
const chalk = require('chalk');

/**
 * @description 处理命令数组，并把结果输出到控制台
 * @param {*} cmdStrArr 
 */
const execCommands = (cmdStrArr) => {
  co(function* () {
    if (!cmdStrArr || !(cmdStrArr instanceof Array)) {
      console.log(chalk.red('只能接收数组做参数！'));
      process.exit();
    }
    try {
      for (let i = 0; i < cmdStrArr.length; i++) {
        const sdout = yield execPlus(cmdStrArr[i]);
        console.log(chalk.white(sdout));
      }
    } catch (error) {
      console.log(chalk.red(error));
    } finally {
      process.exit();
    }
  })
}

/**
 * @description 用 promise 对象包装 exec ，方便用 co 函数的 yield 进行处理
 * @param {*} cmdStr 需要执行的命令行代码
 * @returns Promise<exec>
 */
const execPlus = (cmdStr) => {
  return new Promise((reslove, reject) => {
    exec(cmdStr, (err, stout, sterr) => {
      if (err) {
        reject(err)
      }
      if (!!sterr && !!sterr.length) {
        reject(sterr);
      }
      reslove(stout);
    })
  })
}

module.exports = { execCommands, execPlus };