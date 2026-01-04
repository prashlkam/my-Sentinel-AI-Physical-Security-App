
import { ProcedureCard, EmergencyChecklist, Person } from './types';

export const EVACUATION_PROCEDURES: ProcedureCard[] = [
  {
    id: '1',
    title: 'High-Rise Office Evacuation',
    type: 'office',
    steps: [
      'Stop work immediately.',
      'Check for smoke or heat before opening any door.',
      'Use the nearest stairwell; NEVER use elevators.',
      'Close doors behind you to contain fire.',
      'Proceed to Assembly Point A (South Plaza).'
    ]
  },
  {
    id: '2',
    title: 'Warehouse Protocol',
    type: 'warehouse',
    steps: [
      'Power down heavy machinery if safe.',
      'Leave all bulky personal items.',
      'Assist any floor visitors to exits.',
      'Follow yellow ground lines to nearest exit.',
      'Assemble at the Loading Dock B perimeter.'
    ]
  }
];

export const EMERGENCY_CHECKLISTS: EmergencyChecklist[] = [
  {
    id: 'e1',
    category: 'Fire',
    title: 'Immediate Fire Response',
    dos: [
      'Pull the manual fire alarm.',
      'Alert colleagues verbally while exiting.',
      'Stay low to the floor if there is smoke.',
      'Check doors for heat with the back of your hand.'
    ],
    donts: [
      'Do not go back for personal belongings.',
      'Do not hide in restrooms or storage closets.',
      'Do not use elevators under any circumstances.'
    ]
  },
  {
    id: 'e2',
    category: 'Intruder',
    title: 'Active Intruder Response',
    dos: [
      'Run if there is a safe path.',
      'Hide in a locked room if you cannot run.',
      'Silence your phone completely.',
      'Fight as a last resort only.'
    ],
    donts: [
      'Do not huddle together.',
      'Do not scream or make unnecessary noise.',
      'Do not open the door once locked.'
    ]
  },
  {
    id: 'e3',
    category: 'Storm / Flood',
    title: 'Severe Weather Protocol',
    dos: [
      'Move to higher ground or upper floors immediately.',
      'Disconnect electrical appliances to prevent surges.',
      'Follow all official evacuation orders without delay.',
      'Keep emergency kits and important documents ready.'
    ],
    donts: [
      'Do not walk, swim, or drive through flood waters.',
      'Do not touch electrical equipment if you are wet or standing in water.',
      'Do not stay in low-lying areas or basements during heavy rain.'
    ]
  },
  {
    id: 'e4',
    category: 'Earthquake',
    title: 'Seismic Safety Response',
    dos: [
      'Drop, Cover, and Hold on under a sturdy table or desk.',
      'Stay away from windows, glass, and heavy furniture.',
      'Stay inside until the shaking stops and it is safe to exit.',
      'Expect aftershocks and stay prepared.'
    ],
    donts: [
      'Do not run outside while the ground is shaking.',
      'Do not use elevators; they may get stuck.',
      'Do not stand in doorways; they are not safer than under furniture.'
    ]
  },
  {
    id: 'e5',
    category: 'Terror Attack',
    title: 'Terror Incident Protocol',
    dos: [
      'Run: Escape if there is a safe route.',
      'Hide: If escape is impossible, find a secure location and silence devices.',
      'Tell: Contact emergency services as soon as it is safe to do so.',
      'Stay alert to your surroundings and any secondary threats.'
    ],
    donts: [
      'Do not stop to take photos or videos of the incident.',
      'Do not spread unverified information or rumors.',
      'Do not congregate in large groups after escaping.'
    ]
  },
  {
    id: 'e6',
    category: 'Bomb Threat',
    title: 'Threat Call or Mail Handling',
    dos: [
      'Keep the caller on the line as long as possible (if by phone).',
      'Record the exact wording and characteristics of the threat.',
      'Notify Security or ERT immediately using a landline if possible.',
      'Isolate the area around a suspicious package or letter.'
    ],
    donts: [
      'Do not hang up the phone, even after the caller disconnects.',
      'Do not touch, move, or open any suspicious objects or mail.',
      'Do not use two-way radios or mobile phones near a suspected device.'
    ]
  },
  {
    id: 'e7',
    category: 'Sabotage',
    title: 'Facility Tampering Response',
    dos: [
      'Report any suspicious behavior or unauthorized access immediately.',
      'Document and photograph observed damage or tampering.',
      'Isolate affected systems or areas to prevent further damage.',
      'Wait for official clearance before attempting repairs.'
    ],
    donts: [
      'Do not attempt to fix critical infrastructure without authorization.',
      'Do not ignore "minor" signs of tampering or unusual system errors.',
      'Do not touch evidence that may be needed for investigation.'
    ]
  },
  {
    id: 'e8',
    category: 'Hostage',
    title: 'Hostage Situation Conduct',
    dos: [
      'Remain as calm and patient as possible.',
      'Follow the captor\'s instructions without argument.',
      'Observe everything carefully (number of people, weapons, exits).',
      'Be prepared for a long wait and stay mentally resilient.'
    ],
    donts: [
      'Do not make sudden movements or maintain aggressive eye contact.',
      'Do not try to be a hero or overpower armed captors.',
      'Do not speak unless spoken to or draw unnecessary attention to yourself.'
    ]
  }
];

export const INITIAL_HEADCOUNT: Person[] = [
  { id: 'p1', name: 'John Doe', present: false },
  { id: 'p2', name: 'Jane Smith', present: false },
  { id: 'p3', name: 'Alice Johnson', present: false },
  { id: 'p4', name: 'Bob Williams', present: false },
  { id: 'p5', name: 'Charlie Brown', present: false },
  { id: 'p6', name: 'Diana Prince', present: false }
];
