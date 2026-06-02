interface ResetViewButtonProps {
    onClick: () => void;
    visible: boolean;
}

export default function ResetViewButton({ onClick, visible }: ResetViewButtonProps) {
    if (!visible) return null;

    return (
        <button
            onClick={onClick}
            className="absolute bottom-6 right-6 z-[1000] bg-white hover:bg-gray-100 text-gray-800 font-medium py-2 px-4 rounded-full shadow-lg border border-gray-200 transition-colors flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
            Ver todos
        </button>
    );
}