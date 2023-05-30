import { Layout } from 'antd';
import React, { useState } from 'react';
import MainHeader from '../../components/header/MainHeader';
import './graph_view.css';
import Sidebar from '../../components/sidebar/Sidebar';
import Graph from "react-graph-vis";

const { Content } = Layout;

const options = {
   layout: {
      hierarchical: false
   },
   edges: {
      color: "#73A2FF",
      smooth: {
         enabled: true,
         // type: "diagonalCross",
         // roundness: 0.5
      }
   },
   nodes: {
      shape: "circle",
      font: {
         color: '#000',
         size: 18,
         align: 'center'
      },
   }
};

const randomColor = () => {
   const red = Math.floor(Math.random() * 256).toString(16).padStart(2, '0');
   const green = Math.floor(Math.random() * 256).toString(16).padStart(2, '0');
   const blue = Math.floor(Math.random() * 256).toString(16).padStart(2, '0');
   return `#${red}${green}${blue}`;
}
const GraphView = () => {
   const createNode = (x, y) => {
      const color = randomColor();
      setState(({ graph: { nodes, edges }, counter, ...rest }) => {
         const id = counter + 1;
         const from = Math.floor(Math.random() * (counter - 1)) + 1;
         return {
            graph: {
               nodes: [
                  ...nodes,
                  { id, label: `Node ${id}`, color, x, y }
               ],
               edges: [
                  ...edges,
                  { from, to: id }
               ]
            },
            counter: id,
            ...rest
         }
      });
   }
   const [state, setState] = useState({
      counter: 5,
      graph: {
         nodes: [
            { id: 1, title: "Node 1", label: "Node 1", physics: false, color: "#f0f5ff" },
            { id: 2, title: "Node 2", label: "Node 2", physics: false, color: "#fff2e8" },
            { id: 3, title: "Node 3", label: "Node 3", physics: false, color: "#fff2e8" },
            { id: 4, title: "Node 4", label: "Node 4", physics: false, color: "#f6ffed" },
            { id: 5, title: "Node 5", label: "Node 5", physics: false, color: "#f0f5ff" },
         ],
         edges: [
            { from: 1, to: 2 },
            { from: 3, to: 1 },
            { from: 2, to: 4 },
            { from: 2, to: 5 }
         ]
      },
      events: {
         select: ({ nodes, edges }) => {
            console.log("Selected nodes:");
            console.log(nodes);
            console.log("Selected edges:");
            console.log(edges);
         },
         doubleClick: ({ pointer: { canvas } }) => {
            createNode(canvas.x, canvas.y);
         }
      }
   })
   const { graph, events } = state;

   return (
      <Layout hasSider>
         <Sidebar />
         <Layout className="site-layout" style={{ marginLeft: 200, }} >
            <MainHeader />
            <Content style={{ margin: '0', overflow: 'initial', }} >
               <Graph
                  graph={graph}
                  options={options}
                  events={events}
                  style={{ height: "calc(100vh - 50px)" }}
               />
            </Content>
         </Layout>
      </Layout>
   );
};
export default GraphView;