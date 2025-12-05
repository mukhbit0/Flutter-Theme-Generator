import { MessageSquarePlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const SuggestionBox = () => {
    const navigate = useNavigate();

    return (
        <button
            onClick={() => navigate('/feedback')}
            className="fixed bottom-24 right-6 md:bottom-6 md:right-24 z-50 p-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full shadow-lg hover:bg-white/20 transition-all group"
            title="Community Feedback"
        >
            <MessageSquarePlus className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
            <span className="absolute right-full top-1/2 -translate-y-1/2 mr-3 px-3 py-1 bg-gray-900 border border-white/10 rounded-lg text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                Feedback Board
            </span>
        </button>
    );
};
