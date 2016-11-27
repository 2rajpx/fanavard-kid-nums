import Num from './Num';

export default class NumToWord extends Num
{
  t = {
    'and' : ' and ',
    '-' : 'minus ',
    '+' : 'plus ',
    '.' : 'point',
  };
  floats = {
    1 : ' dahom',
    2 : ' sadom',
    3 : ' hezarom',
    4 : ' dah hezarom',
    5 : ' sad hezarom',
  };
  digit1 = {
      0 : 'zero',
      1 : 'one',
      2 : 'two',
      3 : 'three',
      4 : 'four',
      5 : 'five',
      6 : 'six',
      7 : 'seven',
      8 : 'eight',
      9 : 'nine'
  };
  digit2_before_20 = {
      1 : 'eleven',
      2 : 'twelve',
      3 : 'thirteen',
      4 : 'fourteen',
      5 : 'fifteen',
      6 : 'sixteen',
      7 : 'seventeen',
      8 : 'eighteen',
      9 : 'nineteen'
  };
  digit2 = {
      1 : 'ten',
      2 : 'twenty',
      3 : 'thirty',
      4 : 'forty',
      5 : 'fifty',
      6 : 'sixty',
      7 : 'seventy',
      8 : 'eighty',
      9 : 'ninety'
  };
  digit3 = {
      1 : 'one hundred',
      2 : 'two hundred',
      3 : 'three hundred',
      4 : 'four hundred',
      5 : 'five hundred',
      6 : 'six hundred',
      7 : 'seven hundred',
      8 : 'eight hundred',
      9 : 'nine hundred'
  };
  steps = {
      1 : 'thousand',
      2 : 'million',
      3 : 'billion',
      4 : 'trillion',
      5 : 'quadrillion',
      6 : 'quintillion',
      7 : 'sextillion',
      8 : 'septillion',
      9 : 'octillion',
      10 : 'nonillion',
      11 : 'decillion'
  };

  // 123
  digit3word(group) {
    // 1
    d3 = Math.floor(group / 100);
    // 2
    d2 = Math.floor((group - d3 * 100) / 10);
    // 3
    d1 = group - d3 * 100 - d2 * 10;

    group_array = [];

    if (d3 !== 0) {
      group_array.push(this.digit3[d3]);
    }

    if (d2 == 1 && d1 != 0) { // 11-19
      group_array.push(this.digit2_before_20[d1]);
    } else if (d2 != 0 && d1 == 0) { // 10-20-...-90
      group_array.push(this.digit2[d2]);
    } else if (d2 == 0 && d1 == 0) { // 00

    } else if (d2 == 0 && d1 != 0) { // 1-9
      group_array.push(this.digit1[d1]);
    } else { // Others
      group_array.push(this.digit2[d2]);
      group_array.push(this.digit1[d1]);
    }

    if (group_array.length===0) {
      return false;
    }

    return group_array;
  }

  // [123, 456, 789]
  makeWords(thousands) {
    let steps = thousands.length;
    let parts = [];
    for (let step in thousands) {
      // 123
      let group = thousands[step];
      // [one hundred, twenty, three]
      let group_words = this.digit3word(group);
      if (group_words) {
        // one hundred and twenty and three
        part = group_words.join(this.t.and);
        // 3 - 0 - = 2 => milion
        let stepKey = (steps - step - 1).toString();
        if (typeof this.steps[stepKey] !== 'undefined') {
          // one hundred and twenty and three milion
          part += ' ' + this.steps[stepKey];
        }
        parts.push(part);
      }
    }
    return parts.join(this.t.and);
  }

  integerWords() {
    return this.makeWords(this.intFormat().split(this.thousandsSep));
  }

  floatWords() {
    return this.hasDecimal() && this.decimals > 0
      ? this.t['.'] + 
        this.makeWords(this.constructor.thousandsFormat(this.decimal(), ',').split(',')) +
        this.floats[this.decimal().split('').length]
      : '';
  }

  words() {
    return this.hasSign()
      ? this.t[this.getSign()] + this.integerWords() + this.floatWords()
      : this.integerWords() + this.floatWords();
  }
}