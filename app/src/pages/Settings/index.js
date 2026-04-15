import { Outlet } from 'react-router-dom';
import SubNavBar from '../../components/SubNavBar/index';

const Settings = () => {
    return (
        <>
            <SubNavBar page="Settings" />
            <Outlet /> 
        </>
    );
};

export default Settings;