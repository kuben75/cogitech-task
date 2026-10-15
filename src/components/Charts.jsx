import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

export const UserActivityChart = ({data}) => {
    const chartData = {
        labels: data.map(item => item.name.split(' ')[0]),
        datasets: [{
            label: "Liczba postow",
            data: data.map(item => item.postsCount),
            backgroundColor: 'rgba(59, 130, 246, 0.8)',
            borderRadius: 4,
        }]
    };
    const options = {
        responsive: true,
        plugins: {legend: {display: false}, title: {display: true, text: "Aktywność "}}
    };
    return <Bar data={chartData} options={options} />;
}