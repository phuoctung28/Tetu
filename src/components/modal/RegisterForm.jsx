import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Button, Form, Input, Divider, message } from 'antd';
import { auth, provider, database, createDocument, getDocumentById } from "../../services/firebase";
import { signInWithPopup, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from 'firebase/firestore';
import logo from '../../assets/images/logo.png';
import google from '../../assets/icons/google.png';
import apple from '../../assets/icons/apple.svg';
import '../../assets/styles/login_form.css';
import moment from 'moment';
import { DEFAULT_INITIAL_DATA } from "../../constants/sample_note";

const layout = {
    labelCol: { span: 8, },
    wrapperCol: { span: 24, },
};

const onFinish = (values) => {
    //    console.log(values);
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
    required: '${label} is required!',
    types: {
        email: 'Not a valid email!',
        number: '${label} is not a valid number!',
    },
    number: {
        range: '${label} must be between ${min} and ${max}',
    },
};


const RegisterForm = () => {
    const navigate = useNavigate();
    const [errorRegister, setErrorRegister] = useState(false);
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    // SignIn with Email, password
    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            const loginUser = {
                user_id: user.uid,
                email: email,
                name: name,
                accountType: "basic",
                status: "active",
                lastUpdate: moment(new Date(), "DD/MM/YYYY").format("DD/MM/YYYY"),
            }
            const fetchedUser = await getDocumentById("users", user.uid);

            if (!fetchedUser) {
                const usersCollectionRef = doc(database, 'users', user.uid);
                await setDoc(usersCollectionRef, loginUser);

                const newNote = {
                    title: 'Getting Started',
                    content: DEFAULT_INITIAL_DATA,
                    meta_data: {
                        datetime: moment(new Date()).format("DD/MM/YYYY"),
                        status: ["To-do"],
                        tags: ["Sample"],
                        type: ["Self-study"],
                    },
                    owner: user.uid,
                };
                const noteRef = await createDocument('notes', newNote);
                const noteId = noteRef.id;

                const folderData = {
                    files: [],
                    notes: [noteId],
                    owner: user.uid,
                    folder_name: "Sample"
                }
                await createDocument("folders", folderData);

                const attachmentFolderData = {
                    files: [],
                    notes: [],
                    owner: user.uid,
                    folder_name: "Attachments"
                }
                await createDocument("folders", attachmentFolderData);
            }
            localStorage.setItem("user", JSON.stringify(loginUser));
            setLoading(false);
            message.success("Login success!");
            navigate("/home");
        } catch (error) {
            console.log(error.message);
            setLoading(false);
            setErrorRegister(error.message);
        }
    };

    // SignIn with Google
    const signInWithGoogle = async () => {
        try {
            const userCredential = await signInWithPopup(auth, provider)
            const user = userCredential.user;
            const usersCollectionRef = doc(database, 'users', user.uid);

            const loginUser = {
                user_id: user.uid,
                email: user.email,
                name: user.displayName,
                profilePic: user.photoURL,
                accountType: "basic",
                status: "active",
                lastUpdate: moment(new Date(), "DD/MM/YYYY").format("DD/MM/YYYY"),
            }
            await setDoc(usersCollectionRef, { googleAuth: true, ...loginUser });
            const newNote = {
                title: 'Getting Started',
                content: DEFAULT_INITIAL_DATA,
                meta_data: {
                    datetime: moment(new Date()).format("DD/MM/YYYY"),
                    status: ["To-do"],
                    tags: ["Sample"],
                    type: ["Self-study"],
                },
                owner: user.uid,
            };
            const noteRef = await createDocument('notes', newNote);
            const noteId = noteRef.id;

            const folderData = {
                files: [],
                notes: [noteId],
                owner: user.uid,
                folder_name: "Sample"
            }
            await createDocument("folders", folderData);

            const attachmentFolderData = {
                files: [],
                notes: [],
                owner: user.uid,
                folder_name: "Attachments"
            }
            await createDocument("folders", attachmentFolderData);

            localStorage.setItem("user", JSON.stringify(loginUser));
            message.success("Login success!");
            navigate("/home");
        } catch (error) {
            console.log('error: ', error);
        }
    }


    return (
        <div className="modal-login">
            <div className="modal-container">
                <div className='form-header'>
                    <img src={logo} alt='logo' className='logo_img' style={{ width: 60, height: 60 }} />
                    <h1 className='form-header-msg'>Welcome to TETU!</h1>
                </div>
                <Form
                    {...layout}
                    name="nest-messages"
                    onFinish={onFinish}
                    style={{ maxWidth: 600, }}
                    validateMessages={validateMessages}
                >
                    <Form.Item
                        name={['user', 'email']}
                        label="Email"
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        rules={[{ required: true, type: 'email', },]}
                    >
                        <Input size="large" onChange={(e) => setEmail(e.target.value)} />
                    </Form.Item>
                    <Form.Item
                        name={['user', 'name']}
                        label="Name"
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        rules={[{ required: true, type: 'text', },]}
                    >
                        <Input size="large" onChange={(e) => setName(e.target.value)} />
                    </Form.Item>
                    <Form.Item
                        label="Password"
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password size="large" onChange={(e) => setPassword(e.target.value)} />
                    </Form.Item>
                    {/* <Form.Item>
                  <a className="login-form-forgot" href="/">
                     Forgot password
                  </a>
               </Form.Item> */}
                    <div className='error-msg'>
                        {errorRegister && <span>Email has already existed!</span>}
                    </div>
                    <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 0, }}>
                        <Button loading={loading} onClick={handleRegister} type="primary" htmlType="submit" size="large" className="login-form-button">

                            Register!
                        </Button>
                    </Form.Item>
                </Form>
                <Divider plain>or start with</Divider>
                <div className="btn-social">
                    <button
                        onClick={signInWithGoogle}
                        className="btn-google bg-white flex justify-center items-center border-solid border-2 rounded-lg py-3 mt-3 w-60 md:w-70 hover:bg-gray-200"
                    >
                        <img src={google} alt="" style={{ width: 20, height: 20 }} />
                        <div className="btn-title">
                            Google
                        </div>
                    </button>
                    <button
                        className="btn-apple bg-white flex justify-center items-center border-solid border-2 rounded-lg py-3 mt-3 w-60 md:w-70 hover:bg-gray-200"
                    >
                        <img src={apple} alt="" style={{ width: 'fit-content', height: 20 }} />
                        <div className="btn-title" onClick={() => message.info("In development!")}>
                            Apple
                        </div>
                    </button>
                </div>
            </div>
        </div >
    );
};
export default RegisterForm;