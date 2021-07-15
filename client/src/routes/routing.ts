import { getModel } from '../model/model';

export const navigateTo = (path: string) => {
    try {
        history.pushState(getModel(), '', path);
    }
    catch(e) {
        // Calling history.pushState may fail if the origin is null
        // but this error shouldn't interrupt any interaction, so we
        // will ignore it
   }
};

// history.
