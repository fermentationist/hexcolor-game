const uniqueKey = () => {
    return String(Date.now()) + Math.floor(Math.random() * 1000);
}

export default uniqueKey;