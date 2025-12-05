import { useEffect, useState } from 'react';
import { Lightbulb, AlertCircle, MessageCircle, ArrowLeft, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Suggestion {
    id: string;
    type: 'bug' | 'feature' | 'other';
    content: string;
    user_id: string;
    created_at: string;
    status: string;
}

export const AdminSuggestions = () => {
    const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // OPTIONAL: Add admin email check here
    // if (!currentUser || currentUser.email !== 'admin@yourdomain.com') { ... }

    useEffect(() => {
        const fetchSuggestions = async () => {
            try {
                const response = await fetch('/api/suggestions?limit=100');
                if (response.ok) {
                    const data = await response.json();
                    if (data.results) {
                        setSuggestions(data.results);
                    }
                }
            } catch (error) {
                console.error("Failed to fetch suggestions", error);
            } finally {
                setLoading(false);
            }
        };

        fetchSuggestions();
    }, []);

    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'bug': return <AlertCircle className="w-5 h-5 text-red-500" />;
            case 'feature': return <Lightbulb className="w-5 h-5 text-blue-500" />;
            default: return <MessageCircle className="w-5 h-5 text-purple-500" />;
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString() + ' ' + new Date(dateString).toLocaleTimeString();
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-950 flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-950 text-white p-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex items-center gap-4 mb-8">
                    <button
                        onClick={() => navigate('/')}
                        className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                    >
                        <ArrowLeft className="w-6 h-6" />
                    </button>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                        Feedback Dashboard
                    </h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-2 bg-blue-500/20 rounded-lg">
                                <Lightbulb className="w-6 h-6 text-blue-400" />
                            </div>
                            <span className="text-2xl font-bold">{suggestions.filter(s => s.type === 'feature').length}</span>
                        </div>
                        <p className="text-gray-400">Feature Requests</p>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-2 bg-red-500/20 rounded-lg">
                                <AlertCircle className="w-6 h-6 text-red-400" />
                            </div>
                            <span className="text-2xl font-bold">{suggestions.filter(s => s.type === 'bug').length}</span>
                        </div>
                        <p className="text-gray-400">Bug Reports</p>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-2 bg-purple-500/20 rounded-lg">
                                <MessageCircle className="w-6 h-6 text-purple-400" />
                            </div>
                            <span className="text-2xl font-bold">{suggestions.filter(s => s.type === 'other').length}</span>
                        </div>
                        <p className="text-gray-400">General Feedback</p>
                    </div>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-black/20 border-b border-white/10">
                                    <th className="p-4 font-semibold text-gray-400">Type</th>
                                    <th className="p-4 font-semibold text-gray-400 w-1/2">Content</th>
                                    <th className="p-4 font-semibold text-gray-400">Date</th>
                                    <th className="p-4 font-semibold text-gray-400">User ID</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {suggestions.map((item) => (
                                    <tr key={item.id} className="hover:bg-white/5 transition-colors">
                                        <td className="p-4">
                                            <div className="flex items-center gap-2">
                                                {getTypeIcon(item.type)}
                                                <span className="capitalize text-sm">{item.type}</span>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <p className="text-gray-200 text-sm whitespace-pre-wrap">{item.content}</p>
                                        </td>
                                        <td className="p-4 text-sm text-gray-400 whitespace-nowrap">
                                            {formatDate(item.created_at)}
                                        </td>
                                        <td className="p-4 text-xs font-mono text-gray-500">
                                            {item.user_id ? item.user_id.substring(0, 8) + '...' : 'Anonymous'}
                                        </td>
                                    </tr>
                                ))}
                                {suggestions.length === 0 && (
                                    <tr>
                                        <td colSpan={4} className="p-8 text-center text-gray-500">
                                            No suggestions found yet.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};
