import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import {getDocumentById, queryDocuments} from '../../services/firebase';
import { columns } from './ColumnType';
import '../../assets/styles/table.css';
import moment from 'moment/moment';
import { FileType } from '../../enums/FileType';

const TableView = () => {
    const [notes, setNotes] = useState([]);
    const [files, setFiles] = useState([]);
    const [table, setTable] = useState([]);

    const loadFoldersAndNotes = async () => {
        try {
            const folderData = await queryDocuments('folders', 'owner', '==', 'abc');

            const fetchedNotes = [];
            const fetchedFiles = [];

            for (const folder of folderData) {
                for (const noteId of folder.notes) {
                    const note = await getDocumentById('notes', noteId);
                    fetchedNotes.push({ item_id: noteId, item: note });
                }

                for (const fileId of folder.files) {
                    const file = await getDocumentById('files', fileId);
                    fetchedFiles.push({ item_id: fileId, item: file });
                }
            }

            setNotes(fetchedNotes);
            setFiles(fetchedFiles);
        } catch (error) {
            console.error('Error fetching folders and notes:', error);
        }
    };

    const mapToModel = () => {
        const notesModel = notes.map((note) => ({
            key: note.item_id,
            title: note.item?.title,
            status: note.item?.meta_data?.status?.[0] || 'To-do',
            date: moment(note.item?.meta_data?.datetime).format('YYYY-MM-DD') || moment('05-31-2023').format('YYYY-MM-DD'),
            tags: note.item?.meta_data?.tags || [],
            type: FileType.Note,
        }));

        const filesModel = files.map((file) => ({
            key: file.item_id,
            title: file.item?.name,
            status: 'Reading',
            date: moment().format('YYYY-MM-DD'),
            tags: [],
            type: FileType.Pdf,
        }));

        setTable([...notesModel, ...filesModel]);
    };

    useEffect(() => {
        loadFoldersAndNotes();
    }, []);

    useEffect(() => {
        mapToModel();
    }, [notes, files]);

    return (
        <>
            <Table columns={columns} dataSource={table} />
        </>
    );
};

export default TableView;
