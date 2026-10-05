// "Skip the tour" sections: one per location, composed from shared parts.
import { locations } from '../data/content.js';
import { sectionShell } from './helpers.js';
import {
  welcomeCard, dinerMenu, makesGrid, roomKeyRack, ledger, shelf, socialNotes, meetingFlyer, contactForm,
} from './parts.js';

const renderers = {
  gazebo: welcomeCard,
  lukes: () => dinerMenu(),
  westons: makesGrid,
  dragonfly: roomKeyRack,
  dooses: ledger,
  bookstore: shelf,
  pattys: () => `
    <div class="corkboard">
      <div class="corkboard__notes">${socialNotes()}${meetingFlyer()}</div>
      ${contactForm()}
    </div>`,
};

/** Render a location's full section (header + body) by id. */
export const renderSection = (id) => sectionShell(locations.find((l) => l.id === id), renderers[id]());
