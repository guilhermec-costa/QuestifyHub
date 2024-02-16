import jwt from "jsonwebtoken";

interface JwtPayload {
    readonly id: string,
};

class Jwt {
    private payload: JwtPayload = {id: ""};
    public signedToken:string = "";
    public expiresIn:number = 3600;

    constructor(id:string, expiresIn:number) {
        this.payload = {
            id: id,
        };
        this.expiresIn = expiresIn;
        console.log("JWT token generated, with expiration time of ", + expiresIn + " seconds.");
    };

    public sign() {
        this.signedToken = jwt.sign(
            this.payload,
            process.env.JWT_SECRET as string,
            {expiresIn: this.expiresIn}
        );
    }
}

export default Jwt;
