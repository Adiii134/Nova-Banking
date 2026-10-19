import React, { useEffect, useState } from 'react';
import { useBank } from '../../context/BankContext';

export const Toast: React.FC = () => {
  const { toastMessage } = useBank();
  const [visible, setVisible] = useState(false);
  const [currentText, setCurrentText] = useState('');

  useEffect(() => {
    if (toastMessage) {
      setCurrentText(toastMessage);
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  if (!visible) return null;

  return (
    <div className="fixed bottom-20 md:bottom-8 left-1/2 -translate-x-1/2 z-50 bg-[#213145] text-[#eaf1ff] px-4 py-2.5 rounded-full shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-150 border border-white/10 pointer-events-none">
      <span className="material-symbols-outlined text-[#62ff95] text-[18px]">verified</span>
      <span className="font-label-md text-label-md whitespace-nowrap">{currentText}</span>
    </div>
  );
};
