import React, { useState } from 'react';
import { useBank } from '../../context/BankContext';

export const CardsScreen: React.FC = () => {
  const { isBalanceHidden, showToast } = useBank();

  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [isCvvRevealed, setIsCvvRevealed] = useState(false);
  const [isFrozen, setIsFrozen] = useState(false);
  const [contactlessEnabled, setContactlessEnabled] = useState(true);
  const [onlineEnabled, setOnlineEnabled] = useState(true);
  const [spendingLimit, setSpendingLimit] = useState(3500);

  const cards = [
    {
      id: 'elite-visa',
      name: 'Nova Elite',
      type: 'PLATINUM DEBIT',
      network: 'VISA',
      last4: '4821',
      expiry: '08/28',
      cvv: '849',
      colorBg: 'from-[#1b2b3e] via-[#0f1a28] to-[#08101a]',
      chipColor: '#bac7e1',
      holder: 'ALEX MORGAN',
      accentColor: '#54fd8f',
      spentThisMonth: 1420.5,
    },
    {
      id: 'vault-savings',
      name: 'Yield Savings Card',
      type: 'GOLD VAULT DEBIT',
      network: 'MASTERCARD',
      last4: '1092',
      expiry: '11/29',
      cvv: '321',
      colorBg: 'from-[#00281b] via-[#003b25] to-[#00170e]',
      chipColor: '#54fd8f',
      holder: 'ALEX MORGAN',
      accentColor: '#54fd8f',
      spentThisMonth: 580.0,
    },
  ];

  const currentCard = cards[activeCardIndex];

  const handleToggleFreeze = () => {
    setIsFrozen(!isFrozen);
    showToast(!isFrozen ? 'Card frozen. Transactions temporarily blocked.' : 'Card unlocked successfully.');
  };

  const handleRevealCvv = () => {
    setIsCvvRevealed(!isCvvRevealed);
    showToast(!isCvvRevealed ? 'CVV security code revealed (60s timer)' : 'CVV hidden');
  };

  return (
    <div className="flex flex-col w-full pb-8 animate-in fade-in duration-200">
      <div className="max-w-3xl mx-auto w-full px-margin pt-space-md flex flex-col gap-space-lg">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <p className="font-label-sm text-label-sm text-[#44474c] uppercase tracking-wider font-semibold">
              Card Management
            </p>
            <h1 className="font-headline-md text-headline-md text-[#0b1c30]">My Cards</h1>
          </div>
          <button
            onClick={() => showToast('New Virtual One-Time Card generated')}
            className="px-3.5 py-1.5 rounded-full bg-[#000000] text-white font-label-md text-xs font-semibold flex items-center gap-1 shadow-xs hover:bg-[#213145] active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-[16px]">add</span>
            <span>New Card</span>
          </button>
        </div>

        {/* Card Selector Tabs */}
        <div className="flex gap-2">
          {cards.map((card, idx) => (
            <button
              key={card.id}
              onClick={() => setActiveCardIndex(idx)}
              className={`flex-1 py-2 px-3 rounded-xl font-label-md text-xs transition-all border ${
                activeCardIndex === idx
                  ? 'bg-[#ffffff] text-[#0b1c30] font-bold border-[#006d34] shadow-xs'
                  : 'bg-[#eff4ff] text-[#44474c] border-[#e5eeff] hover:bg-[#e5eeff]'
              }`}
            >
              {card.name} (•••• {card.last4})
            </button>
          ))}
        </div>

        {/* Interactive Physical Card Representation */}
        <div className="relative">
          <div
            className={`w-full aspect-[1.586/1] max-w-md mx-auto rounded-3xl p-6 bg-gradient-to-br ${currentCard.colorBg} text-white shadow-2xl relative overflow-hidden transition-all duration-300 ${
              isFrozen ? 'grayscale opacity-75 ring-4 ring-[#ba1a1a]' : 'hover:scale-[1.01]'
            }`}
          >
            {/* Ambient Shine */}
            <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-white/5 blur-2xl pointer-events-none"></div>

            {/* Frozen Overlay Badge */}
            {isFrozen && (
              <div className="absolute top-4 right-4 z-20 px-3 py-1 rounded-full bg-[#ba1a1a] text-white text-xs font-bold flex items-center gap-1 shadow-md">
                <span className="material-symbols-outlined text-[16px]">lock</span>
                <span>FROZEN</span>
              </div>
            )}

            <div className="h-full flex flex-col justify-between relative z-10">
              {/* Top Row */}
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#bac7e1]">
                    {currentCard.type}
                  </span>
                  <p className="font-headline-sm text-lg font-bold">{currentCard.name}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[20px] text-[#54fd8f]">
                    contactless
                  </span>
                  <span className="font-bold tracking-wider text-lg">{currentCard.network}</span>
                </div>
              </div>

              {/* Middle EMV Chip & Number */}
              <div>
                <div className="w-10 h-7 rounded-md bg-[#bac7e1]/40 border border-[#bac7e1]/60 flex items-center justify-center mb-3">
                  <div className="w-5 h-4 border border-[#bac7e1]/80 rounded-xs"></div>
                </div>
                <div className="flex items-center gap-3 font-mono text-lg sm:text-xl tracking-widest text-white/90">
                  <span>••••</span>
                  <span>••••</span>
                  <span>••••</span>
                  <span className="font-bold text-white">{currentCard.last4}</span>
                </div>
              </div>

              {/* Bottom Row */}
              <div className="flex items-end justify-between pt-2 text-xs text-[#bac7e1]">
                <div>
                  <span className="text-[9px] uppercase tracking-wider block opacity-75">
                    Card Holder
                  </span>
                  <span className="font-semibold text-white tracking-wider">
                    {currentCard.holder}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <div>
                    <span className="text-[9px] uppercase tracking-wider block opacity-75">
                      Expires
                    </span>
                    <span className="font-mono font-semibold text-white">{currentCard.expiry}</span>
                  </div>
                  <div>
                    <span className="text-[9px] uppercase tracking-wider block opacity-75">CVV</span>
                    <button
                      onClick={handleRevealCvv}
                      className="font-mono font-semibold text-white hover:underline flex items-center gap-1"
                    >
                      {isCvvRevealed ? currentCard.cvv : '•••'}
                      <span className="material-symbols-outlined text-[13px]">
                        {isCvvRevealed ? 'visibility_off' : 'visibility'}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Action Buttons for Card */}
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={handleToggleFreeze}
            className={`p-3 rounded-2xl flex flex-col items-center gap-1.5 transition-all border shadow-xs ${
              isFrozen
                ? 'bg-[#ba1a1a]/15 text-[#ba1a1a] border-[#ba1a1a]/30'
                : 'bg-white text-[#0b1c30] border-[#e5eeff] hover:bg-[#eff4ff]'
            }`}
          >
            <span className="material-symbols-outlined text-[22px]">
              {isFrozen ? 'lock_open' : 'lock'}
            </span>
            <span className="font-label-sm text-xs font-semibold">
              {isFrozen ? 'Unlock' : 'Freeze Card'}
            </span>
          </button>

          <button
            onClick={handleRevealCvv}
            className="p-3 rounded-2xl bg-white text-[#0b1c30] border border-[#e5eeff] hover:bg-[#eff4ff] flex flex-col items-center gap-1.5 transition-all shadow-xs"
          >
            <span className="material-symbols-outlined text-[22px]">visibility</span>
            <span className="font-label-sm text-xs font-semibold">Show Details</span>
          </button>

          <button
            onClick={() => showToast('Added to Digital Wallet (Apple / Google Pay)')}
            className="p-3 rounded-2xl bg-white text-[#0b1c30] border border-[#e5eeff] hover:bg-[#eff4ff] flex flex-col items-center gap-1.5 transition-all shadow-xs"
          >
            <span className="material-symbols-outlined text-[22px]">wallet</span>
            <span className="font-label-sm text-xs font-semibold">Add to Wallet</span>
          </button>
        </div>

        {/* Monthly Card Spending Limit Slider */}
        <div className="bg-white border border-[#e5eeff] rounded-2xl p-4 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-label-sm text-sm font-semibold text-[#0b1c30]">
              Monthly Card Limit
            </span>
            <span className="font-label-numeric font-bold text-[#006d34]">
              ${spendingLimit.toLocaleString()}
            </span>
          </div>

          <input
            type="range"
            min="500"
            max="10000"
            step="250"
            value={spendingLimit}
            onChange={(e) => setSpendingLimit(Number(e.target.value))}
            className="w-full accent-[#000000] h-2 bg-[#e5eeff] rounded-lg cursor-pointer"
          />

          <div className="flex items-center justify-between text-xs text-[#44474c]">
            <span>$500 min</span>
            <span>
              Spent this cycle: <strong>${currentCard.spentThisMonth.toFixed(2)}</strong>
            </span>
            <span>$10,000 max</span>
          </div>
        </div>

        {/* Security & Feature Toggles */}
        <div className="bg-white border border-[#e5eeff] rounded-2xl p-4 shadow-xs divide-y divide-[#f1f5f9]">
          <div className="py-2.5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[#006d34] text-[20px]">
                contactless
              </span>
              <div>
                <p className="font-label-md font-semibold text-[#0b1c30]">Contactless NFC Tap</p>
                <p className="text-xs text-[#44474c]">Tap-to-pay at POS terminals</p>
              </div>
            </div>
            <button
              onClick={() => {
                setContactlessEnabled(!contactlessEnabled);
                showToast(
                  !contactlessEnabled ? 'Contactless NFC enabled' : 'Contactless NFC disabled'
                );
              }}
              className={`w-12 h-6 rounded-full transition-colors relative ${
                contactlessEnabled ? 'bg-[#006d34]' : 'bg-[#c5c6cd]'
              }`}
            >
              <span
                className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-transform ${
                  contactlessEnabled ? 'right-0.5' : 'left-0.5'
                }`}
              ></span>
            </button>
          </div>

          <div className="py-2.5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[#0b1c30] text-[20px]">
                shopping_cart
              </span>
              <div>
                <p className="font-label-md font-semibold text-[#0b1c30]">Online Purchases</p>
                <p className="text-xs text-[#44474c]">E-commerce and card-not-present tx</p>
              </div>
            </div>
            <button
              onClick={() => {
                setOnlineEnabled(!onlineEnabled);
                showToast(!onlineEnabled ? 'Online purchases enabled' : 'Online purchases disabled');
              }}
              className={`w-12 h-6 rounded-full transition-colors relative ${
                onlineEnabled ? 'bg-[#006d34]' : 'bg-[#c5c6cd]'
              }`}
            >
              <span
                className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-transform ${
                  onlineEnabled ? 'right-0.5' : 'left-0.5'
                }`}
              ></span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
