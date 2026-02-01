import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Award, Activity } from 'lucide-react';
import NeuralBackground from '../3d/NeuralBackground';

interface StrategyProps {
  name: string;
  gain: string;
  url: string;
  broker: string;
  platform: string;
  monthly: string;
  drawdown: string;
}

const StrategyCard: React.FC<StrategyProps> = ({ name, gain, url, broker, platform, monthly, drawdown }) => {
  return (
    <motion.a 
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="block glass-card p-6 hover:border-accent transition-all duration-300 group relative overflow-hidden"
      whileHover={{ y: -5 }}
    >
      <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
        <TrendingUp size={80} />
      </div>
      
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-4">
          <div>
            <span className="text-xs font-bold text-accent uppercase tracking-wider mb-1 block">{broker} • {platform}</span>
            <h3 className="text-xl font-bold text-white group-hover:text-accent transition-colors">{name}</h3>
          </div>
          <div className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
            <Activity size={12} /> Live
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center p-2 rounded-lg bg-white/5">
            <p className="text-xs text-gray-400 mb-1">Total Gain</p>
            <p className="text-lg font-bold text-green-400">{gain}</p>
          </div>
          <div className="text-center p-2 rounded-lg bg-white/5">
            <p className="text-xs text-gray-400 mb-1">Monthly</p>
            <p className="text-lg font-bold text-blue-400">{monthly}</p>
          </div>
          <div className="text-center p-2 rounded-lg bg-white/5">
            <p className="text-xs text-gray-400 mb-1">Drawdown</p>
            <p className="text-lg font-bold text-red-400">{drawdown}</p>
          </div>
        </div>
        
        <div className="flex items-center justify-between text-sm text-gray-400 group-hover:text-white transition-colors">
          <span className="flex items-center gap-2"><Award size={16} className="text-yellow-500" /> Verified by FxMerge</span>
          <span>View Performance →</span>
        </div>
      </div>
    </motion.a>
  );
};

const LiveStrategies: React.FC = () => {
  const strategies = [
    {
      name: "JAYADANA 832",
      gain: "+3,053.77%",
      monthly: "25.82%",
      drawdown: "22.27%",
      broker: "Trading Pro",
      platform: "MT4",
      url: "https://www.fxmerge.com/strategies-results/1817037/ea-jayadana-832"
    },
    {
      name: "JAYADANA 16M",
      gain: "+2,048.44%",
      monthly: "2,048.44%",
      drawdown: "0.81%",
      broker: "FBS",
      platform: "MT5",
      url: "https://www.fxmerge.com/strategies-results/2226731/jayadana-16m"
    },
    {
      name: "JAYADANA 453M",
      gain: "+1,423.79%",
      monthly: "290.75%",
      drawdown: "0.77%",
      broker: "FBS",
      platform: "MT5",
      url: "https://www.fxmerge.com/strategies-results/2111396/jayadana-453m"
    }
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      <NeuralBackground />
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-start to-primary-end">
                Proven Track Record
              </span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              Real live trading performance verified by third-party analytics. 
              Witness the power of algorithmic trading strategies in action.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {strategies.map((strategy, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
            >
              <StrategyCard {...strategy} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LiveStrategies;
