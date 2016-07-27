(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * Helpers to round dates to day, week, month, year boundaries.
 *
 * The default rounding behavior is to day boundaries. To change
 * this, set boundary to one of:
 *
 * 'year'
 * 'month'
 * 'week'
 * 'day' [default]
 */

var DAY_IN_MS = 1000 * 60 * 60 * 24;
var WEEK_IN_MS = DAY_IN_MS * 7;

var floor = function(date, boundary) {
  var start = new Date(date);

  // Account for the default case
  if (!boundary) {
    boundary = 'day';
  }

  // Are we rounding to the day?
  start.setHours(0);
  start.setMinutes(0);
  start.setSeconds(0);
  start.setMilliseconds(0);
  if (boundary === 'day') {
    return start;
  }

  // Are we rounding to the week?
  if (boundary === 'week') {
    start.setDate(start.getDate() - start.getDay());

    return start;
  }

  // Are we rounding to the month?
  start.setDate(1);
  if (boundary === 'month') {
    return start;
  }

  // Are we rounding to the year?
  start.setMonth(0);
  if (boundary === 'year') {
    return start;
  }

  return undefined;
};

var ceil = function(date, boundary) {
  var end = new Date(date);

  // Account for the default case
  if (!boundary) {
    boundary = 'day';
  }

  // Are we rounding to the day?
  end.setHours(0);
  end.setMinutes(0);
  end.setSeconds(0);
  end.setMilliseconds(0);
  if (boundary === 'day') {
    end.setDate(end.getDate() + 1);

    return end;
  }

  // Are we rounding to the week?
  if (boundary === 'week') {
    end.setDate(end.getDate() + (7 - end.getDay()));

    return end;
  }

  // Are we rounding to the month?
  end.setDate(1);
  if (boundary === 'month') {
    end.setMonth(end.getMonth() + 1);

    return end;
  }

  // Are we rounding to the year?
  end.setMonth(0);
  if (boundary === 'year') {
    end.setYear(1900 + end.getYear() + 1);

    return end;
  }

  return undefined;
};

var round = function(date, boundary) {
  var start = new Date(date),
      end = new Date(date),
      closest = function(a, b) {
        if (date.getTime() - a.getTime() <= b.getTime() - date.getTime()) {
          return a;
        }
        else {
          return b;
        }
      };

  // Account for the default case
  if (!boundary) {
    boundary = 'day';
  }

  // Are we rounding to the nearest day?
  start.setHours(0);
  start.setMinutes(0);
  start.setSeconds(0);
  start.setMilliseconds(0);
  end.setHours(0);
  end.setMinutes(0);
  end.setSeconds(0);
  end.setMilliseconds(0);
  if (boundary === 'day') {
    end.setDate(end.getDate() + 1);

    return closest(start, end);
  }

  // Are we rounding to the nearest week?
  if (boundary === 'week') {
    start.setDate(start.getDate() - start.getDay());
    end.setDate(end.getDate() + (7 - end.getDay()));

    return closest(start, end);
  }

  // Are we rounding to the nearest month?
  start.setDate(1);
  end.setDate(1);
  if (boundary === 'month') {
    end.setMonth(end.getMonth() + 1);

    return closest(start, end);
  }

  // Are we rounding to the nearest year?
  start.setMonth(0);
  end.setMonth(0);
  if (boundary === 'year') {
    end.setYear(1900 + end.getYear() + 1);

    return closest(start, end);
  }

  return undefined;
};

module.exports = {
  round: round,
  ceil: ceil,
  floor: floor,
  DAY_IN_MS: DAY_IN_MS,
  WEEK_IN_MS: WEEK_IN_MS
};

},{}],2:[function(require,module,exports){
var DateRound = require('../index');

QUnit.test( 'Round date to day boundaries', function(assert) {
  // Create a date for rounding
  var date, rounded, target;
  
  // Round down ('day' implied)
  date = new Date("Wed Jul 27 2016 11:55:40");
  target = new Date("Wed Jul 27 2016 00:00:00");
  rounded = DateRound.round(date);
  assert.deepEqual(rounded, target, 'Passed!');

  // Round down ('day')
  date = new Date("Wed Jul 27 2016 11:55:40");
  target = new Date("Wed Jul 27 2016 00:00:00");
  rounded = DateRound.round(date, 'day');
  assert.deepEqual(rounded, target, 'Passed!');

  // Round up ('day' implied)
  date = new Date("Wed Jul 27 2016 12:55:40");
  target = new Date("Thu Jul 28 2016 00:00:00");
  rounded = DateRound.round(date);
  assert.deepEqual(rounded, target, 'Passed!');

  // Round up ('day')
  date = new Date("Wed Jul 27 2016 12:55:40");
  target = new Date("Thu Jul 28 2016 00:00:00");
  rounded = DateRound.round(date, 'day');
  assert.deepEqual(rounded, target, 'Passed!');
});

QUnit.test( 'Round date to week boundaries', function(assert) {
  // Create a date for rounding
  var date, rounded, target;
  
  // Round down
  date = new Date("Wed Jul 27 2016 11:55:40");
  target = new Date("Sun Jul 24 2016 00:00:00");
  rounded = DateRound.round(date, 'week');
  assert.deepEqual(rounded, target, 'Passed!');

  // Round up
  date = new Date("Wed Jul 27 2016 12:55:40");
  target = new Date("Sun Jul 31 2016 00:00:00");
  rounded = DateRound.round(date, 'week');
  assert.deepEqual(rounded, target, 'Passed!');
});

QUnit.test( 'Round date to month boundaries', function(assert) {
  // Create a date for rounding
  var date, rounded, target;
  
  // Round down
  date = new Date("Fri Jul 15 2016 11:55:40");
  target = new Date("Fri Jul 1 2016 00:00:00");
  rounded = DateRound.round(date, 'month');
  assert.deepEqual(rounded, target, 'Passed!');

  // Round up
  date = new Date("Sat Jul 16 2016 12:55:40");
  target = new Date("Mon Aug 1 2016 00:00:00");
  rounded = DateRound.round(date, 'month');
  assert.deepEqual(rounded, target, 'Passed!');
});

QUnit.test( 'Round date to year boundaries', function(assert) {
  // Create a date for rounding
  var date, rounded, target;
  
  // Round down
  date = new Date("Wed Jun 22 2016 11:55:40");
  target = new Date("Fri Jan 1 2016 00:00:00");
  rounded = DateRound.round(date, 'year');
  assert.deepEqual(rounded, target, 'Passed!');

  // Round up
  date = new Date("Tue Jul 12 2016 12:55:40");
  target = new Date("Sun Jan 1 2017 00:00:00");
  rounded = DateRound.round(date, 'year');
  assert.deepEqual(rounded, target, 'Passed!');
});

QUnit.test( 'Floor date to day boundary', function(assert) {
  // Create a date for rounding
  var date, rounded, target;
  
  // Floor ('day' implied)
  date = new Date("Wed Jun 22 2016 13:55:40");
  target = new Date("Wed Jun 22 2016 00:00:00");
  rounded = DateRound.floor(date);
  assert.deepEqual(rounded, target, 'Passed!');

  // Floor
  date = new Date("Wed Jun 22 2016 13:55:40");
  target = new Date("Wed Jun 22 2016 00:00:00");
  rounded = DateRound.floor(date, 'day');
  assert.deepEqual(rounded, target, 'Passed!');
});

QUnit.test( 'Floor date to week boundary', function(assert) {
  // Create a date for rounding
  var date, rounded, target;
  
  date = new Date("Fri Jun 24 2016 13:55:40");
  target = new Date("Sun Jun 19 2016 00:00:00");
  rounded = DateRound.floor(date, 'week');
  assert.deepEqual(rounded, target, 'Passed!');
});

QUnit.test( 'Floor date to month boundary', function(assert) {
  // Create a date for rounding
  var date, rounded, target;
  
  date = new Date("Wed Jun 22 2016 13:55:40");
  target = new Date("Wed Jun 1 2016 00:00:00");
  rounded = DateRound.floor(date, 'month');
  assert.deepEqual(rounded, target, 'Passed!');
});

QUnit.test( 'Floor date to year boundary', function(assert) {
  // Create a date for rounding
  var date, rounded, target;
  
  date = new Date("Mon Aug 22 2016 13:55:40");
  target = new Date("Fri Jan 1 2016 00:00:00");
  rounded = DateRound.floor(date, 'year');
  assert.deepEqual(rounded, target, 'Passed!');
});

QUnit.test( 'Ceil date to day boundary', function(assert) {
  // Create a date for rounding
  var date, rounded, target;
  
  // Ceil ('day' implied)
  date = new Date("Mon Aug 22 2016 08:55:40");
  target = new Date("Tue Aug 23 2016 00:00:00");
  rounded = DateRound.ceil(date);
  assert.deepEqual(rounded, target, 'Passed!');
  
  // Ceil
  date = new Date("Mon Aug 22 2016 08:55:40");
  target = new Date("Tue Aug 23 2016 00:00:00");
  rounded = DateRound.ceil(date, 'day');
  assert.deepEqual(rounded, target, 'Passed!');
});

QUnit.test( 'Ceil date to week boundary', function(assert) {
  // Create a date for rounding
  var date, rounded, target;
  
  date = new Date("Mon Aug 22 2016 13:55:40");
  target = new Date("Sun Aug 28 2016 00:00:00");
  rounded = DateRound.ceil(date, 'week');
  assert.deepEqual(rounded, target, 'Passed!');
});

QUnit.test( 'Ceil date to month boundary', function(assert) {
  // Create a date for rounding
  var date, rounded, target;
  
  date = new Date("Mon Aug 8 2016 13:55:40");
  target = new Date("Thu Sep 1 2016 00:00:00");
  rounded = DateRound.ceil(date, 'month');
  assert.deepEqual(rounded, target, 'Passed!');
});

QUnit.test( 'Ceil date to year boundary', function(assert) {
  // Create a date for rounding
  var date, rounded, target;
  
  date = new Date("Tue Jun 7 2016 13:55:40");
  target = new Date("Sun Jan 1 2017 00:00:00");
  rounded = DateRound.ceil(date, 'year');
  assert.deepEqual(rounded, target, 'Passed!');
});

},{"../index":1}]},{},[2]);
