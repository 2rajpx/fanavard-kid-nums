String.prototype.reverse = function () {
  return this.split('').reverse().join('');
};

// private properties

export default class Num
{
  _number = null;
  _decimals = 0;
  _decPoint = '.';
  _thousandsSep = ',';
  _validate = null;
  _error = null;
  _isUnsigned = true;

  constructor(number = null, decimals = 0, isUnsigned = true, decPoint = ".", thousandsSep = ",") {
    this.decimals = decimals;
    this.decPoint = decPoint;
    this.isUnsigned = isUnsigned;
    this.thousandsSep = thousandsSep;
    this.number = number;
  }

  static thousandsFormat(number, thousandsSep) {
    number = this.abs(number);
    // 3456789 => [987, 654, 3]
    number = number.reverse().match(/.{1,3}/g);
    // [987, 654, 3] => [789, 456, 3]
    for (let i = 0; i < number.length; i++) {
      // 987 => 789
      number[i] = number[i].reverse();
    }
    // [789, 456, 3] => [3, 456, 789]
    number = number.reverse();
    // [3, 456, 789] => 3,456,789
    return number.join(thousandsSep);
  }

  static abs(number) {
    return number.toString().replace(/^(-|\+)/, '');
  }

  get validate() {
    return this._validate;
  }

  get error() {
    return this._error;
  }

  set number(number) {
    this._validate = null;
    this._error = null;

    number = number === null ? '' : number.toString();

    if (number === '') {

    } else if (this.isUnsigned === true && /(-|\+)/.test(number)) {
      this._validate = false;
      this._error = 'علایم مثبت و منفی مجاز نیستند';
    } else if (number === '+' || number === '-') {
      this._validate = false;
      this._error = 'ادامه عدد خود را وارد کنید';
    } else if (this.decimals > 0) {
      this._validate = /^(-|\+)?\d*\.?\d+$/g.test(number);
      if (this._validate === false) {
        this._error = 'عدد وارد شده صحیح نمی باشد';
      }
    } else {
      this._validate = /^(-|\+)?\d*$/g.test(number);
      if (this._validate === false) {
        this._error = 'عدد وارد شده صحیح نمی باشد';
      }
    }
    this._number = this._validate === true ? number : '0';
    return this;
  }

  get number() {
    // if (!this.validate) {
    //   throw new Exception('sdf');
    // }
    return this._number;
  }

  set isUnsigned(isUnsigned) {
    this._isUnsigned = isUnsigned;
    return this;
  }

  get isUnsigned() {
    return this._isUnsigned;
  }

  set decimals(decimals) {
    this._decimals = parseInt(decimals);
    return this;
  }

  get decimals() {
    return this._decimals;
  }

  set decPoint(decPoint) {
    this._decPoint = decPoint;
    return this;
  }

  get decPoint() {
    return this._decPoint;
  }

  set thousandsSep(thousandsSep) {
    this._thousandsSep = thousandsSep;
  }

  get thousandsSep() {
    return this._thousandsSep;
  }

  changeNumber(number) {
    this.number = number;
    return this;
  }

  changeDecimals(decimals) {
    this.decimals = decimals;
    return this;
  }

  getSign() {
    return this.number.substr(0, 1);
  }

  hasSign() {
    let sign = this.getSign();
    return sign === '-' || sign === '+';
  }

  hasDecimal() {
    return typeof this.decimal() === 'string' && this.decimal() !== '0';
  }

  integer() {
    let integer = this.number.split('.')[0];
    return integer ? integer.toString().substr(0, 36) : '0';
  }

  decimal() {
    let float = this.number.split('.')[1];
    return float ? float.toString().substr(0, this.decimals) : '0';
  }

  roundFloat() {
    return Math.round(this.decimal(), this.decimals).toString();
  }

  /**
   * returns 3,456,789 instead of 3456789
   */
  intFormat() {
    return this.constructor.thousandsFormat(this.integer(), this.thousandsSep);
  }

  /**
   * returns 345,678,9 instead of 3456789
   */
  floatFormat() {
    // return this.roundFloat().substr(0, this.decimals).match(/.{1,3}/g).join(this.thousandsthis._sep);
    // return this.roundFloat().substr(0, this.decimals);
    return this.decimal();
  }

  integerLength() {
    return this.constructor.abs(this.integer()).length;
  }

  decimalLength() {
    return this.constructor.abs(this.decimal()).length;
  }

  /**
   * returns joined numeric int and float parts
   */
  joinFormats() {
    return this.hasDecimal() && this.decimals > 0
      ? this.intFormat() + this.decPoint + this.floatFormat()
      : this.intFormat();
  }

  numberFormat() {
    return this.hasSign()
      ? this.getSign() + this.joinFormats()
      : this.joinFormats();
  }
}
