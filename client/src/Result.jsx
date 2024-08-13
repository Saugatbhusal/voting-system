import React, { useEffect, useState } from 'react';

import { PieChart, Pie, Legend, Tooltip } from "recharts";

function Result() {
  const [voteCounts, setVoteCounts] = useState([]);
  const [error, setError] = useState(null);

  const fetchVoteCounts = async () => {
    try {
      const response = await fetch('http://localhost:3001/vote-counts');
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Failed to fetch vote counts');
      }
      
      setVoteCounts(result);
      // console.log(result)
    } catch (err) {
      setError(err.message);
      console.error('Error fetching vote counts:', err);
    }
  };


  const modifiedArray = voteCounts.map( item =>({
    name: item.name,
    value: item.count
    

  })) ;

 



  useEffect(() => {
    fetchVoteCounts();
  }, []);



  return (
    <>
    <div>
      <h2 className="text-center">Vote Counts</h2>
      {error && <p className="text-danger">{error}</p>}
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Position</th>
            <th scope="col">Vote</th>
          </tr>
        </thead>
        <tbody>
          {voteCounts.map((vote, index) => (
            <tr key={vote._id}>
              <th scope="row">{index + 1}</th>
              <td>{vote.name}</td>
              <td>{vote.position}</td>
              <td>{vote.count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
 <PieChart width={400} height={400}>
      <Pie
        dataKey="value"
        isAnimationActive={true}
        data={modifiedArray}
        cx={200}
        cy={200}
        outerRadius={150}
        fill="#8884d8"
        label
      />

      <Tooltip />
    </PieChart>
    </div>
</>
  );
}

export default Result;
