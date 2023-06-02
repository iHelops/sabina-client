import React, {FC} from 'react';
import style from './Categories.module.scss'
import api from "../../api";
import {Typography} from "antd";
import category from "../../store/category";
import {observer} from "mobx-react-lite";
import {Link} from "react-router-dom";
import {ICategoriesProps} from "./ICategoriesProps";

const { Text } = Typography

const Categories: FC<ICategoriesProps> = ({onSelect}) => {
    return (
        <div className={style.categories}>
            <div className="container">
                {category.categories.map(item => (
                    <Link to={`/category/${item.id}`} key={item.id} className={style.category} onClick={onSelect}>
                        <div className={style.icon}>
                            <img src={api.File.get(item.icon)} alt=""/>
                        </div>
                        <div className="text">
                            <Text>{item.name}</Text>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default observer(Categories);