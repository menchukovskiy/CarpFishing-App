import { Route, Routes } from 'react-router-dom'
import { Suspense } from 'react'
import Loading from '../components/Loading'
import ROUTER from '../utils/router'

const AppRouter = () => {
    return (
        <Suspense fallback={<Loading />}>
            <Routes>
                {ROUTER.map(({ path, component }, key) => {
                    return(
                    <Route key={key} path={path} element={component} />
                    )
                }
                )
                }
            </Routes>
        </Suspense>
    );
};

export default AppRouter;