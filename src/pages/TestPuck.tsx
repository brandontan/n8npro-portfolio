import React from "react";
import { Puck } from "@measured/puck";
import "@measured/puck/dist/index.css";

const config = {
  components: {
    HeadingBlock: {
      fields: {
        children: { 
          type: "text" 
        }
      },
      defaultProps: {
        children: "Heading"
      },
      render: ({ children }) => <h1>{children}</h1>
    },
    Paragraph: {
      fields: {
        text: { 
          type: "textarea" 
        }
      },
      defaultProps: {
        text: "Paragraph"  
      },
      render: ({ text }) => <p>{text}</p>
    }
  }
};

const initialData = { content: [], root: {} };

export default function TestPuck() {
  const [data, setData] = React.useState(initialData);

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Puck 
        config={config} 
        data={data}
        onChange={setData}
        onPublish={() => {
          console.log("Published!", data);
        }}
      />
    </div>
  );
}