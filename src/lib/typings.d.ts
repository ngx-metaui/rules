// Typings reference file, you can add your own global typings here
// https://www.typescriptlang.org/docs/handbook/writing-declaration-files.html

/* SystemJS module definition */
declare var module: NodeModule;
interface NodeModule
{
    id: string;
}


declare var System: any;
declare var bigInt: BigIntegerStatic;
declare module 'big-integer';


interface BigInteger
{
    shiftLeft(number: number): BigInteger;
    shiftRight(number: number): BigInteger;
    valueOf(): number;
}

interface BigIntegerStatic
{
    one: BigInteger;
    zero: BigInteger;
    minusOne: BigInteger;

    (number?: BigInteger| number): BigInteger;
}

