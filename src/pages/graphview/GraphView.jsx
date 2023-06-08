import React, { useState, useEffect } from 'react';
import {  Badge, Layout, Modal, message } from 'antd';
import { ExclamationCircleOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { getAllDocuments, getDocumentById, updateDocumentProperty } from '../../services/firebase';
import './graph_view.css';
import MainHeader from '../../components/header/MainHeader';
import Sidebar from '../../components/sidebar/Sidebar';
import Graph from 'react-graph-vis';
import { useNavigate } from 'react-router';

const { Content } = Layout;

const randomColor = () => {
    const red = Math.floor(Math.random() * 256).toString(16).padStart(2, '0');
    const green = Math.floor(Math.random() * 256).toString(16).padStart(2, '0');
    const blue = Math.floor(Math.random() * 256).toString(16).padStart(2, '0');
    return `#${red}${green}${blue}`;
}
const GraphView = () => {
    const [nodeList, setNodeList] = useState([]);
    const [edgeList, setEdgeList] = useState([]);

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
            smooth: {
                // enabled: true,
                type: "continuous",
                // type: "diagonalCross",
                // roundness: 0.5
            }
        },
        manipulation: {
            // enabled: false,
            initiallyActive: false,
            addEdge: async function (data, callback) {
                if (data.from == data.to) {
                    // var r = confirm("Do you want to connect the node to itself?");
                    // if (r == true) {
                    //     callback(data);
                    // }
                } else {
                    let target = nodeList.filter(item => item.id === data.from)[0];
                    callback(data);
                    try {
                        const type = target.type === "file" ? "files" : "notes";
                        const targetItem = await getDocumentById(type, target.id);
                        const formatData = {
                            edge_id: data.id,
                            node_id: data.to,
                        }
                        const insertData = targetItem?.connections && targetItem?.connections.length > 0
                            ? [...targetItem?.connections, formatData]
                            : [formatData];

                        await updateDocumentProperty(type, target.id, "connections", insertData)
                        message.success("Add edge successfully!");
                    } catch (error) {
                        console.log("Error add edge", error);
                    }
                }
            },
            deleteEdge: async function (data, callback) {
                console.log("Delete edge: ", data);
                let deletingEdge = edgeList.filter(item => item.id === data.edges[0])[0];
                let target = nodeList.filter(item => item.id === deletingEdge.from)[0];
                console.log("Invoke: ", deletingEdge);
                console.log("Target: ", target);
                callback(data);
                try {
                    const type = target.type === "file" ? "files" : "notes";
                    const targetItem = await getDocumentById(type, target.id);
                    const updateData = targetItem?.connections && targetItem?.connections.length > 0
                        ? targetItem?.connections
                        : [];
                    const objWithIdIndex = updateData.findIndex((obj) => obj.id === data.id);
                    if (objWithIdIndex > -1) {
                        updateData.splice(objWithIdIndex, 1);
                    }
                    await updateDocumentProperty(type, target.id, "connections", updateData)
                    message.success("Delete edge successfully!");
                } catch (error) {
                    console.log("Error delete edge", error);
                }
            },
            deleteNode: false,
            // editNode: undefined,
            editEdge: false,
        },
        interaction: { hover: true },
        filter: 'nodes',
    };

    const [modal, contextHolder] = Modal.useModal();

    const getEdgeFromNoteAndFile = (data) => {
        let edges = []
        for (let item of data) {
            let from = item.id;
            if (item?.connections) {
                item?.connections.forEach(element => {
                    edges.push({
                        from: from,
                        to: element.node_id,
                        id: element.edge_id,
                        color: "#969ead",
                    });
                });
            }
        }
        return edges;
    }
    useEffect(() => {
        const fetchNotesAndFiles = async () => {
            try {
                const fetchedNotes = await getAllDocuments("notes");
                const fetchedFiles = await getAllDocuments("files");
                const fetchedFolders = await getAllDocuments("folders");
                const fetchedEdges = await getAllDocuments("edges");
                const folders = fetchedFolders.map(item => ({
                    id: item.id,
                    title: item.folder_name,
                    label: item.folder_name,
                    color: "#2b7ce9",
                    type: "folder",
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

                const noteEdges = getEdgeFromNoteAndFile(fetchedNotes);
                const fileEdges = getEdgeFromNoteAndFile(fetchedFiles);
                const edgeData = [...noteEdges, ...fileEdges];

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
                    if (nodes.length > 0) {
                        let filters = nodeList.filter(item => item.id === nodes[0]);
                        // console.log("Filter: ", filters);
                        if (filters[0].type !== "folder") {
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
                                    if (filters.length > 0) {
                                        const url = `/${filters[0].type}/${nodes[0]}`;
                                        navigate(url);
                                    }
                                },
                            });
                        }
                    }
                }
            }
        });
    }, [nodeList]);

    const edgesFilterValues = {
        Folder: true,
        Note: true,
        File: true,
    };

    const edgesFilter = (edge) => {
        return edgesFilterValues[edge.relation];
    };
    const edgeFilters = document.getElementsByName("edgesFilter");
    // const edgesView = new vis.DataView(edgeList, { filter: edgesFilter });
    edgeFilters.forEach((filter) =>
        filter.addEventListener("change", (e) => {
            const { value, checked } = e.target;
            edgesFilterValues[value] = checked;
            // edgesView.refresh();
        })
    );

    return (
        <Layout hasSider>
            <Sidebar />
            <Layout className="site-layout" style={{ marginLeft: 200, }} >
                <MainHeader />
                <Content style={{ margin: '0', }} >
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
                        <div className='info-panel'>
                            <div>Node Types</div>
                            <Badge className="info-panel-item" text="Folder" color="#2b7ce9" />
                            <Badge className="info-panel-item" text="Note" color="#6da7f5" />
                            <Badge className="info-panel-item" text="File" color="#DAEAFF" />
                        </div>
                        <div className='support-info-panel'>
                            <InfoCircleOutlined style={{ color: "#96b4db" }} />
                            <span> Please reload page if the graph doesn't display correctly</span>
                        </div>
                        <div className='filter-panel'>
                            <label>
                                Display Type
                                <div>
                                    <label>
                                        <input type="checkbox" name="edgesFilter" value="Folder" checked="checked" />
                                        <span> Folder</span>
                                    </label>
                                </div>
                                <div>
                                    <label>
                                        <input type="checkbox" name="edgesFilter" value="Note" checked="checked" />
                                        <span> Note</span>
                                    </label>
                                </div>
                                <div>
                                    <label>
                                        <input type="checkbox" name="edgesFilter" value="File" checked="checked" />
                                        <span> File</span>
                                    </label>
                                </div>
                            </label>
                        </div>
                    </div>
                </Content>
            </Layout>
        </Layout >

    );
};
export default GraphView;