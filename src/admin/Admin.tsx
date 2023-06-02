import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import style from './Admin.module.scss'
import AdminMenu from "../components/AdminMenu/AdminMenu";
import {menuItems} from "../constants/adminMenu";
import {MenuOutlined} from "@ant-design/icons";

const Admin = () => {
    const {page} = useParams()
    const navigate = useNavigate()

    const [currentPage, setCurrentPage] = useState<string>('')
    const [pageComponent, setPageComponent] = useState<React.ReactNode>()
    const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false)

    useEffect(() => {
        const item = menuItems.filter(item => item.key === page)
        if (item.length !== 0) {
            setCurrentPage(page!)
            setPageComponent(item[0].render)
            setMobileMenuOpen(false)
        } else {
            navigate('/admin/' + menuItems[0].key)
        }
    }, [page, navigate])

    const onChange = (key: string) => {
        navigate('/admin/' + key)
    }

    return (
        <div className={style.admin}>
            <div className={style.mobile} onClick={() => setMobileMenuOpen(prev => !prev)}>
                <MenuOutlined />
            </div>

            <div className={[style.menu, mobileMenuOpen ? style.opened : ''].join(' ')}>
                <AdminMenu onChange={onChange} currentPage={currentPage} items={menuItems}/>
            </div>

            <div className={style.page}>
                <div className={style.container}>
                    {pageComponent}
                </div>
            </div>
        </div>
    );
};

export default Admin;