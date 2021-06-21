export const releaseOrAssign = ({ freeStock = 0, currentStock = 0, unitValue = 0, value = 0 }) => {
    let releasingStock = (value - currentStock) * unitValue;
    if (releasingStock < 0) releasingStock = releasingStock * -1;

    let currentStockValue = currentStock * unitValue;

    let newProductStock = value;
    let newFreeStock = freeStock;

    if (value === 0) {
        newFreeStock = freeStock + currentStockValue;
    } else if (value < currentStock) {
        newFreeStock = freeStock + releasingStock;
    } else if (value > currentStock && freeStock - releasingStock >= 0) {
        console.log(freeStock);
        newFreeStock = freeStock - releasingStock;
    } else {
        newProductStock = currentStock;
    }
    return { newFreeStock, newProductStock };
};
