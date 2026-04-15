import { Route, Routes } from 'react-router-dom'
import { Suspense } from 'react'
import Loading from '../components/Loading'
import ROUTER from '../utils/router'

const AppRouter = () => {
    return (
        <Suspense fallback={<Loading />}>
            <Routes>
                {ROUTER.map(({ path, component, children }) => {
                    return (
                        <Route key={path} path={path} element={component}>
                        {children?.map(child => (
                            <Route key={child.path} path={child.path} element={child.component} />
                        ))}
                    </Route>
                    )
                })
                }
            </Routes>
        </Suspense>
    );
};

export default AppRouter;