import { Session } from "@shopify/shopify-api";
import prisma from "./prisma.js";
import Cryptr from "cryptr";
import crypto from "crypto";

const key = crypto.randomBytes(32);
const cryption = new Cryptr(key.toString("hex"));

const storeSession = async (session) => {
    // check if session already exists
    const sessionResult = await prisma.session.findUnique({ where: { id: session.id } });

    if (sessionResult === null) {
        await prisma.session.create({
            data: {
                id: session.id,
                content: cryption.encrypt(JSON.stringify(session)),
            },
        });
        return true;
    } else {
        await prisma.session.update({
            where: { id: session.id },
            data: {
                content: cryption.encrypt(JSON.stringify(session)),
            },
        });
        return true;
    }
};

const loadSession = async (id) => {
    const sessionResult = await prisma.session.findUnique({ where: { id } });

    if (sessionResult === null) {
        return undefined;
    }
    if (sessionResult.content.length > 0) {
        const sessionObj = JSON.parse(cryption.decrypt(sessionResult.content));
        return new Session(sessionObj);
    }
    return undefined;
};

const deleteSession = async (id) => {
    await prisma.session.deleteMany({ where: { id } });

    return true;
};

const handleSession = { storeSession, loadSession, deleteSession };

export default handleSession;