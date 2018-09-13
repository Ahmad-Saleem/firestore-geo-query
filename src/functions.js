  import g from "ngeohash";

  export const mapDistanceToBitDepth = (d, geoFields) => {
    const bitArr = geoFields.filter(field => field.fieldValue === d);
    if(bitArr.length > 0){
        return bitArr[0].bitDepth;
    }
    return 20;
}

  export const geoHashingBoundary = (lat, lng, bits) => {

    const h = g.encode_int(lat,lng, bits);
    const startDown = g.neighbor_int(h, [-1, -1], bits);
    const endDown = g.neighbor_int(h, [0, 0], bits);

    const startAbove = g.neighbor_int(h, [0, 0], bits);
    const endAbove = g.neighbor_int(h, [1, 1], bits);

    return [startDown, startAbove, endDown, endAbove];
}


export const createGeoHashingField = (label, lat, lng, distance, bitDepth) => {
    const fieldName = `${label}${distance}`;
    return {
        name: fieldName,
        value: g.encode_int(Number(lat), Number(lng), bitDepth) // ~1000 km radius
    };
}