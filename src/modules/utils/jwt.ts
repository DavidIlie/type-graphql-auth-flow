import { JWTBlacklistPrefix } from "./../constants/redisPrefixes";
import { User } from "../../entity/User";
import { sign, verify } from "jsonwebtoken";
import { redis } from "../../redis";

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

    // @ts-ignore
    return payload.userId;
};

export const addTokenToBlacklist = async (token: string) => {
    const verify = await verifyJWT(token);

    if (verify === null) {
        return null;
    }

    await redis.set(JWTBlacklistPrefix + token, "blacklist");
    return true;
};

export const checkIfTokenIsInBlacklist = async (token: string) => {
    const verify = await verifyJWT(token);

    if (verify === null) {
        return null;
    }

    const found = await redis.get(JWTBlacklistPrefix + token);

    if (found) return true;

    return false;
};
