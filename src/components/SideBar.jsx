'use client';

import Link from 'next/link';

import clsx from 'clsx';
import { sidebarLinks } from './sidebarLinks';

const SideBar = ({ collapsed }) => {
  return (
    <div
      className={clsx(
        'bg-white h-screen border-r p-3 transition-all duration-300',
        collapsed ? 'w-20' : 'w-64'
      )}
    >
      <h1 className="text-2xl font-bold mb-10">
        {collapsed ? 'F' : 'Finora'}
      </h1>

      <div className="space-y-3">
        {sidebarLinks.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-100 transition"
            >
              <Icon size={22} />

              {!collapsed && (
                <span>{item.title}</span>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default SideBar;