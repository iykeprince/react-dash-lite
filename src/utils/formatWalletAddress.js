const formatWalletAddress = (walletAddress) => {
    const list = [...walletAddress];
    let characters = "";
    for (let i = 0; i < list.length; i++) {
        if (i > 5 && i < 26) {
            characters += '.';
        } else {
            characters += list[i];
        }
    }
    return characters;
}

export default formatWalletAddress