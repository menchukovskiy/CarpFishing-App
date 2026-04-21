import { Outlet } from 'react-router-dom';
import SubNavBar from '../../components/SubNavBar/index';
import { clearErrors } from '../../store/slice/fishingSlice';
import AsyncBoundary from '../../components/AsyncBoundary';


const Fishing = () => {
    return (
        <>
            <AsyncBoundary
                selector={state => state.fishing}
                clearAction={clearErrors}
            />
            <SubNavBar page="Fishing" />
            <Outlet />
        </>
    );
};

export default Fishing;