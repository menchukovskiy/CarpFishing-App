import Loading from "../Loading";
import ErrorModal from "../ErrorModal";
import { useSelector, useDispatch } from 'react-redux';

const AsyncBoundary = ({ selector, clearAction }) => {
    const dispatch = useDispatch();
    const { isLoading, globalError } = useSelector(selector)
    
    return (
        <>
            {isLoading && <Loading />}
            {
                !!globalError &&
                <ErrorModal
                    open={!!globalError}
                    message={globalError?.message}
                    onClick={() => {
                        dispatch(clearAction())
                    }}
                />
            }
        </>
    );
};

export default AsyncBoundary;