const parse3digitNumber = (price: string) => {
    const temp = price.replaceAll(',', '');
    return isNaN(parseInt(temp)) ? 0 : parseInt(temp);
}
export default parse3digitNumber;