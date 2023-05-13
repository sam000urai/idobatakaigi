import React from 'react';
import '../styles/Layout.css';
import Appbar from './Appbar';
import { useLoginCheck } from '../hooks/useLoginCheck';

const Layout = ({ children }) => {
    const isUser = useLoginCheck();

    return (
        <section className="wrapper">
            <Appbar />
            <main className="Room">{children}</main>
        </section>
    );
};

export default Layout;