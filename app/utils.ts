export const filterGallery = (pieces: any[]) => {
    if (pieces) {
        Object.keys(pieces).forEach((k: any) => {
            const p = pieces[k];
            if (
                p.omitFromGallery ||
                p.related
            ) {
                delete pieces[k];
            }
        });
    }
    return pieces;
};