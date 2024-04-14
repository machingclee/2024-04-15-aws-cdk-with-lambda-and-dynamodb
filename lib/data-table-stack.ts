import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { AttributeType, ITable, Table } from "aws-cdk-lib/aws-dynamodb";
import getSuffixFromStack from '../utils/getSuffixFromStack';

export class DataStack extends cdk.Stack {
    public spaceTable: ITable
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        const suffix = getSuffixFromStack(this);

        this.spaceTable = new Table(this, "SpacesTable", {
            partitionKey: {
                name: "id",
                type: AttributeType.STRING
            },
            tableName: `SpaceStack-${suffix}`
        })
    }
}
