import React, { useEffect, useRef/*, useState*/ } from 'react';
import * as d3 from 'd3';

const PositionPieChart = ({ data_for_viz }) => {

  let attackerData = data_for_viz.filter(element => {
    return element.position_type === 'attacker'
  });
  let defenderData = data_for_viz.filter(element => {
    return element.position_type === 'defender'
  });



  const d3ContainerAttacker = useRef(null);
  const d3ContainerDefender = useRef(null);

  useEffect(() => {
    const width = 300;
    const height = 300;
    const radius = Math.min(width, height) / 2;

    // Clear the previous chart before creating a new one
    const svgContainer = d3.select(d3ContainerAttacker.current);
    svgContainer.selectAll('*').remove(); // This clears everything inside the container

    const svg = d3
      .select(d3ContainerAttacker.current)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2},${height / 2})`);

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const pie = d3.pie().value(d => d.duration);
    const arc = d3.arc().innerRadius(0).outerRadius(radius);

    const pieData = pie(attackerData);
    console.log("Position Chart pieData looks like:", pieData);

    svg
      .selectAll('.arc')
      .data(pieData)
      .enter()
      .append('g')
      .attr('class', 'arc')
      .append('path')
      .attr('d', arc)
      .attr('fill', d => color(d.data.position_desc));

    svg
      .selectAll('.arc')
      .append('text')
      .attr('transform', d => `translate(${arc.centroid(d)})`)
      .attr('dy', '0.35em')
      .attr('text-anchor', 'middle')
      .text(d => d.data.position_desc)
      .style('font-size', '14px')  // Set font size
      .style('fill', 'black');     // Set font color;
  }, [attackerData]);





  useEffect(() => {
    const width = 300;
    const height = 300;
    const radius = Math.min(width, height) / 2;

    // Clear the previous chart before creating a new one
    const svgContainer = d3.select(d3ContainerDefender.current);
    svgContainer.selectAll('*').remove(); // This clears everything inside the container

    const svg = d3
      .select(d3ContainerDefender.current)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2},${height / 2})`);

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const pie = d3.pie().value(d => d.duration);
    const arc = d3.arc().innerRadius(0).outerRadius(radius);

    const pieData = pie(defenderData);
    console.log("Position Chart pieData looks like:", pieData);

    svg
      .selectAll('.arc')
      .data(pieData)
      .enter()
      .append('g')
      .attr('class', 'arc')
      .append('path')
      .attr('d', arc)
      .attr('fill', d => color(d.data.position_desc));

    svg
      .selectAll('.arc')
      .append('text')
      .attr('transform', d => `translate(${arc.centroid(d)})`)
      .attr('dy', '0.35em')
      .attr('text-anchor', 'middle')
      .text(d => d.data.position_desc)
      .style('font-size', '14px')  // Set font size
      .style('fill', 'black');     // Set font color;
  }, [defenderData]);






  return <div>
    <h2>Positions</h2>
    <div className="attacking-graph">
      <h3>Attacking</h3>
      <div ref={d3ContainerAttacker}></div>
    </div>
    <div className="defending-graph">
      <h3>Defending</h3>
      <div ref={d3ContainerDefender}></div>
    </div>
  </div>
};

export default PositionPieChart;
