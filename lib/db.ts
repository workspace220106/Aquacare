import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const DIRECTIVES_PATH = path.join(DATA_DIR, 'directives.json');
const LOGS_PATH = path.join(DATA_DIR, 'incident-logs.json');

// Initial defaults
const DEFAULT_DIRECTIVES = {
  actionMatrix: [
    {
      id: "ACT-01",
      title: "POU Filtration Optimization",
      description: "Deploy sub-micron filtration systems at point-of-use for residential mitigation of industrial heavy metal runoff.",
      icon: "filter_alt",
      status: "ACTIVE",
      statusColor: "bg-tertiary-fixed text-on-tertiary-fixed",
      metrics: ["Efficacy: 98.4%", "Cost: Low"]
    },
    {
      id: "ACT-02",
      title: "Contaminant Baselining",
      description: "Mandatory bi-weekly testing protocol utilizing provided spectrophotometric assay kits for municipal tap sources.",
      icon: "science",
      status: "CRITICAL",
      statusColor: "bg-secondary-fixed text-on-secondary-fixed",
      metrics: ["Kit ID: TX-892"]
    },
    {
      id: "ACT-03",
      title: "Microplastic Intake Minimization",
      description: "Implement reverse osmosis layering in secondary holding tanks. Awaiting regional supply chain validation before escalating to active directive status.",
      icon: "water_damage",
      status: "MONITORING",
      statusColor: "bg-surface-dim text-on-surface border border-outline-variant",
      isWide: true
    }
  ],
  systemicDirectives: [
    {
      id: "DIR-2024-A1",
      title: "Agricultural Runoff Phosphorus Cap Implementation",
      status: "Enforced",
      statusDot: "bg-secondary",
      enforcement: "Q2 2024"
    },
    {
      id: "DIR-2024-B4",
      title: "Municipal Infrastructure Modernization Mandate",
      status: "Drafting",
      statusDot: "bg-primary-fixed-dim",
      enforcement: "TBD"
    },
    {
      id: "DIR-2023-F9",
      title: "Industrial Effluent Thermal Regulation",
      status: "Auditing",
      statusDot: "bg-outline",
      enforcement: "Q4 2023"
    }
  ]
};

// Global in-memory fallback for read-only systems like Vercel
const globalForDb = global as any;
if (!globalForDb._directives) {
  globalForDb._directives = JSON.parse(JSON.stringify(DEFAULT_DIRECTIVES));
}

const DEFAULT_LOGS: any[] = [];

if (!globalForDb._incidentLogs) {
  globalForDb._incidentLogs = [];
}

// Ensure data directory exists
function ensureDataDir() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
  } catch (e) {
    // Read-only filesystem (Vercel)
  }
}

export function getDirectives() {
  ensureDataDir();
  try {
    if (!fs.existsSync(DIRECTIVES_PATH)) {
      try {
        fs.writeFileSync(DIRECTIVES_PATH, JSON.stringify(DEFAULT_DIRECTIVES, null, 2), 'utf-8');
      } catch (e) {
        // Read-only filesystem
      }
      return globalForDb._directives;
    }
    const raw = fs.readFileSync(DIRECTIVES_PATH, 'utf-8');
    const parsed = JSON.parse(raw);
    globalForDb._directives = parsed;
    return parsed;
  } catch (error) {
    return globalForDb._directives;
  }
}

export function saveDirective(directive: { title: string; status: string; enforcement: string }) {
  ensureDataDir();
  const db = getDirectives();
  const id = `DIR-${new Date().getFullYear()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
  
  let statusDot = 'bg-outline';
  if (directive.status.toLowerCase() === 'enforced') statusDot = 'bg-secondary';
  else if (directive.status.toLowerCase() === 'drafting') statusDot = 'bg-primary-fixed-dim';
  else if (directive.status.toLowerCase() === 'auditing') statusDot = 'bg-outline';

  const newDirective = {
    id,
    title: directive.title,
    status: directive.status,
    statusDot,
    enforcement: directive.enforcement || 'TBD'
  };

  db.systemicDirectives.push(newDirective);
  globalForDb._directives = db; // Sync in-memory

  try {
    fs.writeFileSync(DIRECTIVES_PATH, JSON.stringify(db, null, 2), 'utf-8');
  } catch (error) {
    console.warn('FS write failed, fell back to in-memory storage (this is normal on Vercel EROFS):', error);
  }

  return newDirective;
}

export function getIncidentLogs() {
  ensureDataDir();
  try {
    if (!fs.existsSync(LOGS_PATH)) {
      try {
        fs.writeFileSync(LOGS_PATH, JSON.stringify(DEFAULT_LOGS, null, 2), 'utf-8');
      } catch (e) {
        // Read-only filesystem
      }
      return globalForDb._incidentLogs;
    }
    const raw = fs.readFileSync(LOGS_PATH, 'utf-8');
    const parsed = JSON.parse(raw);
    globalForDb._incidentLogs = parsed;
    return parsed;
  } catch (error) {
    return globalForDb._incidentLogs;
  }
}

export function saveIncidentLog(log: { vector: string; coordinates: string; severity: string; notes: string }) {
  ensureDataDir();
  const logs = getIncidentLogs();
  const id = `LOG-${Date.now()}`;
  const newLog = {
    id,
    vector: log.vector,
    coordinates: log.coordinates,
    severity: log.severity.toUpperCase(),
    notes: log.notes,
    timestamp: new Date().toISOString()
  };
  logs.push(newLog);
  globalForDb._incidentLogs = logs; // Sync in-memory

  try {
    fs.writeFileSync(LOGS_PATH, JSON.stringify(logs, null, 2), 'utf-8');
  } catch (error) {
    console.warn('FS write failed, fell back to in-memory storage (this is normal on Vercel EROFS):', error);
  }

  return newLog;
}
