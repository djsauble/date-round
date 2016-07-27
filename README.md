Round/floor/ceil dates to day/week/month/year boundaries

## Usage

    var DateRound = require('date-round');

    // Round to the nearest day
    DateRound.round(Date.now());

    // Midnight
    DateRound.floor(Date.now());

    // Next week
    DateRound.ceil(Date.now(), 'week');

    // Next month
    DateRound.ceil(Date.now(), 'month');

    // Next year
    DateRound.ceil(Date.now(), 'year');
