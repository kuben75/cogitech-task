import {Bar, Pie} from 'react-chartjs-2';
import {
    Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

export const UserActivityChart = ({data}) => {
    const chartData = {
        labels: data.map(item => item.name),
        datasets: [{
            label: "Liczba postów",
            data: data.map(item => item.postsCount),
            backgroundColor: 'rgba(59, 130, 246, 0.8)',
            borderRadius: 4,
        }]
    };
    const options = {
        responsive: true,
        plugins: {legend: {display: false}, title: {display: true, text: "Aktywność użytkowników"}}
    };
    return <Bar data={chartData} options={options} />;
}

export const TodoStatsChart = ({data}) => {
    const chartData = {
        labels: ['Zakończone', 'Oczekujące'],
        datasets: [{
            data: [data.completed, data.pending],
            backgroundColor: ['rgba(34, 197, 94, 0.8)', 'rgba(239, 68, 68, 0.8)'],
            borderWidth: 0,
        }]
    };

    const options = {
        responsive: true,
        plugins: { title: { display: true, text: 'Status Zadań' } }
    };

    return <Pie data={chartData} options={options} />;
}