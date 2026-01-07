import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import { getComparisonItem } from '../data/comparisonData';
import type { ComparisonItem } from '../data/comparisonData';

interface ComparisonContextType {
    isOpen: boolean;
    sourceItem: ComparisonItem | null;
    targetItem: ComparisonItem | null;
    openComparison: (sourceId: string) => void;
    closeComparison: () => void;
    setTarget: (targetId: string) => void;
}

const ComparisonContext = createContext<ComparisonContextType | undefined>(undefined);

export const ComparisonProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [sourceItem, setSourceItem] = useState<ComparisonItem | null>(null);
    const [targetItem, setTargetItem] = useState<ComparisonItem | null>(null);

    const openComparison = (sourceId: string) => {
        const item = getComparisonItem(sourceId);
        if (item) {
            setSourceItem(item);
            setTargetItem(null); // Reset target when opening new
            setIsOpen(true);
        } else {
            console.error(`Comparison item not found for id: ${sourceId}`);
        }
    };

    const closeComparison = () => {
        setIsOpen(false);
        setSourceItem(null);
        setTargetItem(null);
    };

    const setTarget = (targetId: string) => {
        const item = getComparisonItem(targetId);
        if (item) {
            setTargetItem(item);
        }
    };

    return (
        <ComparisonContext.Provider value={{ isOpen, sourceItem, targetItem, openComparison, closeComparison, setTarget }}>
            {children}
        </ComparisonContext.Provider>
    );
};

export const useComparison = () => {
    const context = useContext(ComparisonContext);
    if (!context) {
        throw new Error('useComparison must be used within a ComparisonProvider');
    }
    return context;
};
