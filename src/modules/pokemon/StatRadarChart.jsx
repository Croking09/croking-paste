import { RadarChart, PolarAngleAxis, Radar, ResponsiveContainer } from 'recharts';

function StatRadarChart({ data }) {
  const outerRadius = 130;
  const cx = 175;
  const cy = 175;

  const sides = data.length;
  const angles = Array.from({ length: sides }).map((_, i) => (Math.PI * 2 * i) / sides - Math.PI / 2);
  const points = angles.map(angle => {
    const x = cx + outerRadius * Math.cos(angle);
    const y = cy + outerRadius * Math.sin(angle);
    return `${x},${y}`;
  });

  return (
    <ResponsiveContainer width={350} aspect={1}>
      <RadarChart outerRadius={outerRadius} data={data} cx={cx} cy={cy}>
        {angles.map((angle, i) => {
          const x = cx + outerRadius * Math.cos(angle);
          const y = cy + outerRadius * Math.sin(angle);
          return (
            <line
              key={`line-${i}`}
              x1={cx}
              y1={cy}
              x2={x}
              y2={y}
              stroke="#ccc"
              strokeWidth={1}
            />
          );
        })}

        <polygon
          points={points.join(' ')}
          stroke="#ccc"
          strokeWidth={1}
          fill="none"
        />

        <PolarAngleAxis
          dataKey="stat"
          tick={({ payload, index }) => {
            const statLabel = payload.value;
            const statKey = statLabel.toLowerCase();

            const natureUp = data[index]?.natureUp?.toLowerCase();
            const natureDown = data[index]?.natureDown?.toLowerCase();
            const value = data[index]?.value;

            const angle = Math.PI * 2 * index / data.length;
            const labelOffset = 22;
            const finalRadius = outerRadius + labelOffset;
            const finalX = cx + finalRadius * Math.cos(angle - Math.PI / 2);
            const finalY = cy + finalRadius * Math.sin(angle - Math.PI / 2);

            let color = "#000";
            if (statKey === natureUp) color = "red";
            else if (statKey === natureDown) color = "blue";

            return (
              <g transform={`translate(${finalX},${finalY})`}>
                <text textAnchor="middle" fill={color} fontSize={14}>
                  {statLabel}
                </text>
                <text y={18} textAnchor="middle" fill="#000" fontSize={14}>
                  {value}
                </text>
              </g>
            );
          }}
        />
        <Radar
          name="Stats"
          dataKey="value"
          stroke="#8884d8"
          fill="#8884d8"
          fillOpacity={0.6}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
}

export default StatRadarChart;
