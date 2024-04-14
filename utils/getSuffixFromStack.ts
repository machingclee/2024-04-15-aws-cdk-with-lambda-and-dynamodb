import { Fn, Stack } from "aws-cdk-lib";

export default (stack: Stack) => {
    /**
     * exmaple of stackId: 
     * 1:562976154517:stack/spacesTableStack/ed3f63e0-fa7b-11ee-9900-0a107562c215 
     */
    const shortStakcId = Fn.select(2, Fn.split("/", stack.stackId));
    const suffix = Fn.select(4, Fn.split("-", shortStakcId));
    return suffix;
}