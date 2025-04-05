
import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import { Card } from '@/components/common/Card';
import { ThemeToggle } from './ThemeToggle';

const ThemeExample: React.FC = () => {
  const { theme } = useTheme();
  
  return (
    <div className="p-6 transition-all duration-300">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold dark:text-white">
          Current Theme: {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
        </h2>
        <ThemeToggle />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card 
          className="p-6 dark:bg-gray-800 dark:border-gray-700"
          variant="default"
        >
          <h3 className="text-lg font-medium mb-2 dark:text-white">Light/Dark Card Example</h3>
          <p className="text-gray-600 dark:text-gray-300">
            This card changes styles based on the current theme. In dark mode, it has a darker
            background and lighter text. In light mode, it has a lighter background and darker text.
          </p>
        </Card>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-medium mb-2 text-gray-900 dark:text-white">
            Theme Settings
          </h3>
          <ul className="space-y-2 text-gray-600 dark:text-gray-300">
            <li>✓ Light/Dark Mode Toggle</li>
            <li>✓ System Preference Detection</li>
            <li>✓ Persistent Theme (localStorage)</li>
            <li>✓ Context API Integration</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ThemeExample;
