
/**
 * 按键布局
 * btn: 按键key
 * col: 占据列数
 */
const buttonPanel = [
  [{ btn: 'clear' }, { btn: 'backspace', col: 2 }, { btn: '/' }],
  [{ btn: '7' }, { btn: '8' }, { btn: '9' }, { btn: '*' }],
  [{ btn: '4' }, { btn: '5' }, { btn: '6' }, { btn: '-' }],
  [{ btn: '1' }, { btn: '2' }, { btn: '3' }, { btn: '+' }],
  [{ btn: 'sign' }, { btn: '0' }, { btn: '.' }, { btn: '=' }]
];

/** 按键对应显示文本  */
const buttonText = {
  'clear': 'C',
  'backspace': '←',
  '*': '×',
  '/': '÷',
  'sign': '+/-'
};

module.exports = {
  buttonText,
  buttonPanel
}
