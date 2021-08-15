import { User } from "./../entity/User";
import { sign, verify } from "jsonwebtoken";

export let ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET!;

export const createAccessToken = (user: User) => {
    return sign({ userId: user.id }, ACCESS_TOKEN_SECRET, {
        expiresIn: "1d",
    });
};

export const verifyJWT = async (token: string) => {
    if (!token) return null;

    let payload = null;
    try {
        payload = verify(token, ACCESS_TOKEN_SECRET);
    } catch (error) {
        return null;
    }

    if (payload === null) return null;

    return true;
};
