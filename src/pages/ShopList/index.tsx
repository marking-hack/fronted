import react, { useEffect, useState } from 'react'
import './style.css'
import {Table, Collapse, Input, Typography} from 'antd'
import {shopColumns, productColumns, productPredictionColumns} from './tableConfig'
import { getPredict, getShops } from '../../client'
import { TheBar } from '../../elements/TheBar'


export const ShopList: react.FC = () => {

    const [predict, setPredict] = useState(false);
    const [shopData, setShopData] = useState([]);
    const [productData, setProductsData] = useState({} as any);
    const [selectedShops, setSelectedShops] = useState([] as any);
    const [selectedProducts, setSelectedProducts] = useState({} as any);

    const fetched = react.useRef(false);

    if (!shopData.length && !fetched.current) {
        fetched.current = true;
        getShops().then((e) => {
            setShopData(e.shops);
            setProductsData(e.products);
        })
    }

    return <div className='shop-list__container'>
        <div className="shop__content">
            {/* <div className='date__container'>
                <Typography.Text strong>На какой промежуток</Typography.Text>
                <Input type='date' style={{width: 200}}></Input>
            </div> */}
            <div>
                <Typography.Text strong style={{marginBottom: '10px'}}>Выберите товары</Typography.Text>
                <Table 
                    columns={shopColumns} 
                    rowSelection={{
                        type: 'checkbox',
                        onChange: (selectedRowKeys: React.Key[]) => {
                            var products = selectedProducts;
                            selectedRowKeys.map((e) => {
                                if (!products.hasOwnProperty(e)) {
                                    products[e] = []
                                }
                            })
                            setSelectedProducts(products);
                            setSelectedShops(selectedRowKeys.map((e) => e.toString()))
                        }
                    }}
                    expandable={{
                        expandedRowRender: (record) => {
                            var columns = productColumns;
                            var data = productData[(record as any).key];
                            if (predict) {
                                columns = productPredictionColumns;
                            }
                            return <Table 
                                columns={columns}
                                rowSelection={{
                                    type: 'checkbox',
                                    onChange: async (selected) => {
                                        var products = selectedProducts;
                                        var shopProducts = []
                                        for (var i = 0; i < selected.length; ++i) {
                                            console.log(selected[i].toString(), (record as any).key)
                                            shopProducts.push({
                                                product: selected[i].toString(),
                                                volume: await getPredict((record as any).key, selected[i].toString())
                                            })
                                        }
                                        
                                        products[(record as any).key] = shopProducts;
                                        setSelectedProducts(products);
                                    }
                                }}
                                dataSource={data}
                            ></Table>
                        }
                    }}
                    dataSource={shopData}
                ></Table>
            </div>
            {
                selectedShops.length ? 
                <Collapse>
                    {
                        selectedShops.map((e: string) => {
                            var predictedPrices = selectedProducts[e].map((e: any) => e.volume);
                            var labels = selectedProducts[e].map((e: any) => e.product)
                            var prices = productData[e].filter((ee: any) => labels.includes(ee.key)).map((e: any) => e.amount)
                            console.log(predictedPrices, labels, prices);
                            return <Collapse.Panel header={e} key={e}>
                                <TheBar 
                                    predictedPrices={predictedPrices}
                                    labels={labels}
                                    prices={prices}
                                />
                            </Collapse.Panel>
                        })
                    }
                </Collapse> : <></>
            }
        </div>
    </div>
}