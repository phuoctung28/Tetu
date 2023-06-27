import React, { useEffect, useState } from 'react';
import { Badge, ColorPicker, Layout, message, Modal, Slider, Switch } from 'antd';
import { ExclamationCircleOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { getAllDocuments, getDocumentById, queryDocuments, updateDocumentProperty } from '../../services/firebase';
import './graph_view.css';
import MainHeader from '../../components/header/MainHeader';
import Sidebar from '../../components/sidebar/Sidebar';
import Graph from 'react-graph-vis';
import { useNavigate, useParams } from 'react-router-dom';

const { Content } = Layout;

const GraphView = () => {
    const userId = JSON.parse(localStorage.getItem("user")).user_id;
    const { folderId } = useParams();
    // console.log("FOLDER ID:", folderId);

    const [graphColor, setGraphColor] = useState({ r: 43, g: 124, b: 233, a: 1 });
    const [nodeList, setNodeList] = useState([]);
    const [edgeList, setEdgeList] = useState([]);
    const [edgesFilterValues, setEdgesFilterValues] = useState({
        Folder: true,
        Note: true,
        File: true,
    });
    const [nodeSize, setNodeSize] = useState(15);

    const handleNodeSize = (newValue) => {
        // console.log("NODE LIST:", nodeList)
        const newNodeList = nodeList.map((item, index) => {
            let newSize = newValue
            if (item.type === "folder") newSize = newValue + 15
            return { ...item, size: newSize }
        })
        setNodeList(newNodeList);
        setNodeSize(newValue);
        setState({
            ...state,
            graph: {
                nodes: newNodeList,
                edges: edgeList,
            },
        });
    }

    const handleGraphColor = (newColor) => {
        let cl = newColor.toRgbString()
        let rgb = cl.substring(4, cl.length - 1)
            .replace(/ /g, '')
            .split(',')
            .map(item => parseInt(item, 10));

        const rgbValue = { r: rgb[0], g: rgb[1], b: rgb[2], a: 1 }
        // console.log("COLOR:", rgb)
        setGraphColor(rgbValue);

        const newNodeList = nodeList.map((item, index) => {
            let newColor = `rgb(${rgbValue.r}, ${rgbValue.g}, ${rgbValue.b}, 1)`;
            if (item.type === "note")
                newColor = `rgb(${rgbValue.r + 60}, ${rgbValue.g + 60}, ${rgbValue.b + 60}, 1)`;
            else if (item.type === "file")
                newColor = `rgb(${rgbValue.r + 120}, ${rgbValue.g + 120}, ${rgbValue.b + 120}, 1)`;
            return { ...item, color: newColor }
        })
        setNodeList(newNodeList);
        setGraphOptions({
            ...graphOptions,
            edges: {
                color: newColor
            },
        });
        setState({
            ...state,
            graph: {
                nodes: newNodeList,
                edges: edgeList,
            },
        });
    }

    const options = {
        layout: {
            hierarchical: false,
        },
        nodes: {
            shape: 'dot',
            // scaling: {
            //     min: 10,
            //     max: 30,
            // },
            font: {
                size: 12,
            },
        },
        edges: {
            color: graphColor,
            // color: '#73A2FF',
            width: 0.2,
            smooth: {
                enabled: true,
                type: 'continuous',
            },
        },
        physics: {
            barnesHut: {
                centralGravity: 0.001,
                springLength: 60,
                springConstant: 0.01,
                damping: 1,
                avoidOverlap: 0.01
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
    };
    const [graphOptions, setGraphOptions] = useState({});
    // useEffect(() => {
    //     setGraphOptions()
    // }, [nodeList, edgeList]);
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

    const fetchNotesAndFilesInOneFolder = async () => {
        try {
            var edgeData = [];
            var fetchedFiles = [];
            var fetchedNotes = [];

            const fetchedFolder = await getDocumentById("folders", folderId);
            for (let noteId of fetchedFolder.notes) {
                const curNote = await getDocumentById("notes", noteId);
                fetchedNotes.push({ id: noteId, ...curNote });
                edgeData.push({ from: folderId, to: noteId });
            }
            for (let fileId of fetchedFolder.files) {
                const curFile = await getDocumentById("files", fileId);
                fetchedFiles.push({ id: fileId, ...curFile });
                edgeData.push({ from: folderId, to: fileId });
            }

            const folders = [{
                id: folderId,
                title: fetchedFolder.folder_name,
                label: fetchedFolder.folder_name,
                color: `rgba(${graphColor.r}, ${graphColor.g}, ${graphColor.b}, ${graphColor.a})`,
                type: 'folder',
                size: nodeSize + 8,
                physics: false,
            }];
            const notes = fetchedNotes.map((item) => ({
                id: item.id,
                title: item.title,
                label: item.title,
                color: `rgba(${graphColor.r + 70}, ${graphColor.g + 70}, ${graphColor.b + 70}, ${graphColor.a})`,
                type: 'note',
                size: nodeSize,
                // physics: false,
            }));
            const files = fetchedFiles.map((item) => ({
                id: item.id,
                title: item.name,
                label: item.name,
                color: `rgba(${graphColor.r + 120}, ${graphColor.g + 120}, ${graphColor.b + 120}, ${graphColor.a})`,
                type: 'file',
                size: nodeSize,
                // physics: false,
            }));

            const noteData = [...folders, ...notes, ...files];

            const noteEdges = getEdgeFromNoteAndFile(fetchedNotes);
            const fileEdges = getEdgeFromNoteAndFile(fetchedFiles);
            edgeData = [...edgeData, ...noteEdges, ...fileEdges];

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
        }
        catch (error) {
            console.log("Error fetching folder data:", error);
        }
    }

    const fetchNotesAndFiles = async () => {
        try {
            const fetchedNotes = await queryDocuments('notes', 'owner', '==', userId);
            const fetchedFiles = await queryDocuments('files', 'owner', '==', userId);
            const fetchedFolders = await queryDocuments('folders', 'owner', '==', userId);
            const folders = fetchedFolders.map((item) => ({
                id: item.id,
                title: item.folder_name,
                label: item.folder_name,
                color: `rgba(${graphColor.r}, ${graphColor.g}, ${graphColor.b}, ${graphColor.a})`,
                type: 'folder',
                size: nodeSize + 8,
                physics: false,
            }));
            const notes = fetchedNotes.map((item) => ({
                id: item.id,
                title: item.title,
                label: item.title,
                color: `rgba(${graphColor.r + 70}, ${graphColor.g + 70}, ${graphColor.b + 70}, ${graphColor.a})`,
                type: 'note',
                size: nodeSize,
                // physics: false,
            }));
            const files = fetchedFiles.map((item) => ({
                id: item.id,
                title: item.name,
                label: item.name,
                color: `rgba(${graphColor.r + 120}, ${graphColor.g + 120}, ${graphColor.b + 120}, ${graphColor.a})`,
                type: 'file',
                size: nodeSize,
                // physics: false,
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

    useEffect(() => {
        if (folderId != undefined)
            fetchNotesAndFilesInOneFolder();
        else
            fetchNotesAndFiles();

        document.title = 'Graph View';
    }, [folderId]);

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
        setGraphOptions(options);
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
    const [showArrow, setShowArrow] = useState(true)
    const handleToggleArrow = (checked) => {
        const newOptions = {
            ...graphOptions,
            edges: {
                arrows: {
                    to: {
                        enabled: checked,
                    }
                }
            }
        }
        setGraphOptions(newOptions);
    }

    return (
        <Layout hasSider>
            <Sidebar pageMenu="graph" />
            <Layout className="site-layout" style={{ marginLeft: 200 }}>
                <MainHeader />
                <Content className="graph-container">
                    <div className="graph-wrapper">
                        {contextHolder}
                        <Graph
                            className="graph-component"
                            graph={graph}
                            options={graphOptions}
                            events={events}
                            style={{
                                height: '100%',
                                backgroundColor: 'transparent',
                            }}
                        />
                        <div className="display-setting-panel">
                            <div className="arrow-control">
                                <p>Arrows</p>
                                <Switch defaultChecked onChange={handleToggleArrow} />
                            </div>
                            <div className="color-control">
                                <p>Color</p>
                                <ColorPicker value={graphColor} onChange={handleGraphColor} />
                            </div>
                            <div>
                                <p>Node size</p>
                                <Slider
                                    min={5}
                                    max={20}
                                    onChange={handleNodeSize}
                                    value={typeof nodeSize === 'number' ? nodeSize : 0}
                                />
                            </div>
                        </div>
                        <div className="info-panel">
                            <div>Node Types</div>
                            <Badge size="large" className="info-panel-item" text="Folder" color="#2b7ce9" />
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
