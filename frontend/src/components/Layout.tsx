import { Link, Outlet, useLocation } from 'react-router-dom';
import { BarChart3, TrendingUp, Settings, Home, ArrowUpWideNarrow, Euro, ShoppingCart, Plus } from 'lucide-react';
import { useState } from 'react';

export default function Layout() {
  const location = useLocation();
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);
  
  const isActive = (path: string) => location.pathname === path;
  const isMenuActive = (prefix: string) => location.pathname.startsWith(prefix);
  
  const navItems = [
    { path: '/', label: 'Dashboard', icon: Home },
    { 
      path: '/habits', 
      label: 'Habits', 
      icon: ArrowUpWideNarrow,
      subItems: [
        { path: '/habits/add', label: 'Add Habits' }
      ]
    },
    { path: '/products', label: 'Products', icon: ShoppingCart },
    { path: '/finances', label: 'Finances', icon: Euro },
    { path: '/analytics', label: 'Analytics', icon: TrendingUp },
    { path: '/settings', label: 'Settings', icon: Settings },
  ];
  
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white/80 backdrop-blur-xl shadow-2xl border-r border-white/20">
        <div className="p-6 border-b border-slate-200/50">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">Rob's Dashboard</h1>
            
            </div>
          </div>
        </div>
        
        <nav className="p-4">
          <ul className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const hasSubItems = 'subItems' in item && item.subItems;
              const isItemActive = isActive(item.path) || isMenuActive(item.path);
              
              return (
                <li key={item.path}>
                  {'subItems' in item && item.subItems ? (
                    <>
                      <Link
                        to={item.path}
                        onClick={() => setExpandedMenu(expandedMenu === item.path ? null : item.path)}
                        className={`w-full flex items-center px-4 py-3 rounded-xl transition-all duration-200 group ${
                          isMenuActive(item.path)
                            ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25'
                            : 'text-gray-700 hover:bg-white/60 hover:shadow-md'
                        }`}
                      >
                        <Icon className={`w-5 h-5 mr-3 transition-colors ${
                          isMenuActive(item.path) ? 'text-white' : 'text-gray-500 group-hover:text-blue-500'
                        }`} />
                        <span className="font-medium">{item.label}</span>
                      </Link>
                      
                      {expandedMenu === item.path && (
                        <ul className="mt-2 ml-4 space-y-2 border-l-2 border-blue-500/30 pl-4">
                          {item.subItems.map((subItem) => (
                            <li key={subItem.path}>
                              <Link
                                to={subItem.path}
                                className={`flex items-center px-4 py-2 rounded-lg transition-all duration-200 text-sm ${
                                  isActive(subItem.path)
                                    ? 'bg-blue-100 text-blue-700 font-medium'
                                    : 'text-gray-600 hover:bg-gray-100'
                                }`}
                              >
                                {subItem.path === '/habits/add' && <Plus className="w-4 h-4 mr-2" />}
                                {subItem.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </>
                  ) : (
                    <Link
                      to={item.path}
                      className={`flex items-center px-4 py-3 rounded-xl transition-all duration-200 group ${
                        isActive(item.path)
                          ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25'
                          : 'text-gray-700 hover:bg-white/60 hover:shadow-md'
                      }`}
                    >
                      <Icon className={`w-5 h-5 mr-3 transition-colors ${
                        isActive(item.path) ? 'text-white' : 'text-gray-500 group-hover:text-blue-500'
                      }`} />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
      
      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-xl shadow-sm border-b border-white/20">
          <div className="px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  {navItems.find(item => item.path === location.pathname)?.label || 
                   (location.pathname === '/habits/add' ? 'Add Habits' : 'Dashboard')}
                </h2>
                <p className="text-gray-500 mt-1">Welcome back! Here's what's happening today.</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">RC</span>
                </div>
              </div>
            </div>
          </div>
        </header>
        
        {/* Page Content */}
        <div className="min-h-[calc(100vh-89px)]">
          <Outlet />
        </div>
      </main>
    </div>
  );
}