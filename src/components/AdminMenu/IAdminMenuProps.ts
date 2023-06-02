import {MenuItem} from "../../constants/adminMenu";

export interface IAdminMenuProps {
    onChange?: (page: string) => void,
    currentPage: string,
    items: MenuItem[]
}