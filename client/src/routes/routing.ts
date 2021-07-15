export const navigateTo = (path: string) => {
    try {
        history.pushState({}, '', path);
    }
    catch(e) {
        // Calling history.pushState may fail if the origin is null
        // but this error shouldn't interrupt any interaction, so we
        // will ignore it
   }
};
