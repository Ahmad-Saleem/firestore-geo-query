  import g from "ngeohash";

  export const geoHashingBoundary = (lat, lng, d) => {

    let bits = 40;
    switch(d){
        case 1: bits = 40; break;
        case 2: bits = 38; break;
        case 3: bits = 36; break;
        case 4: bits = 34; break;

        case 5: bits = 32; break;
        case 6: bits = 30; break;
        case 7: bits = 28; break;
        case 8: bits = 26; break;

        case 10: bits = 24; break;
        case 15: bits = 22; break;
        case 20: bits = 21; break;

        case 25: bits = 18; break;
        case 30: bits = 15; break;
        case 40: bits = 13; break;
        case 50: bits = 10; break;
        case 100: bits = 8; break;
        case 150: bits = 5; break;
        case 500: bits = 3; break;
        case 1000: bits = 2; break;

        default: bits = 40;
    }

    const h = g.encode_int(lat,lng, bits);
    const startDown = g.neighbor_int(h, [-1, -1], bits);
    const endDown = g.neighbor_int(h, [0, 0], bits);

    const startAbove = g.neighbor_int(h, [0, 0], bits);
    const endAbove = g.neighbor_int(h, [1, 1], bits);

    return [startDown, startAbove, endDown, endAbove];
}

export const geoHashingQuery = (firestore, collection, bbox, d) => {
     const ref = firestore.collection(collection);
     return ref.where(`g${d}`, ">=", bbox[0]).
                where(`g${d}`, ">=", bbox[1]).
                where(`g${d}`, "<=", bbox[2]).
                where(`g${d}`, "<=", bbox[3]);
}

export const nearbyLocationsQuery = (lat, lng, radius=1, firestore, collectionName) => {
    const bbox = geoHashingBoundary(lat, lng, radius);
    return  geoHashingQuery(firestore, collectionName, bbox, radius); 
};
// not implemented ..
export insertGeohasingQuery = () => {

}