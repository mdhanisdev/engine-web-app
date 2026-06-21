/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Product, Testimonial } from './types';

export const BRANDS = [
  { name: 'SKF', logoIcon: 'circle-dot', description: 'Swedish bearings and seals specialist' },
  { name: 'MAHLE', logoIcon: 'cog', description: 'German engine components giant' },
  { name: 'ZF', logoIcon: 'settings-2', description: 'Premium driveline and chassis technology' },
  { name: 'LUK', logoIcon: 'disc', description: 'Clutch systems leader under Schaeffler' },
  { name: 'VALEO', logoIcon: 'gauge', description: 'Global transmission and thermal systems' },
  { name: 'INA', logoIcon: 'settings-2', description: 'Precision engine timing products' },
  { name: 'BOSCH', logoIcon: 'fuel', description: 'State-of-the-art injection and sensors' },
  { name: 'Renault', logoIcon: 'wrench', description: 'Original equipment parts for French platforms' }
];

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Timing Chain Kit EF7 / TU5',
    category: 'timing',
    brand: 'INA',
    partNumber: 'TC-EF7-094X',
    engineCode: ['EF7', 'TU5', 'TU5JP4'],
    priceIRT: 4850000,
    imageType: 'cog',
    description: 'Complete high-end timing kit including steel-reinforced chains, chain guides, dynamic tensioner, and oil seals.',
    longDescription: 'Engineered specifically for the high-revving EF7 and TU5 engines, this INA Timing Chain Kit offers peerless fatigue resistance. Crafted with hardened chromium-plated pins and optimized link-plate geometries, it minimizes friction loss and chain elongation under extreme operating thermal cycles.',
    specs: {
      'Material': 'Hardened Alloy Steel',
      'Chain Links': '134 Link Endless Chain',
      'Tensioner Type': 'Hydraulic Automatic',
      'Origin': 'Germany',
      'Warranty': '18 Months / 50,000 KM'
    },
    stockStatus: 'in-stock',
    savePercentage: 15,
    isNew: false
  },
  {
    id: 'p2',
    name: 'Crankshaft Bearing Set EC5 Standard',
    category: 'bearings',
    brand: 'MAHLE',
    partNumber: 'CB-EC5-STD',
    engineCode: ['EC5', 'TU5', 'TU5JP4'],
    priceIRT: 3200000,
    imageType: 'circle-dot',
    description: 'High-load standard-size crankshaft main and rod bearings featuring MAHLE multilayer technology.',
    longDescription: 'MAHLE crankshaft bearings are renowned for their high fatigue strength and load capacity. This standard journal size pack incorporates sputter coating on the hot-running high-pressure face to prevent fatigue under continuous thermal strain characteristic of Peugeot-derived EC5 engines.',
    specs: {
      'Sizing': 'Standard (STD)',
      'Plating Material': 'Sputtered Tri-metal (Lead-free)',
      'Set Count': '10-Piece journals plus thrust washers',
      'Standard Clearance': '0.024mm - 0.048mm',
      'Origin': 'Austria'
    },
    stockStatus: 'in-stock',
    featured: true
  },
  {
    id: 'p3',
    name: 'Full Cylinder Head Gasket Set XU7 Plus',
    category: 'gaskets',
    brand: 'MAHLE',
    partNumber: 'HG-XU7-18P',
    engineCode: ['XU7', 'XU7JP4', 'XU7 Plus'],
    priceIRT: 2740000,
    imageType: 'layers',
    description: 'Premium Multi-Layer Steel (MLS) head gasket kit complete with valve stem seals and intake gaskets.',
    longDescription: 'Stop persistent cylinder block leakage on high-temperature XU7 platforms. This pack contains our Multi-Layer Head Gasket featuring integrated elastomer beads designed to seal imperfectly surfaced engine blocks without losing clamp load.',
    specs: {
      'Gasket Style': 'MLS (Multi-Layer Steel)',
      'Thickness': '1.45mm',
      'Stem Seal Count': '8-Piece High-Temp Viton',
      'Max Prep Pressure': '145 Bar Peak',
      'Origin': 'Germany'
    },
    stockStatus: 'in-stock',
    isNew: true
  },
  {
    id: 'p4',
    name: 'High Pressure Oil Pump Assembly K4M',
    category: 'fuel',
    brand: 'Renault',
    partNumber: 'OP-K4M-8200',
    engineCode: ['K4M', 'F4R'],
    priceIRT: 5980000,
    imageType: 'gauge',
    description: 'Genuine high-delivery gear engine oil pump assembly to sustain critical upper valve lubrication.',
    longDescription: 'Optimized replacement oil pump for Renault L90/Sandero K4M engines. Delivers persistent oil flow across a comprehensive RPM spectrum, ensuring that hydraulic tappets maintain adequate oil pressure even at hot idle configurations.',
    specs: {
      'Delivery Speed': '18.4 Litres/min @ 3000 RPM',
      'Relief Setting': '4.2 Bar Pre-loaded',
      'Housing Material': 'Die-cast High-density Aluminum',
      'Compatible Models': 'Tondar 90, Sandero, Megane 1.6',
      'Origin': 'France'
    },
    stockStatus: 'limited',
    savePercentage: 0
  },
  {
    id: 'p5',
    name: 'Clutch Kit Complete AT6 Automatic',
    category: 'clutch',
    brand: 'LUK',
    partNumber: 'CK-AT6-608E',
    engineCode: ['AL4', 'AT6', 'AM6'],
    priceIRT: 7420000,
    imageType: 'settings-2',
    description: 'Precision complete multi-plate clutch kit engineered for electronic AT6 torque transmission.',
    longDescription: 'Underpinning robust power transfers, the LUK AT6 kit features custom self-adjusting steel clutch plates that maintain uniform clamping pressure as friction surfaces wearing down. Eliminates gear shift slips completely.',
    specs: {
      'Clutch Type': 'Multi-plate wet-clutch assembly',
      'Torque Handling': 'Up to 340 Nm peak input',
      'Coating': 'Organic Kevlar-infused composite',
      'Hub Profile': '22T Fine Spline',
      'Origin': 'Germany'
    },
    stockStatus: 'in-stock'
  },
  {
    id: 'p6',
    name: 'CVT Belt & Pulley Set JF015E',
    category: 'gearbox',
    brand: 'ZF',
    partNumber: 'CVT-JF015-BELT',
    engineCode: ['JF015E', 'RE0F11A'],
    priceIRT: 9150000,
    imageType: 'disc',
    description: 'Ultra-tough steel push-belt segment for high continuous ratio transitions in modern automatic CVTs.',
    longDescription: 'Replaces slipping or shuddering automatic belts inside popular JF015E CVT setups. Constructed with 400+ premium high-strength segment elements clamped by heavy-duty multi-loop element bands for extended durability.',
    specs: {
      'Segment Width': '24.2mm',
      'Material Composition': 'Advanced Carbon-Silicon Steel Alloys',
      'Max Speed Ratio': '6.4:1 Range',
      'Fitment': 'Standard automatic CVT replacement',
      'Origin': 'Japan (OEM Sourced)'
    },
    stockStatus: 'in-stock'
  },
  {
    id: 'p7',
    name: 'Synchronizer Ring Set BE3 5-Speed',
    category: 'gearbox',
    brand: 'ZF',
    partNumber: 'SR-BE4-32A',
    engineCode: ['BE3', 'BE4', 'TU5'],
    priceIRT: 1890000,
    imageType: 'git-merge',
    description: 'High-alloy brass 3rd and 4th gear synchronizer blocker ring pack with moly coating friction surfaces.',
    longDescription: 'Engineered to restore buttery-smooth crisp shifting in manual PEUGEOT and SAMAND BE3/BE4 gearboxes. The inner conical friction zone is molybdenum-lined to handle aggressive shifting friction without chipping.',
    specs: {
      'Gear Set': '3rd / 4th Gear Blockers',
      'Material': 'Manganese Brass with Moly coating',
      'Tooth Count': '36 Active spline teeth',
      'Operating Coefficient': '0.12 wet dynamic friction value',
      'Origin': 'Germany'
    },
    stockStatus: 'in-stock',
    savePercentage: 20
  },
  {
    id: 'p8',
    name: 'Solenoid Valve Body DP0 / AL4',
    category: 'gearbox',
    brand: 'VALEO',
    partNumber: 'VB-DP0-AL4',
    engineCode: ['AL4', 'DP0', 'TU5'],
    priceIRT: 12300000,
    imageType: 'component',
    description: 'Remanufactured and dyno-tested automatic hydraulic pressure valve block equipped with BorgWarner solenoids.',
    longDescription: 'The ultimate cure for annoying "Gearbox Fault" errors on French gearboxes. This valve body is pressure calibrated using oil templates at temperatures up to 105 degrees Celsius, matching factory tolerance envelopes perfectly.',
    specs: {
      'Solenoid Spec': 'BorgWarner original specs (2x Modulating, 6x Sequence)',
      'Flow Rate Setup': '10.2 mL peak dynamic offset',
      'Main Calibration': '20 Bar maximum system limit',
      'Oil Requirement': 'Dexron III / Mobil LT71141 only',
      'Origin': 'France'
    },
    stockStatus: 'limited'
  },
  {
    id: 'p9',
    name: 'High-Flow Fuel Injector Set Bosch',
    category: 'fuel',
    brand: 'BOSCH',
    partNumber: 'FI-TU5-0280',
    engineCode: ['TU5', 'TU5JP4', 'EF7'],
    priceIRT: 4120000,
    imageType: 'fuel',
    description: 'Precisely calibrated multi-hole fuel injector nozzle set with high-temperature electrical coil.',
    longDescription: 'Sustains optimal lean-burn properties. Manufactured to exact standards by Bosch, this high-durability fuel injector set maintains a uniform spray cone angle to prevent raw exhaust soot and power drops.',
    specs: {
      'Nozzle Spray Holes': '4-Hole Atomization Nozzle',
      'Flow Rate': '185cc/min at 3.0 Bar pressure',
      'ImpedanceType': 'High Impedance (14.5 Ohms)',
      'O-Rings': 'Fluorocarbon elastomer (Pre-installed)',
      'Origin': 'Germany'
    },
    stockStatus: 'in-stock'
  },
  {
    id: 'p10',
    name: 'Professional Crankshaft Lock Pin Tool',
    category: 'tools',
    brand: 'VALEO',
    partNumber: 'TL-TDC-EF7',
    engineCode: ['EF7', 'TU5', 'TU5JP4', 'XU7'],
    priceIRT: 1100000,
    imageType: 'wrench',
    description: 'Hardened premium steel timing alignment tools to lock camshafts & pistons on TDC during belt changes.',
    longDescription: 'Essential workshop locking pin set to ensure engine safety during critical belt or chain configurations. Precision-cut tooling avoids scoring aluminum pulleys.',
    specs: {
      'Material Grade': 'Heat-treated 45# Structural Carbon Steel',
      'Piston Pin OD': '8.00mm Nominal diameter',
      'Compatibility': 'Peugeot 206/207/405/Pars, Samand, Soren',
      'Finished Surface': 'Black Oxide rust-resistant coating',
      'Origin': 'Italy'
    },
    stockStatus: 'in-stock'
  },
  {
    id: 'p11',
    name: 'Dynamic Water Pump Assembly Renault',
    category: 'engine',
    brand: 'SKF',
    partNumber: 'WP-K4M-8207',
    engineCode: ['K4M', 'XU7'],
    priceIRT: 3670000,
    imageType: 'droplets',
    description: 'High-efficiency cooling water pump with silicon carbide mechanic seal interfaces.',
    longDescription: 'Continuous, leak-free coolant flow is vital for high-temperature engines. SKF pumps utilize engineered polymeric impellers that optimize flow velocities while preventing cavitation damage, keeping your block running at ideal temps.',
    specs: {
      'Impeller Material': 'Cavitation-free glass-reinforced resin',
      'Bearings': 'Double-row high durability angular ball bearings',
      'Max Temperature': '135°C peak continuous',
      'Gasket Packing': 'Oly-silicone high compression washer',
      'Origin': 'Sweden'
    },
    stockStatus: 'in-stock'
  },
  {
    id: 'p12',
    name: 'Precision Valve Stem Seal Set XU7',
    category: 'gaskets',
    brand: 'SKF',
    partNumber: 'VS-XU7-16V',
    engineCode: ['XU7', 'XU7JP4', 'XU7 Plus'],
    priceIRT: 1450000,
    imageType: 'layers',
    description: 'Fluorocarbon elastomer valve stem seals with dual tension garter springs.',
    longDescription: 'Solves oil-burning issues upon cold startups in aging XU7 engines. The premium SKF Viton compound prevents hardening and flexibility loss under continuous chemical oil immersion.',
    specs: {
      'Material Composition': 'FKM / Genuine Viton Rubber',
      'Internal Guide ID': '7.0mm Valve stem sizing',
      'Spring Ring': 'Dual active stainless steel bands',
      'Pack Contains': '8 x intake / exhaust seals',
      'Origin': 'Sweden'
    },
    stockStatus: 'limited'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Reza Mohammadi',
    initials: 'RM',
    role: 'Soren Specialist Garage',
    text: 'Found the exact synchronizer set for a rare gearbox in under a minute. The category structure and search are unlike anything else in this market.',
    rating: 5,
    verified: 'workshop'
  },
  {
    id: 't2',
    name: 'Amir Karimi',
    initials: 'AK',
    role: 'Certified Mechanic',
    text: 'Everyone at OEM Yadak was super helpful. I ordered a complete timing kit and crankshaft bearings — technical specs were exact, packaging was perfect, and the team double-checked compatibility with my engine code before shipping. Fast and reliable.',
    rating: 5,
    verified: 'customer'
  },
  {
    id: 't3',
    name: 'Sara Nazari',
    initials: 'SN',
    role: 'Paya Fleet Management',
    text: 'We order valve bodies and CVT components monthly. Quality is consistent, and the new background-removed product photos make identification effortless.',
    rating: 5,
    verified: 'fleet'
  }
];

export const ENGINE_CODES = ['EF7', 'TU5', 'EC5', 'XU7', 'XU7 Plus', 'K4M', 'AL4', 'DP0', 'JF015E'];
