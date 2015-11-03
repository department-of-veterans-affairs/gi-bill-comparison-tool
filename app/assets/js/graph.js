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

  // via http://stackoverflow.com/questions/3883342
  function format(val){
      while (/(\d+)(\d{3})/.test(val.toString())){
        val = val.toString().replace(/(\d+)(\d{3})/, '$1'+','+'$2');
      }
      return val;
    }

  // Append SVG
  var svg = d3.select(options.target)
    .append('svg')
      .attr('class', 'graph')
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('viewBox', '0 0 100 100');

  // Draw background area
  svg
    .append('rect')
    .attr('class', 'graph-background')
    .attr('x', 0)
    .attr('y', 0)
    .attr('height', 100)
    .attr('width', 40);

  // Draw bars
  var barWidth = 30;
  svg
    .data(options.bars)
    .enter()
      .append('rect')
        .attr('class', 'graph-bars')
        .attr('x', function(d, i){ return i * barWidth; })
        .attr('y', function(d, i){ return d.value; })
        .attr('height', function(d,i){ return d.value; }) // Assumes percentage
        .attr('width', barWidth);

};
