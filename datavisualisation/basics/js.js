d3.select('body')
  .selectAll('p')
  .data([16, 43, 42])
  .enter()
  .append("p")
  .text("Hello");

  