import React from 'react';
import {RouterProvider} from 'react-router-dom'
import {Tabs} from 'antd';
import { ShopList } from './pages/ShopList';
import router from './router';
import { Analytics } from './pages/Analytics';
import 'antd/dist/reset.css';


function App() {
  return (
    <div className="App" style={{padding: 20}}>
        <Tabs 
            items={[
                {
                    'label': 'Магазины',
                    'key': '1',
                    'children': <ShopList></ShopList>
                },
                {
                    'label': 'Аналитика',
                    'key': '2',
                    'children': <Analytics></Analytics>
                }
            ]}
        />
    </div>
  );
}

export default App;
