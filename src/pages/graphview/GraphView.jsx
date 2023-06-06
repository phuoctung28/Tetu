import React, { useState, useEffect } from 'react';
import { Layout, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { getAllDocuments } from '../../services/firebase';
import './graph_view.css';
import MainHeader from '../../components/header/MainHeader';
import Sidebar from '../../components/sidebar/Sidebar';
import Graph from 'react-graph-vis';
import moment from 'moment';
import { useNavigate } from 'react-router';

const { Content } = Layout;

const options = {
    layout: {
        hierarchical: false
    },
    nodes: {
        shape: "dot",
        // opacity: 1,
        // border: "#fff",
        scaling: {
            min: 10,
            max: 30,
        },
        font: {
            size: 12,
            // face: "Tahoma",
        },
    },
    edges: {
        color: "#73A2FF",
        width: 0.15,
        // smooth: {
        //     // enabled: true,
        //     type: "continuous",
        //     // type: "diagonalCross",
        //     // roundness: 0.5
        // }
    },
    manipulation: {
        enabled: true,
    },
    interaction: { hover: true },
};

const randomColor = () => {
    const red = Math.floor(Math.random() * 256).toString(16).padStart(2, '0');
    const green = Math.floor(Math.random() * 256).toString(16).padStart(2, '0');
    const blue = Math.floor(Math.random() * 256).toString(16).padStart(2, '0');
    return `#${red}${green}${blue}`;
}
const GraphView = () => {
    const [nodeList, setNodeList] = useState([]);
    const [edgeList, setEdgeList] = useState([]);

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

    const [modal, contextHolder] = Modal.useModal();

    useEffect(() => {
        const fetchNotesAndFiles = async () => {
            try {
                const fetchedNotes = await getAllDocuments("notes");
                const fetchedFiles = await getAllDocuments("files");
                const fetchedFolders = await getAllDocuments("folders");
                const folders = fetchedFolders.map(item => ({
                    id: item.id,
                    title: item.folder_name,
                    label: item.folder_name,
                    color: "#2b7ce9",
                }));
                const notes = fetchedNotes.map(item => ({
                    // ...item, 
                    id: item.id,
                    title: item.title,
                    label: item.title,
                    color: "#6da7f5",
                    type: "note",
                    // status: item?.meta_data?.status || "To-do",
                    // type: "Note",
                }));
                const files = fetchedFiles.map(item => ({
                    // ...item,
                    id: item.id,
                    title: item.name,
                    label: item.name,
                    color: "#DAEAFF",
                    type: "file",
                    // status: "Done",
                    // type: "File",
                }));
                const noteData = [...folders, ...notes, ...files];
                const edgeData = [];
                for (let item of fetchedFolders) {
                    let rootNode = item.id;
                    for (let note of item.notes) {
                        edgeData.push({
                            from: rootNode,
                            to: note,
                        })
                    }
                    for (let file of item.files) {
                        edgeData.push({
                            from: rootNode,
                            to: file,
                        })
                    }
                }
                setNodeList(noteData);
                setEdgeList(edgeData);
                setState({
                    ...state,
                    counter: noteData.length,
                    graph: {
                        nodes: noteData,
                        edges: edgeData,
                    }
                })
            } catch (error) {
                console.error('Error fetching notes and files:', error);
            }
        };
        fetchNotesAndFiles();
    }, []);

    const navigate = useNavigate();

    const handleOpenNode = (nodeId) => {
        console.log("Cur node id: ", nodeId);
        console.log("Cur node id: ", nodeList);
        let filter = nodeList.filter(item => item.id === nodeId && item.type === "note");
        console.log("Filter: ", filter);
        if (nodeList.filter(item => item.id === nodeId && item.type === "note").length > 0)
            // navigate(`/note/${nodeId}`);
            console.log("open note");

        console.log("open file");
        // navigate(`/file/${nodeId}`);
    }

    const [state, setState] = useState({
        counter: 0,
        graph: {
            nodes: [
                // { id: 1, title: "✨ Seminar Note", label: "Seminar Note", color: "#A4E8A7" },
                // { id: 2, title: "Hands On Machine Learning with Scikit Learn and Tensorflow.pdf", label: "Hands On ML", color: "#ceedd0" },
                // { id: 3, title: "PyTorch Intro", label: "PyTorch Intro", color: "#ceedd0" },
                // { id: 4, title: "↗️ Transfer Learning", label: "Transfer Learning", color: "#99A8B4" },
                // { id: 5, title: "💪🏻 Image Augmentation", label: "Image Augmentation", color: "#99A8B4" },
                // { id: 6, title: "🚀 Lesson 1 - Intro to ML with TF", label: "ML with TF", color: "#0098FF" },
                // { id: 7, title: "👁️ Intro to Computer Vision", label: "Intro to CV", color: "#f0f5ff" },
                // { id: 8, title: "🌐 Intro to Convolution", label: "Intro to Convolution", color: "#f0f5ff" },
            ],
            edges: [
                // { from: 2, to: 1 },
                // { from: 3, to: 1 },
                // { from: 7, to: 6 },
                // { from: 8, to: 6 },
            ]
        },
        events: {
            select: ({ nodes, edges }) => {
                console.log("Selected nodes:", nodes);
                console.log("Selected edges:", edges);
            },
            // doubleClick: ({ nodes, pointer: { canvas } }, items, ...props) => {
            //     // createNode(canvas.x, canvas.y);
            //     console.log("node data:", nodes, ...props);
            //     if (nodes) {
            //         console.log("dbl click: ", nodes);
            //         modal.confirm({
            //             title: 'Confirm',
            //             icon: <ExclamationCircleOutlined />,
            //             content: 'Open this item?',
            //             okText: 'Open',
            //             cancelText: 'Cancel',
            //         });
            //     }
            // }
        }
    })
    const { graph, events } = state;

    useEffect(() => {
        setState({
            ...state,
            events: {
                doubleClick: ({ nodes }) => {
                    if (nodes) {
                        // console.log("dbl click: ", nodes);
                        modal.confirm({
                            title: 'Confirm',
                            icon: <ExclamationCircleOutlined />,
                            content: 'Open this item?',
                            okText: 'Open',
                            cancelText: 'Cancel',
                            onOk: () => {
                                // console.log("Cur node id: ", nodes[0]);
                                // console.log("Cur node list: ", nodeList);
                                let filter = nodeList.filter(item => item.id === nodes[0]);
                                console.log("Filter: ", filter);
                                if (filter.length > 0) {
                                    const url = `/${filter[0].type}/${nodes[0]}`;
                                    console.log("url: ", url);
                                    navigate(url);
                                }
                            },
                        });
                    }
                }
            }
        });
    }, [nodeList]);
    return (
        <Layout hasSider>
            <Sidebar />
            <Layout className="site-layout" style={{ marginLeft: 200, }} >
                <MainHeader />
                <Content style={{ margin: '0', overflow: 'initial', }} >
                    <div className="graph-container">
                        {contextHolder}
                        <Graph
                            className="graph-component"
                            graph={graph}
                            options={options}
                            events={events}
                            style={{
                                height: "100%",
                                backgroundColor: "transparent"
                            }}
                        />
                    </div>
                </Content>
            </Layout>
        </Layout >
    );
};
export default GraphView;