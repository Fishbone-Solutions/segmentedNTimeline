import * as React from "react";

const Legend: React.FC = () => {
  const legendStyle: React.CSSProperties = {
    fontSize: '18px',
    marginBottom: '10px',
  };

  const colorRectStyle: React.CSSProperties = {
    width: '50px',
    height: '25px',
    marginRight: '10px',
    display: 'inline-block',
  };

  return (
<>
      <p style={legendStyle}>Legend</p>
      <div style={{ ...colorRectStyle, backgroundColor: 'grey' }}></div>
      <span>-&gt; Not Started</span><br />
      <div style={{ ...colorRectStyle, backgroundColor: 'red' }}></div>
      <span>-&gt; Late</span><br />
      <div style={{ ...colorRectStyle, backgroundColor: 'yellow' }}></div>
      <span>-&gt; At Risk</span><br />
      <div style={{ ...colorRectStyle, backgroundColor: 'green' }}></div>
      <span>-&gt; On Plan</span><br />
      <div style={{ ...colorRectStyle, backgroundColor: 'blue' }}></div>
      <span>-&gt; Complete</span><br />
</>
  );
};

export default Legend;