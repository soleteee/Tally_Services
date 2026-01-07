import React from 'react';
import { useComparison } from '../context/ComparisonContext';
import { getAllComparisonItems } from '../data/comparisonData';
import { X, Check } from 'lucide-react';

const ComparisonModal: React.FC = () => {
    const { isOpen, sourceItem, targetItem, closeComparison, setTarget } = useComparison();
    const allItems = getAllComparisonItems();

    if (!isOpen || !sourceItem) return null;

    const availableTargets = allItems.filter(item => item.id !== sourceItem.id && item.category === sourceItem.category);

    return (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={closeComparison}></div>
            <div className="bg-white w-full max-w-4xl rounded-xl shadow-2xl overflow-hidden relative animate-zoom-in max-h-[90vh] flex flex-col">
                <div className="bg-primary p-4 flex justify-between items-center text-white">
                    <h2 className="text-xl font-bold">Compare Products</h2>
                    <button onClick={closeComparison} className="hover:bg-white/20 p-2 rounded-full transition-colors">
                        <X size={24} />
                    </button>
                </div>

                <div className="p-6 overflow-y-auto flex-1">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full">
                        {/* Source Item */}
                        <div className="border border-gray-200 rounded-lg p-6 bg-gray-50">
                            <h3 className="text-2xl font-bold text-primary mb-2">{sourceItem.title}</h3>
                            <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-semibold mb-4">{sourceItem.category}</span>
                            <p className="text-gray-600 mb-6 min-h-[60px]">{sourceItem.description}</p>

                            <h4 className="font-bold text-gray-800 mb-3 border-b pb-2">Key Features</h4>
                            <ul className="space-y-2 mb-6">
                                {sourceItem.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-start text-sm">
                                        <Check size={16} className="text-green-500 mr-2 mt-1 shrink-0" />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <div className="bg-white p-3 rounded border border-gray-100">
                                <span className="block text-xs text-gray-500 uppercase font-bold tracking-wider">Ideal For</span>
                                <span className="text-primary font-medium">{sourceItem.idealFor}</span>
                            </div>
                        </div>

                        {/* Target Item Selection or Display */}
                        <div className="border border-gray-200 rounded-lg p-6 bg-white relative">
                            {!targetItem ? (
                                <div className="h-full flex flex-col items-center justify-center text-center p-8 border-2 border-dashed border-gray-300 rounded-lg">
                                    <h3 className="text-xl font-bold text-gray-400 mb-4">Select an item to compare</h3>
                                    <select
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                                        onChange={(e) => setTarget(e.target.value)}
                                        defaultValue=""
                                    >
                                        <option value="" disabled>Choose a product...</option>
                                        {availableTargets.map(item => (
                                            <option key={item.id} value={item.id}>{item.title}</option>
                                        ))}
                                    </select>
                                </div>
                            ) : (
                                <>
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="text-2xl font-bold text-secondary">{targetItem.title}</h3>
                                        <button onClick={() => setTarget('')} className="text-xs text-red-500 hover:text-red-700 underline">Change</button>
                                    </div>
                                    <span className="inline-block bg-blue-50 text-blue-600 text-xs px-2 py-1 rounded-full font-semibold mb-4">{targetItem.category}</span>
                                    <p className="text-gray-600 mb-6 min-h-[60px]">{targetItem.description}</p>

                                    <h4 className="font-bold text-gray-800 mb-3 border-b pb-2">Key Features</h4>
                                    <ul className="space-y-2 mb-6">
                                        {targetItem.features.map((feature, idx) => (
                                            <li key={idx} className="flex items-start text-sm">
                                                <Check size={16} className="text-secondary mr-2 mt-1 shrink-0" />
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <div className="bg-gray-50 p-3 rounded border border-gray-100">
                                        <span className="block text-xs text-gray-500 uppercase font-bold tracking-wider">Ideal For</span>
                                        <span className="text-secondary font-medium">{targetItem.idealFor}</span>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ComparisonModal;
