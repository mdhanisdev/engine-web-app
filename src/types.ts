/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Product {
  id: string;
  name: string;
  category: 'engine' | 'gearbox' | 'timing' | 'bearings' | 'clutch' | 'gaskets' | 'fuel' | 'tools';
  brand: 'SKF' | 'MAHLE' | 'ZF' | 'LUK' | 'VALEO' | 'INA' | 'BOSCH' | 'Renault';
  partNumber: string;
  engineCode: string[]; // compatible engines
  priceIRT: number; // Price in Iranian Toman (IRT)
  imageType: 'cog' | 'circle-dot' | 'layers' | 'gauge' | 'settings-2' | 'disc' | 'git-merge' | 'component' | 'wrench' | 'droplets' | 'fuel';
  description: string;
  longDescription: string;
  specs: {
    [key: string]: string;
  };
  stockStatus: 'in-stock' | 'limited' | 'out-of-stock';
  savePercentage?: number;
  featured?: boolean;
  isNew?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface SearchFilters {
  query: string;
  category: string;
  brand: string;
  compatibility: string;
  sortBy: 'relevance' | 'price-asc' | 'price-desc' | 'discount';
}

export interface PartRequest {
  fullName: string;
  email: string;
  phone: string;
  engineModel: string;
  vinCode: string;
  partDescription: string;
  priority: 'low' | 'medium' | 'high';
  notes?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  initials: string;
  role: string;
  text: string;
  rating: number;
  verified: 'workshop' | 'customer' | 'fleet';
}
