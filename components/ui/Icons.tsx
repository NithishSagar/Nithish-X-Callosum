import type { IconType } from 'react-icons';
import {
  FiActivity,
  FiBarChart2,
  FiCloud,
  FiCode,
  FiCpu,
  FiDatabase,
  FiGitBranch,
  FiLayers,
  FiMonitor,
  FiServer,
  FiTerminal,
  FiTool,
  FiUsers,
  FiZap,
} from 'react-icons/fi';

/**
 * Icon keys are stored as strings in lib/data.ts so the content layer stays
 * free of React imports. This map is the only place that binds a key to a
 * component.
 */
const registry: Record<string, IconType> = {
  // Requirement icons
  depth: FiLayers,
  evaluation: FiBarChart2,
  orchestration: FiGitBranch,
  workloads: FiCpu,
  customer: FiUsers,
  founder: FiZap,
  debugging: FiTerminal,
  // Skill-group icons
  backend: FiServer,
  ml: FiCpu,
  cloud: FiCloud,
  data: FiDatabase,
  frontend: FiMonitor,
  // Generic
  code: FiCode,
  tool: FiTool,
  activity: FiActivity,
};

export function Icon({
  name,
  className = '',
}: {
  name: string;
  className?: string;
}) {
  const Component = registry[name] ?? FiCode;
  return <Component className={className} aria-hidden />;
}
