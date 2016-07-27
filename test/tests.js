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
