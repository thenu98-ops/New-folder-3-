import { WavesIcon, CoffeeIcon, ChurchIcon, PenLineIcon } from 'lucide-react';

export const places = [
{ id: 'beach', label: 'Beach', note: 'Sunset and sand', icon: WavesIcon, tile: 'bg-sky-soft', chip: 'bg-white text-sky-deep' },
{ id: 'coffee', label: 'Coffee shop', note: 'Warm cups, long talks', icon: CoffeeIcon, tile: 'bg-peach-soft', chip: 'bg-white text-peach-deep' },
{ id: 'church', label: 'Church', note: 'Somewhere peaceful', icon: ChurchIcon, tile: 'bg-lavender-soft', chip: 'bg-white text-lavender-deep' },
{ id: 'custom', label: 'Somewhere else', note: 'You choose', icon: PenLineIcon, tile: 'bg-blush-soft', chip: 'bg-white text-blush' }];