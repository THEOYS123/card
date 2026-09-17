import React, { useState, useEffect } from 'react';
import {
  isAdminLoggedIn,
  loginAdmin,
  logoutAdmin,
  getReports,
  updateReportStatus,
  getActivityLogs,
  AdminUser,
} from '../../utils/adminStorage';
import { getAllCards, deleteCard } from '../../utils/storage';
import { CardModel, ReportItem } from '../../types/card';
import {
  Shield,
  LayoutDashboard,
  Users,
  CreditCard,
  Globe,
  Layers,
  Flag,
  Settings,
  UserCheck,
  Activity,
  LogOut,
  Lock,
  Search,
  Check,
  X,
  Trash2,
  AlertTriangle,
} from 'lucide-react';

export const AdminPanel: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState<boolean>(isAdminLoggedIn());
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [loginError, setLoginError] = useState<boolean>(false);

  const [activeTab, setActiveTab] = useState<'dashboard' | 'cards' | 'reports' | 'users' | 'templates' | 'logs' | 'settings'>('dashboard');
  const [cards, setCards] = useState<CardModel[]>([]);
  const [reports, setReports] = useState<ReportItem[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const [adminUsers, setAdminUsers] = useState<AdminUser[]>([
    {
      id: 'usr-1',
      username: 'superadmin',
      email: 'admin@myid.app',
      role: 'Super Admin',
      status: 'active',
      createdAt: '2026-01-01T00:00:00.000Z',
    },
  ]);

  useEffect(() => {
    if (loggedIn) {
      setCards(getAllCards());
      setReports(getReports());
    }
  }, [loggedIn]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginAdmin(passwordInput)) {
      setLoggedIn(true);
      setLoginError(false);
      setPasswordInput('');
    } else {
      setLoginError(true);
    }
  };

  const handleLogout = () => {
    logoutAdmin();
    setLoggedIn(false);
  };

  const handleDeletePublicCard = (id: string, name: string) => {
    if (confirm(`Hapus kartu public "${name}" secara permanen?`)) {
      deleteCard(id);
      setCards(getAllCards());
    }
  };

  const handleDismissReport = (id: string) => {
    updateReportStatus(id, 'dismissed');
    setReports(getReports());
  };

  if (!loggedIn) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <form
          onSubmit={handleLogin}
          className="bg-slate-900 border border-slate-800 rounded-3xl p-8 max-w-md w-full shadow-2xl space-y-5"
        >
          <div className="w-12 h-12 rounded-2xl bg-blue-600/20 text-blue-400 flex items-center justify-center mx-auto">
            <Shield className="w-6 h-6" />
          </div>

          <div className="text-center space-y-1">
            <h2 className="text-xl font-bold text-white">Admin Panel MYID</h2>
            <p className="text-xs text-slate-400">Masukan kata sandi admin untuk masuk ke dashboard.</p>
          </div>

          {loginError && (
            <div className="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs rounded-xl text-center">
              Password salah! Coba password demo: <strong>admin123</strong>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Password Admin</label>
            <input
              type="password"
              placeholder="••••••••"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs shadow-lg shadow-blue-600/20 transition"
          >
            Masuk ke Admin Dashboard
          </button>
        </form>
      </div>
    );
  }

  // Calculate metrics
  const totalCards = cards.length;
  const publicCards = cards.filter((c) => c.isPublic).length;
  const privateCards = totalCards - publicCards;
  const pendingReports = reports.filter((r) => r.status === 'pending').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Admin Top Header */}
      <div className="flex items-center justify-between bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-xl">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-bold">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-white">MYID Admin Control Center</h1>
            <p className="text-xs text-slate-400">Manajemen kartu public, moderasi laporan, & sistem.</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-rose-400 border border-slate-700 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition"
        >
          <LogOut className="w-4 h-4" />
          <span>Keluar Admin</span>
        </button>
      </div>

      {/* Admin Navigation Tabs */}
      <div className="flex items-center space-x-1 bg-slate-900 border border-slate-800 p-1.5 rounded-2xl overflow-x-auto text-xs font-semibold">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`px-4 py-2 rounded-xl transition flex items-center space-x-1.5 ${
            activeTab === 'dashboard' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
          }`}
        >
          <LayoutDashboard className="w-4 h-4" />
          <span>Dashboard</span>
        </button>
        <button
          onClick={() => setActiveTab('cards')}
          className={`px-4 py-2 rounded-xl transition flex items-center space-x-1.5 ${
            activeTab === 'cards' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
          }`}
        >
          <CreditCard className="w-4 h-4" />
          <span>Cards ({totalCards})</span>
        </button>
        <button
          onClick={() => setActiveTab('reports')}
          className={`px-4 py-2 rounded-xl transition flex items-center space-x-1.5 ${
            activeTab === 'reports' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Flag className="w-4 h-4 text-rose-400" />
          <span>Reports ({pendingReports})</span>
        </button>
        <button
          onClick={() => setActiveTab('users')}
          className={`px-4 py-2 rounded-xl transition flex items-center space-x-1.5 ${
            activeTab === 'users' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Admin Users</span>
        </button>
        <button
          onClick={() => setActiveTab('logs')}
          className={`px-4 py-2 rounded-xl transition flex items-center space-x-1.5 ${
            activeTab === 'logs' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Activity className="w-4 h-4" />
          <span>Logs</span>
        </button>
      </div>

      {/* 1. DASHBOARD METRICS */}
      {activeTab === 'dashboard' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-1">
              <span className="text-xs font-semibold text-slate-400 uppercase">Total Cards</span>
              <p className="text-3xl font-extrabold text-white">{totalCards}</p>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-1">
              <span className="text-xs font-semibold text-blue-400 uppercase">Public Profiles</span>
              <p className="text-3xl font-extrabold text-white">{publicCards}</p>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-1">
              <span className="text-xs font-semibold text-emerald-400 uppercase">Private Cards</span>
              <p className="text-3xl font-extrabold text-white">{privateCards}</p>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-1">
              <span className="text-xs font-semibold text-rose-400 uppercase">Pending Reports</span>
              <p className="text-3xl font-extrabold text-white">{pendingReports}</p>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
            <h3 className="font-bold text-white text-base">Overview Sistem</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Platform berjalan menggunakan arsitektur serverless Netlify Functions dengan local storage engine. Tidak mengumpulkan data pribadi pengguna secara agresif.
            </p>
          </div>
        </div>
      )}

      {/* 2. PUBLIC CARD MODERATION */}
      {activeTab === 'cards' && (
        <div className="space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
            <h3 className="font-bold text-white text-base">Manajemen Kartu Public & Private</h3>
            
            <div className="space-y-2">
              {cards.map((c) => (
                <div key={c.id} className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex items-center justify-between text-xs">
                  <div>
                    <h4 className="font-bold text-white">{c.personal.fullName}</h4>
                    <p className="text-slate-400 text-[11px]">Slug: /p/{c.slug} • ID: {c.id}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${c.isPublic ? 'bg-blue-500/20 text-blue-400' : 'bg-slate-800 text-slate-400'}`}>
                      {c.isPublic ? 'PUBLIC' : 'PRIVATE'}
                    </span>
                    <button
                      onClick={() => handleDeletePublicCard(c.id, c.personal.fullName)}
                      className="p-1.5 bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 rounded-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 3. REPORTS MODERATION */}
      {activeTab === 'reports' && (
        <div className="space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
            <h3 className="font-bold text-white text-base">Daftar Laporan Penyalahgunaan</h3>

            {reports.length === 0 ? (
              <p className="text-xs text-slate-500 italic py-4">Belum ada laporan penyalahgunaan dari pengunjung.</p>
            ) : (
              <div className="space-y-2">
                {reports.map((r) => (
                  <div key={r.id} className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-xs space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white">Target: /p/{r.cardSlug}</span>
                      <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-400 text-[10px] uppercase font-bold">
                        {r.reason}
                      </span>
                    </div>
                    <p className="text-slate-300">{r.details || 'Tanpa keterangan tambahan.'}</p>
                    <div className="pt-2 border-t border-slate-800 flex items-center justify-end space-x-2">
                      <button
                        onClick={() => handleDismissReport(r.id)}
                        className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg"
                      >
                        Abaikan Laporan
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* 4. ADMIN USERS */}
      {activeTab === 'users' && (
        <div className="space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
            <h3 className="font-bold text-white text-base">Daftar Pengelola (Admin Users)</h3>
            <div className="space-y-2 text-xs">
              {adminUsers.map((u) => (
                <div key={u.id} className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex items-center justify-between">
                  <div>
                    <p className="font-bold text-white">{u.username} ({u.role})</p>
                    <p className="text-slate-400 text-[11px]">{u.email}</p>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase">
                    {u.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 5. LOGS */}
      {activeTab === 'logs' && (
        <div className="space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
            <h3 className="font-bold text-white text-base">Activity Logs</h3>
            <div className="space-y-2 text-xs">
              {getActivityLogs().map((l) => (
                <div key={l.id} className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="font-semibold text-slate-200">{l.action}</span>
                    <p className="text-slate-400 text-[11px]">{l.details}</p>
                  </div>
                  <span className="text-[10px] text-slate-500">{new Date(l.timestamp).toLocaleTimeString()}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
