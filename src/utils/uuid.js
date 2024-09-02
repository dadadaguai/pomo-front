// uuid.js
const generateUUID = () => {
    const rnds = crypto.getRandomValues(new Uint8Array(16)); // 获取随机值
    rnds[4] = (rnds[4] & 0x0f) | 0x40; // 设置版本号为4
    rnds[8] = (rnds[8] & 0x3f) | 0x80; // 设置变体为10
    return ([...rnds].map((b, i) =>
        (i === 4 || i === 6 || i === 8 || i === 10 ? '-' : '') + b.toString(16).padStart(2, '0')
    )).join(''); // 格式化为UUID格式
};

export { generateUUID };