import {useApiData} from "../hooks/useApiData.js";
import {UserActivityChart} from "./Charts.jsx";
import {StatCard} from "./StatCard.jsx";
import { Users, FileText, MessageSquare } from 'lucide-react';

export const Dashboard = () => {
    const {data, loading, error} = useApiData();

    if(loading) return (<div>Loading...</div>)

    if (error) return (<div>Error: {error.message}</div>)

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard title="Użytkownicy" value={data.totalUsers} icon={Users} colorClass="text-blue-600 bg-blue-50" />
                <StatCard title="Wszystkie Posty" value={data.totalPosts} icon={FileText} colorClass="text-indigo-600 bg-indigo-50" />
                <StatCard title="Śr. Komentarzy/Post" value={data.averageComments} icon={MessageSquare} colorClass="text-emerald-600 bg-emerald-50" />
            </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 lg:col-span-2">
                <UserActivityChart data={data.userActivity} />
            </div>
        </div>
        </>
    )
}