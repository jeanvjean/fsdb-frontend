import React, { PureComponent } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
} from 'recharts';

const data = [
  {
    name: 'Page A',
    Legend1: 4000,
    Legend2: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    Legend1: 3000,
    Legend2: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    Legend1: 2000,
    Legend2: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    Legend1: 2780,
    Legend2: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    Legend1: 1890,
    Legend2: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    Legend1: 2390,
    Legend2: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    Legend1: 3490,
    Legend2: 4300,
    amt: 2100,
  },
];

export default class AdminOverview extends PureComponent {
  renderColorfulLegendText = (value, entry) => {
    const { color } = entry;

    return <span style={{ color, textTransform: 'capitalize' }}>{value.replace(/_/g, ' ')}</span>;
  };

  render() {
    return (
      <ResponsiveContainer minWidth={700} height={400}>
        <LineChart width={800} height={400} data={this.props.data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis tick={{ fontSize: 10 }} dataKey="month" stroke="#A7A9C0" />
          <YAxis tick={{ fontSize: 10 }} />
          <Tooltip />
          <Legend
            verticalAlign="top"
            align="right"
            formatter={this.renderColorfulLegendText}
            wrapperStyle={{ fontSize: '13px' }}
            iconType="square"
            height={36}
          />
          {/* <Line type="monotone" dataKey="total_sms_resent" stroke="#ff6f8b" activeDot={{ r: 8 }} /> */}
          <Line type="monotone" dataKey="total_sms_request" stroke="#00CFE6" />
          <Line type="monotone" dataKey="total_sms_resolved" stroke="#574CC1" />
        </LineChart>
      </ResponsiveContainer>
    );
  }
}
