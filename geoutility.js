export class GeoUtil {

    static getBearingRadians(lat1, long1, lat2, long2) {
        var degToRad = Math.PI / 180.0;

        var phi1 = lat1 * degToRad;
        var phi2 = lat2 * degToRad;
        var lam1 = long1 * degToRad;
        var lam2 = long2 * degToRad;

        return Math.atan2(Math.sin(lam2 - lam1) * Math.cos(phi2),
            Math.cos(phi1) * Math.sin(phi2) - Math.sin(phi1) * Math.cos(phi2) * Math.cos(lam2 - lam1)
        ) + (Math.PI / 2);
    }

    static getDistance(lat1, long1, lat2, long2) {
        var degToRad = Math.PI / 180;
        var phi1 = lat1 * degToRad;
        var phi2 = lat2 * degToRad;
        var lam1 = long1 * degToRad;
        var lam2 = long2 * degToRad;

        return 6371.01 * Math.acos(Math.sin(phi1) * Math.sin(phi2) + Math.cos(phi1) * Math.cos(phi2) * Math.cos(lam2 - lam1));
    }
}