/* 

Simple flexible graph function for Student Veteran Outcome graphs.

Usage:

new Graph({
  target : '#graduation',
  title : 'Graduation Rate',
  bars : [
    { name : 'vet', value : 4.5 },
    { name : 'all', value : 22.8 }
  ],
  average : 43.9
});

*/

var Graph = function(options){
  
  var width = 200,
      height = 100,
      padding = 10;

  // Append SVG
  var svg = d3.select(options.target)
    .append('svg')
      .attr('class', 'graph')
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('viewBox', '0 0 ' + width + ' ' + (height + padding));

  // Draw background area
  svg
    .append('rect')
    .attr('class', 'graph-background')
    .attr('x', 0)
    .attr('y', 0)
    .attr('height', height)
    .attr('width', width / 2);

  // Draw bars
  var barWidth = (width / 2) / options.bars.length;
  svg
    .selectAll('.graph-bar')
    .data(options.bars)
    .enter()
      .append('rect')
        .attr('class', function(d){ return d.name + ' graph-bar'; })
        .attr('x', function(d, i){ return i * barWidth; })
        .attr('y', function(d, i){ return height - d.value; })
        .attr('height', 0)
        .attr('width', barWidth)
        .transition()
          .attr('height', function(d,i){ return d.value; }); // Assumes percentage

  // Draw bar labels
  svg
    .selectAll('.graph-bar-label')
    .data(options.bars)
    .enter()
      .append('text')
        .attr('class', 'graph-bar-label') 
        .attr('x', function(d, i){ return (i * barWidth) + (barWidth / 2); })
        .attr('y', function(d, i){ return Math.min(height - d.value + 10, height - 5); })
        .text(function(d){ return d.value + '%'; });

  // Draw axis
  svg
    .append('line')
      .attr('class', 'graph-axis')
      .attr('x1', 0)
      .attr('x2', width / 2)
      .attr('y1', height)
      .attr('y2', height);

  // Draw axis labels
  svg
    .selectAll('.graph-axis-label')
    .data(options.bars)
    .enter()
      .append('text')
        .attr('class', 'graph-axis-label') 
        .attr('x', function(d, i){ return (i * barWidth) + (barWidth / 2); })
        .attr('y', height + 10) 
        .text(function(d){ return d.name; });

  // Draw average line
  svg
    .append('line')
      .attr('class', 'graph-line')
      .attr('x1', 0)
      .attr('x2', width / 2)
      .attr('y1', height - options.average)
      .attr('y2', height - options.average);

  // Add average line label
  svg
    .append('text')
      .attr('class', 'graph-line-label')
      .attr('x', width / 2)
      .attr('y', height - options.average)
      .text('< ' + options.average + '% Nat\'l');

  // via http://stackoverflow.com/questions/3883342
  function format(val){
      while (/(\d+)(\d{3})/.test(val.toString())){
        val = val.toString().replace(/(\d+)(\d{3})/, '$1'+','+'$2');
      }
      return val;
    }

};
