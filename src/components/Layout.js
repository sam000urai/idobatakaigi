import React from 'react';
import '../styles/Layout.css';
import Appbar from './Appbar';

const Layout = ({ children }) => {
    return (
        <section className="wrapper">
            <Appbar />
            <main className="Room">{children}</main>
        </section>
    );
};

export default Layout;