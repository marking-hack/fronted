import {
    createBrowserRouter
} from 'react-router-dom';
import { ShopList } from './pages/ShopList';


const router = createBrowserRouter([
    {
        path: '/index',
        element: <ShopList></ShopList> 
    }
])

export default router;