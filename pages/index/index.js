//index.js

//TODO: 计算历史纪录

const { buttonPanel, buttonText } = require('./button.js');

Page({
  data: {
    /** 按钮布局 */
    buttonPanel,
    /** 按钮文本 */
    buttonText,
    /** 操作符之前的输入值 */
    lastVal: null,
    /** 操作符 */
    operator: null,
    /** 表达式 */
    express: '',
    /** 计算结果 */
    result: '0',
    /** 标识是否要清空结果以重新输入操作符之后的输入值 */
    clearResult: false,
    /** 出错标识 */
    error: false
  },

  /** 退格 */
  back() {
    let { result } = this.data;
    const length = result.length;
    if (length) {
      result = result.substring(0, length - 1); 
      // substring(0, -1)
      if (!result || result === '-') {
        result = '0';
      }
      this.setData({
        result
      })
    }
  },

  /** 清零 */
  clear() {
    this.setData({
      lastVal: null,
      operator: null,
      express: '',
      result: '0'
    })
  },

  /** 设置正负号 */
  setSign() {
    let { result } = this.data;
    if (result.indexOf('-') > -1) {
      result = result.replace('-', '');
    } else {
      result = '-' + result;
    }
    this.setData({
      result
    });
  },

  /** 设置操作符 */
  operate(key) {
    let { lastVal, operator, express, result, clearResult } = this.data;
    if (operator) {
      return;
    }
    // 之前的计算结果作为表达式第一部分
    lastVal = Number(result);
    operator = key;
    express = lastVal + ' ' + (buttonText[operator] || operator);
    clearResult = true;// 输入操作符后，输入第二个数时需要清除原计算结果
    this.setData({
      lastVal,
      operator,
      express,
      clearResult
    });
  },

  /** 设置输入数值 */
  inputVal(key) {
    let { result, clearResult } = this.data;
    if (clearResult) {
      result = '0';
      clearResult = false; // 重置标识为false
    }
    let sign = '';
    if (result.indexOf('-') > -1) {
      sign = '-';
      result = result.replace('-', '');
    }
    // 限制整数部分不超过10位
    if (result.split('.')[0].length >= 10) {
      return;
    }
    if (key === '.') {
      // 不重复输入小数点
      if (result.indexOf('.') > -1) {
        return;
      }
    }
    // 当前未输入，result为'0'
    if (result === '0') {
      if (key === '.') {
        result = '0.';
      } else {
        result = key;
      }
    } else {
      result += key;
    }

    result = sign + result;

    this.setData({
      result,
      clearResult
    });

  },

  /** 计算表达式 */
  calcExpr() {
    let { lastVal, operator, express, result, error } = this.data;
    if (!operator) {
      return;
    } else {
      const valAfter = Number(result);
      express = lastVal + ' ' + (buttonText[operator] || operator) + ' ' + result;
      switch (operator) {
        case '+':
          result = lastVal + valAfter;
          break;
        case '-':
          result = lastVal - valAfter;
          break;
        case '*':
          result = lastVal * valAfter;
          break;
        case '/':
          if (valAfter === 0) {
            result = '0不能作为除数！';
            error = true; // 标识出错
          } else {
            result = lastVal / valAfter;
          }
          break;
        default:
          break;
      }
      result = result + '';
      // 置空目前保存的计算符
      operator = null;
      this.setData({
        operator,
        express,
        result,
        error
      });
    }
  },

  btnClick(e) {
    let { error } = this.data;
    if (error) {
      // 出错后，再次输入，先清清零
      this.clear();
      error = false;
      this.setData({
        error
      });
    }

    const key = e.target.dataset.key;
    switch (key) {
      case 'clear':
        this.clear();
        break;
      case 'backspace':
        this.back();
        break;
      case '+':
      case '-':
      case '*':
      case '/':
        this.operate(key);
        break;
      case '=':
        this.calcExpr();
        break;
      case 'sign':
        this.setSign();
        break;
      default:
        // 数字、小数点
        this.inputVal(key);
        break;
    }

  }

})
