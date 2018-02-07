/* --------------------------------------------
 *
 * Write your JavaScript here.
 *
 * It will get rolled up. On `build`, it gets minified.
 * --------------------------------------------
 */

import * as d3 from 'd3';
import search from './modules/search.js';

// import bisect from './modules/bisect.js';

// chart data example
var width = 960;
var height = 136;
var cellSize = 17;

// var formatPercent = d3.format('.1%');

var color = d3.scaleQuantize()
  .domain([0, 9])
  .range(['#ffffe5','#f7fcb9','#d9f0a3','#addd8e','#78c679','#41ab5d','#238443','#006837','#004529']);

var svg = d3.select('body')
  .selectAll('svg')
  .data(d3.range(2017, 2018))
  .enter().append('svg')
  .attr('width', width)
  .attr('height', height)
  .append('g')
  .attr('transform', 'translate(' + ((width - cellSize * 53) / 2) + ',' + (height - cellSize * 7 - 1) + ')');

svg.append('text')
  .attr('transform', 'translate(-6,' + cellSize * 3.5 + ')rotate(-90)')
  .attr('font-family', 'sans-serif')
  .attr('font-size', 10)
  .attr('text-anchor', 'middle')
  .text(function (d) { return d; });

// rect
var rects = svg.append('g')
  .attr('fill', 'none')
  .attr('stroke', '#ccc')
  .selectAll('rect')
  .data(function (d) {
    return d3.timeDays(new Date(d, 0, 1), new Date(d + 1, 0, 1));
  }).enter();

rects.append('rect')
  .attr('width', cellSize)
  .attr('height', cellSize)
  .attr('x', function (d) { return d3.timeWeek.count(d3.timeYear(d), d) * cellSize; })
  .attr('y', function (d) { return d.getDay() * cellSize; })
  // .datum(d3.timeFormat('%Y-%m-%d'))
  .attr('fill', d => {
    var bisectResult = search(rects.data(), d);
    return color(bisectResult.passes);
  })
  .on('mouseover', d => {
    var bisectResult = search(rects.data(), d);
    console.log(`${d3.timeFormat('%b %d')(d)} requires ${bisectResult.passes} passes`);
  });

svg.append('g')
  .attr('fill', 'none')
  .attr('stroke', '#000')
  .selectAll('path')
  .data(function (d) { return d3.timeMonths(new Date(d, 0, 1), new Date(d + 1, 0, 1)); })
  .enter().append('path')
  .attr('d', pathMonth);

// d3.csv('dji.csv', function (error, csv) {
//   if (error) throw error;

//   var data = d3.nest()
//     .key(function (d) { return d.Date; })
//     .rollup(function (d) { return (d[0].Close - d[0].Open) / d[0].Open; })
//     .object(csv);

//   rect.filter(function (d) { return d in data; })
//     .attr('fill', function (d) { return color(data[d]); })
//     .append('title')
//     .text(function (d) { return d + ': ' + formatPercent(data[d]); });
// });

function pathMonth (t0) {
  var t1 = new Date(t0.getFullYear(), t0.getMonth() + 1, 0);
  var d0 = t0.getDay();
  var w0 = d3.timeWeek.count(d3.timeYear(t0), t0);
  var d1 = t1.getDay();
  var w1 = d3.timeWeek.count(d3.timeYear(t1), t1);

  return 'M' + (w0 + 1) * cellSize + ',' + d0 * cellSize +
    'H' + w0 * cellSize + 'V' + 7 * cellSize +
    'H' + w1 * cellSize + 'V' + (d1 + 1) * cellSize +
    'H' + (w1 + 1) * cellSize + 'V' + 0 +
    'H' + (w0 + 1) * cellSize + 'Z';
}
