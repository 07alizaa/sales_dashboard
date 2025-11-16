/**
 * Stats Card Component
 * Display key metrics with icon
 */

import { formatCurrency, formatNumber } from '../../../utils/formatters';

const StatsCard = ({ title, value, icon, format = 'number', trend, color = 'navy' }) => {
  const formatValue = () => {
    if (format === 'currency') return formatCurrency(value);
    if (format === 'number') return formatNumber(value);
    return value;
  };

  const colorClasses = {
    navy: 'from-navy to-navy-light',
    cobalt: 'from-cobalt to-cobalt-light',
    green: 'from-green-600 to-green-500',
    blue: 'from-blue-600 to-blue-500',
  };

  return (
    <div className="stat-card group">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{formatValue()}</p>
          
          {trend && (
            <div className="mt-2 flex items-center gap-1">
              <span className={`text-sm font-medium ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
              </span>
              <span className="text-xs text-gray-500">vs last month</span>
            </div>
          )}
        </div>

        {/* Icon */}
        <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${colorClasses[color]} flex items-center justify-center text-white shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatsCard;