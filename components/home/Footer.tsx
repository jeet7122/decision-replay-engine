import React from 'react';
import { Github, Twitter, Mail, Activity, ArrowRight } from 'lucide-react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-cyan-300/30 dark:bg-blue-900/80 border-t border-slate-200 dark:border-white/10 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">

                    {/* Brand Section */}
                    <div className="col-span-1 md:col-span-1">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="p-1.5 bg-blue-600 rounded-lg">
                                <img src='/favicon.ico' alt='Logo' className='w-6 h-6' />
                            </div>
                            <span className="font-bold text-xl tracking-tight text-slate-900 dark:text-white">
                Decision Replay
              </span>
                        </div>
                        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                            Analyze, debug, and optimize your application's decision-making logic with millisecond precision.
                        </p>
                    </div>

                    {/* Product Links */}
                    <div>
                        <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Product</h3>
                        <ul className="space-y-3 text-sm">
                            <li><a href="#" className="text-slate-900 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Live Replays</a></li>
                            <li><a href="#" className="text-slate-900 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Event Logs</a></li>
                            <li><a href="#" className="text-slate-900 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Visualizer</a></li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Resources</h3>
                        <ul className="space-y-3 text-sm">
                            <li><a href="#" className="text-slate-900 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Documentation</a></li>
                            <li><a href="#" className="text-slate-900 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">API Reference</a></li>
                            <li><a href="#" className="text-slate-900 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Guides</a></li>
                        </ul>
                    </div>

                    {/* Newsletter/CTA */}
                    <div>
                        <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Stay Updated</h3>
                        <div className="flex gap-2">
                            <input
                                type="email"
                                placeholder="Email address"
                                className="bg-slate-100 dark:bg-white/5 border border-transparent focus:border-blue-500 outline-none rounded-md px-3 py-2 text-sm w-full transition-all"
                            />
                            <button className="bg-slate-900 dark:bg-white dark:text-black text-white p-2 rounded-md hover:opacity-90 transition-opacity">
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-slate-200 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-slate-400">
                        © {currentYear} Decision Replay Engine. All rights reserved.
                    </p>

                    <div className="flex items-center gap-6">
                        <a href="#" className="text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors">
                            <Github className="w-5 h-5" />
                        </a>
                        <a href="#" className="text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors">
                            <Twitter className="w-5 h-5" />
                        </a>
                        <a href="#" className="text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors">
                            <Mail className="w-5 h-5" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;