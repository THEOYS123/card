import { ReportItem } from '../types/card';

const ADMIN_SESSION_KEY = 'myid_admin_session';
const ADMIN_REPORTS_KEY = 'myid_admin_reports';
const ADMIN_SETTINGS_KEY = 'myid_admin_settings';

export interface AdminUser {
  id: string;
  username: string;
  email: string;
  role: 'Super Admin' | 'Admin' | 'Moderator';
  status: 'active' | 'disabled';
  createdAt: string;
}

export interface ActivityLog {
  id: string;
  action: string;
  details: string;
  timestamp: string;
  user: string;
}

export function isAdminLoggedIn(): boolean {
  return localStorage.getItem(ADMIN_SESSION_KEY) === 'true';
}

export function loginAdmin(password: string): boolean {
  // Check default admin pass or custom env
  const secret = 'admin123';
  if (password === secret || password === 'admin') {
    localStorage.setItem(ADMIN_SESSION_KEY, 'true');
    addActivityLog('Admin Login', 'Admin user successfully authenticated');
    return true;
  }
  return false;
}

export function logoutAdmin(): void {
  localStorage.removeItem(ADMIN_SESSION_KEY);
}

export function getReports(): ReportItem[] {
  try {
    const raw = localStorage.getItem(ADMIN_REPORTS_KEY);
    return raw ? JSON.parse(raw) : [
      {
        id: 'rep-1',
        cardSlug: 'rendi-muhammad',
        cardTitle: 'Rendi Muhammad Personal Card',
        reason: 'spam',
        details: 'Contoh laporan spam simulasi',
        createdAt: new Date().toISOString(),
        status: 'pending',
      }
    ];
  } catch (err) {
    return [];
  }
}

export function submitReport(report: Omit<ReportItem, 'id' | 'createdAt' | 'status'>): void {
  const reports = getReports();
  const newItem: ReportItem = {
    ...report,
    id: 'rep_' + Date.now(),
    createdAt: new Date().toISOString(),
    status: 'pending',
  };
  reports.unshift(newItem);
  localStorage.setItem(ADMIN_REPORTS_KEY, JSON.stringify(reports));
  addActivityLog('Public Card Report', `Reported slug: ${report.cardSlug} for ${report.reason}`);
}

export function updateReportStatus(reportId: string, status: 'reviewed' | 'dismissed'): void {
  const reports = getReports();
  const item = reports.find((r) => r.id === reportId);
  if (item) {
    item.status = status;
    localStorage.setItem(ADMIN_REPORTS_KEY, JSON.stringify(reports));
  }
}

export function getActivityLogs(): ActivityLog[] {
  try {
    const raw = localStorage.getItem('myid_activity_logs');
    return raw ? JSON.parse(raw) : [
      {
        id: 'act-1',
        action: 'System Initialized',
        details: 'MYID engine started on client browser',
        timestamp: new Date().toISOString(),
        user: 'System',
      }
    ];
  } catch (err) {
    return [];
  }
}

export function addActivityLog(action: string, details: string): void {
  const logs = getActivityLogs();
  logs.unshift({
    id: 'log_' + Date.now(),
    action,
    details,
    timestamp: new Date().toISOString(),
    user: 'Admin',
  });
  localStorage.setItem('myid_activity_logs', JSON.stringify(logs.slice(0, 100)));
}
