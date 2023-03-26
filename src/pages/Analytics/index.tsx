import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';import { Bar } from "react-chartjs-2";
import {Select} from 'antd';

import react from 'react'
import { getRegions, getSales, getTransactions } from '../../client';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

export const Analytics: react.FC = () => {
    const fetched = react.useRef(false);
    const [regions, setRegions] = react.useState([]);
    const [options, setOptions] = react.useState([]);
    const [sales, setSales] = react.useState([]);
    const [transactionOptions, setTransactionOptions] = react.useState([]);
    const [transaction, setTransactions] = react.useState([]);

    var dataCirculation = {
        labels: options,
        datasets: [
            {
                label: '',
                data: sales,
                backgroundColor: ['rgba(255, 99, 132, 0.5)']
            }
        ]
    };
    var optionsCirculation = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        },
        plugins: {
            title: {
                text: 'Перемещение товара между участниками',
                display: true
            }
        }
    }

    var dataReplace = {
        labels: transactionOptions,
        datasets: [
            {
                label: '',
                data: transaction,
                backgroundColor: ['rgba(255, 99, 132, 0.5)']
            }
        ]
    };
    var optionsReplace = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        },
        plugins: {
            title: {
                text: 'Вывод товара из оборота',
                display: true
            }
        }
    }

    if (!fetched.current) {
        fetched.current = true;
        getRegions().then((e) => {
            setRegions(e);
        });
        // getSales(1).then((e) => {
        //     var opts = [];
        //     var values = []
        //     for (var opt in e) {
        //         opts.push(opt);
        //         values.push(e[opt])
        //     }
        //     setOptions(opts as any);
        //     setSales(values as any);
        // });
    }

    return <div className='chart__container'>
        <Select style={{width: 400}} onSelect={(value) => {
            getSales(value).then((e) => {
                var opts = [];
                var values = []
                for (var opt in e) {
                    opts.push(opt);
                    values.push(e[opt])
                }
                setTransactionOptions(opts as any);
                setTransactions(values as any);
            });
            getTransactions(value).then((e) => {
                var opts = [];
                var values = []
                for (var opt in e) {
                    opts.push(opt);
                    values.push(e[opt])
                }
                setOptions(opts as any);
                setSales(values as any);
            })
        }}>
            {
                regions.map((e: any) => {
                    return <Select.Option value={e.code}>
                        {e.name}
                    </Select.Option>
                })
            }
        </Select>
        <div style={{height: 400}}>
            <Bar data={dataCirculation} options={optionsCirculation as any}></Bar>
        </div>
        <div style={{height: 400}}>
            <Bar data={dataReplace} options={optionsReplace as any}></Bar>
        </div>
    </div> 
}