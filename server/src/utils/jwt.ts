import jwt from "jsonwebtoken";

interface JwtPayload {
    readonly id: string,
    readonly name: string
};

class Jwt {
    private payload: JwtPayload = {id: "", name: ""}
    public token:string = "";
    private expiresIn:number = 3600;

    constructor(id:string, name: string, expiresIn:number) {
        this.payload = {
            id: id,
            name: name
        };
        this.expiresIn = expiresIn;
        console.log("JWT token generated, with expiration time of ", + expiresIn + " seconds.");
    };

    public sign() {
        this.token = jwt.sign(
            this.payload,
            process.env.JWT_SECRET as string,
            {expiresIn: this.expiresIn}
        );
    }
}

export default Jwt;
