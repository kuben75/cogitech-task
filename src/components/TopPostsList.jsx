import { Trophy } from 'lucide-react';

export const TopPostsList = ({ posts }) => {
    return (
        <div className="bg-white p-6 rounded-sm border border-gray-100">
            <div className="flex items-center space-x-3 mb-6">
                <Trophy size={24} className="text-yellow-500" />
                <h2 className="text-xl font-bold text-gray-800">Top 5 najbardziej komentowanych postów</h2>
            </div>

            <div className="space-y-3">
                {posts.map((post, index) => (
                    <div
                        key={post.id}
                        className="flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <div className="flex items-center space-x-4 overflow-hidden pr-4">
                            <span className="text-lg font-bold text-gray-400 w-4">{index + 1}.</span>
                            <p className="text-gray-700 font-medium truncate" title={post.title}>
                                {post.title}
                            </p>
                        </div>
                        <div className="shrink-0 bg-white border border-gray-200 px-3 py-1 rounded-sm">
                            <span className="text-blue-600 font-bold text-sm">{post.commentsCount} kom.</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};