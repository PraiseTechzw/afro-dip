export interface FlySpecies {
  id: string;
  scientificName: string;
  commonName: string;
  family: string;
  description: string;
  habitat: string;
  distribution: string;
  imageUrl: string;
}

export const flySpecies: FlySpecies[] = [
  {
    id: '1',
    scientificName: 'Musca domestica',
    commonName: 'House Fly',
    family: 'Muscidae',
    description: 'The common housefly is a medium-sized fly with a gray thorax and abdomen. It has four dark stripes on the thorax and red compound eyes.',
    habitat: 'Urban and rural areas, particularly around human habitation',
    distribution: 'Widespread throughout Zimbabwe',
    imageUrl: 'https://example.com/house-fly.jpg',
  },
  {
    id: '2',
    scientificName: 'Glossina morsitans',
    commonName: 'Tsetse Fly',
    family: 'Glossinidae',
    description: 'A large, brown fly that feeds on the blood of vertebrates. Known for transmitting sleeping sickness.',
    habitat: 'Woodlands and savannas',
    distribution: 'Northern and eastern regions of Zimbabwe',
    imageUrl: 'https://example.com/tsetse-fly.jpg',
  },
  {
    id: '3',
    scientificName: 'Stomoxys calcitrans',
    commonName: 'Stable Fly',
    family: 'Muscidae',
    description: 'Similar in appearance to the house fly but with a pointed proboscis. Known for biting livestock and humans.',
    habitat: 'Agricultural areas, particularly around livestock',
    distribution: 'Throughout Zimbabwe',
    imageUrl: 'https://example.com/stable-fly.jpg',
  },
  {
    id: '4',
    scientificName: 'Chrysops silaceus',
    commonName: 'Deer Fly',
    family: 'Tabanidae',
    description: 'A medium-sized fly with patterned wings and large eyes. Known for their painful bites.',
    habitat: 'Wooded areas near water',
    distribution: 'Eastern and northern Zimbabwe',
    imageUrl: 'https://example.com/deer-fly.jpg',
  },
  {
    id: '5',
    scientificName: 'Haematopota pluvialis',
    commonName: 'Cleg Fly',
    family: 'Tabanidae',
    description: 'A dark-colored fly with mottled wings. Known for their persistent biting behavior.',
    habitat: 'Grasslands and agricultural areas',
    distribution: 'Throughout Zimbabwe',
    imageUrl: 'https://example.com/cleg-fly.jpg',
  },
  {
    id: '6',
    scientificName: 'Calliphora vicina',
    commonName: 'Blue Bottle Fly',
    family: 'Calliphoridae',
    description: 'A metallic blue fly with a loud buzzing sound. Important in forensic entomology.',
    habitat: 'Urban and rural areas',
    distribution: 'Widespread throughout Zimbabwe',
    imageUrl: 'https://example.com/blue-bottle-fly.jpg',
  },
  {
    id: '7',
    scientificName: 'Lucilia sericata',
    commonName: 'Green Bottle Fly',
    family: 'Calliphoridae',
    description: 'A metallic green fly with a distinctive appearance. Used in maggot therapy.',
    habitat: 'Urban and rural areas',
    distribution: 'Throughout Zimbabwe',
    imageUrl: 'https://example.com/green-bottle-fly.jpg',
  },
  {
    id: '8',
    scientificName: 'Drosophila melanogaster',
    commonName: 'Fruit Fly',
    family: 'Drosophilidae',
    description: 'A small fly with red eyes. Important model organism in genetics research.',
    habitat: 'Areas with fermenting fruit',
    distribution: 'Throughout Zimbabwe',
    imageUrl: 'https://example.com/fruit-fly.jpg',
  },
  {
    id: '9',
    scientificName: 'Tipula paludosa',
    commonName: 'Crane Fly',
    family: 'Tipulidae',
    description: 'A large, delicate fly with long legs. Often mistaken for giant mosquitoes.',
    habitat: 'Moist areas and grasslands',
    distribution: 'Throughout Zimbabwe',
    imageUrl: 'https://example.com/crane-fly.jpg',
  },
  {
    id: '10',
    scientificName: 'Simulium damnosum',
    commonName: 'Black Fly',
    family: 'Simuliidae',
    description: 'A small, dark fly known for its painful bites. Can transmit river blindness.',
    habitat: 'Areas near fast-flowing rivers',
    distribution: 'Northern and eastern Zimbabwe',
    imageUrl: 'https://example.com/black-fly.jpg',
  }
]; 