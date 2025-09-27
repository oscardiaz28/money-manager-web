import React from 'react'

export const InfoCardSkeleton = () => {
    return [1, 2, 3].map((i) => (
        <div key={i} className="p-4 rounded-lg bg-white shadow animate-pulse flex items-center gap-4 h-[105px]">
            <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
            <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-300 rounded w-1/3"></div>
                <div className="h-6 bg-gray-300 rounded w-3/4"></div>
            </div>
        </div>
    ))
}
