import { Position } from '../types/utils';
//needed for getCenter funciotn
const LeftOrRight = [Position.Left, Position.Right];
//used to determine the position for edge text on a Smooth or Step Edge
export const getCenter = ({ sourceX, sourceY, targetX, targetY, sourcePosition = Position.Bottom, targetPosition = Position.Top }) => {
    const sourceIsLeftOrRight = LeftOrRight.includes(sourcePosition);
    const targetIsLeftOrRight = LeftOrRight.includes(targetPosition);
    // we expect flows to be horizontal or vertical (all handles left or right respectively top or bottom)
    // a mixed edge is when one the source is on the left and the target is on the top for example.
    const mixedEdge = (sourceIsLeftOrRight && !targetIsLeftOrRight) || (targetIsLeftOrRight && !sourceIsLeftOrRight);
    if (mixedEdge) {
        const xOffset = sourceIsLeftOrRight ? Math.abs(targetX - sourceX) : 0;
        const centerX = sourceX > targetX ? sourceX - xOffset : sourceX + xOffset;
        const yOffset = sourceIsLeftOrRight ? 0 : Math.abs(targetY - sourceY);
        const centerY = sourceY < targetY ? sourceY + yOffset : sourceY - yOffset;
        return [centerX, centerY, xOffset, yOffset];
    }
    const xOffset = Math.abs(targetX - sourceX) / 2;
    const centerX = targetX < sourceX ? targetX + xOffset : targetX - xOffset;
    const yOffset = Math.abs(targetY - sourceY) / 2;
    const centerY = targetY < sourceY ? targetY + yOffset : targetY - yOffset;
    return [centerX, centerY, xOffset, yOffset];
};
