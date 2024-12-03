import React, { useMemo, useCallback } from 'react';
import {
  ConnectionProvider,
  WalletProvider,
  useWallet,
  useConnection,
} from '@solana/wallet-adapter-react';
import {
  WalletModalProvider,
  WalletMultiButton,
} from '@solana/wallet-adapter-react-ui';
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  TorusWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import { clusterApiUrl, PublicKey, Transaction, SystemProgram } from '@solana/web3.js';
import '@solana/wallet-adapter-react-ui/styles.css';
import { Twitter, Send, Globe, Search, Share2, Coins, Heart, Users, PawPrint } from 'lucide-react';

const App = () => {
  const network = clusterApiUrl('mainnet-beta'); // Switch to 'devnet' for testing

  const wallets = useMemo(() => [
    new PhantomWalletAdapter(),
    new SolflareWalletAdapter(),
    new TorusWalletAdapter(),
  ], []);

  return (
    <ConnectionProvider endpoint={network}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <MainApp />
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

const MainApp = () => {
  const { connection } = useConnection();
  const wallet = useWallet();

  // Token purchase function
  const handlePurchase = useCallback(async () => {
    if (!wallet.connected) {
      alert('Please connect your wallet first.');
      return;
    }

    try {
      const recipientAddress = new PublicKey('52ireEct8MqJCoKK63i6k9LH1HtK5dnWwkKKtf8epump'); // Replace with actual address
      const amount = 1_000_000; // 0.001 SOL

      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: wallet.publicKey,
          toPubkey: recipientAddress,
          lamports: amount,
        })
      );

      const signature = await wallet.sendTransaction(transaction, connection);
      await connection.confirmTransaction(signature, 'processed');

      alert(`Transaction successful: ${signature}`);
    } catch (error) {
      console.error('Transaction failed:', error);
      alert('Transaction failed. Please try again.');
    }
  }, [wallet, connection]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-purple-950" style={{
      backgroundImage: `url('backg.avif')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      height: '100%',
      width: '100vw',
      backdropFilter: `blur(5px)`
    }}>
      {/* Header/Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-lg bg-purple-900/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <PawPrint className="w-8 h-8 text-white" />
              <span className="text-white text-2xl font-bold">BARI</span>
            </div>
            <div className="flex items-center space-x-6">
              <WalletMultiButton className="bg-purple-600 text-white font-bold rounded-lg px-4 py-2" />
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-10 md:py-20 px-4 md:px-8">
  <div className="container mx-auto">
    <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
      
      {/* Text Content */}
      <div className="text-white space-y-6 text-center md:text-left">
        <h1 className="text-3xl md:text-5xl font-bold leading-tight">
          Help Find BARI & Earn Rewards! 🐾
        </h1>
        <p className="text-lg md:text-xl">
          BARI, our beloved mascot and the heart of the BARI Token community, has disappeared! Join our exciting Find BARI Airdrop Campaign.
        </p>
        <a href='https://raydium.io/swap/?inputMint=sol&outputMint=52ireEct8MqJCoKK63i6k9LH1HtK5dnWwkKKtf8epump'>
        <button
          // onClick={handlePurchase}
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 md:px-8 rounded-lg transition-all duration-300 transform hover:scale-105"
        >
          Purchase BARI Tokens
        </button>
        </a>
      </div>
      
      {/* Image Section */}
      <div className="relative flex justify-center">
        <div className="bg-purple-400/20 backdrop-blur-md rounded-2xl p-4 md:p-6 w-full max-w-md md:max-w-lg">
          <div className="bg-purple-500 text-white px-4 py-2 rounded-lg mb-4 text-center">
            MISSING
          </div>
          <img
            src="images.jfif"
            alt="Missing Dog BARI"
            className="w-full h-64 md:h-80 lg:h-96 object-cover rounded-lg"
          />
          <p className="text-white text-center mt-4">
            Help us find BARI and earn rewards!
          </p>
        </div>
      </div>
      
    </div>
  </div>
</section>


      
      {/* How It Works Section */}
      <section className="py-20 ">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-white text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Search className="w-12 h-12" />,
                title: "Capture the Moment 📸",
                points: [
                  "Post a creative picture of you searching for BARI on Twitter",
                  "Use the hashtag #WhereIsBARI and tag @bariquantkiddog"
                ]
              },
              {
                icon: <Share2 className="w-12 h-12" />,
                title: "Spread the Word 🌐",
                points: [
                  "Share your post with friends, family, and the crypto community",
                  "The more engagement your post gets, the higher your rewards!"
                ]
              },
              {
                icon: <Coins className="w-12 h-12" />,
                title: "Earn BARI Tokens 💰",
                points: [
                  "Receive BARI tokens based on post engagement",
                  "Top BARI hunters can win exclusive prizes!"
                ]
              }
            ].map((item, index) => (
              <div key={index} className="bg-purple-800/50 backdrop-blur-sm rounded-xl p-6 text-white">
                <div className="mb-4 text-purple-300">{item.icon}</div>
                <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                <ul className="space-y-2">
                  {item.points.map((point, i) => (
                    <li key={i} className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Join Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Why Join the Hunt?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Users className="w-12 h-12" />,
                title: "Fun & Engaging",
                description: "Be part of a community-driven campaign that's all about creativity and camaraderie."
              },
              {
                icon: <Heart className="w-12 h-12" />,
                title: "Support a Good Cause",
                description: "With over 10 million pets reported missing annually in the US, your participation raises awareness about lost pets."
              },
              {
                icon: <Coins className="w-12 h-12" />,
                title: "Earn While You Search",
                description: "Turn your social media activity into tangible rewards with BARI tokens."
              }
            ].map((item, index) => (
              <div key={index} className="bg-purple-800/50 backdrop-blur-sm rounded-xl p-6 text-white">
                <div className="mb-4 text-purple-300">{item.icon}</div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 bg-purple-900/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Did You Know?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                number: "10M+",
                text: "Dogs and cats reported lost annually in the US"
              },
              {
                number: "27,400",
                text: "Pets missing every day"
              },
              {
                number: "14%",
                text: "Dogs go missing at least once over five years"
              }
            ].map((stat, index) => (
              <div key={index} className="text-center text-white">
                <div className="text-4xl font-bold text-purple-300 mb-2">{stat.number}</div>
                <p className="text-lg">{stat.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Get Started Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Get Started Today! 🚀</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-purple-800/50 backdrop-blur-sm rounded-xl p-6 text-white">
              <h3 className="text-xl font-bold mb-4">1. Follow Us on Twitter</h3>
              <p>Stay updated with the latest campaign news and updates.</p>
            </div>
            <div className="bg-purple-800/50 backdrop-blur-sm rounded-xl p-6 text-white">
              <h3 className="text-xl font-bold mb-4">2. Start Posting</h3>
              <p>Share your #WhereIsBARI posts and watch your rewards grow!</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-purple-900/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-white text-center mb-12">FAQs</h2>
          <div className="space-y-6 max-w-3xl mx-auto">
            {[
              {
                q: "How do I earn BARI tokens?",
                a: "Earn BARI tokens based on the engagement your #WhereIsBARI post receives on Twitter, including likes, retweets, and comments."
              },
              {
                q: "Is there a limit to how many times I can participate?",
                a: "No, you can submit multiple posts to increase your chances of earning more rewards!"
              },
              {
                q: "When will the rewards be distributed?",
                a: "Rewards will be distributed weekly based on the engagement metrics of your posts."
              },
              {
                q: "Do I need to be a BARI token holder to participate?",
                a: "No, anyone can join the campaign and earn BARI tokens by participating and engaging on Twitter."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-purple-800/50 backdrop-blur-sm rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-2">{faq.q}</h3>
                <p className="text-purple-200">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Find BARI?</h2>
          <p className="text-purple-200 mb-8 max-w-2xl mx-auto">
            Embark on this fun and rewarding journey with the BARI Token community. Every post brings us closer to finding BARI and supporting thousands of lost pets nationwide.
          </p>
          <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105">
            Join the Hunt Now
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-purple-900/80">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2">
              <PawPrint className="w-6 h-6 text-white" />
              <span className="text-white text-xl font-bold">BARI</span>
            </div>
            <div className="flex space-x-6">
              <a href="https://x.com/bariquantkiddog" className="text-white hover:text-purple-300">🐦 Twitter</a>
              <a href="https://t.me/+mRiVTsUphWc3MGRh" className="text-white hover:text-purple-300">📱 Telegram</a>
              <a href="https://bariquant.site.xyz" className="text-white hover:text-purple-300">💬 Website</a>
            </div>
            <div className="text-purple-300 text-sm">
              © 2024 BARI Quant. All Rights Reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
