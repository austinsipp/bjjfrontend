import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

const SubmissionPieChart = ({ data_for_viz, data_for_filter }) => {



    const d3Container = useRef(null);

    useEffect(() => {
        const width = 300;
        const height = 300;
        const radius = Math.min(width, height) / 2;

        // Clear the previous chart before creating a new one
        const svgContainer = d3.select(d3Container.current);
        svgContainer.selectAll('*').remove(); // This clears everything inside the container

        const svg = d3
            .select(d3Container.current)
            .append('svg')
            .attr('width', width)
            .attr('height', height)
            .append('g')
            .attr('transform', `translate(${width / 2},${height / 2})`);

        const color = d3.scaleOrdinal(d3.schemeCategory10);

        const pie = d3.pie().value(d => d.count);
        const arc = d3.arc().innerRadius(0).outerRadius(radius);

        const pieData = pie(data_for_viz);
        console.log("Submission Chart pieData looks like:", pieData);

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
            .text(d => d.data.position_desc);
    }, [data_for_viz]);






    return <div>
        <h2>Submissions Achieved</h2>


        {/* D3 Pie Chart */}
        <div ref={d3Container}></div>
    </div>
};

export default SubmissionPieChart;
