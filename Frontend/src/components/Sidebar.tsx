import React from 'react';
import { NavLink } from 'react-router-dom';
import type { NavItem } from '../data/navigation';

interface SidebarProps {
    title: string;
    items: NavItem[];
}

const Sidebar: React.FC<SidebarProps> = ({ title, items }) => {
    return (
        <aside className="w-full md:w-64 bg-white rounded-lg shadow-md p-6 h-fit sticky top-24">
            <h3 className="text-xl font-bold text-primary mb-6 border-b pb-2">{title}</h3>
            <div className="flex flex-col gap-2">
                {items.map((item, index) => (
                    <NavLink
                        key={index}
                        to={item.link}
                        className={({ isActive }) =>
                            `px-4 py-3 rounded-md transition-all duration-300 font-medium ${isActive
                                ? 'bg-primary text-white shadow-md'
                                : 'text-text hover:bg-gray-100 hover:text-primary'
                            } flex items-center justify-between group`
                        }
                    >
                        <span>{item.name}</span>
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                    </NavLink>
                ))}
            </div>
        </aside>
    );
};

export default Sidebar;
