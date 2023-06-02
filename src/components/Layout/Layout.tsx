import React, {FC} from 'react';
import {ILayoutProps} from "./ILayoutProps";
import Header from "../Header/Header";

const Layout: FC<ILayoutProps> = ({header = true, children}) => {
    return (
        <>
            {header ? <Header/> : <></>}
            <div className='container'>
                {children}
            </div>
        </>
    );
};

export default Layout;