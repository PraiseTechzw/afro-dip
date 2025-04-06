export interface TaxonomyLevel {
  id: string;
  name: string;
  description: string;
  characteristics: string[];
  examples: string[];
}

export const taxonomyLevels: TaxonomyLevel[] = [
  {
    id: '1',
    name: 'Order Diptera',
    description: 'The order Diptera includes all true flies, characterized by having a single pair of wings. The second pair of wings is reduced to small balancing organs called halteres.',
    characteristics: [
      'Single pair of functional wings',
      'Halteres for balance',
      'Complete metamorphosis',
      'Sucking or piercing mouthparts'
    ],
    examples: [
      'House flies',
      'Mosquitoes',
      'Fruit flies',
      'Horse flies'
    ]
  },
  {
    id: '2',
    name: 'Suborder Nematocera',
    description: 'The Nematocera are characterized by their long, many-segmented antennae and slender bodies. They are typically small to medium-sized flies.',
    characteristics: [
      'Long, many-segmented antennae',
      'Slender bodies',
      'Long legs',
      'Delicate wings'
    ],
    examples: [
      'Mosquitoes',
      'Crane flies',
      'Midges',
      'Fungus gnats'
    ]
  },
  {
    id: '3',
    name: 'Suborder Brachycera',
    description: 'The Brachycera have shorter antennae and more robust bodies. They are generally larger and more active than Nematocera.',
    characteristics: [
      'Short antennae',
      'Robust bodies',
      'Strong flight muscles',
      'Reduced wing venation'
    ],
    examples: [
      'Horse flies',
      'Robber flies',
      'Bee flies',
      'Stiletto flies'
    ]
  },
  {
    id: '4',
    name: 'Infraorder Muscomorpha',
    description: 'The Muscomorpha are the most advanced flies, including many common species. They have specialized mouthparts and complex behaviors.',
    characteristics: [
      'Sponging mouthparts',
      'Three-segmented antennae',
      'Larval head reduced',
      'Pupation in puparium'
    ],
    examples: [
      'House flies',
      'Blow flies',
      'Fruit flies',
      'Tsetse flies'
    ]
  }
]; 