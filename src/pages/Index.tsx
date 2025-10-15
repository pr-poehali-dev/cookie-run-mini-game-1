import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

interface Cookie {
  id: number;
  name: string;
  emoji: string;
  power: number;
  level: number;
  ability: string;
  gradient: string;
}

export default function Index() {
  const [cookies, setCookies] = useState(1000);
  const [clickPower, setClickPower] = useState(1);
  const [collection, setCollection] = useState<Cookie[]>([
    { id: 1, name: 'Cookie Fame', emoji: '🍪', power: 100, level: 1, ability: 'Сила печенья', gradient: 'from-amber-300 to-amber-500' },
    { id: 2, name: 'Cookie Storm', emoji: '🍰', power: 150, level: 1, ability: 'Вафельная буря', gradient: 'from-yellow-200 to-amber-400' },
    { id: 3, name: 'Sugar Rush', emoji: '🧁', power: 200, level: 1, ability: 'Сахарный взрыв', gradient: 'from-pink-300 to-rose-400' },
    { id: 4, name: 'Candy Crush', emoji: '🍬', power: 250, level: 1, ability: 'Конфетный удар', gradient: 'from-blue-300 to-cyan-400' }
  ]);
  const [selectedCookie, setSelectedCookie] = useState<Cookie | null>(null);

  const handleClick = () => {
    setCookies(prev => prev + clickPower);
  };

  const upgradeCookie = (id: number) => {
    const cookie = collection.find(c => c.id === id);
    if (!cookie) return;

    const upgradeCost = cookie.level * 500;
    if (cookies >= upgradeCost) {
      setCookies(prev => prev - upgradeCost);
      setCollection(prev => prev.map(c => 
        c.id === id ? { ...c, level: c.level + 1, power: c.power + 50 } : c
      ));
      setClickPower(prev => prev + 1);
    }
  };

  const totalPower = collection.reduce((sum, c) => sum + c.power * c.level, 0);

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-pink-200 via-yellow-100 to-blue-200">
        <div className="absolute top-10 left-10 text-6xl opacity-20 animate-bounce">🍪</div>
        <div className="absolute top-40 right-20 text-5xl opacity-20 animate-pulse">🧁</div>
        <div className="absolute bottom-20 left-20 text-5xl opacity-20 animate-wiggle">🍬</div>
        <div className="absolute bottom-40 right-40 text-6xl opacity-20 animate-bounce">🍰</div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-6xl font-bold mb-2 text-amber-800" style={{ 
            textShadow: '4px 4px 0px rgba(255, 255, 255, 0.8), 6px 6px 0px rgba(255, 193, 7, 0.3)' 
          }}>
            COOKIE RUN KINGDOM
          </h1>
          <p className="text-xl text-amber-700 font-medium">Собирай печеньки и улучшай героев!</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-8 bg-gradient-to-br from-yellow-100 to-amber-100 border-4 border-amber-300 shadow-xl">
              <div className="text-center space-y-4">
                <div className="text-2xl font-bold text-amber-800 flex items-center justify-center gap-2">
                  <Icon name="Cookie" size={32} className="text-amber-600" />
                  <span>{cookies.toLocaleString()} печенек</span>
                </div>
                
                <button
                  onClick={handleClick}
                  className="w-48 h-48 mx-auto rounded-full bg-gradient-to-br from-pink-300 via-yellow-200 to-pink-400 border-8 border-white shadow-2xl transform transition-all hover:scale-105 active:scale-95 text-8xl flex items-center justify-center hover:shadow-pink-300/50 animate-pulse"
                  style={{
                    boxShadow: '0 10px 40px rgba(255, 182, 232, 0.5), inset 0 -8px 0 rgba(255, 255, 255, 0.5)'
                  }}
                >
                  🍪
                </button>
                
                <div className="text-lg text-amber-700 font-medium">
                  Клик: +{clickPower} 🍪
                </div>

                <div className="mt-6 p-4 bg-white/50 rounded-3xl">
                  <div className="flex justify-between text-sm text-amber-800 mb-2">
                    <span className="font-semibold">Общая мощь:</span>
                    <span className="font-bold">{totalPower}</span>
                  </div>
                  <Progress value={(totalPower % 1000) / 10} className="h-3 bg-amber-200" />
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-pink-100 to-rose-100 border-4 border-pink-300 shadow-xl">
              <h2 className="text-2xl font-bold text-rose-800 mb-4 flex items-center gap-2">
                <Icon name="Users" size={28} />
                Коллекция печенек
              </h2>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {collection.map(cookie => (
                  <button
                    key={cookie.id}
                    onClick={() => setSelectedCookie(cookie)}
                    className="relative group"
                  >
                    <div className={`p-4 rounded-3xl bg-gradient-to-br ${cookie.gradient} border-4 border-white shadow-lg transform transition-all hover:scale-105 hover:shadow-xl`}>
                      <div className="text-center space-y-2">
                        <div className="text-5xl mb-2 group-hover:animate-bounce">{cookie.emoji}</div>
                        <div className="text-sm font-bold text-gray-800">{cookie.name}</div>
                        <div className="flex items-center justify-center gap-1 text-xs font-semibold text-gray-700">
                          <Icon name="Zap" size={14} />
                          {cookie.power * cookie.level}
                        </div>
                        <div className="text-xs font-bold text-white bg-gray-800/80 rounded-full px-2 py-1">
                          Ур. {cookie.level}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            {selectedCookie && (
              <Card className="p-6 bg-gradient-to-br from-blue-100 to-cyan-100 border-4 border-blue-300 shadow-xl">
                <h3 className="text-xl font-bold text-blue-800 mb-4 flex items-center gap-2">
                  <Icon name="Star" size={24} />
                  Детали печеньки
                </h3>
                
                <div className="text-center space-y-4">
                  <div className={`mx-auto w-32 h-32 rounded-3xl bg-gradient-to-br ${selectedCookie.gradient} border-4 border-white flex items-center justify-center text-6xl shadow-lg`}>
                    {selectedCookie.emoji}
                  </div>
                  
                  <div>
                    <h4 className="text-2xl font-bold text-gray-800">{selectedCookie.name}</h4>
                    <p className="text-sm text-gray-600 mt-1">{selectedCookie.ability}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="bg-white/50 rounded-2xl p-3">
                      <div className="text-xs text-gray-600">Уровень</div>
                      <div className="text-xl font-bold text-gray-800">{selectedCookie.level}</div>
                    </div>
                    <div className="bg-white/50 rounded-2xl p-3">
                      <div className="text-xs text-gray-600">Мощь</div>
                      <div className="text-xl font-bold text-gray-800">{selectedCookie.power * selectedCookie.level}</div>
                    </div>
                  </div>

                  <Button
                    onClick={() => upgradeCookie(selectedCookie.id)}
                    className="w-full h-14 text-lg font-bold bg-gradient-to-r from-pink-400 to-rose-400 hover:from-pink-500 hover:to-rose-500 text-white border-4 border-white shadow-lg rounded-3xl"
                    disabled={cookies < selectedCookie.level * 500}
                  >
                    <Icon name="ArrowUp" size={20} className="mr-2" />
                    Улучшить ({selectedCookie.level * 500} 🍪)
                  </Button>
                </div>
              </Card>
            )}

            <Card className="p-6 bg-gradient-to-br from-purple-100 to-indigo-100 border-4 border-purple-300 shadow-xl">
              <h3 className="text-xl font-bold text-purple-800 mb-4 flex items-center gap-2">
                <Icon name="Trophy" size={24} />
                Достижения
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-white/50 rounded-2xl">
                  <div className="text-2xl">🏆</div>
                  <div className="flex-1">
                    <div className="text-sm font-bold text-gray-800">Коллекционер</div>
                    <Progress value={collection.length * 25} className="h-2 mt-1 bg-purple-200" />
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-white/50 rounded-2xl">
                  <div className="text-2xl">⭐</div>
                  <div className="flex-1">
                    <div className="text-sm font-bold text-gray-800">Богач</div>
                    <Progress value={Math.min((cookies / 10000) * 100, 100)} className="h-2 mt-1 bg-purple-200" />
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-white/50 rounded-2xl">
                  <div className="text-2xl">💪</div>
                  <div className="flex-1">
                    <div className="text-sm font-bold text-gray-800">Сила</div>
                    <Progress value={Math.min((totalPower / 20) * 100, 100)} className="h-2 mt-1 bg-purple-200" />
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
