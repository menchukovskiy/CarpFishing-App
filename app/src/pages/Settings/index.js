import { Outlet } from 'react-router-dom';
import SubNavBar from '../../components/SubNavBar/index';
import { clearErrors } from '../../store/slice/settingsSlice';
import AsyncBoundary from '../../components/AsyncBoundary';

const Settings = () => {

    return (
        <>
            <AsyncBoundary
                selector={state => state.settings}
                clearAction={clearErrors}
            />
            <SubNavBar page="Settings" />
            <Outlet />
        </>
    );
};

export default Settings;