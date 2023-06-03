import { Layout } from 'antd';
import React, { useState } from 'react';
import MainHeader from '../../components/header/MainHeader';
import './graph_view.css';
import Sidebar from '../../components/sidebar/Sidebar';
import Graph from 'react-graph-vis';

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
            { id: 1, shape: "diamond", group: "1", title: "✨ Seminar Note", label: "Seminar Note", color: "#A4E8A7" },
            { id: 2, shape: "diamond", group: "1", title: "Hands On Machine Learning with Scikit Learn and Tensorflow.pdf", label: "Hands On ML", color: "#ceedd0" },
            { id: 3, shape: "diamond", group: "1", title: "PyTorch Intro", label: "PyTorch Intro", color: "#ceedd0" },
            { id: 4, shape: "diamond", title: "↗️ Transfer Learning", label: "Transfer Learning", color: "#99A8B4" },
            { id: 5, shape: "diamond", title: "💪🏻 Image Augmentation", label: "Image Augmentation", color: "#99A8B4" },
            { id: 6, shape: "diamond", group: "2", title: "🚀 Lesson 1 - Intro to ML with TF", label: "ML with TF", color: "#0098FF" },
            { id: 7, shape: "diamond", group: "2", title: "👁️ Intro to Computer Vision", label: "Intro to CV", color: "#f0f5ff" },
            { id: 8, shape: "diamond", group: "2", title: "🌐 Intro to Convolution", label: "Intro to Convolution", color: "#f0f5ff" },
         ],
         edges: [
            { from: 2, to: 1 },
            { from: 3, to: 1 },
            { from: 7, to: 6 },
            { from: 8, to: 6 },
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