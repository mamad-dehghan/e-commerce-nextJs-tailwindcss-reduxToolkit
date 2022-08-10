const parse3digitNumber = (price: string) => {
    const temp = price.replaceAll(',', '');
    return parseInt(temp);
}
export default parse3digitNumber;