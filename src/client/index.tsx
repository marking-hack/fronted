import axios from 'axios';

const origin = 'https://dev2.akarpov.ru/api/'


export const getShops = async () => {
    const data = (await axios.get(origin + '?page=1&page_size=10')).data;
    const products = {} as any
    for (var i = 0; i < data.results.length; ++i) {
        products[data.results[i].id_sp] = await getShopProducts(data.results[i].id_sp)
    }
    const shops = data.results.map((e: any) => {
        return {
            name: e.id_sp,
            postal_code: e.postal_code,
            products_amount: 10,
            key: e.id_sp,
        }
    })
    return {
        shops, products
    }
}

export const getShopProducts = async (shop_id: string) => {
    const data = (await axios.get(origin + shop_id + '?page=1&page_size=10')).data;
    return data.results.map((e: any) => {
        return {
            name: e.name,
            amount: e.current_amount,
            key: e.gtin
        }
    })
}

export const getRegions = async () => {
    return (await axios.get(origin + 'regions/')).data;
}

export const getSales = async (region_id: number) => {
    const data = (await axios.get(origin + 'regions/' + region_id.toString() + '/sales')).data;
    var answer = {} as any;
    data.map((e: any) => {
        if (answer.hasOwnProperty(e.type_operation)) {
            answer[e.type_operation] += e.cnt;
        } else {
            answer[e.type_operation] = e.cnt
        }
    })
    return answer;
}

export const getTransactions = async (region_id: number) => {
    const data = (await axios.get(origin + 'regions/' + region_id.toString() + '/trsansactions')).data;
    var answer = {} as any
    data.map((e: any) => {
        if (answer.hasOwnProperty(e.sender_region_code)) {
            answer[e.sender_region_code] += e.cnt 
        } else {
            answer[e.sender_region_code] = e.cnt
        }
    });
    return answer;
}

export const getPredict = async (shop_id: string, product_id: string) => {
    const data = {
        "date": "2023-03-26",
        "shops": [
          {
            "id_sp": shop_id,
            "items": [
              product_id
            ]
          }
        ]
    };
    const res = (await axios.post(
        origin + 'predict', 
        data
    )).data;
    return res.shops[0].items[0].predicted_volume
}