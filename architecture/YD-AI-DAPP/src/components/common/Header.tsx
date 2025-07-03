import { useState } from "react";
import { Link } from "react-router-dom";
import { Wallet, Home } from "lucide-react";

const Header = () => {
  const [isWalletConnected, setIsWalletConnected] = useState(false);

  const handleConnectWallet = () => {
    // 这里添加实际的钱包链接逻辑
    setIsWalletConnected(!isWalletConnected);
  };

  return (
    <header className="w-full bg-white border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="h-16 flex items-center justify-between">
          {/** 左侧 Logo */}
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-gray-800">
              www.yidengfe.com
            </Link>
          </div>

          {/** 中间导航 */}
          <nav className="flex items-center space-x-8">
            <Link
              to="/"
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Home className="w-5 h-5 mr-1" />
              <span>首页</span>
            </Link>
            <Link
              to="/dapp"
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Wallet className="w-5 h-5 mr-1" />
              <span>DApp</span>
            </Link>
          </nav>

          {/** 右侧钱包链接按钮 */}
          <div className="flex items-center">
            <button
              onClick={handleConnectWallet}
              className={`
                flex items-center px-4 py-2 rounded-lg
                transition-colors duration-200
                ${
                  isWalletConnected
                    ? 'bg-green-50 text-green-700 hover:bg-green-100'
                    : 'bg-green-600 text-white hover:bg-green-700'
                }
                `}
            >
              <Wallet className="w-5 h-5 mr-2"></Wallet>
              <span>{isWalletConnected ? '已连接钱包' : '连接钱包'}</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;