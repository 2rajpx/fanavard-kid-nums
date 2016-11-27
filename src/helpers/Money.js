import FaNoToWord from './FaNoToWord';

export default class Money
{
  _type = null;
  _number = null;
  _rialNumber = null;
  _tomanNumber = null;

  static Rial = 'rial';
  static Toman = 'toman';

  constructor(number = null, type = null) {
    this.type = type;
    this.number = number;
  }

  set number(number) {
    this._number = number;
    let temp1 = new FaNoToWord(number);
    let temp2 = new FaNoToWord(number);
    switch (this.type) {
      case this.constructor.Rial:
        this._rialNumber = temp1;
        this._tomanNumber = temp2.changeNumber(temp2.integer().substr(0, temp2.integer().length-1));
        break;
      case this.constructor.Toman:
        this._tomanNumber = temp1;
        this._rialNumber = temp2.changeNumber(temp2.integer() + '0');
        break;
    }
    return this;
  }

  set type(type) {
    this._type = type === this.constructor.Toman
      ? this.constructor.Toman
      : this.constructor.Rial;
    return this;
  }

  get type() {
    return this._type;
  }

  get rial() {
    return this._rialNumber;
  };

  get toman() {
    return this._tomanNumber;
  };

  changeNumber(number) {
    this.number = number;
    return this;
  }

  changeType(type) {
    this.type = type;
    this.number = this._number;
    return this;
  }
}
