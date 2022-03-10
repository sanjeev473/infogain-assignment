export const filterNthLastMonthTrans = (transactions, n) => {
    if (!transactions) return [];
    const now = Date.now();
    const left = now - n * 30 * 24 * 60 * 60 * 1000,
        right = now - (n - 1) * 30 * 24 * 60 * 60 * 1000;
    return transactions.filter(transaction => {
        const timestamp = Date.parse(transaction.date);
        return left < timestamp && timestamp < right;
    });
}

export const computeRewards = (transactions) => {
    let rewards = 0;
    transactions.forEach((transaction) => {
        rewards += transaction.rewards;
    })
    return rewards;
}