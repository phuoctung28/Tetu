import React, {useEffect, useState} from 'react';
import { Input, Modal } from 'antd';
import { getDocumentById, queryDocumentsCondition } from "../../services/firebase";
import { BookOutlined, FilePdfOutlined } from '@ant-design/icons';
import "./Search.css";
import { FileType } from "../../enums/FileType";
import { useNavigate } from "react-router-dom";

const SearchComponent = ({ isOpened, handleOpenSearch }) => {
    const [searchText, setSearchText] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const ctrl1 = (e: KeyboardEvent) => e.ctrlKey && e.key === "k";

        const handler = (e: KeyboardEvent) => {
            if (ctrl1(e)) {
                handleOpenSearch();
            }
        };

        const ignore = (e: KeyboardEvent) => {
            if (ctrl1(e)) {
                e.preventDefault();
            }
        };

        window.addEventListener("keyup", handler);
        window.addEventListener("keydown", ignore);

        return () => {
            window.removeEventListener("keyup", handler);
            window.removeEventListener("keydown", ignore);
        };
    }, []);

    // window.onbeforeunload = onKeyPress;
    const onNavigateFile = async (type, key, name) => {
        if (type === FileType.Note) {
            await navigate(`/note/${key}`, { state: { name: name } }, { replace: true });
            setSearchText('');
            setSearchResults([])
            handleOpenSearch();

        } else if (type === FileType.Pdf) {
            const file = await getDocumentById('files', key);
            const url = file?.url;
            navigate(`/file`, { state: { fileUrl: url }, replace: true });
            setSearchText('');
            setSearchResults([])
            handleOpenSearch();

        }
    };

    const handleSearch = async () => {
        const notesConditions = [
            { field: 'title', operator: '>=', value: searchText },
            { field: 'title', operator: '<=', value: `${searchText}\uf8ff` },
        ];
        const filesConditions = [
            { field: 'name', operator: '>=', value: searchText },
            { field: 'name', operator: '<=', value: `${searchText}\uf8ff` },
        ];
        const notes = await queryDocumentsCondition("notes", notesConditions);
        const files = await queryDocumentsCondition("files", filesConditions);
        setSearchResults([...notes, ...files]);
    };

    return (
        <Modal
            open={isOpened}
            title="Search notes and files"
            footer={null}
            onCancel={handleOpenSearch}
        >
            <Input.Search
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onSearch={handleSearch}
                enterButton
                autoFocus
            />

            <div className="search-results">
                {searchResults.map(result => (
                    <div key={result.id} className="search-result">
                        {result.title && (
                            <div onClick={() => onNavigateFile(FileType.Note, result.id)} className="result-item">
                                <BookOutlined />
                                <span className="result-text">{result.title}</span>
                            </div>
                        )}
                        {result.name && (
                            <div onClick={() => onNavigateFile(FileType.Pdf, result.id)} className="result-item">
                                <FilePdfOutlined />
                                <span className="result-text">{result.name}</span>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </Modal>
    );
};

export default SearchComponent;
