export interface FlySpecies {
  id: string;
  scientificName: string;
  commonName: string;
  family: string;
  distribution: string;
  description: string;
  imageUrl: string;
  similarSpecies: FlySpecies[];
  characteristics: string[];
  habitat: string;
  behavior: string;
  size: string;
  lifespan: string;
  temperature: string;
  humidity: string;
}

export const flySpecies: FlySpecies[] = [
  {
    id: '1',
    scientificName: 'Musca domestica',
    commonName: 'House Fly',
    family: 'Muscidae',
    distribution: 'Worldwide',
    description: 'The house fly is a common fly species found in human habitats. It has a gray thorax with four dark stripes and a slightly hairy body.',
    imageUrl: 'https://example.com/house-fly.jpg',
    similarSpecies: [
      {
        id: '2',
        scientificName: 'Musca autumnalis',
        commonName: 'Face Fly',
        family: 'Muscidae',
        distribution: 'North America, Europe',
        description: '',
        imageUrl: 'https://example.com/face-fly.jpg',
        similarSpecies: [],
        characteristics: [],
        habitat: '',
        behavior: '',
        size: '',
        lifespan: '',
        temperature: '',
        humidity: '',
      }
    ],
    characteristics: [
      'Gray thorax with four dark stripes',
      'Slightly hairy body',
      'Compound eyes with thousands of lenses',
      'Sponging mouthparts for liquid feeding'
    ],
    habitat: 'Human dwellings, garbage, animal waste',
    behavior: 'Diurnal, attracted to food and waste',
    size: '5-8mm',
    lifespan: '15-30 days',
    temperature: '20-30°C',
    humidity: '60-80%'
  },
  {
    id: '2',
    scientificName: 'Glossina morsitans',
    commonName: 'Tsetse Fly',
    family: 'Glossinidae',
    distribution: 'Sub-Saharan Africa',
    description: 'The tsetse fly is a large, biting fly that feeds on the blood of vertebrates. It is known for transmitting sleeping sickness.',
    imageUrl: 'https://example.com/tsetse-fly.jpg',
    similarSpecies: [
      {
        id: '3',
        scientificName: 'Glossina palpalis',
        commonName: 'Riverine Tsetse',
        family: 'Glossinidae',
        distribution: 'West and Central Africa',
        description: '',
        imageUrl: 'https://example.com/riverine-tsetse.jpg',
        similarSpecies: [],
        characteristics: [],
        habitat: '',
        behavior: '',
        size: '',
        lifespan: '',
        temperature: '',
        humidity: '',
      }
    ],
    characteristics: [
      'Large size (6-14mm)',
      'Long proboscis for blood feeding',
      'Wings folded scissor-like at rest',
      'Distinctive wing venation pattern'
    ],
    habitat: 'Woodlands, savannas, riverine forests',
    behavior: 'Diurnal, feeds on blood',
    size: '6-14mm',
    lifespan: '1-3 months',
    temperature: '25-30°C',
    humidity: '70-90%'
  },
  {
    id: '3',
    scientificName: 'Drosophila melanogaster',
    commonName: 'Fruit Fly',
    family: 'Drosophilidae',
    distribution: 'Worldwide',
    description: 'A small fly species commonly used in genetic research. It has red eyes and a tan body with black stripes on the abdomen.',
    imageUrl: 'https://example.com/fruit-fly.jpg',
    similarSpecies: [
      {
        id: '4',
        scientificName: 'Drosophila simulans',
        commonName: 'Simulated Fruit Fly',
        family: 'Drosophilidae',
        distribution: 'Worldwide',
        description: '',
        imageUrl: 'https://example.com/simulated-fruit-fly.jpg',
        similarSpecies: [],
        characteristics: [],
        habitat: '',
        behavior: '',
        size: '',
        lifespan: '',
        temperature: '',
        humidity: '',
      }
    ],
    characteristics: [
      'Red eyes',
      'Tan body with black stripes',
      'Small size (2-4mm)',
      'Rapid reproduction cycle'
    ],
    habitat: 'Fruit, vegetables, fermenting materials',
    behavior: 'Attracted to ripe and fermenting fruits',
    size: '2-4mm',
    lifespan: '40-50 days',
    temperature: '20-25°C',
    humidity: '60-70%'
  },
  {
    id: '4',
    scientificName: 'Calliphora vicina',
    commonName: 'Blue Bottle Fly',
    family: 'Calliphoridae',
    distribution: 'Worldwide',
    description: 'A large, metallic blue fly commonly found around garbage and carrion. It plays an important role in forensic entomology.',
    imageUrl: 'https://example.com/blue-bottle-fly.jpg',
    similarSpecies: [
      {
        id: '5',
        scientificName: 'Calliphora vomitoria',
        commonName: 'Blue Blow Fly',
        family: 'Calliphoridae',
        distribution: 'Worldwide',
        description: '',
        imageUrl: 'https://example.com/blue-blow-fly.jpg',
        similarSpecies: [],
        characteristics: [],
        habitat: '',
        behavior: '',
        size: '',
        lifespan: '',
        temperature: '',
        humidity: '',
      }
    ],
    characteristics: [
      'Metallic blue coloration',
      'Large size (10-14mm)',
      'Bristly body',
      'Red eyes'
    ],
    habitat: 'Carrion, garbage, animal waste',
    behavior: 'Attracted to decaying matter',
    size: '10-14mm',
    lifespan: '2-3 weeks',
    temperature: '20-25°C',
    humidity: '50-70%'
  },
  {
    id: '5',
    scientificName: 'Stomoxys calcitrans',
    commonName: 'Stable Fly',
    family: 'Muscidae',
    distribution: 'Worldwide',
    description: 'A blood-feeding fly that resembles the house fly but has a piercing proboscis. It is a pest of livestock and humans.',
    imageUrl: 'https://example.com/stable-fly.jpg',
    similarSpecies: [
      {
        id: '1',
        scientificName: 'Musca domestica',
        commonName: 'House Fly',
        family: 'Muscidae',
        distribution: 'Worldwide',
        description: '',
        imageUrl: 'https://example.com/house-fly.jpg',
        similarSpecies: [],
        characteristics: [],
        habitat: '',
        behavior: '',
        size: '',
        lifespan: '',
        temperature: '',
        humidity: '',
      }
    ],
    characteristics: [
      'Gray with dark stripes',
      'Piercing proboscis',
      'Similar to house fly but with different mouthparts',
      'Painful bite'
    ],
    habitat: 'Stables, farms, coastal areas',
    behavior: 'Blood-feeding, aggressive',
    size: '6-8mm',
    lifespan: '2-3 weeks',
    temperature: '20-30°C',
    humidity: '50-70%'
  },
  {
    id: '6',
    scientificName: 'Lucilia sericata',
    commonName: 'Common Green Bottle Fly',
    family: 'Calliphoridae',
    distribution: 'Worldwide',
    description: 'A metallic green fly commonly found on carrion. It is used in maggot therapy for wound treatment.',
    imageUrl: 'https://example.com/green-bottle-fly.jpg',
    similarSpecies: [
      {
        id: '7',
        scientificName: 'Lucilia cuprina',
        commonName: 'Australian Sheep Blowfly',
        family: 'Calliphoridae',
        distribution: 'Australia, Africa, Asia',
        description: '',
        imageUrl: 'https://example.com/sheep-blowfly.jpg',
        similarSpecies: [],
        characteristics: [],
        habitat: '',
        behavior: '',
        size: '',
        lifespan: '',
        temperature: '',
        humidity: '',
      }
    ],
    characteristics: [
      'Metallic green coloration',
      'Large size (10-14mm)',
      'Bristly body',
      'Red eyes'
    ],
    habitat: 'Carrion, garbage, animal waste',
    behavior: 'Attracted to decaying matter',
    size: '10-14mm',
    lifespan: '2-3 weeks',
    temperature: '20-25°C',
    humidity: '50-70%'
  },
  {
    id: '7',
    scientificName: 'Haematobia irritans',
    commonName: 'Horn Fly',
    family: 'Muscidae',
    distribution: 'Worldwide',
    description: 'A small blood-feeding fly that primarily affects cattle. It is named for its habit of clustering around the horns of cattle.',
    imageUrl: 'https://example.com/horn-fly.jpg',
    similarSpecies: [
      {
        id: '5',
        scientificName: 'Stomoxys calcitrans',
        commonName: 'Stable Fly',
        family: 'Muscidae',
        distribution: 'Worldwide',
        description: '',
        imageUrl: 'https://example.com/stable-fly.jpg',
        similarSpecies: [],
        characteristics: [],
        habitat: '',
        behavior: '',
        size: '',
        lifespan: '',
        temperature: '',
        humidity: '',
      }
    ],
    characteristics: [
      'Small size (3-5mm)',
      'Gray-black coloration',
      'Piercing mouthparts',
      'Clusters on cattle'
    ],
    habitat: 'Cattle pastures, feedlots',
    behavior: 'Blood-feeding, clusters on cattle',
    size: '3-5mm',
    lifespan: '2-3 weeks',
    temperature: '20-30°C',
    humidity: '50-70%'
  },
  {
    id: '8',
    scientificName: 'Chrysomya megacephala',
    commonName: 'Oriental Latrine Fly',
    family: 'Calliphoridae',
    distribution: 'Asia, Pacific Islands',
    description: 'A metallic blue-green fly commonly found in urban areas. It is attracted to feces and decaying organic matter.',
    imageUrl: 'https://example.com/oriental-latrine-fly.jpg',
    similarSpecies: [
      {
        id: '4',
        scientificName: 'Calliphora vicina',
        commonName: 'Blue Bottle Fly',
        family: 'Calliphoridae',
        distribution: 'Worldwide',
        description: '',
        imageUrl: 'https://example.com/blue-bottle-fly.jpg',
        similarSpecies: [],
        characteristics: [],
        habitat: '',
        behavior: '',
        size: '',
        lifespan: '',
        temperature: '',
        humidity: '',
      }
    ],
    characteristics: [
      'Metallic blue-green coloration',
      'Large size (8-12mm)',
      'Red eyes',
      'Bristly body'
    ],
    habitat: 'Urban areas, latrines, garbage',
    behavior: 'Attracted to feces and decaying matter',
    size: '8-12mm',
    lifespan: '2-3 weeks',
    temperature: '25-30°C',
    humidity: '60-80%'
  }
]; 