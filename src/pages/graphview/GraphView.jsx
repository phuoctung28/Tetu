import React, { useEffect, useState } from 'react';
import { Badge, Layout, message, Modal } from 'antd';
import { ExclamationCircleOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { getAllDocuments, getDocumentById, queryDocuments, updateDocumentProperty } from '../../services/firebase';
import './graph_view.css';
import MainHeader from '../../components/header/MainHeader';
import Sidebar from '../../components/sidebar/Sidebar';
import Graph from 'react-graph-vis';
import { useNavigate } from 'react-router';

const { Content } = Layout;

const GraphView = () => {
    const userId = JSON.parse(localStorage.getItem("user")).user_id;
    const [nodeList, setNodeList] = useState([]);
    const [edgeList, setEdgeList] = useState([]);
    const [edgesFilterValues, setEdgesFilterValues] = useState({
        Folder: true,
        Note: true,
        File: true,
    });

    const options = {
        layout: {
            hierarchical: false,
        },
        nodes: {
            shape: 'dot',
            scaling: {
                min: 10,
                max: 30,
            },
            font: {
                size: 12,
            },
        },
        edges: {
            color: '#73A2FF',
            width: 0.15,
            smooth: {
                enabled: true,
                type: 'continuous',
            },
        },
        manipulation: {
            initiallyActive: false,
            addEdge: async function (data, callback) {
                if (data.from === data.to) {
                    return;
                } else {
                    let target = nodeList.filter((item) => item.id === data.from)[0];
                    callback(data);
                    try {
                        const type = target.type === 'file' ? 'files' : 'notes';
                        const targetItem = await getDocumentById(type, target.id);
                        const formatData = {
                            edge_id: data.id,
                            node_id: data.to,
                        };
                        const insertData =
                            targetItem?.connections && targetItem?.connections.length > 0
                                ? [...targetItem?.connections, formatData]
                                : [formatData];

                        await updateDocumentProperty(type, target.id, 'connections', insertData);
                        message.success('Add edge successfully!');
                    } catch (error) {
                        console.log('Error add edge', error);
                    }
                }
            },
            deleteEdge: async function (data, callback) {
                console.log('Delete edge: ', data);
                let deletingEdge = edgeList.filter((item) => item.id === data.edges[0])[0];
                let target = nodeList.filter((item) => item.id === deletingEdge.from)[0];
                console.log('Invoke: ', deletingEdge);
                console.log('Target: ', target);
                callback(data);
                try {
                    const type = target.type === 'file' ? 'files' : 'notes';
                    const targetItem = await getDocumentById(type, target.id);
                    const updateData =
                        targetItem?.connections && targetItem?.connections.length > 0 ? targetItem?.connections : [];
                    const objWithIdIndex = updateData.findIndex((obj) => obj.id === data.id);
                    if (objWithIdIndex > -1) {
                        updateData.splice(objWithIdIndex, 1);
                    }
                    await updateDocumentProperty(type, target.id, 'connections', updateData);
                    message.success('Delete edge successfully!');
                } catch (error) {
                    console.log('Error delete edge', error);
                }
            },
            deleteNode: false,
            editEdge: false,
        },
        interaction: { hover: true },
        filter: 'nodes',
    };

    const [modal, contextHolder] = Modal.useModal();

    const getEdgeFromNoteAndFile = (data) => {
        let edges = [];
        for (let item of data) {
            let from = item.id;
            if (item?.connections) {
                item?.connections.forEach((element) => {
                    edges.push({
                        from: from,
                        to: element.node_id,
                        id: element.edge_id,
                        color: '#969ead',
                    });
                });
            }
        }
        return edges;
    };
    useEffect(() => {
        const filteredNodeList = nodeList.filter((node) => {
            if (node.type === 'folder') return edgesFilterValues.Folder;
            if (node.type === 'note') return edgesFilterValues.Note;
            if (node.type === 'file') return edgesFilterValues.File;
            return true;
        });

        const filteredEdgeList = edgeList.filter((edge) => {
            const fromNode = filteredNodeList.find((node) => node.id === edge.from);
            const toNode = filteredNodeList.find((node) => node.id === edge.to);
            return fromNode && toNode;
        });

        setState((prevState) => ({
            ...prevState,
            graph: {
                nodes: filteredNodeList,
                edges: filteredEdgeList,
            },
        }));
    }, [edgesFilterValues, nodeList, edgeList]);
    useEffect(() => {
        const fetchNotesAndFiles = async () => {
            try {
                const fetchedNotes = await queryDocuments('notes', 'owner', '==', userId);
                const fetchedFiles = await queryDocuments('files', 'owner', '==', userId);
                const fetchedFolders = await queryDocuments('folders', 'owner', '==', userId);
                const folders = fetchedFolders.map((item) => ({
                    id: item.id,
                    title: item.folder_name,
                    label: item.folder_name,
                    color: '#2b7ce9',
                    type: 'folder',
                }));
                const notes = fetchedNotes.map((item) => ({
                    id: item.id,
                    title: item.title,
                    label: item.title,
                    color: '#6da7f5',
                    type: 'note',
                }));
                const files = fetchedFiles.map((item) => ({
                    id: item.id,
                    title: item.name,
                    label: item.name,
                    color: '#DAEAFF',
                    type: 'file',
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
                        });
                    }
                    for (let file of item.files) {
                        edgeData.push({
                            from: rootNode,
                            to: file,
                        });
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
                    },
                });
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
            nodes: [],
            edges: [],
        },
        events: {
            select: ({ nodes, edges }) => {
                console.log('Selected nodes:', nodes);
                console.log('Selected edges:', edges);
            },
        },
    });
    const { graph, events } = state;

    useEffect(() => {
        setState({
            ...state,
            events: {
                doubleClick: ({ nodes }) => {
                    if (nodes.length > 0) {
                        let filters = nodeList.filter((item) => item.id === nodes[0]);
                        console.log("Filter:", filters[0]);
                        if (filters[0].type !== 'folder') {
                            modal.confirm({
                                title: 'Confirm',
                                icon: <ExclamationCircleOutlined />,
                                content: 'Open this item?',
                                okText: 'Open',
                                cancelText: 'Cancel',
                                onOk: () => {
                                    if (filters.length > 0) {
                                        const typeUrl = filters[0].type.trim();
                                        const idUrl = nodes[0].trim();
                                        console.log("TYPE: ", typeUrl);
                                        console.log("ID: ", idUrl);
                                        const url = `/${typeUrl}/${idUrl}`;
                                        if (typeUrl === "note")
                                            navigate(url);

                                    }
                                },
                            });
                        }
                    }
                },
            },
        });
    }, [nodeList]);
    const edgeFilters = document.getElementsByName('edgesFilter');
    edgeFilters.forEach((filter) =>
        filter.addEventListener('change', (e) => {
            const { value, checked } = e.target;
            edgesFilterValues[value] = checked;
        })
    );
    const handleEdgeFilterChange = (e) => {
        const { value, checked } = e.target;
        setEdgesFilterValues((prevValues) => ({
            ...prevValues,
            [value]: checked,
        }));
    };
    return (
        <Layout hasSider>
            <Sidebar />
            <Layout className="site-layout" style={{ marginLeft: 200 }}>
                <MainHeader />
                <Content className="graph-container">
                    <div className="graph-wrapper">
                        {contextHolder}
                        <Graph
                            className="graph-component"
                            graph={graph}
                            options={options}
                            events={events}
                            style={{
                                height: '100%',
                                backgroundColor: 'transparent',
                            }}
                        />
                        <div className="info-panel">
                            <div>Node Types</div>
                            <Badge className="info-panel-item" text="Folder" color="#2b7ce9" />
                            <Badge className="info-panel-item" text="Note" color="#6da7f5" />
                            <Badge className="info-panel-item" text="File" color="#DAEAFF" />
                        </div>
                        <div className="support-info-panel">
                            <InfoCircleOutlined style={{ color: '#96b4db' }} />
                            <span> Please reload page if the graph doesn't display correctly</span>
                        </div>
                        <div className="filter-panel">
                            <label>
                                Display Type
                                <div>
                                    <label>
                                        <input
                                            type="checkbox"
                                            name="edgesFilter"
                                            value="Folder"
                                            checked={edgesFilterValues.Folder}
                                            onChange={handleEdgeFilterChange}
                                        />
                                        <span> Folder</span>
                                    </label>
                                </div>
                                <div>
                                    <label>
                                        <input
                                            type="checkbox"
                                            name="edgesFilter"
                                            value="Note"
                                            checked={edgesFilterValues.Note}
                                            onChange={handleEdgeFilterChange}
                                        />
                                        <span> Note</span>
                                    </label>
                                </div>
                                <div>
                                    <label>
                                        <input
                                            type="checkbox"
                                            name="edgesFilter"
                                            value="File"
                                            checked={edgesFilterValues.File}
                                            onChange={handleEdgeFilterChange}
                                        />
                                        <span> File</span>
                                    </label>
                                </div>
                            </label>
                        </div>
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
};

export default GraphView;
