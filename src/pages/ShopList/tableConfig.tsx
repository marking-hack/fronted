import {Input} from 'antd' 

const shopColumns = [
    {
        title: 'Название',
        dataIndex: 'name',
        key: 'name'
    },
    {
        title: 'Почтовый индекс',
        dataIndex: 'postal_code',
        key: 'postal_code'
    },
    {
        title: 'Количество товаров',
        dataIndex: 'products_amount',
        key: 'products_amount'
    }
]

const productColumns = [
    {
        title: 'Название',
        dataIndex: 'name',
        key: 'name'
    },
    {
        title: 'Количество',
        dataIndex: 'amount',
        key: 'amount',
        render: (text: string) => {
            return <Input value={text} style={{width: 100}} type='number'></Input>
        }
    }
]

const productPredictionColumns = productColumns.concat([
    {
        title: 'Предсказанное количество',
        dataIndex: 'predict_amount',
        key: 'predict_amount'
    }
])

export {shopColumns, productColumns, productPredictionColumns};