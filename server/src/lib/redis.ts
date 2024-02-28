import { Redis } from "ioredis";

const redis = new Redis({
    port: 6380
});

export default redis;
