
export enum Tab {
  EVACUATION = 'evacuation',
  EMERGENCY = 'emergency',
  INCIDENT = 'incident',
  AI_ASSISTANT = 'ai_assistant'
}

export interface ProcedureCard {
  id: string;
  title: string;
  steps: string[];
  type: 'office' | 'warehouse' | 'industrial';
}

export interface EmergencyChecklist {
  id: string;
  category: string;
  title: string;
  dos: string[];
  donts: string[];
}

export interface Person {
  id: string;
  name: string;
  present: boolean;
}

export interface Message {
  role: 'user' | 'model';
  text: string;
}
