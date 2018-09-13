import { geoHashingBoundary } from './functions';

// export class GeoField {

//     constructor(lat, lng, bitDepth, distance) {
//         this.lat = lat;
//         this.lng = lng;
//         this.bitDepth = bitDepth;
//         this.distance = distance;
//     }

// }


export default class Geo {

    constructor() {
        this.geoFields = [];
        this.firestore = null;
        this.geoFieldLabel = 'g';
        this.collectionName = "";
    }

    constructor(geoFields, geoFieldLabel, collectionName) {
        this.geoFields = geoFields;
        this.firestore = null;
        this.geoFieldLabel = geoFieldLabel;
        this.collectionName = collectionName;
    }

    setFirestore = (firestorObject) => {
        this.firestore = firestorObject;
    }

    geoHashingQuery = (bbox, distance) => {
        const ref = this.firestore.collection(this.collectionName);
        const fieldName = `${this.geoFieldLabel}${distance}`;
        return ref.where(fieldName, ">=", bbox[0]).
                   where(fieldName, ">=", bbox[1]).
                   where(fieldName, "<=", bbox[2]).
                   where(fieldName, "<=", bbox[3]);
   }

    nearbyLocationsQuery = (lat, lng, distance=1) => {
        const bits = mapDistanceToBitDepth(distance, this.geoFields);
        const bbox = geoHashingBoundary(lat, lng, bits);
        return  this.geoHashingQuery(bbox, distance); 
    };
}
