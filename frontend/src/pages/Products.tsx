import { Save, Plus, Bell, Shield, Palette } from 'lucide-react';
import type { ComponentType } from 'react';

interface TextInputItem {
  label: string;
  type: 'text' | 'email' | 'textarea';
  placeholder: string;
}

interface SelectItem {
  label: string;
  type: 'select';
  options: string[];
}

interface ToggleItem {
  label: string;
  type: 'toggle';
}

interface ButtonItem {
  label: string;
  type: 'button';
  action: string;
  danger?: boolean;
}

type SettingsItem = TextInputItem | SelectItem | ToggleItem | ButtonItem;

interface SettingsSection {
  title: string;
  icon: ComponentType<{ className?: string }>;
  color: string;
  items: SettingsItem[];
}

export default function Habits() {
  const settingsSections: SettingsSection[] = [
    {
      title: 'Input new products',
      icon: Plus,
      color: 'from-blue-500 to-indigo-600',
      items: [
        { label: 'Product Name', type: 'text', placeholder: 'Meditating' },
        { label: 'URL', type: 'text', placeholder: 'https://www.example.com/product' },
        { label: 'Threshold Price', type: 'text', placeholder: '€100' },
        { label: 'Size', type: 'text', placeholder: 'M, 48, 41' },
      ]
    },
    // {
    //   title: 'Appearance',
    //   icon: Palette,
    //   color: 'from-purple-500 to-pink-600',
    //   items: [
    //     { label: 'Theme', type: 'select', options: ['Light', 'Dark', 'Auto'] },
    //     { label: 'Language', type: 'select', options: ['English', 'Spanish', 'French'] },
    //     { label: 'Timezone', type: 'select', options: ['UTC-8', 'UTC-5', 'UTC+0'] }
    //   ]
    // },
    // {
    //   title: 'Notifications',
    //   icon: Bell,
    //   color: 'from-green-500 to-emerald-600',
    //   items: [
    //     { label: 'Email Notifications', type: 'toggle' },
    //     { label: 'Push Notifications', type: 'toggle' },
    //     { label: 'Weekly Reports', type: 'toggle' }
    //   ]
    // },
    // {
    //   title: 'Privacy & Security',
    //   icon: Shield,
    //   color: 'from-red-500 to-orange-600',
    //   items: [
    //     { label: 'Two-Factor Authentication', type: 'toggle' },
    //     { label: 'Data Export', type: 'button', action: 'Export Data' },
    //     { label: 'Delete Account', type: 'button', action: 'Delete Account', danger: true }
    //   ]
    // }
  ];

  return (
    <div className="p-8 bg-gray-50 min-h-full">
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 bg-clip-text text-transparent mb-2">
          Products
        </h1>
        <p className="text-gray-600 text-lg">
          Manage the product prices that you are monitoring. 
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {settingsSections.map((section, sectionIndex) => {
          const Icon = section.icon;
          return (
            <div key={sectionIndex} className="bg-white/80 backdrop-blur-xl p-6 rounded-2xl shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 lg:col-span-2">
              <div className="flex items-center mb-6">
                <div className={`w-10 h-10 bg-gradient-to-br ${section.color} rounded-xl flex items-center justify-center mr-3`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800">{section.title}</h3>
              </div>

              <div className="space-y-4">
                {section.items.map((item, itemIndex) => (
                  <div key={itemIndex}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {item.label}
                    </label>
                    {item.type === 'text' && 'placeholder' in item && (
                      <input
                        type="text"
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        placeholder={item.placeholder}
                      />
                    )}
                    {item.type === 'email' && 'placeholder' in item && (
                      <input
                        type="email"
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        placeholder={item.placeholder}
                      />
                    )}
                    {item.type === 'textarea' && 'placeholder' in item && (
                      <textarea
                        rows={3}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                        placeholder={item.placeholder}
                      />
                    )}
                    {item.type === 'select' && 'options' in item && (
                      <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200">
                        {item.options.map((option: string, optionIndex: number) => (
                          <option key={optionIndex}>{option}</option>
                        ))}
                      </select>
                    )}
                    {item.type === 'toggle' && (
                      <div className="flex items-center">
                        <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-slate-200 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                          <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-1" />
                        </button>
                        <span className="ml-3 text-sm text-gray-600">Enabled</span>
                      </div>
                    )}
                    {item.type === 'button' && 'action' in item && (
                      <button className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                        'danger' in item && item.danger
                          ? 'bg-red-100 text-red-700 hover:bg-red-200'
                          : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                      }`}>
                        {item.action}
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 flex justify-end">
        <button className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5">
          <Save className="w-4 h-4 mr-2" />
          Save All Settings
        </button>
      </div>
    </div>
  );
}