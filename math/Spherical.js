
export class Spherical {

    constructor(x, y, z) {
        this.r = Math.sqrt(x*x + y*y + z*z);
        this.theta = Math.atan2(Math.sqrt(x*x+y*y), z);
        this.phi = Math.atan2(y, x);
    }
}
