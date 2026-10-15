import {useApiData} from "../hooks/useApiData.js";
import {TodoPerUserChart, TodoStatsChart, UserActivityChart} from "./Charts.jsx";
import {StatCard} from "./StatCard.jsx";
import {Users, FileText, MessageSquare, CheckCircle} from 'lucide-react';
import {TopPostsList} from "./TopPostsList.jsx";

export const Dashboard = () => {
    const {data, loading, error, refetch} = useApiData();

    if(loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 space-y-4">
                <div className="bg-red-50 text-red-600 p-6 border border-red-100 max-w-md text-center">
                    <p className="font-bold mb-2">Wystąpił problem z pobieraniem danych</p>
                    <p className="text-sm">{error}</p>
                </div>
                <button
                    onClick={refetch}
                    className="px-6 py-2 bg-blue-600 text-white hover:bg-blue-700 transition-colors font-medium"
                >
                    Spróbuj ponownie
                </button>
            </div>
        )
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard title="Użytkownicy" value={data.totalUsers} icon={Users} colorClass="text-blue-600 bg-blue-50" />
                <StatCard title="Wszystkie Posty" value={data.totalPosts} icon={FileText} colorClass="text-indigo-600 bg-indigo-50" />
                <StatCard title="Śr. Komentarzy/Post" value={data.averageComments} icon={MessageSquare} colorClass="text-emerald-600 bg-emerald-50" />
                <StatCard
                    title="Wykonane zadania"
                    value={`${data.todoStats.completionRate}%`}
                    icon={CheckCircle}
                    colorClass="text-green-600 bg-green-50"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-sm border border-gray-100 lg:col-span-2">
                    <UserActivityChart data={data.userActivity} />
                </div>
                <div className="bg-white p-6 rounded-sm border border-gray-100">
                    <TodoStatsChart data={data.todoStats} />
                </div>
            </div>
            <div className="bg-white p-6 rounded-sm border border-gray-100 mb-8">
                <TodoPerUserChart data={data.todosPerUser} />
            </div>

            <div className="mb-8">
                <TopPostsList posts={data.top5Posts} />
            </div>
        </div>
    );
}