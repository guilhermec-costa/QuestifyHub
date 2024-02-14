import bcrypt from "bcrypt";

export const hashPassword = async (raw:string): Promise<string> => {
    const hashSalt = await bcrypt.genSalt();
    return await bcrypt.hash(raw, hashSalt);
}



