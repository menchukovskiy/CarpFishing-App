import UI from "./components/UI";
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import Loading from "./components/Loading";
import AuthForm from "./components/AuthForm";
import { check } from './http/userAPI'
import { setUser } from "./store/slice/userSlice";

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    check().then(data => {
      if (data) {
        dispatch(setUser(
          data
        ))
      }
    })
      .catch(error => {

      })
      .finally(() => setLoading(false))

  }, [dispatch])

  if (loading) {
    return <Loading />
  }

  if (!user.isAuth) {
    return <AuthForm />
  }

  return (
    <>
      <UI />
    </>
  );


}

export default App;
